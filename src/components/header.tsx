"use client";
import Link from "next/link";
import React, { useState } from "react";

import ColorButton from "./ui/ColorButton";
import HomeIcon from "./ui/icons/HomeIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";

export default function Header() {
  const [path, setPath] = useState(window.location.pathname);
  console.log(path);

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
      <Link
        href={"/"}
        onClick={() => {
          setPath("home");
        }}
      >
        <h1 className="text-3xl font-bold">Instantgram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4 ">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => {
                  setPath(item.href);
                }}
              >
                {path === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
          <ColorButton text="Sign in" onClick={() => {}} />
        </ul>
      </nav>
    </div>
  );
}

// icon이 변경되거나, 혹은 이곳 저곳에서 재사용될 수 있으므로 그에 대비해서 컴포넌트화 시켜 재사용성을 올려줄 수 있음

// 현재 경로를 반환할 때 내가 link에 설정해둔 값으로 set 함수가 업데이트 되니까 / 를 제외한 search , new 과 같은 값이 들어오는데
// window.loaction.pathname 을 쓰면 / 이 붙은 값이 넘어와서 둘 다 처리 해줌
