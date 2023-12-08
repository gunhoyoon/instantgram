import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthUser } from "@/model/User";
import { NextAuthOptions, getServerSession } from "next-auth";

export default async function getMyServerSessionData(
  authOption: NextAuthOptions
) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const data: AuthUser = {
    id: user?.id || "",
    username: user?.username.split("@")[0] || "",
    name: user?.name || "",
    image: user?.image || "",
    email: user?.email || "",
  };

  return { data, session };
}
//  username 추가한 뒤에 불러왔는데 왜 안들어오는거임?
