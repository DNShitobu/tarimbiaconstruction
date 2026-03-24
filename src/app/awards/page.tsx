import Image from "next/image";
import Link from "next/link";
import { Award, Trophy } from "lucide-react";
import ProjectsGallery from "@/components/ProjectsGallery";
import ClientsSection from "@/components/ClientsSection";
import { AWARDS } from "@/lib/constants";

export default function AwardsPage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Awards</h1>
          <p className="text-accent text-xl">Quality, Speed and Professionalism</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400&q=80",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
              "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80",
              "https://images.unsplash.com/photo-1560523159-6b681a1e1852?w=400&q=80",
            ].map((src, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={src}
                  alt={`Award ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="section-title mb-8">Recognition & Certifications</h2>
            <div className="space-y-8">
              {AWARDS.map((award, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-accent">
                  <div className="flex items-center mb-4">
                    <Trophy className="w-8 h-8 text-accent mr-3" />
                    <h3 className="text-xl font-bold text-primary">{award.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {award.items.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <Award className="w-4 h-4 text-accent mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProjectsGallery />
      <ClientsSection />
    </>
  );
}
