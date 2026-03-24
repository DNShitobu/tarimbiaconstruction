"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, TAGLINE } from "@/lib/constants";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <>
      <header className="bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/tarimbia logo.jpg"
                alt="Tarimbia Construction Logo"
                width={60}
                height={60}
                className="mr-3 rounded-lg"
                style={{ objectFit: 'contain' }}
                priority
              />
              <div className="text-white">
                <span className="font-bold text-lg">TARIMBIA</span>
                <span className="block text-xs text-accent">Construction Ltd</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
              {NAV_LINKS.map((link) => (
                <div key={link.href} className="relative group">
                  {link.submenu ? (
                    <button
                      onClick={() => handleSubmenuToggle(link.label)}
                      className="flex items-center text-white hover:text-accent transition-colors px-4 py-6 text-sm font-medium"
                    >
                      {link.label}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-white hover:text-accent transition-colors px-4 py-6 text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  )}
                  {link.submenu && openSubmenu === link.label && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[220px] z-50">
                      {link.submenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-primary hover:bg-gray-100 transition-colors text-sm"
                          onClick={() => setOpenSubmenu(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <button
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <div className="bg-primary-dark">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <p className="text-accent italic text-sm">
                {TAGLINE}
              </p>
              <Link href="/contact" className="btn-primary text-sm">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.href}>
                    {link.submenu ? (
                      <>
                        <button
                          onClick={() => handleSubmenuToggle(link.label)}
                          className="flex items-center justify-between w-full text-primary hover:text-accent py-3 border-b border-gray-100"
                        >
                          {link.label}
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        {openSubmenu === link.label && (
                          <div className="pl-4 border-l-2 border-accent bg-gray-50">
                            {link.submenu.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block py-2 text-gray-600 hover:text-accent text-sm"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setOpenSubmenu(null);
                                }}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className="block py-3 text-primary hover:text-accent border-b border-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
