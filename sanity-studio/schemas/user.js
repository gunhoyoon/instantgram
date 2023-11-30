// export default {
//   title: 'User',
//   name: 'user',
//   type: 'document',
//   fields: [
//     {
//       title: 'Username',
//       name: 'username',
//       type: 'string',
//     },
//     // 기본 input
//     {
//       title: 'Name',
//       name: 'name',
//       type: 'string',
//     },

//     {
//       title: 'Email',
//       name: 'email',
//       type: 'string',
//     },

//     {
//       title: 'Image',
//       name: 'image',
//       type: 'string',
//       // path  url을 받을태니 string
//     },
//     {
//       title: 'Following',
//       name: 'following',
//       type: 'array',
//       // 배열의 타입은 array 로 정의되어야한다.
//       of: [
//         // 배열의 아이템으로 허용되는 유형 정의
//         {
//           type: 'reference',
//           to: [{type: 'user'}],
//         },
//       ],
//       validation: (Rule) => Rule.unique(), // 배열의 모든 값은 고유해야 한다는 함수
//     },
//     //
//     {
//       title: 'Followers',
//       name: 'followers',
//       type: 'array',
//       of: [
//         {
//           type: 'reference',
//           to: [{type: 'user'}],
//         },
//       ],
//       validation: (Rule) => Rule.unique(),
//     },
//     {
//       title: 'Bookmarks',
//       name: 'bookmarks',
//       type: 'array',
//       of: [
//         {
//           type: 'reference',
//           to: [{type: 'post'}], // Post ID 를 배열로 가지고 있음
//         },
//       ],
//       validation: (Rule) => Rule.unique(),
//     },
//   ],
//   preview: {
//     select: {
//       title: 'name',
//       subtitle: 'username',
//     },
//   },
// }

// // 각각의 정의한 파일에서 studio 에서 볼 preview 작성
export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'Username',
      name: 'username',
      type: 'string',
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'string',
    },
    {
      title: 'Following',
      name: 'following',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Followers',
      name: 'followers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Bookmarks',
      name: 'bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
}
