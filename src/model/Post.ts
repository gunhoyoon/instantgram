export type Comment = {
  comment: string;
  username: string;
  image?: string | undefined;
};
// 코멘트에 필요한 데이터를 또 별개의 인터페이스 사용

export type SimplePost = Omit<FullPost, "comments"> & {
  // Omit = 특정 타입(FullPost)에서 지정된 타입(comments)을 제거
  comments: number;
};
// 게시물의 상세 정보를 보기전 리스트 페이지에서 사용될 타입
// 근데 그러면 likes 도 뺴야하는거 아닌가 ??
// 해당 타입은 포스트에서 상세 페이지 전에 리스트를 보여줄 때 comment가 몇개있는지에 대한 값인듯
// SimplePost 타입에선 comments 를 number 타입으로 대체할거야

export type FullPost = {
  id: string;
  username: string;
  userImage: string;
  image: string;
  text: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
};

// author
// :
// {_ref: 'bd5ece56-03e3-418b-9acb-74cd9d36b8a7' _type: 'reference'}
// comments
// :
// 1
// createdAt
// :
// "2023-09-17T12:07:35Z"
// id
// :
// "9ff0b6b0-a6ea-4132-8227-7ea03bf2e946"
// image
// :
// asset
// :
// {_ref: 'image-81b08237feaf90821934d29e447bf7fa36b78fb8-1512x1512-jpg', _type: 'reference'}
// _type
// :
// "image"
// [[Prototype]]
// :
// Object
// likes
// :
// [null]
// photo
// :
// {_type: 'image', asset: {…}}
// text
// :
// "장깡만 등 좀 긁꼬,,"
// userImage
// :
// "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
// username
// :
// "yunman"
// _createdAt
// :
// "2023-09-17T12:07:35Z"
// _id
// :
// "9ff0b6b0-a6ea-4132-8227-7ea03bf2e946"
// _rev
// :
// "eIKm0GQMLmdL5H9DEEIAzO"
// _type
// :
// "post"
// _updatedAt
// :
// "2023-09-17T12:07:35Z"
