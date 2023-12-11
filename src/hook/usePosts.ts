import { useCacheKeys } from "./../context/CacheKeysContext";
import { Comment, SimplePost } from "@/model/Post";
import { useCallback } from "react";
import useSWR from "swr";
//
// 함수 역할 분배
async function updateLike(id: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}
// likes 에 관한 데이터를 결국 mutate를 사용해서 옵티미스틱 UI 업데이트를 해줘야하는데 해당 경로는 fetch 로 통신하기떄문에 mutate를 사용할 수 없음

async function addComment(id: string, comment: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}
// console.log(cacheKeys.postsKeys, "cacheKey");
// 해당 훅을 사용할 때 cacheKey 라는 스트링 타입의 경로를 받을 것. 아무것도 넘겨주지 않을 경우에 기본 값은 "/api/posts"
// 여기서 user/username/query를 캐시키로 사용하게 되면 posts 커스텀 훅에서 제공해주는 posts 를 사용할거고,
// user/username/query 해당 캐시키를 사용하는 데이터가 업데이트가 될 것임

export default function usePosts() {
  const cacheKeys = useCacheKeys();
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKeys.postsKeys);
  // ***캐시값 바뀌면 데이터 패칭이 다시 일어난다.*** ,
  // 기본값으로 설정한 친구는 지가 가지고 있는 키값으로 열일중
  // 상세 페이지 친구를 통하려면 프로바이더를 통한 키값이 계속 들어옴
  // 다른 엔드포인트 사용인데 , 같은 리소스를 다룰 때 , 캐시를 하나로 바라보게함. 프로바이더든 뭐든 통해서.
  // 콘솔 찍어보면서 velog에 내 언어로 정리. ++
  // useSWR이 키값으로 캐싱하고 있던 값 기본 : api/posts
  // cacheKeysProvider 를 통해 들어온 값이 기존에 user/${username}/${query} 값이었음
  // 유저에 대한 페이지는 user/${username}/${query} 를 통해 보여지게 되어있음. 해당 키값으로 받은 posts 를 보여주고,
  // 메인 페이지에서 리스트형태로 나오는 포스트들은 api/posts 로 받아오고 있음.
  // 그래서 유저의 개인 페이지에서 좋아요를 눌렀을 때 전체 포스트의 게시물이 반영이 안됨.
  // 그래서 원래 usePosts 훅 에선 api/posts를 고정으로 사용했지만, 개인페이지에 한해 user/${username}/${query} 를 요청하게 됨

  // simplepost comments: number 타입, 코맨트의 개수 자체는 number 로 표기 , 목록을 보여줌에 있어서는 string[]
  // 불필요한 요청 ,불필요한 렌더링 감소
  // SWR 로 통신하고 있는 /api/posts 의 mutate를 사용하게 되면 지금은 '/api/posts' 의 바운드된 데이터를 가지고 있지만,
  // mutate의 함수를 사용해서 첫번째 인자에 패치된 데이터를 넣어주면, 첫번째 인자의 데이터로 덮어씌워준다 mutate에, 그래서 /api/likes 에 관한 데이터를
  // 옵티미스틱 UI 업데이트 하게 되는거임
  // 여기서 mutate 를 실행하고 키 또는 바인딩된 api 로 뮤테이트를 호출하게되면 기존 캐시되어있던 데이터를 강제로 만료하고 refetch를 트리거함으로 revalidate 를 지시

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, username]
          : post.likes.filter((item) => {
              // console.log(item);
              return item !== username;
            }),

        // 라이크 버튼을 누를 때, 기존 post 데이터를 복사해오고 likes 에는like 가 true 면 사용자가 좋아요를 눌렀다는거니까 유저네임이 추가된 데이터를 사용할거고
        // 해당 데이터는 optimisticData 를 위한 데이터임 빠르게 바꿔치기 해서 ui 먼저 업데이트 해주기 위함
        // 아니라면 좋아요를 취소한거니까 post(객체).like(배열).filter 를 사용해서 username 을 제외한 배열을 새로 반환할거임, 그러니까 이름 뺄거임.
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));
      // 좋아요 버튼을 눌러 업데이트 된 포스트를 찾기위해 전체 배열을 순회하면서 바꾼 포스트의 id가 맞아? 맞으면 업데이트한 데이터를 넣을거고,
      // 아니야? 아니면 기존의 데이터 그대로 쓸거야.
      // console.log(newPosts);
      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false, // 백앤드에 요청이 완료되면 전달되는프로미스 데이터를 클라이언트에서 캐시하지 않겠다. 왜냐면 클라이언트에서 만들어둔 데이터와 서버 요청시 받아오는 데이터가 동일할거기 때문에, 우리 앞서서 데이터를 수정해둔거라 항상 최신일 것임, 여기서 반환된 값을 사용하지 않겠다.
        revalidate: false, // 우린 이미 데이터를 알고있음 , 그래서 백앤드에 다시 요청할 필요가 없음
        rollbackOnError: true, // 혹시 like 를 처리하면서 에러가 발생한다면 rollback 할 수 있도록 true 로 설정
      }); // 해당 옵션을 /api/likes 의 요청이 처리되기전에 ui 가 먼저 업데이트가 되므로 UX가 개선이 됨.
    },
    [posts, mutate]
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      // console.log(post, comment, "post , comment");
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      //  뮤테이트를 해당 경로 들고 찌르면서 post 업데이트함
      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );
  return { posts, isLoading, error, setLike, postComment };
}

// import { SimplePost } from "@/model/Post";
// import useSWR, { useSWRConfig } from "swr";

// export default function usePosts() {
//   const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/posts");
//   const { mutate } = useSWRConfig();

//   const setLike = (post: SimplePost, username: string, like: boolean) => {
//     fetch("api/likes", {
//       method: "PUT",
//       body: JSON.stringify({ id: post.id, like }),
//     }).then(() => mutate("/api/posts"));
//   };

//   return { posts, isLoading, error, setLike };
// }
