import type { Metadata } from "next";
import PricingSection from "../_components/PricingSection";
import CTASection from "../_components/CTASection";

export const metadata: Metadata = {
    title: "Pricing",
    description: "Simple, transparent pricing for Deluno. Start free during alpha with full access. No credit card required.",
};

export default function PricingPage() {
    return (
        <div className="pt-20">
            <PricingSection />
            <CTASection />
        </div>
    );
}
