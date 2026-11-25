import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { policies } from "@/data/site";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Privacy() {
  return <PolicyPage title="Privacy policy" text={policies.privacy} field="privacy" />;
}
