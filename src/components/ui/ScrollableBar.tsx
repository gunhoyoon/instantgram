import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desk: {
    breakpoint: { max: 4000, min: 576 },
    items: 6,
  },

  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 5,
  },
};

export default function ScrollableBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel responsive={responsive} containerClass="w-full flex gap-2">
      {children}
    </Carousel>
  );
}
// 스크롤바 ui 라이브러리, 상태와 클릭 이벤트를 사용하므로 client component 에서 사용
