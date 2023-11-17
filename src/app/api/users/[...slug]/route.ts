import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[]; // 한 가지의 슬러그가 아니라 중첩된 route 를 받아올 수 있게 배열로 설정함
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new Response("Bad Request", { status: 400 });
    // 해당 api에 요청할 때 중첩된 slug 를 받을 수 있게 배열로 설정해두었는데 없거나 배열ㅇ ㅣ아니거나 length가 2 미만이라면 잘못된 요청임
  }
  const [username, query] = slug;

  let request = getPostsOf;
  if (query === "saved") {
    request = getSavedPostsOf;
  } else if (query === "liked") {
    request = getLikedPostsOf;
  }
  return request(username).then((data) => NextResponse.json(data));
}
