import Image from "next/image";
import Link from "next/link";
import { Target, Eye, Award, Users } from "lucide-react";
import ProjectsGallery from "@/components/ProjectsGallery";
import ClientsSection from "@/components/ClientsSection";

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Who We Are</h1>
          <p className="text-accent text-xl">Quality, Speed and Professionalism</p>
        </div>
      </section>

      <section id="who-we-are" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">About Tarimbia Construction</h2>
            <p className="text-gray-600 text-lg mb-8">
              Tarimbia Construction Company Limited is a Chartered Building and Civil Engineering wholly owned Ghanaian Limited Liability Construction Company registered in Ghana since 1993.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Our Story</h2>
              <p className="text-gray-600 mb-4">
                As a company, we are committed to improving the quality of life of Ghanaians with the use of appropriate and sustainable infrastructure development solutions delivered in a timely and quality manner.
              </p>
              <p className="text-gray-600 mb-4">
                We cherish professionalism and thus have a pool of some of the most qualified, talented and well trained staff to manage all aspects of any construction project to ensure quality results and timely delivery are achieved.
              </p>
              <p className="text-gray-600 mb-6">
                Tarimbia Construction has been commended on many occasions for the efficient and timely execution of its projects. The company has been successful at winning national and international competitive biddings to undertake major building, water, electrification and civil engineering projects in Ghana.
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                alt="Construction Team"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-accent">
              <div className="flex items-center mb-4">
                <Target className="w-10 h-10 text-accent mr-4" />
                <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                To provide Quick and Quality Civil Engineering, General Building Construction and Merchandising services to Individuals, Private and Public Institutions through qualified professionals to exceed clients&apos; expectations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-primary">
              <div className="flex items-center mb-4">
                <Eye className="w-10 h-10 text-primary mr-4" />
                <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                To be the number one Building Construction, Civil Engineering and Consultancy business with delighted Clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="management" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Executive Director", role: "Chief Executive Officer" },
              { name: "Technical Director", role: "Head of Operations" },
              { name: "Finance Director", role: "Chief Financial Officer" },
            ].map((person, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-300 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-16 h-16 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-primary">{person.name}</h3>
                <p className="text-accent">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsGallery />
      <ClientsSection />
    </>
  );
}
