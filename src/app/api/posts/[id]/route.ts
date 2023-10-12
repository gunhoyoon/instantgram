import getMyServerSessionData from "@/service/getMyServerSessionData";
import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/service/posts";
import { authOptions } from "../../auth/[...nextauth]/route";

type Context = {
  params: { id: string };
};

export async function GET(requset: NextRequest, context: Context) {
  const session = await getMyServerSessionData(authOptions);
  const user = session.session?.user;

  if (!user) {
    return new Response("Authentication Error!!", { status: 401 });
  }
  return getPost(context.params.id).then((data) => NextResponse.json(data));
}
