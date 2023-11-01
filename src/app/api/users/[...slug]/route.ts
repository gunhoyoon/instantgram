import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[]; // slug/slug/slug 중첩된 라우트를 받아오는 경로임 [...slug]
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;
  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Requset", { status: 400 });
  }

  const [username, query] = slug;
}
