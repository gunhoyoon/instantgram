import { RiBookMarkLine } from "react-icons/ri";

type Props = {
  className?: string;
};
export default function BookmarkIcon({ className }: Props) {
  return <RiBookMarkLine className={className || "w-7 h-7"} />;
}
