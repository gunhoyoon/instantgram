import { NextResponse } from "next/server";

type Props = {
  params: {
    slug: string;
  };
};

export async function GET({ params: slug }: Props) {
  console.log(slug);
  return NextResponse.json(`${slug} 입니다`);
}
