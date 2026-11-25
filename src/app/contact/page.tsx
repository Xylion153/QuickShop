import type { Metadata } from "next";
import Link from "next/link";
import { Todo } from "@/components/ProductBits";
import { ExternalIcon } from "@/components/Icons";
import { formatPrice, getProduct } from "@/data/catalog";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

// No form or server yet: buyers reach the owner by email, text or eBay. A product page sends ?item=<slug>, which
// prefills the email subject and text so the owner knows which listing it's about.
export default async function Contact({ searchParams }: { searchParams: Promise<{ item?: string | string[] }> }) {
  const slug = (await searchParams).item;
  const item = typeof slug === "string" ? getProduct(slug) : undefined;
  const about = item ? `${item.name} (${formatPrice(item.priceCents)})` : null;
  const subject = about ? `Question about: ${about}` : `Question for ${site.name}`;
  const body = about ? `Hi! I'm interested in ${about}.\n\n` : "";
  const mailto = site.supportEmail ? `mailto:${site.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` : null;
  const sms = site.supportPhone ? `sms:${site.supportPhone.replace(/[^\d+]/g, "")}${about ? `?&body=${encodeURIComponent(`Hi! I'm interested in ${about}.`)}` : ""}` : null;
  const hasAny = mailto || sms || site.ebayStoreUrl;

  return (
    <div className="mx-auto max-w-2xl px-4 pt-8 sm:pt-12">
      <h1 className="headline text-5xl">Contact</h1>
      <p className="mt-3 text-lg text-muted">Questions about an item, shipping or buying? Get in touch.</p>

      {item && (
        <div className="card mt-6 flex items-center gap-4 p-4">
          <img src={item.images[0]} alt="" width={64} height={64} className={`tile-${item.category} h-16 w-16 rounded-lg object-contain`} />
          <div className="min-w-0"><p className="text-sm text-muted">Asking about</p><p className="font-bold">{item.name}</p><p className="text-sm">{formatPrice(item.priceCents)}</p></div>
        </div>
      )}

      <div className="mt-6 grid gap-3">
        {mailto && <a href={mailto} className="btn btn-primary">Email {site.supportEmail}</a>}
        {sms && <a href={sms} className="btn btn-dark">Text {site.supportPhone}</a>}
        {site.ebayStoreUrl && <a href={site.ebayStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Message us on eBay <ExternalIcon /></a>}
      </div>

      {!hasAny && <Todo className="mt-6">at least one way to reach the shop: <code>supportEmail</code>, <code>supportPhone</code> or <code>ebayStoreUrl</code> in <code>src/data/site.ts</code>.</Todo>}

      <dl className="card mt-8 divide-y divide-line">
        <div className="p-4"><dt className="text-sm text-muted">Ships from</dt><dd className="font-semibold">{site.shipsFrom}</dd></div>
        {site.businessAddress && <div className="p-4"><dt className="text-sm text-muted">Address</dt><dd className="font-semibold">{site.businessAddress}</dd></div>}
        {site.shippingDestinations && <div className="p-4"><dt className="text-sm text-muted">Ships to</dt><dd className="font-semibold">{site.shippingDestinations}</dd></div>}
      </dl>
      <p className="mt-6 text-sm text-muted">See also: <Link href="/shipping-policy" className="underline">Shipping</Link> · <Link href="/returns-policy" className="underline">Returns</Link> · <Link href="/conditions" className="underline">Condition guide</Link></p>
    </div>
  );
}
