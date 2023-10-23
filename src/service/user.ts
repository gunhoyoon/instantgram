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
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : "";
  return client.fetch(
    `*[_type == "user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers),
    }`
  );
}
// 부분 검색도 가능하게
