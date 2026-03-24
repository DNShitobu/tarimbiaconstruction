import Link from "next/link";
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import ClientsSection from "@/components/ClientsSection";
import { CONTACT_INFO } from "@/lib/constants";

const JOB_OPENINGS = [
  {
    title: "Site Engineer",
    location: "Accra, Ghana",
    type: "Full-time",
    salary: "Competitive",
    description: "We are looking for an experienced Site Engineer to supervise construction projects and ensure quality delivery.",
  },
  {
    title: "Project Manager",
    location: "Accra, Ghana",
    type: "Full-time",
    salary: "Competitive",
    description: "Lead and manage construction projects from inception to completion, ensuring timely delivery within budget.",
  },
  {
    title: "Quantity Surveyor",
    location: "Accra, Ghana",
    type: "Full-time",
    salary: "Competitive",
    description: "Prepare costs, budgets, and contracts for construction projects. Manage financial aspects of projects.",
  },
  {
    title: "Safety Officer",
    location: "Accra, Ghana",
    type: "Full-time",
    salary: "Competitive",
    description: "Ensure compliance with safety regulations and implement safety procedures on construction sites.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers</h1>
          <p className="text-accent text-xl">Join Our Team</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="section-title">Why Work With Us?</h2>
            <p className="text-gray-600 mb-6">
              At Tarimbia Construction, we believe in building more than structures - we build careers. Join our team of dedicated professionals and be part of Ghana&apos;s leading construction company.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-primary mb-2">Career Growth</h3>
                <p className="text-gray-600 text-sm">Opportunities for professional development and advancement</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-primary mb-2">Competitive Benefits</h3>
                <p className="text-gray-600 text-sm">Attractive salary packages and health benefits</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-primary mb-2">Dynamic Environment</h3>
                <p className="text-gray-600 text-sm">Work on exciting projects across Ghana</p>
              </div>
            </div>
          </div>

          <h2 className="section-title text-center mb-8">Current Openings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {JOB_OPENINGS.map((job, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-accent"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-primary">{job.title}</h3>
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-block mt-4 text-accent hover:text-accent-dark font-semibold"
                >
                  Apply Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Don&apos;t see the right position?</h3>
          <p className="text-gray-600 mb-6">
            Send your CV and cover letter to us. We&apos;ll keep your profile on file for future opportunities.
          </p>
          <p className="text-gray-600">{CONTACT_INFO.email}</p>
        </div>
      </section>

      <ClientsSection />
    </>
  );
}
