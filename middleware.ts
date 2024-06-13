import { NextResponse, type NextRequest } from 'next/server'
import i18nConfig from './i18nConfig';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  try {
    // this includes the i18n got to updateSession

    const { response, user } = await updateSession(request)
    if (!user && !request.nextUrl.pathname.includes('/login') && !request.nextUrl.pathname.includes('/auth')) {
      return NextResponse.redirect(`${request.nextUrl.origin}/login`);
    }
    if (!!user && !!request.nextUrl.pathname.includes('/login')) {
      return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`);
    }
    if (request.nextUrl.pathname === '/') {
      // await supabase.auth.signOut();
      return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`);
    }
    return response;

  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}


export const config = {
  // matcher: [],

  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}