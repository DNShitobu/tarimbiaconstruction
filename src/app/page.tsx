import HeroSlider from "@/components/HeroSlider";
import WhoWeAre from "@/components/WhoWeAre";
import ServicesGrid from "@/components/ServicesGrid";
import ProjectsGallery from "@/components/ProjectsGallery";
import ClientsSection from "@/components/ClientsSection";
import { TAGLINE } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <WhoWeAre />
      <ServicesGrid />
      <ProjectsGallery />
      <ClientsSection />
      
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-accent mb-8">{TAGLINE}</p>
          <a
            href="/contact"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded transition-colors"
          >
            Get In Touch Today
          </a>
        </div>
      </section>
    </>
  );
}
