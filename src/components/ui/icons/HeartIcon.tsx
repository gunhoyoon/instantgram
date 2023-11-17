import { AiOutlineHeart } from "react-icons/ai";

type Props = {
  className?: string;
};
export default function HeartIcon({ className }: Props) {
  return <AiOutlineHeart className={className || "h-7 w-7"} />;
}
