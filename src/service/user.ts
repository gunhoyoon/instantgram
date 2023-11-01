import { SearchUser } from "@/model/User";
import { client } from "./sanity";

type OAuthUser = {
  id: string;
  name: string;
  username: string;
  email?: string | null;
  image?: string | null;
};

export async function addUser({ name, username, id, image, email }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}
// 중복되지 않는 유저 추가 , 유저가 가지고 있는 키와 값
export async function getUserByUsername(username: string) {
  // example
  // const posts = await client.fetch('*[_type == "post"]')
  // ('*[_type == "post"]') 원하는 데이터를 가져올 때 사용하는 이 텍스트가 쿼리언어임
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id" : _id,
      following[]->{username, image},
      followers[]->{username, image},
      "bookmarks":bookmarks[]-> id
    }`
  );
}

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}*") || (username match "${keyword}*")`
    : "";
  return client
    .fetch(
      `*[_type == "user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers),
    }`
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type=="post" && author->username == "${username}"])
    }`
      // 보통 posts 와 같은 데이터를 요청할 때 user에 대한 정보하나 , 해당 user가 가지고 있는 post 에 관한 요청하나. 총 2개의 요청을 보내지만,
      // 위와 같이 조인 쿼리를 사용할 수 있는 부분을 확인한다면 요청을 줄이고 유용하게 사용할 수 있음
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}
