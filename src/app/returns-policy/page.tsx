import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { policies } from "@/data/site";

export const metadata: Metadata = { title: "Returns policy" };

export default function Returns() {
  return <PolicyPage title="Returns policy" text={policies.returns} field="returns" />;
}
