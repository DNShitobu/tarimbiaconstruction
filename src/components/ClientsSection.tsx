import { CLIENTS } from "@/lib/constants";

export default function ClientsSection() {
  return (
    <section className="py-12 bg-white border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-gray-400 uppercase tracking-wider mb-8">Our Clients</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {CLIENTS.map((client, index) => (
            <div
              key={index}
              className="bg-gray-100 px-6 py-3 rounded-lg text-gray-500 font-semibold hover:bg-accent hover:text-white transition-colors"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
