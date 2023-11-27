"use client";
import React from "react";
import PostListCard from "./PostListCard";
import GirdSpinner from "./ui/GirdSpinner";
import usePosts from "@/hook/usePosts";

export default function PostList() {
  const { posts, error, isLoading: loading } = usePosts();
  // 기존 아래처럼 각각의 컴포넌트에서 posts 에 대한 데이터를 요청했다면 , 커스텀 훅을 통해서 재사용할 수 있게 됨
  // const {
  //   data: posts,
  //   error,
  //   isLoading: loading,
  // } = useSWR<SimplePost[]>("/api/posts");

  //  useSWR은 "/api/posts" 해당 문자열 자체를 api 를 요청하는 url 로도 사용을 하지만 내부적으로는 캐시 key 로 사용을 함
  // 그래서 useSWR 내부적으로 /api/posts 에 대한 데이터를 캐시하고 있기 때문에 백엔드에서 아무리 변경 사항이 있어도 예전의 값을 보여주기 되는거임 즉 디비와 일치하지 않게 된다.
  // 그래서 useSWRConfig 내부 mutate 를 사용해서 /api/posts 에서 받고 있는 posts 에 대한 데이터가 변할때마다 다시 요청을 백그라운드에서 보내서 캐시를 업데이트 시켜줘야함
  // 아직까지 예전의 데이터를 보여주게 되어있지만, 요청을 하고 캐시된 데이터를 다시 받아왔을 때 현재랑 비교해서 다른게 있다면 상태를 업데이트 해줄 것이고, 리액트를 통해 바뀐 부분만 업데이트가 될거임
  // 현재는 최초 요청한 데이터가 보여지고 있는거임 db랑 일치
  // 결국 캐시된 키를 가지고 있는 해당 SWR 을 업데이트 시켜주는거임

  // const { data, error: isError, isLoading } = useSWR("/api/endpoint/rendom");
  // console.log(data, "data");

  // const [test, setTest] = React.useState();

  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GirdSpinner />
          {/* girdspinner 가 받을 props 자체가 옵셔널로 되어있고 해당 컴포넌트에서 프롭에 대한 기본값을 설정했다면 컴포넌트의 값을 넘겨주지 않아도 됨  */}
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-2">
              <PostListCard post={post} priority={index < 2} />
              {/* index < 2  ,  해당 조건의 결과값대로 true, false 가 나올 것이고 해당 값이 priority값으로 전달될것임 */}
              {/* 이렇게 전달되면 posts로 전달된 배열에 0 , 1 번째 인덱스의 이미지가 중요 컨텐츠로 간주되어, 최적화된 렌더링을 통해 사용자에게 빠르게 제공할 수 있다 */}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// 리턴해준 데이터를 받아와서, 화면에 그려줌
