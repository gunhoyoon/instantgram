import React from "react";
type AvaterSize = "small" | "medium" | "large";
type Props = {
  image?: string | null;
  size?: AvaterSize;
  highlight?: boolean;
  // 타입을 넘겨주는거
};
// 해당 컴포넌트엔 3가지 속성이 있고, 전부 옵셔널이다.
// Avatar를 사용할 때 size 라는 속성의 별개 정의가 없다면 nomal 로 설정할 것이다.
// higtlight는 불리언인데 따로 정의를 하지 않는다면 false 로 사용하지 않을 것이다.
// avatar 에 프롭으로 size와 highlight 를 넘겨주는데, 이 프롭은 넘겨주는 함수의 인자가 될 거임
export default function Avatar({
  image,
  size = "large",
  highlight = false,
}: // 값을 넘겨주는거
Props) {
  return (
    // div 태그는 외부 링과같은 css 를 표현하기 위해서 사용,
    // 기본적으로 size : nomal, highlight : false 값이 들어가는 걸 볼 수 있음.
    // size는 기본 nomal 이지만, nomal에 대한 자세한 크기 정보는 함수에 적혀있고 해당 함수도 조건부로 되어있음
    // Avatar 컴포넌트를 사용하는 쪽에서 size 나 highlight 에 대한 사용을 정할 수 있게 됨
    <div className={getContainerStyle(size, highlight)}>
      {/*  eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white object-cover rounded-full ${getImageSizeStyle(
          size
        )}`}
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

function getContainerStyle(size: AvaterSize, highlight: boolean): string {
  const baseStyle = "rounded-full flex justify-center items-center"; //w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const sizeStyle = getContainerSize(size);

  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}
// className 자체에 조건부 렌더링을 사용해서 크기를 조절하거나 하는건 봤어도, 이렇게 여러개의 변수에 조건이나 값을 담아서 함수 인자에 따라서 값을 리턴해주는 식의 조건문이 담긴
// 함수 자체는 처음봄
function getContainerSize(size: AvaterSize): string {
  // size === "small" ? "w-9 h-9" : "w-[68px] h-[68px]"
  switch (size) {
    case "small":
      return "w-9 h-9";
    case "medium":
      return "w-11 h-11";
    case "large":
      return "w-[68px] h-[68px]";
  }
}
function getImageSizeStyle(size: AvaterSize): string {
  switch (size) {
    case "small":
      return "w-[34px] h-[34px] p-[0.1rem]";
    case "medium":
      return "w-[42px] h-[42px] p-[0.1rem]";
    case "large":
      return "w-16 h-16 p-[0.2rem]";
  }
}

// next Image 태그를 사용하고 외부 url에 대한 정보를 next config 파일을 지정해서 사용해야하지만,
// 해당 이미지의 주소같은경우 각 소셜 로그인을 하는 플랫폼에 따라 로직이 다르고 그걸 알 수 없기 때문에 특정 도메인을 지정하기 힘듦
// 그래서 일반 이미지 태그를 사용

// 외부 url next config 에서 설정만 하면 사용이 가능한데, 해당의 경우 외부에서 불러오는 것은 맞지만 도메인 형식을 우리가 알 수 없음
// 컴포넌트 하나로 css 를 각각 다르게 쓰기 위해 함수로 정의하고, 해당 컴포넌트를 사용하는 쪽마다 props의 값을 다르게 넣어서 사실상 조건부 렌더링
