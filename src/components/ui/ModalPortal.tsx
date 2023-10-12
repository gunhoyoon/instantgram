import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
};
export default function ModalPortal({ children }: Props) {
  if (typeof window === "undefined") {
    return null;
  }
  // 위 컴포넌트가 브라우저에서 동작하는것이 아니라면,
  //  해당 코드가 서버에서 동작하게 되면 null 을 리턴함, 즉 서버에서 렌더링 되는 것을 막곘음.
  const node = document.getElementById("portal") as Element;
  return ReactDOM.createPortal(children, node);
}

// layout 에 id가 portal 인 node 를 하나 만들었고,
// 그 안에 들어갈 children 들을 portal div 요소에 연결해줌
// children 안에 들어가는 애들이 portal 이 되는거고
