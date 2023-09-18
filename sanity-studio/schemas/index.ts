// import pet from './pet'
import user from './user'
import post from './post'
export const schemaTypes = [user, post]

// 관계형 데이터 베이스에서 데이터의 중복을 피하고, 신뢰성을 올라가도록 기초 설계를 하는데 해당 형태와 비슷함
// sechmas =  컨텐츠에 대한 타입을 정의하는 곳
// UI를 만들어줄건데 스키마로부터 자동으로 admin 창을 만들어줄거임
// 관계가 없는 데이터 베이스 타입을 가져간다. JSON과 같은 형태로 제공해줌
// 이렇게 만든 스키마는 _type 이라는 속성을 통해 나타내줌
// 데이터의 구조를 정의하면 자동으로 sanity studio 에 동기화, (틀만 잡고 해당 스튜디오 안에서 데이터를 추가하는 식으로 진행할 수 있음)
// 지금까지 sanity-studio localhost:3333 으로 열고 schemas 안에 post,user 각각의 파일을 만들고 해당 데이터가 가지고 있을 모델 설정
// localhost:3333 상에서 sanity-studio가 동작하긴 하지만 실제 데이터는 Content lake라고 하는 클라우드에 저장이 되어있음 (서버에 존재)

// 그럼 이제 데이터 베이스의 역할을 하는 것은 알겠는데 백엔드가 db와 소통하고 받아온 데이터를 프론트가 요청할 때 줄 수 있는 형식은 어떻게 진행되는것인가. .
