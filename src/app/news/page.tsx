import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import ClientsSection from "@/components/ClientsSection";
import { NEWS } from "@/lib/constants";

export default function NewsPage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
          <p className="text-accent text-xl">Quality, Speed and Professionalism</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {NEWS.map((article, index) => (
              <article
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {article.date}
                  </div>
                  <h2 className="text-xl font-bold text-primary mb-3">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Link
                    href={article.href}
                    className="inline-flex items-center text-accent hover:text-accent-dark font-semibold transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12 text-gray-600">
            <p>More industry news coming soon...</p>
          </div>
        </div>
      </section>

      <ClientsSection />
    </>
  );
}
