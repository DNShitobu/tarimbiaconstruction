import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import ProjectsGallery from "@/components/ProjectsGallery";
import ClientsSection from "@/components/ClientsSection";
import { CONTACT_INFO } from "@/lib/constants";

export default function GlazingWorksPage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Glazing Works</h1>
          <p className="text-accent text-xl">Quality, Speed and Professionalism</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-lg mb-8">
              Our glazing services provide modern, energy-efficient solutions for commercial and residential buildings with professional installation.
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Our Glazing Services</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Curtain Wall Systems</li>
                <li>Window and Door Installation</li>
                <li>Glass Partitions and Railings</li>
                <li>Skylights and Canopies</li>
                <li>Safety Glass Solutions</li>
                <li>Energy-Efficient Double Glazing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">Quick Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-accent mr-3" />
                <span className="text-gray-600">{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-accent mr-3" />
                <span className="text-gray-600">{CONTACT_INFO.phone}</span>
              </div>
            </div>
            <Link href="/contact" className="btn-primary w-full text-center mt-6 block">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <ProjectsGallery />
      <ClientsSection />
    </>
  );
}
