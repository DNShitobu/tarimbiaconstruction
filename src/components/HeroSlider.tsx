"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Building & Civil Engineering",
    subtitle: "Service in Ghana",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
  },
  {
    title: "Excellence in Construction",
    subtitle: "Trusted by Government & Private Sector",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
  },
  {
    title: "Quality Road Infrastructure",
    subtitle: "Building Ghana's Future",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=80",
  },
  {
    title: "Commercial & Residential Projects",
    subtitle: "Serving All of Ghana",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-primary/70" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-accent mb-8">{slide.subtitle}</p>
              <Link href="/projects" className="btn-primary">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-accent" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
