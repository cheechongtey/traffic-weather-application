import { encode } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// This function can be marked `async` if using `await` inside
async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const cookieName = 'next-auth.session-token';
  const nextAuthSession = request.cookies.get(cookieName);
  const isGet = request.method === 'GET';

  if (isGet && !nextAuthSession) {
    const id = uuidv4();

    const token = await encode({
      token: {
        sub: id,
      },
      secret: process.env.NEXTAUTH_SECRET as string,
      maxAge: 60 * 60 * 24 * 30 * 3, // 3 MONTHS
    });

    response.cookies.set(cookieName, token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|sw|monitoring|robots.txt|.*\\..*).*)',
  ],
};

export default middleware;
