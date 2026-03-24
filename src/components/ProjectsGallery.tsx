import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/constants";

export default function ProjectsGallery() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Works</h2>
          <p className="section-subtitle">
            Whether it&apos;s a small renovation or a large-scale construction project, Tarimbia Construction is committed to delivering exceptional results that exceed our clients&apos; expectations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((project, index) => (
            <Link
              key={index}
              href={project.href}
              className="group relative block overflow-hidden rounded-lg"
            >
              <div className="relative h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-sm mb-2 line-clamp-2">{project.title}</h3>
                <span className="inline-flex items-center text-accent text-sm">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/projects" className="btn-outline">
            More Works
          </Link>
        </div>
      </div>
    </section>
  );
}
