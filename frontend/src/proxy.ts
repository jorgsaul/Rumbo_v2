import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register", "/recovery"];
const DEFAULT_LOGGED = "/feed";
const DEFAULT_GUEST = "/login";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const authClient = request.cookies.get("auth-client")?.value;
  const pathname = request.nextUrl.pathname;

  console.log(authClient);

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthenticated = !!token || !!authClient;

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_GUEST, request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGGED, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
