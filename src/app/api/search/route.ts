import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// 요청이 오면 수행하게끔 export const dynamic = "force-dynamic"; 입력 ?
export async function GET() {
  return searchUsers() //
    .then((data) => NextResponse.json(data));
}
// nextjs에서 제공해주는 패치를 사용하지 않으니까 패치를 사용해서 캐시 컨트롤을 직접 해주지 않는 이상
// 이렇게 정적으로 같은 데이터를 요청하는 코드는 ssg 로 행동을 하게 됨
// 그래서 search 페이지와 같은 경우 처음 만들어지고 그 이후 사용자가 추가로 더 생기게 된다해도 계속 같은 페이지가 보여지게 됨

// export async function GET() {
//   return searchUsers() //
//     .then((data) => NextResponse.json(data));
// }
