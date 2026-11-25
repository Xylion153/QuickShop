import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Listing from "@/components/Listing";
import { categories, getCategory, inCategory } from "@/data/catalog";

export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const c = getCategory((await params).category);
  return c ? { title: c.name, description: c.blurb } : {};
}

export default async function Collection({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  return <Listing title={c.name} intro={c.blurb} current={c.slug} products={inCategory(c.slug)} />;
}
