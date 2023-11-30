export default {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Photo',
      name: 'photo',
      type: 'image',
    },
    {
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}], // user ID 를 배열로 가지고 있음
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [
        {
          title: 'Comment',
          name: 'comment',
          type: 'document',
          fields: [
            {
              title: 'Author',
              name: 'author',
              type: 'reference',
              to: [
                {
                  type: 'user',
                },
              ],
            },
            {
              title: 'comment',
              name: 'comment',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    // 프리뷰 타이틀을 코멘트의 0번째 인덱스의 comment 로 할거임. 본인이 작성한 글의 첫번째 댓글을 본인이 작성하는 것으로 되어있었으니까
    select: {
      title: 'comments.0.comment',
      authorName: 'author.name',
      authorUsermame: 'author.username',
      media: 'photo',
    },
    //  해당 인자인 selection은 위에 작성한 select가 될 것임, 해당 데이터를 사용자의 마음대로 가공하려면 prepare 사용
    //  select: {
    //   title: 'comments.0.comment',
    //   subtitle: 'author.name',
    //   media: 'photo',
    // },
    prepare(selection) {
      const {title, authorName, authorUsermame, media} = selection
      // authorName : 실제이름 , authorUsermame : id
      return {
        title,
        subtitle: `by ${authorName} (${authorUsermame})`,
        media,
      }
    },
  },
}
