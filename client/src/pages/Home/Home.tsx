import { Navbar } from "@/components/Navbar/Navbar";
import { ClientJourney } from "@/components/ClientJourney/ClientJourney";
import { ComparisonSection } from "@/components/ComparisonSection/ComparisonSection";
import { Hero } from "@/components/Hero/Hero";
import { TalentInfrastructureSection } from "@/components/TalentInfrastructureSection/TalentInfrastructureSection";
import { ProductsSection } from "@/components/ProductsSection/ProductsSection";
import { WhyUs } from "@/components/WhyUs/WhyUs";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Client Journey Section */}
      <section className="py-24 bg-background overflow-hidden border-t border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <ClientJourney />
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Talent Infrastructure Section */}
      <TalentInfrastructureSection />

      {/* Products Section */}
      <ProductsSection />

      {/* Why Us Section */}
      <WhyUs />

      {/* Footer */}
      <Footer />
    </div>
  );
}
