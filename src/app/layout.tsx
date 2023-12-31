import Header from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";
import LoginContext from "@/context/LoginContext";
import DataContext from "@/context/DataContext";
import StoreContext from "@/context/StoreContext";


const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Instantgram",
    template: "Instantgram | %s",
  },
  description: "Instantgram Photos",
};
// SEO 관련

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full bg-neutral-50 overflow-auto">
        <AuthContext>
          {/* 사용자의 정보를 가지고 있는 Context 를 씌워줬으니, 하위에 있는 자식 컴포넌트들에서 authcontext의 데이터를 사용할 수 있음 */}
          {/* AuthContext 는 next-auth에서 제공하는 sesstion provider 를 사용하고 있음 */}
          <header className="order-first sticky top-0 bg-white z-10 border-b">
            <div className="max-w-screen-xl mx-auto">
              <Header />
            </div>
          </header>
          <main className="w-full flex max-w-screen-xl mx-auto justify-center">
            <StoreContext>
              <DataContext>
                <LoginContext>
                  <SWRConfigContext>{children}</SWRConfigContext>
                </LoginContext>
              </DataContext>
            </StoreContext>
          </main>
          {/* authcontext 내부는 전부 클라이언트 */}
        </AuthContext>
        <div id="portal"></div>
      </body>
    </html>
  );
}
// layout 에서 props 으로 전달함 , 각각 a > b > c 를 거치고 c 에서 업데이트
