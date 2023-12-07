import NewPost from "@/components/NewPost";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  // serverSession 을 사용할 때 authOptions 을 전달해줘야함
  console.log(session, "session");
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  return <NewPost user={user} />;
}
