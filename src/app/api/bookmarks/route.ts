import { likePost, dislikePost } from "@/service/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addBookmark, removeBookmark } from "@/service/user";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id, bookmark } = await req.json();

  if (!id || bookmark === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = bookmark ? addBookmark : removeBookmark;

  return request(user.id, id) //
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}

// 세션에 사용자 아이디를 받아와서 현재 라이크 상태에 따라 좋아요 누른 사용자를 배열에 넣을지 뺄지 를 정함.
// 이건 어디서 동작하는건지 우선은 클라이언트에서 디비에 직접 접근해서 데이터를 수정하는게 아니기 때문에 서버에 요청을 할 수 있게끔 해당
// 파일을 통해 요청하게 해놨음. PUT 을 할 때 사용하는 인자는 id와 현재 like 가 되어있는지를 전달해줌
// 서버에서 하는거면 직접 컴포넌트를 통해서 디비에 접근이 가능하겠지만, 클라이언트에선 서버의 단계를 거쳐 디비에 접근하는 구조임
