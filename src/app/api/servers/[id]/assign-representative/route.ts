import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { z } from 'zod'

const assignRepresentativeSchema = z.object({
  representative_id: z.string().uuid(),
})

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

    const body = await request.json()
    const { representative_id } = assignRepresentativeSchema.parse(body)

    // Check if server exists
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

    // Check if server already has a representative
    if (server.representative_id) {
      return NextResponse.json(
        { error: { code: 'ALREADY_HAS_REPRESENTATIVE', message: 'Server already has a representative' } },
        { status: 409 }
      )
    }

    // Check if representative exists and is available
    const { data: representative } = await supabase
      .from('profiles')
      .select('id, name, email, server_id, role, verified')
      .eq('id', representative_id)
      .single()

    if (!representative) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Representative not found' } },
        { status: 404 }
      )
    }

    if (representative.role !== 'representative') {
      return NextResponse.json(
        { error: { code: 'INVALID_ROLE', message: 'User is not a representative' } },
        { status: 400 }
      )
    }

    if (!representative.verified) {
      return NextResponse.json(
        { error: { code: 'UNVERIFIED', message: 'Representative is not verified' } },
        { status: 400 }
      )
    }

    if (representative.server_id) {
      return NextResponse.json(
        { error: { code: 'ALREADY_ASSIGNED', message: 'Representative is already assigned to a server' } },
        { status: 409 }
      )
    }

    // Perform the assignment in a transaction-like manner
    // First update the server
    const { error: serverError } = await supabase
      .from('servers')
      .update({ representative_id })
      .eq('id', id)

    if (serverError) {
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: serverError.message } },
        { status: 500 }
      )
    }

    // Then update the profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ server_id: id })
      .eq('id', representative_id)

    if (profileError) {
      // Rollback server update
      await supabase
        .from('servers')
        .update({ representative_id: null })
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
      message: `Representative ${representative.name} assigned to server ${server.name}`
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: error.issues } },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    )
  }
}