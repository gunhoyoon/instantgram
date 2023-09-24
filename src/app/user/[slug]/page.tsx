import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function UserProfilePage({ params: { slug } }: Props) {
  return <div>{slug}</div>;
}
