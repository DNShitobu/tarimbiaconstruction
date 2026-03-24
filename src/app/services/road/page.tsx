import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import ProjectsGallery from "@/components/ProjectsGallery";
import ClientsSection from "@/components/ClientsSection";
import { CONTACT_INFO } from "@/lib/constants";

export default function RoadConstructionPage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Road Construction</h1>
          <p className="text-accent text-xl">Quality, Speed and Professionalism</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-lg mb-8">
              Road construction is one of the main stream construction services we provide. The Company has all the requisite expertise and equipment to guarantee high quality roads are constructed.
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Our Road Construction Services</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Highway and Expressway Construction</li>
                <li>Urban Road Development</li>
                <li>Rural Road Projects</li>
                <li>Street and Pathway Construction</li>
                <li>Drainage Systems Installation</li>
                <li>Road Maintenance and Rehabilitation</li>
                <li>Bridge and Flyover Construction</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Our Approach</h2>
              <p className="text-gray-600 mb-4">
                We combine cutting-edge construction technology with years of expertise to deliver road infrastructure that meets international standards. Our commitment to quality ensures that every road we construct is durable, safe, and built to last.
              </p>
              <p className="text-gray-600">
                From initial survey and design to final surfacing, we manage every aspect of road construction with meticulous attention to detail and adherence to project timelines.
              </p>
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
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-accent mr-3" />
                <span className="text-gray-600">{CONTACT_INFO.email}</span>
              </div>
            </div>
            <Link href="/contact" className="btn-primary w-full text-center mt-6 block">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <ProjectsGallery />
      <ClientsSection />
    </>
  );
}
