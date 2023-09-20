"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ColorButton from "./ui/ColorButton";
import HomeIcon from "./ui/icons/HomeIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Header() {
  // const [path, setPath] = useState(window.location.pathname);
  const pathname = usePathname();

  const { data: session } = useSession();
  console.log(session?.user);
  // session?.user :  {name: '윤건호',
  //  email: 'rkdus5964@gmail.com',
  //  image: 'https://lh3.googleusercontent.com/a/ACg8ocKDaBEu-HAA0f5PyDv49K_Z1k4d3TWCxEF9AbJ_TGwJ=s96-c'}
  const menu = [
    {
      href: "/",
      icon: <HomeIcon />,
      clickedIcon: <HomeFillIcon />,
    },
    {
      href: "/search",
      icon: <SearchIcon />,
      clickedIcon: <SearchFillIcon />,
    },
    {
      href: "/new",
      icon: <NewIcon />,
      clickedIcon: <NewFillIcon />,
    },
  ];
  return (
    <div className="flex justify-between items-center px-6">
      <Link href={"/"}>
        <h1 className="text-3xl font-bold">Instantgram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4 ">
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {pathname === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
          {session?.user ? (
            <ColorButton
              text="Sign out"
              onClick={() => {
                signOut();
              }}
              // 세션 삭제
            />
          ) : (
            <ColorButton
              text="Sign in"
              onClick={() => {
                signIn();
              }}
            />
          )}
        </ul>
      </nav>
    </div>
  );
}

// icon이 변경되거나, 혹은 이곳 저곳에서 재사용될 수 있으므로 그에 대비해서 컴포넌트화 시켜 재사용성을 올려줄 수 있음

// 현재 경로를 반환할 때 내가 link에 설정해둔 값으로 set 함수가 업데이트 되니까 / 를 제외한 search , new 과 같은 값이 들어오는데
// window.loaction.pathname 을 쓰면 / 이 붙은 값이 넘어와서 둘 다 처리 해줌

// [next-auth][warn][NEXTAUTH_URL]
// [next-auth][warn][NO_SECRET]
//  NEXTAUTH 와 SECRET 에 대한 정보를 전달해줘야함
// NEXTAUTH url 배포할 때 url
// NEXTAUTH secret 은 토큰을 발급 받을 때 SECRET
// NEXTAUTH secret https://www.strongpasswordgenerator.org/ 여기서 발급 받음
