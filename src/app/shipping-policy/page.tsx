import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { policies, site } from "@/data/site";

export const metadata: Metadata = { title: "Shipping policy" };

export default function Shipping() {
  return (
    <PolicyPage title="Shipping policy" text={policies.shipping} field="shipping">
      <p><strong>Ships from:</strong> {site.shipsFrom}</p>
      {site.shippingDestinations && <p><strong>Ships to:</strong> {site.shippingDestinations}</p>}
      {site.processingTime && <p><strong>Processing time:</strong> {site.processingTime}</p>}
    </PolicyPage>
  );
}
