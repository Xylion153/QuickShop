import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { policies } from "@/data/site";

export const metadata: Metadata = { title: "Terms of service" };

export default function Terms() {
  return <PolicyPage title="Terms of service" text={policies.terms} field="terms" />;
}
