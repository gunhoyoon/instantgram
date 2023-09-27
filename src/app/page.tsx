import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { handler } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(handler);
  console.log(session, "sessionsessionsessionsession");
  const user = session?.user;
  // Next 13에서는 React.Context를 사용하는 모든 것(라이브러리 포함)이 클라이언트 구성 요소가 되어야 합니다. 해당 파일도 클라이언트에서 동작
  if (!user) {
    redirect("/api/auth/signin");
  }
  return (
    <section>
      <FollowingBar />
      <PostList />
      <SideBar user={user} />
    </section>
  );
}
