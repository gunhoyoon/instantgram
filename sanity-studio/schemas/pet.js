export default {
  name: 'pet', // 객체 안에 해당 데이터의 이름은 pet 이고
  type: 'document', // 타입은 document(문서)이고,
  title: 'Pet', // 이걸 sanity studio 에서 보여줄 땐 Pet 이란 이름으로 나타내줄거임
  fields: [
    // pet은 어떤 데이터 구조로 이루어져 있냐면 .. .... ~ 과 같은 구조
    // 해당 필드는 하나의 필드밖에 없음, 해당 배열안에 여러개의 구조를 가지고 있으면 돼
    {
      name: 'name', // 해당 필드의 이름
      type: 'string', // 타입은 스트링
      title: 'Name', // 관리자 콘솔인 sanity studio 에서 보여줄 이름은 Name 으로 할거임
    },
  ],
}

// 이렇게 선언한 데이터를 사용하는 방법은 index.ts에 import 하고 schemaTypes 배열안에 추가해주면 됨
// 이렇게 하면 content lake에 동기화가 된다.
// 그리고 sanity studio 에 데이터를 업데이트한다면 그 역시도 content lake에 동기화 된다.
