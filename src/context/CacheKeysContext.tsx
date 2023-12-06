import { createContext, useContext } from "react";

type CacheKeysValue = {
  postsKeys: string;
};

export const CacheKeysContext = createContext<CacheKeysValue>({
  postsKeys: "/api/posts",
});

export const useCacheKeys = () => useContext(CacheKeysContext);
// console.log(useCacheKeys, "useCacheKeys");
// 사용하기 편하게 기존에 사용하는쪽에서 useContext + 초기값 임포트해서 불러와주던걸 여기서 처리함
// useCacheKeys 이것만 사용하면 됨
