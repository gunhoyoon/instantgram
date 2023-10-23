export type User = {
  name: string;
  username: string;
  image: string;
  email?: string;
};

export type SimpleUser = Pick<User, "username" | "image">;
// SimpleUser의 타입은 User 안에 username 이랑 image 속성만 픽 할거야

export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};
// 정의해놓은 타입 활용 + 나머지 속성들 타입 추가

export type UserSearchResult = User & {
  following: number;
  followers: number;
};
