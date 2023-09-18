"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import { BsPlusSquareFill } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";
export default function Header() {
  // const [path, setPath] = useState("home");
  // console.log(path, "path");
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div className="border-b">
      <div className="flex justify-between mx-20 mt-5 mb-5">
        <Link
          href={"/"}
          // onClick={() => {
          //   setPath("home");
          // }}
        >
          <h1 className="text-4xl font-bold translate-y-[3px]">Instantgram</h1>
        </Link>
        <nav>
          <ul className="flex gap-7 text-4xl items-center">
            <li>
              <Link
                href={"/"}
                // onClick={() => {
                //   setPath("home");
                // }}
              >
                {pathName === "/" ? <AiFillHome /> : <AiOutlineHome />}
              </Link>
            </li>
            <li>
              <Link
                href={"/search"}
                // onClick={() => {
                //   setPath("search");
                // }}
              >
                {pathName === "/search" ? <RiSearchFill /> : <RiSearchLine />}
              </Link>
            </li>
            <li>
              <Link
                href={"/new"}
                // onClick={() => {
                //   setPath("new");
                // }}
              >
                {pathName === "/new" ? <BsPlusSquareFill /> : <BsPlusSquare />}
              </Link>
            </li>
            <li>
              <button className="text-2xl translate-y-[-1px] border-4 border-pink-400 p-2 rounded-lg hover:bg-pink-100">
                Sign in
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
