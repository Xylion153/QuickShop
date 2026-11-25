import type { Metadata } from "next";
import Listing from "@/components/Listing";
import { activeProducts } from "@/data/catalog";

export const metadata: Metadata = { title: "Shop all" };

export default function Shop() {
  return <Listing title="Shop all" intro="Everything in stock right now, newest first." current={null} products={activeProducts()} />;
}
