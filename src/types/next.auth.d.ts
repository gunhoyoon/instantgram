import NextAuth, { DefaultSession } from "next-auth";
// 기존 next auth 에서 제공하는 session 의 타입에는 username 이라는 건 없음, 그래서 추가해줘야함
declare module "next-auth" {
  interface Session {
    user: {
      username: string;
    } & DefaultSession["user"];
    // user는 기존 defaultsession에 있는 유저 타입을 그대로 가져가면서, username을 추가해주겠다.
  }
}

// 기존 DefaultSession type
// export interface DefaultSession {
//   user?: {
//     name?: string | null
//     email?: string | null
//     image?: string | null
//   }
//   expires: ISODateString
// }

// const user: ({
//   username: string;
// } & {
//   name?: string | null | undefined;
//   email?: string | null | undefined;
//   image?: string | null | undefined;
// }) | undefined
// 이렇게 정의됨
