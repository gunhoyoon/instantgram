import React from "react";

type Props = {
  image?: string | null;
};

export default function Avatar({ image }: Props) {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300">
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full p-[0.1rem]"
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
        // 구글 이미지 갖다 쓸 때 가끔 나오는 x 박스 뜨지말라고 처리
      />
      {/* ?? = 이미지가 있다면 그걸 쓰고 없다면 undefined 쓸거임 , 
      일반 img 태그를 사용하면 warnning이 발생하는데 최적화된 next js image태그를 왜 안쓰냐!@@하는 워닝이고, 그걸 처리해줌  */}
    </div>
  );
}

// next Image 태그를 사용하고 외부 url에 대한 정보를 next config 파일을 지정해서 사용해야하지만,
// 해당 이미지의 주소같은경우 각 소셜 로그인을 하는 플랫폼에 따라 로직이 다르고 그걸 알 수 없기 때문에 특정 도메인을 지정하기 힘듦
// 그래서 일반 이미지 태그를 사용
