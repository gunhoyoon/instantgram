import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-05-03",
  token: process.env.SANITY_SECRET_TOKEN,
});
// sanity의 클라이언트를 생성, 클라이언트를 이용해 Sanity의 데이터를 읽고 쓸 수 있음
// client를 사용하여 Sanity의 데이터베이스에 데이터를 읽거나 쓸 수 있습니다.
// 예를 들어, client.fetch(query)를 사용하여 데이터를 가져올 수 있습니다. 데이터를 읽어올 땐 fetch 라는 걸 사용해야함
