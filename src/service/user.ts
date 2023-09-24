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
    follower: [],
    bookmarks: [],
  });
}
