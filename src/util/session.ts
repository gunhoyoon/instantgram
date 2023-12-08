import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthUser } from "@/model/User";
import { getServerSession } from "next-auth";

export async function withSessionUser(
  handler: (user: AuthUser) => Promise<Response> // handler 함수의 반한값
  // withSessionUser 함수에서 유효한 인자가 있다면 해당 콜백함수의 인자로 들어갈거임
  // 없다면 withSessionUser 내부에서 401 코드 반환
): Promise<Response> {
  // 함수에 함수를 전달하는 고차함수의 형태임

  const session = await getServerSession(authOptions);

  const user = session?.user;
  // 여기서의 user는 withSessionUser 내부에서 추출한 user 가 되는것임
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return handler(user);
}

// 유효한 세션이 있는지 확인 , 없다면 권한 에러
// 유효하다 하면 콜백함수에 사용자 전달해줌
