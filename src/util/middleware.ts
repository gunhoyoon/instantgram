import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// next auth 미들웨어 , 아직 page만 제공
export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return new NextResponse("Authentication Error", { status: 401 });
    } // 토큰이 없고 , api 요청이라면 Authentication Error 에러를 반환할거임
    //

    const { pathname, search, origin, basePath } = req.nextUrl;
    const signUrl = new URL(`${basePath}/auth/signin`, origin);
    signUrl.searchParams.append(
      "callbackUrl",
      `${basePath}${pathname}${search}`
    );
    return NextResponse.redirect(signUrl);
  }
  return NextResponse.next();
}

// 지금 전반적으로 로그인한 사용자의 경우에 할 수 있는 컨텐츠들이 많기 때문에 서버에 요청해서 확인한 뒤 다시 응답받아 판별하는 과정을
// 미들웨어로 간편하게 처리할 수 있음

// matcher 속성은 미들웨어가 어떤 경로에 적용될지를 나타냅니다. 여기서는 "/new"와 "/" 경로에 미들웨어를 적용하도록 설정되어 있습니다.
// 근데 이렇게 되면 페이지는 검사를 하지만 api 를 거칠 땐 검사하지 않기 때문에 내부적으로 작성해야함
export const config = {
  matcher: [
    "/new",
    "/",
    "/api/bookmarks",
    "/api/comments",
    "/api/likes",
    "/api/follow",
    "/api/me",
    "/api/posts/:path*",
  ],
};
// matcher 안에 넣어준 친구들은 미들웨어를 거치게 될 것임
// 없으면 안거침
