import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
      // GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET 의 값이 undefined 일 수 있으므로 , 빈 문자열도 같이 처리
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
  },
});
// 어떤 로그인을 허용할건지  : 현재는 구글만 허용하기 때문에 그에 대한 명시만 해줬음
// 이제 클라이언트 단에서 세션 프로바이더를 사용하게만 해주면 된다 = 어플리케이션이 세션 프로바이더를 사용하게 해줘야함
// 그러면  useSession 이라는 훅에서 필요한 useSesstion , sign in , sign out 이런 것들에 접근하고 사용할 수 있게 됨
// next auth 라는 라이브러리가 useSesstion 이런 간편한 훅을 제공해주고 const {data : sesstion} = useSesstion(); 현재 로그인한 사용자가 있는지 없는지를 판단할 수 있게 된다.
// session provider 로 우리 어플리케이션을 한 단계 감쌌기 때문에 그 안에 있는 자식들은 useSesstion 이라는 함수를 통해 해당 데이터(정보)를 제공 받을 수 있게 된다.

export { handler as GET, handler as POST };
// src / app / api / auth / [...nextauth] / route.ts
// api/auth/*(sign in , callback , sign out) 과 같은 요청이 온다면 nextjs 라이브러리가 알아서 자체적으로 처리를 해줌
// 아 그래서 다이나믹 라우터 [...nextauth] 를 사용했고 이걸 통해 요청을 할 때 sign in 이든 out 이든 callback 까지 다이나믹하게 처리가 가능한거임
// 그 함수의 기능은 next auth 혹은 next js 안에서 내장이 되어있는건가

// 로그인을 요청하게 되면,
// 토큰을 발급할 아이디 비번을 미리 등록하는건가 ?
// 지금 여기서 처리하는건 클라이언트한테 로그인 요청을 받을 때,
// 클라이언트 상에서 clientid 와 password 를 같이 넘겨줌
// 그러면 로그인 페이지를 제공해주고 사용자가 id pw를 넣어주면 해당 정보를 확인해서 authorizetion code를 발급해주고
// 아 해당 코드 + client ID , password 를 가지고 토큰 요청 // 서버에서 발급 + db에 이런 유저가 있다는 토큰 저장 세션 아이디를 가지고 해당 토큰이 유효한지 계속 비교할거임
// 로그인 성공 > 사용자가 로그인 이후의 서비스 요청 > TOKEN으로 api
