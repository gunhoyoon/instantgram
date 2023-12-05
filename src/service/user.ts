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
      "bookmarks":bookmarks[]->_id
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

// export async function getUserForProfile(username: string) {
//   return client
//     .fetch(
//       `*[_type == "user" && username == "${username}"][0]{
//       ...,
//       "id":_id,
//       "following": count(following),
//       "followers": count(followers),
//       "posts": count(*[_type=="post" && author->username == "${username}"])
//     }`

//     )
//     .then((user) => ({
//       ...user,
//       following: user.following ?? 0,
//       followers: user.followers ?? 0,
//       posts: user.posts ?? 0,
//     }));
// }

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{ 
        ..., 
        "id": _id,
        "following": count(following),
        "followers": count(followers),
        "posts": count(*[_type == "post" && author->username == "${username}"])
      }`,
      undefined,
      {
        cache: "no-store",
      }
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId) // patch 를 할 포스트의 id, 그니까 그 아이디가 가지고 있는 포스트의 어떤 속성을 패치(수정)할거임
    .setIfMissing({ bookmarks: [] }) // 만약 북마크 가 없으면 빈 배열로 설정 , 있을 시 무시되는거 같음
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ]) // 추가를 하고자하는 배열의 키는 북마크 이고, 해당 배열의 속성은 이러이러하다
    .commit({ autoGenerateArrayKeys: true }); // 커밋 시 고유의 아이디를 생성해줘
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId) //
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}
// 여기서 서비스 로직이라 함은 상황에 맞는

// export async function follow(myId: string, targetId: string) {
//   return client
//     .transaction() //
//     .patch(myId, (user) =>
//       user
//         .setIfMissing({ following: [] })
//         .append("following", [{ _ref: targetId, _type: "reference" }])
//     )
//     .patch(targetId, (user) =>
//       user
//         .setIfMissing({ followers: [] })
//         .append("followers", [{ _ref: targetId, _type: "reference" }])
//     )
//     .commit({ autoGenerateArrayKeys: true });
// }

// export async function unFollow(myId: string, targetId: string) {
//   return client
//     .transaction() //
//     .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
//     .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
//     .commit({ autoGenerateArrayKeys: true });
// }
export async function follow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _ref: targetId, _type: "reference" }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _ref: myId, _type: "reference" }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
