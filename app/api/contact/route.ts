import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase environment variables are missing.');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const errors: { name?: string; email?: string } = {};

    if (!name || name.trim() === '') {
      errors.name = 'Please enter your name.';
    }

    if (!email || email.trim() === '') {
      errors.email = 'Please enter your email address.';
    } else if (!email.includes('@')) {
      errors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(errors).length > 0) {
      return Response.json({ errors }, { status: 400 });
    }

    const { error } = await supabase.from('contacts').insert([
      {
        name,
        email,
        message: message || '',
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);

      return Response.json(
        { message: 'Failed to save contact.' },
        { status: 500 }
      );
    }

    return Response.json({
      ok: true,
      message: 'Request successful',
    });
  } catch (error) {
    console.error('API error:', error);

    return Response.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}