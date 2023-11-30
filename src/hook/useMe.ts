import { HomeUser } from "@/model/User";
import useSWR from "swr";

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}
// 유저 개인의 정보를 업데이트 시켜주는거라서 posts 를 업데이트 할 필요가 없음
export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");
  console.log(user, "user");
  const setBookmark = (postId: string, bookmark: boolean) => {
    console.log(postId, bookmark);
    if (!user) return;
    const bookmarks = user?.bookmarks ?? [];
    // console.log(bookmarks, "bookmarks");
    const newUser = {
      ...user,
      bookmarks: bookmark
        ? [...bookmarks, postId]
        : bookmarks.filter((b) => b !== postId),
    };
    console.log(newUser, "newUser");

    return mutate(updateBookmark(postId, bookmark), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };
  return { user, isLoading, error, setBookmark };
}
