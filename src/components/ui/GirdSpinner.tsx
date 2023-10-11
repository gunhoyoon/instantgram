// import { GridLoader } from "react-spinners";
import dynamic from "next/dynamic";

const GridLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.GridLoader),
  {
    ssr: false,
  }
);
// 비동기적 import
// ssr 을 사용하기 때문에 서버에서 초기 html 을 만들어 클라이언트에게 전달하는데,
// 클라이언트에서 애플리케이션이 마운트되고 초기화 될 때 다시 렌더링된다. 이 때 React 자체는 CSR 을 수행하며 클라이언트에서 재생성된 html과 서버에서 생성된 html을 비교하는데
// 사용된 스타일이 서로 다르기 때문에 발생하는 에러를 import 자체를 ssr : false 처리함으로써, 서버에서 완성된 채로 (스태틱하게 받아오지 않게 되고)
// 이로인해 클라이언트가 가지고 있는 스타일과 서버가 가지고 있는 스타일이 일치하게 됨

type Props = {
  color?: string;
};
export default function GirdSpinner({ color = "red" }: Props) {
  return <GridLoader color={color} />;
}
