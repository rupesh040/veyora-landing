import Hero from "@/src/components/Hero";
import AboutSection from "@/src/components/AboutSection";
import Services from "@/src/components/Services";
import ProcessSection from "@/src/components/ProcessSection";
import OurTeam from "@/src/components/OurTeam";
import Testimonials from "@/src/components/Testimonials";
import ContactSection from "@/src/components/ContactSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <AboutSection />
      <Services />
      <ProcessSection />
      <OurTeam />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
