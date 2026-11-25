import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="headline mt-2 text-5xl">This item&apos;s gone.</h1>
      <p className="mt-4 text-lg text-muted">It may have sold, or the link is wrong.</p>
      <Link href="/shop" className="btn btn-primary mt-8">Shop what&apos;s in stock</Link>
    </div>
  );
}
