import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Admin access required' } },
        { status: 403 }
      )
    }

    // Check if server exists and has a representative
    const { data: server } = await supabase
      .from('servers')
      .select('id, name, representative_id')
      .eq('id', id)
      .eq('active', true)
      .single()

    if (!server) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Server not found' } },
        { status: 404 }
      )
    }

    if (!server.representative_id) {
      return NextResponse.json(
        { error: { code: 'NO_REPRESENTATIVE', message: 'Server has no representative to remove' } },
        { status: 400 }
      )
    }

    const representativeId = server.representative_id

    // Remove representative from server
    const { error: serverError } = await supabase
      .from('servers')
      .update({ representative_id: null })
      .eq('id', id)

    if (serverError) {
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: serverError.message } },
        { status: 500 }
      )
    }

    // Remove server assignment from profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ server_id: null })
      .eq('id', representativeId)

    if (profileError) {
      // Rollback server update
      await supabase
        .from('servers')
        .update({ representative_id: representativeId })
        .eq('id', id)

      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: profileError.message } },
        { status: 500 }
      )
    }

    // Get updated server data
    const { data: updatedServer, error: fetchError } = await supabase
      .from('servers')
      .select(`
        *,
        representative:profiles(id, name, email, verified)
      `)
      .eq('id', id)
      .single()

    if (fetchError) {
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: fetchError.message } },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      data: updatedServer,
      message: `Representative removed from server ${server.name}`
    })
  } catch (err) {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    )
  }
}