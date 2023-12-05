import { Comment, FullPost } from "@/model/Post";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";

async function addComment(id: string, comment: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);
  const { mutate: globalMutate } = useSWRConfig();
  const postComment = useCallback(
    (comment: Comment) => {
      if (!post) return;
      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      };

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate("/api/posts"));
      // 지금은 코멘트에 관한 부분은 뮤테이트만 해주고 있기 때문에, 기존에 가지고 있던 데이터를 만료처리하고 즉각적으로 요청해서 불러옴, 그 시간이 조금걸림
    },
    [post, mutate, globalMutate]
  );
  return { post, isLoading, error, postComment };
}
