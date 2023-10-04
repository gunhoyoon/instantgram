import getMyServerSessionData from "@/service/getMyServerSessionData";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserByUsername } from "@/service/user";
// GET 요청에 대한 유효한 인자들이 전달되었는지 확인한 뒤에, 다른 곳에서 이거 유효하니까 처리해줘 라는 식의 로직을 분할하는 코드를 작성함이 좋다.
export async function GET(request: Request) {
  const session = await getMyServerSessionData(authOptions);
  const user = session.session?.user;
  if (!user) {
    return new Response("Authentication Error!!", { status: 401 });
  }
  return getUserByUsername(user.username).then((data) =>
    NextResponse.json(data)
  );
  // api/me 로 나에 대한 정보 요청을 하면 (요청)header에 있는 쿠키에 대한 정보를 근거로 사용자가 누군지를 알아야함
  // 사용자가 보낸 req 에 있는 헤더안에 쿠키에 있는 토큰을 파싱해서 그 토큰안에 있는 정보(세션에 관한 정보 username , email 등)를 해독해서 가지고 와야함
}

// 클라 -> 서버  로그인 요청
// 서버 -> 클라 로그인 잘됐다 응답 + 사용자를 증명할 수 있는 토큰 / 앞으로 토큰을 같이 보내면서 api요청 시 사용자임을 알 수 있음
// 이 후 클라 -> 서버 요청 시 토큰을 같이 묶어서 보내기 때문에, 굳이 요청하는 body 안에 내가 누군지에 대한 설명이 필요없음
// 근데 지금 NetWork 탭에서 확인해보니까, api/me 라는 요청의 헤더안에 쿠키에 본인의 정보가, 시크릿 정보 포함 다 들어가있음

// 여기선 user 자체가 유효한지만 파악하는 역할을 하고, 파악이 됐으면 어떤 식의 처리를 해달라고 다른 쪽에 전가시키는게 맞음

// 그리고 현재 user 라는 정보안에는 username email 과 같은 정보 외에 그 사용자에 구체적인 정보가 안들어가있음.
// bookmark 나 likes followings 같은 정보들. 그 정보를 요청하기 위해 처리를 해줘야함
