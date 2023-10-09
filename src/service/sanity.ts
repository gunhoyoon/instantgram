import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-05-03",
  token: process.env.SANITY_SECRET_TOKEN,
});
// 여기서 client 를 생성하지만, 다른 파일에서 import 한 채 원하는 기능들을 사용할거고, 이 한 곳에서 모든 서비스 로직을 작성해가진 않을겅밈
// sanity의 클라이언트를 생성, 클라이언트를 이용해 Sanity의 데이터를 읽고 쓸 수 있음
// client를 사용하여 Sanity의 데이터베이스에 데이터를 읽거나 쓸 수 있음.
// 예를 들어, client.fetch(query)를 사용하여 데이터를 가져올 수 있음. 데이터를 읽어올 땐 fetch 라는 걸 사용해야함

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}

// image 에 대한 값을 정의할 때 photo자체를 그대로 할당해서 우리가 원하는 url 의 형태로 오지 않음.
// photo.url  이런식으로 image 를 정의할수도 있지만 그렇게되면 이미지가 최적화되지 않은채로 오기 때문에,
// sanity에서 추천한 방식으로 최적화 한 뒤, url사용
