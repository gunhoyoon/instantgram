import { HomeUser } from "@/model/User";
import { useCallback } from "react";
import useSWR from "swr";

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}
async function updateFollow(targetId: string, follow: boolean) {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ id: targetId, follow }),
  }).then((res) => res.json());
}

// 유저 개인의 정보를 업데이트 시켜주는거라서 posts 를 업데이트 할 필요가 없음
export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");
  // console.log(user, "user");
  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      // console.log(postId, bookmark);

      if (!user) return;

      const bookmarks = user?.bookmarks;
      // console.log(bookmarks, "bookmarks");
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((b) => b !== postId),
      };
      // console.log(newUser, "newUser");

      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser, // 업데이트된 유저정보만 보여주면 됨
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  ); // 해당 훅을 사용하는 컴포넌트들의 값이 바뀌면, 프롭으로 전달된 해당 친구들까지 리렌더링이 되기 때문에. 디펜던시를 통해서
  // 해당 함수에서 사용하는 외부 디펜던시인 user나 mutate가  변경이 되면 그럴때마다 새로운 함수를 만들게 될거임
  const toggleFollow = useCallback(
    (targetId: string, follow: boolean) => {
      return mutate(updateFollow(targetId, follow), { populateCache: false });
    },
    [mutate]
  );
  return { user, isLoading, error, setBookmark, toggleFollow };
}
