import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import ProjectsGallery from "@/components/ProjectsGallery";
import ClientsSection from "@/components/ClientsSection";
import { CONTACT_INFO } from "@/lib/constants";

export default function BuildingConstructionPage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Building Construction</h1>
          <p className="text-accent text-xl">Quality, Speed and Professionalism</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-lg mb-8">
              At Tarimbia Construction, we execute jobs commensurate with our status in the industry. We have undertaken and still continue to execute a myriad of projects dispersed across the country. Institutional buildings, Office complexes, Shopping Malls, Quality roads displayed across Ghana exist to endorse our subscription to quality infrastructural development.
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Commercial Building</h2>
              <p className="text-gray-600 mb-4">
                Tarimbia Construction specializes in the construction of commercial structures, which can include offices, retail spaces, hotels, warehouses, and more. This service involves the entire process from design to completion.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Diverse Commercial Spaces: offices, retail centers, hotels, warehouses</li>
                <li>Architectural Excellence with innovative designs</li>
                <li>Structural Integrity ensuring safety and longevity</li>
                <li>Modern Amenities and Systems integration</li>
                <li>Energy Efficiency and Sustainability practices</li>
                <li>Budget Management with transparent cost estimates</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Residential Building</h2>
              <p className="text-gray-600 mb-4">
                Tarimbia Construction is well-versed in constructing a wide range of residential properties, including single-family homes, multi-unit housing complexes, and other residential developments.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Various Home Types: detached houses, townhouses, apartments</li>
                <li>Customization and Personalization options</li>
                <li>Quality Construction with high-grade materials</li>
                <li>Energy Efficient and Sustainable designs</li>
                <li>Functional Interior Layouts optimizing space usage</li>
                <li>Safety and Security features integration</li>
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
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-accent mr-3" />
                <span className="text-gray-600">{CONTACT_INFO.email}</span>
              </div>
            </div>
            <Link href="/contact" className="btn-primary w-full text-center mt-6 block">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <ProjectsGallery />
      <ClientsSection />
    </>
  );
}
