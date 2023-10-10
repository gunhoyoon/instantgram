import dynamic from "next/dynamic";

const GridLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.GridLoader),
  {
    ssr: false,
  }
);
// 비동기적 import
// 클라이언트에서 렌더리된 스타일과 서버에서 렌더링된 스타일이 일치하지 않을 때 발생.
// 서버 사이드 렌더링을 막음으로써 클라이언트에서 렌더링된 스타일과 서버에서 렌더링된 스타일을 일치시킨다.
type Props = {
  color?: string;
};
export default function GirdSpinner({ color = "red" }: Props) {
  return <GridLoader color={color} />;
}
