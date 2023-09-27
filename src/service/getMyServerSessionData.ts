import { User } from "@/model/User";
import { NextAuthOptions, getServerSession } from "next-auth";

export default async function getMyServerSessionData(
  authOption: NextAuthOptions
) {
  const session = await getServerSession(authOption);

  const data: User = {
    username: sess,
  };
  return { data, session };
}
//  username 추가한 뒤에 불러왔는데 왜 안들어오는거임
