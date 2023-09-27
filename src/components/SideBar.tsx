import React from "react";

import { User } from "@/model/User";
import Avatar from "./Avatar";

// type Props = {
//   user:
//     | ({
//         username: string;
//       } & {
//         name?: string | null | undefined;
//         email?: string | null | undefined;
//         image?: string | null | undefined;
//       })
//     | undefined;
// };
type Props = {
  user: User;
};

export default function SideBar({ user }: Props) {
  // console.log(user?.username, "????");
  return (
    <>
      <div>
        {user?.image && <Avatar image={user?.image} />}
        <p>{user.username}</p>
        <p>{user.name}</p>
      </div>
    </>
  );
}
// AuthContext 를 통해 sessionProvider 를 제공하고 client 컴포넌트를 감싸고 있기 때문에, useSession 으로 세선 정보 접근 가능
// 같은 컴포넌트를 쓰는데 화면이 다르게 어캐함
