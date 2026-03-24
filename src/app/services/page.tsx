import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServicesGrid from "@/components/ServicesGrid";
import ClientsSection from "@/components/ClientsSection";

export default function ServicesPage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-accent text-xl">Quality, Speed and Professionalism</p>
        </div>
      </section>

      <ServicesGrid />

      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-xl text-accent mb-8">
            Contact us to discuss your specific construction needs
          </p>
          <Link href="/contact" className="btn-primary">
            Request a Quote
          </Link>
        </div>
      </section>

      <ClientsSection />
    </>
  );
}
