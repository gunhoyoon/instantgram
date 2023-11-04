import { SimplePost } from "@/model/Post";
import { client, urlFor } from "./sanity";

const simplePostProjection = `
...,
"username" : author->username,
"userImage" : author->image,
"likes" : likes[]->username,
"image" : photo,
"text" : comments[0].comment,
"comments" : count(comments),
"id": _id,
"createdAt" : _createdAt
`;

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author-> username == "${username}" 
        || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
        | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(mapPosts);
}

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "username" : author->username,
      "userImage" : author->image,
      "image" : photo,
      "likes" : likes[]->username,
      comments[]{comment, "username": author->username, "image" : author->image},
      "id":_id,
      "createdAt" :_createdAt
      }`
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`
    )
    .then(mapPosts);
}
export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && username=="${username}"].bookmarks[]._ref ]
    | order(_createdAt desc){
      ${simplePostProjection}
    }`
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    image: urlFor(post.image),
  }));
}

// 플래트닝  / post.author.username  -> post.username 으로 할 수 있게 해줌
// 중첩된 객체를 단일 수준의 객체로 만들어줌 -> 문법이 객체 접근자 .과 같음

// join query
// 타입이 post 인거 뿐만 아니라 사용자 -> author가 로그인 한 사람(username) 에 해당 되는 사람인 것.
// post를 작성한 사람들의 아이디가 타입이 유저이고, 로그인 한 사람의 팔로잉한 배열에 있는 id를 가지고 오고 싶어 + 결국 해당 id들의 포스트도 가지고 오고 싶은거임.
// 요약 => 내 게시물 + 내가 팔로잉한 사람들 게시물 가져오고 싶음
// SimplePost 를 위한 데이터 요청
