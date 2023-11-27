import React, { useState } from "react";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import { SimplePost } from "@/model/Post";
import { useSession } from "next-auth/react";
import usePosts from "@/hook/usePosts";

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;
  // 버튼 자체를 좋아요 누른 사람만 가능하니 로그인이 되어있는 사용자가 있는지 확인

  const liked = user ? likes.includes(user.username) : false;
  // 그래서 좋아요 버튼의 상태를 해당 컴포넌트에 의존해서 사용하는것이 아니라 전달받은 like 를 사용자가 좋아했는지에 대한 데이터를 가지고 업데이트 해줄거임
  // 버튼을 클릭할 시 api요청 > 데이터 변경 > 업뎃 > toggle 버튼의 liked 값도 변경이 될 수 있게 해당 버튼을 업데이트 해줄거임
  // user 가 있다면 likes 배열 안에 user의 username 이 있는지, 있으면 true 없으면 false,
  const { setLike } = usePosts(); // 해당 컴포넌트에서 자체적으로 좋아요에 관한 데이터 수정하고 모든 api/posts 키를 사용하는 쪽을 리벨리데이트, 업데이트 시켜줬는데
  // 그걸 커스텀 훅으로 처리하게됨, 아마 posts 에 대한 데이터를 요청하는 다른 컴포넌트들에서도 해당 커스텀 훅을 사용하게 되면. 해당 요청에 캐시된 데이터 자체를 전달해주고 있는 거 같음
  const [bookmarked, setBookmarked] = useState(false);
  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
    //   fetch("api/likes", {
    //     method: "PUT",
    //     body: JSON.stringify({ id: post.id, like }),
    //   }).then(() => mutate("/api/posts"));
    // };
  };

  // nextjs 에서 제공하는 fetch api 의 경우 캐시에 대한 옵션을 직접 설정할 수 있는데, 기본값은 캐시를 하게 되어있음
  // 해당 코드에서 likes 에 관련된 데이터를 수정하고, 요청이 성공했을 때 posts 를 한번 더 찌르게 하는데 데이터를 요청 할 때 fetch 또는 SWR 을 사용하는 이유는
  // SWR 이 요청 시 해당 키값을 자체로 캐싱하기 때문에 캐시가 필요한 데이터라면 sWR 로 요청을 하고 그 외에 캐시가 필요하지 않거나 동적인 데이터 등 은 fetch 로 요청
  // 보통 데이터를 읽어오는 GET 요청 시 SWR , 그 외 POST PUT DEL 시 fetch 사용
  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {text && (
          <p>
            <span className="font-bold mr-1">{username}</span>
            {text}
          </p>
        )}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
