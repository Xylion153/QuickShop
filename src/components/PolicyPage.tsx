import type { ReactNode } from "react";
import Link from "next/link";
import { Todo } from "./ProductBits";

// A policy page shows the owner's own wording, or a clear "not written yet" placeholder. Never fill in made-up terms.
export default function PolicyPage({ title, text, field, children }: { title: string; text: string | null; field: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-8 sm:pt-12">
      <h1 className="headline text-4xl sm:text-5xl">{title}</h1>
      {children && <div className="mt-6 space-y-3 leading-relaxed">{children}</div>}
      <div className="mt-6 space-y-4 leading-relaxed">
        {text
          ? text.split(/\n\s*\n/).map((para, i) => <p key={i}>{para}</p>)
          : <Todo fallback={<p className="card p-5 text-muted">We&apos;re finishing this page. Questions in the meantime? <Link href="/contact" className="font-semibold text-signal-ink underline">Contact us</Link>.</p>}>the shop&apos;s {title.toLowerCase()} hasn&apos;t been written yet. Add it as <code>policies.{field}</code> in <code>src/data/site.ts</code>.</Todo>}
      </div>
    </div>
  );
}
