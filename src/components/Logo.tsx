import { site } from "@/data/site";
import { BoltMark } from "./Icons";

// Placeholder logo: a bolt mark + the shop name. Swap in the owner's real logo when there is one.
export default function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <BoltMark className="h-9 w-9 shrink-0" />
      <span className="headline whitespace-nowrap text-[22px] leading-none">{site.name}</span>
    </span>
  );
}
