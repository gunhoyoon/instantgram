import { SimplePost } from "@/model/Post";
import useSWR from "swr";
//
// 함수 역할 분배
async function updateLike(id: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
} // likes 에 관한 데이터를 결국 mutate를 사용해서 옵티미스틱 UI 업데이트를 해줘야하는데 해당 경로는 fetch 로 통신하기떄문에 mutate를 사용할 수 없음
console.log(updateLike, "updateLike");

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>("/api/posts");
  // 불필요한 요청 ,불필요한 렌더링 감소
  // SWR 로 통신하고 있는 /api/posts 의 mutate를 사용하게 되면 지금은 '/api/posts' 의 바운드된 데이터를 가지고 있지만,
  // mutate의 함수를 사용해서 첫번째 인자에 패치된 데이터를 넣어주면, 첫번째 인자의 데이터로 덮어씌워준다 mutate에, 그래서 /api/likes 에 관한 데이터를
  // 옵티미스틱 UI 업데이트 하게 되는거임
  // 여기서 mutate 를 실행하고 키 또는 바인딩된 api 로 뮤테이트를 호출하게되면 기존 캐시되어있던 데이터를 강제로 만료하고 refetch를 트리거함으로 revalidate 를 지시

  const setLike = (post: SimplePost, username: string, like: boolean) => {
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
      populateCache: false, // 백앤드에 요청이 완료되면 전달되는프로미스 데이터를 클라이언트에서 캐시하지 않겠다. 왜냐면 클라이언트에서 만들어둔 데이터와 서버 요청시 받아오는 데이터가 동일할거기 때문에, 우리 앞서서 데이터를 수정해둔거라 항상 최신일 것임
      revalidate: false, // 우린 이미 데이터를 알고있음 , 그래서 백앤드에 다시 요청할 필요가 없음
      rollbackOnError: true, // 혹시 like 를 처리하면서 에러가 발생한다면 rollback 할 수 있도록 true 로 설정
    }); // 해당 옵션을 /api/likes 의 요청이 처리되기전에 ui 가 먼저 업데이트가 되므로 UX가 개선이 됨.
    // 누를때마다 요청이 가는건 어쩔 수 없는 거 같은데, 네이버 지식인으로 라이크를 계속 눌러보니 alert 창으로 메시지가 뜨거나, 자동입력방지? 메이플 거탐같은게 뜸
  };
  return { posts, isLoading, error, setLike };
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
