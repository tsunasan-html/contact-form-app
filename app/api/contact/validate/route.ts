export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email } = body;

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

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Validation error:', error);

    return Response.json(
      { message: 'A server error occurred.' },
      { status: 500 }
    );
  }
}