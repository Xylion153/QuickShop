import { site } from "@/data/site";

// Thin bar above the header. Only real, checkable facts go here (see site.ebayStats).
export default function AnnouncementBar() {
  const items = [
    `Ships from ${site.shipsFrom}`,
    site.ebayStats && `${site.ebayStats.feedbackPercent} positive feedback on eBay`,
    site.ebayStats && `${site.ebayStats.itemsSold} items sold`,
  ].filter(Boolean) as string[];
  return (
    <div className="bg-ink text-white">
      <ul className="mx-auto flex max-w-6xl items-center justify-center gap-x-5 overflow-hidden px-4 py-2 text-[12.5px] font-medium tracking-wide">
        {items.map((t, i) => (
          <li key={t} className={`whitespace-nowrap ${i > 1 ? "hidden sm:block" : ""}`}>
            {i > 0 && <span aria-hidden="true" className="mr-5 text-white/35">•</span>}{t}
          </li>
        ))}
      </ul>
    </div>
  );
}
