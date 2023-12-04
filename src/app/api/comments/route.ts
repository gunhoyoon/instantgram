import { addComment } from "@/service/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  //   console.log(req, "req");

  //이를 통 해들어오는 req 가 뭘가 api ? 아 전달할 데이터 형태 ?
  const session = await getServerSession(authOptions);
  //   console.log(session, "session");
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id, comment } = await req.json();
  //   console.log(id, comment, "id, comment");

  if (!id || comment === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  return addComment(id, user.id, comment) //
    .then((res) => {
      // console.log(res), addComment 이후 추가된 데이터포함 전체 데이터를 반환함
      return NextResponse.json(res);
    })
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
