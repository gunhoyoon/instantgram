import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/model/User";
import { NextAuthOptions, getServerSession } from "next-auth";

export default async function getMyServerSessionData(
  authOption: NextAuthOptions
) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const data: User = {
    username: user?.username.split("@")[0] || "",
    name: user?.name || "",
    image: user?.image || "",
    email: user?.email || "",
  };
  console.log("ㅇㅇ123");
  return { data, session };
}
//  username 추가한 뒤에 불러왔는데 왜 안들어오는거임?
