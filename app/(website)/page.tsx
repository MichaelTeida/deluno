import HeroSection from "./_components/HeroSection";
import AppsSection from "./_components/AppsSection";
import FeaturesSection from "./_components/FeaturesSection";
import TechStackSection from "./_components/TechStackSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import PricingSection from "./_components/PricingSection";
import CTASection from "./_components/CTASection";
import ScrollProgress from "./_components/ScrollProgress";

export default function HomePage() {
    return (
        <>
            <ScrollProgress />
            <HeroSection />
            <AppsSection />
            <FeaturesSection />
            <TechStackSection />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
        </>
    );
}
