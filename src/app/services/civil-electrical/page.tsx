import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import ProjectsGallery from "@/components/ProjectsGallery";
import ClientsSection from "@/components/ClientsSection";
import { CONTACT_INFO } from "@/lib/constants";

export default function CivilElectricalPage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Civil and Electrical Engineering</h1>
          <p className="text-accent text-xl">Quality, Speed and Professionalism</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-lg mb-8">
              We consider quality delivery as essentially a service rendered to humanity before business. Our expertise in executing projects has increased over the years.
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Civil Engineering Services</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Structural Design and Analysis</li>
                <li>Foundation Engineering</li>
                <li>Bridging and Drainage Systems</li>
                <li>Water and Sanitation Infrastructure</li>
                <li>Site Development and Preparation</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Electrical Engineering Services</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Power Distribution Systems</li>
                <li>Electrical Installation and Wiring</li>
                <li>Lighting Systems Design</li>
                <li>Generator and UPS Systems</li>
                <li>Solar Energy Solutions</li>
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
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      <ProjectsGallery />
      <ClientsSection />
    </>
  );
}
