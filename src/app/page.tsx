import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import getMyServerSessionData from "@/service/getMyServerSessionData";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Homepage 자체는 SSR 로 렌더링된다. 서버에서 빌드할 때 페이지를 미리 만들어두지 않음, 즉 사용자의 요청이 있을 때마다 페이지를 새로 그린다.
// 사용자에게 요청이 왔을 때 req 헤더 부분에 사용자의 정보 = 세션이 들어있는지를 확인 함
export default async function HomePage() {
  // Next 13에서는 React.Context를 사용하는 모든 것(라이브러리 포함)이 클라이언트 구성 요소가 되어야 합니다. 해당 파일도 클라이언트에서 동작
  const { data: session } = await getMyServerSessionData(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    // sm = 640px 이상 ,md = 768px 이상 ,lg = 1024px 이상
    // 페이지 전체를 서버 사이드로 처리하면 서버에 과부하가 우려되니,
    // sideBar + header 만 ssr로 처리, prerender 할 수 있게 처리하고,
    // FollowingBar + PostList 는 CSR로 처리함, 그리고 그 안에서도 골격에 따라 pre render할 수 있는 부분은 따로 처리
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4 min-w-0">
        {/* flex-box 에서 각각의 아이템들은 최소의 너비를 가지고 있는데 그걸 0으로 해줌 */}
        {/* 아래 컴포넌트들은 사용자의 정보로만 구성하긴 어려움
        사용자의 정보에 따라 누굴 팔로우했는지 어떤 게시물을 올렸는지 데이터를 받아와야함
        SSR로 할건지 CSR로 할건지,SSR로 한다면 CSR을 어느 부분에 섞어서 사용할건지를 결정  */}
        <FollowingBar />
        <PostList />
      </div>

      <div className="basis-1/4 ml-8">
        <SideBar user={session} />
        {/* 100% 사용자의 정보로 움직이는 정적인 페이지 SSG */}
      </div>
    </section>
  );
}

// sidebar flex basis 로 영역 나누기

// secion의 전체 width인 850px의 3/4 영역 , 1/4 영역 차지
// 레벨을 나눠서 flex 줬을 때, 영역이 sidebar와 갈리게
