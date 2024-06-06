import { NextResponse, type NextRequest } from 'next/server'
import i18nConfig from './i18nConfig';
import { i18nRouter } from 'next-i18n-router';
import { updateSession } from './utils/supabase/middleware';
import { createClient } from './utils/supabase/server';

export async function middleware(request: NextRequest) {
  try {
    // const response = NextResponse.next();
    const i18nResp = i18nRouter(request, i18nConfig);
    const supabase = createClient()

    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    // const { data: { user } } = await supabase.auth.getUser()
    // if (!user) {
    //   return NextResponse.redirect(`${request.nextUrl.origin}/login`);
    // }
    // if (request.nextUrl.pathname === '/') {
    //   // await supabase.auth.signOut();
    //   return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`);
    // }
    await updateSession(request)
    return i18nResp

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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],

}
