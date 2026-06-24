import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Always serve on www — apex must forward to Railway (see DNS setup). */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host === "zavian.ai") {
    const url = request.nextUrl.clone();
    url.hostname = "www.zavian.ai";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
