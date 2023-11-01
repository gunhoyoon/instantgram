export type AuthUser = {
  name: string;
  username: string;
  image: string;
  email?: string;
};

export type SimpleUser = Pick<AuthUser, "username" | "image">;
// SimpleUser의 타입은 User 안에 username 이랑 image 속성만 픽 할거야

export type HomeUser = AuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};
// 정의해놓은 타입 활용 + 나머지 속성들 타입 추가

export type SearchUser = AuthUser & {
  following: number;
  followers: number;
};

// rename symbol : 을 통해 이름 변경 시 해당 식별자의 이름을 일괄적으로 변경함

export type ProfileUser = SearchUser & {
  posts: number;
};
