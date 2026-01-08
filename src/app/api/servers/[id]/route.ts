import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { z } from 'zod'

const updateServerSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  region: z.string().min(1).max(100).optional(),
  representative_id: z.string().uuid().nullable().optional(),
  active: z.boolean().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: server, error } = await supabase
      .from('servers')
      .select(`
        *,
        representative:profiles(id, name, email, verified)
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Server not found' } },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: error.message } },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: server })
  } catch (err) {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    )
  }
}

export async function PUT(
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
    const validatedData = updateServerSchema.parse(body)

    // If assigning a representative, check if they're available
    if (validatedData.representative_id) {
      const { data: representative } = await supabase
        .from('profiles')
        .select('id, server_id, role, verified')
        .eq('id', validatedData.representative_id)
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

      if (representative.server_id && representative.server_id !== id) {
        return NextResponse.json(
          { error: { code: 'ALREADY_ASSIGNED', message: 'Representative is already assigned to another server' } },
          { status: 409 }
        )
      }
    }

    const { data: server, error } = await supabase
      .from('servers')
      .update(validatedData)
      .eq('id', id)
      .select(`
        *,
        representative:profiles(id, name, email, verified)
      `)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Server not found' } },
          { status: 404 }
        )
      }
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: { code: 'DUPLICATE_SERVER', message: 'Server name already exists' } },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: error.message } },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: server })
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

export async function DELETE(
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

    // Soft delete by setting active to false
    const { data: server, error } = await supabase
      .from('servers')
      .update({ active: false, representative_id: null })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Server not found' } },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: error.message } },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: server })
  } catch (err) {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    )
  }
}