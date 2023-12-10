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
import Avatar from "./Avatar";
export default function Header() {
  // const [path, setPath] = useState(window.location.pathname);
  const pathname = usePathname();
  const { data: session } = useSession();

  // user: {
  //   name: string
  //   email: string
  //   image: string
  // }, 와 같은 저옵를 담고 있고, 민감한 정보들은 담고 있지 않음 , 'client api'

  const user = session?.user;
  // session?.user :  {name: '윤건호',
  //  email: 'rkdus5964@gmail.com',
  //  image: 'https://lh3.googleusercontent.com/a/ACg8ocKDaBEu-HAA0f5PyDv49K_Z1k4d3TWCxEF9AbJ_TGwJ=s96-c'}
  const menu = [
    {
      href: "/",
      icon: <HomeIcon />,
      clickedIcon: <HomeFillIcon />,
      title: "Home",
    },
    {
      href: "/search",
      icon: <SearchIcon />,
      clickedIcon: <SearchFillIcon />,
      title: "Search users",
    },
    {
      href: "/new",
      icon: <NewIcon />,
      clickedIcon: <NewFillIcon />,
      title: "New post",
    },
  ];
  return (
    <div className="flex justify-between items-center px-6">
      <Link href={"/"} aria-label="Home">
        <h1 className="text-3xl font-bold">Instantgram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4 ">
          {menu.map(({ href, clickedIcon, title, icon }) => (
            <li key={href} aria-label={title}>
              <Link href={href}>{pathname === href ? clickedIcon : icon}</Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size="small" highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
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
          </li>
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

// signin 버튼이 눌리면
// 프로바이더에 구글 로그인을 설정해뒀기 때문에 제공되는 signin , signout 을 통해 접근이 가능한데
// 바로 쓰면 서버에서 가져오기때문에 기존에 context로 씌워둔 컴포넌트 안에 header 컴포넌트를 넣어ㅅ
// 해당 context가 제공해주는 useSession, sign in, sign out 을 사용할 수 있게 됨
// 해당 로그인 버튼을 클릭하면 내부적으로 제공하는 /api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F
// callback url이 서버컴포는트인 signin/page 컴포넌트로 반환될것임(nextjs url에 관한걸 props로 제공해주는것으로 인해)
// 그걸 signin 컴포넌트(커스텀한)에서 callbackUrl과 provdier 정보를 넘겨주는거임
// redirect = 서버에서 시켜줌, calllbackUrl 제공 = 서버

// 버튼 눌리면 , 설정해둔 구글 프로바이더에서 sign할 수 있게해주는데 애초에 이 버튼 자체가
// context에서 전달받은 sign 임. (client 에서 사용할 수 있게)
// 정확히 말하면 session provider에서 전달해주는거를 받아서 sign in 하고 여기서 넘어갈 때 next auth에서 callbackurl 도 전달
// 해당 callbackurl에 관한 정보를 nextjs에서 제공하는 searchParams 를 통해 받아와서 signin에 객체형태로 넘겨줌,
