import Link from "next/link";
import Image from "next/image";

export default function WhoWeAre() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">Who We Are</h2>
            <p className="text-gray-600 mb-4">
              Tarimbia Construction Company Limited is a Chartered Building and Civil Engineering wholly owned Ghanaian Limited Liability Construction Company registered in Ghana since 1993.
            </p>
            <p className="text-gray-600 mb-4">
              Committed in the use of appropriate and sustainable infrastructure development solutions delivered in a timely and quality manner.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is to provide quick and quality Civil Engineering, General Building Construction and Merchandising services to Individuals, Private and Public Institutions through qualified professionals to exceed clients&apos; expectations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">
                Learn More
              </Link>
              <Link href="/contact" className="btn-outline">
                Get A Quote
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
              alt="Construction Site"
              width={800}
              height={600}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent text-white p-6 rounded-lg shadow-lg">
              <span className="block text-4xl font-bold">30+</span>
              <span className="text-sm">Years of Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
