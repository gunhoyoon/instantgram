import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import getMyServerSessionData from "@/service/getMyServerSessionData";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HomePage() {
  // Next 13에서는 React.Context를 사용하는 모든 것(라이브러리 포함)이 클라이언트 구성 요소가 되어야 합니다. 해당 파일도 클라이언트에서 동작
  const { data: session } = await getMyServerSessionData(authOptions);
  console.log(session, "session﹒﹒");
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    // sm = 640px 이상
    // md = 768px 이상
    // lg = 1024px 이상
    // 기본 column / 768px 이상 시 row 정렬
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      {/* secion의 전체 width인 850px의 3/4 영역 , 1/4 영역 차지 */}
      {/* 레벨을 나눠서 flex 줬을 때, 영역이 sidebar와 갈리게 */}
      <div className="basis-1/4">
        <SideBar user={session} />
      </div>
    </section>
  );
}

// sidebar flex basis 로 영역 나누기
