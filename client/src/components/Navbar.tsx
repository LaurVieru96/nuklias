import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "#edge", label: "Our Edge" },
    { href: "#services", label: "Services" },
    { href: "#results", label: "Results" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNav = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="font-display text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg">N</div>
            NUKLIAS
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-foreground/70 hover:text-primary transition-colors font-medium text-sm"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => handleNav("#contact")}
              className="bg-accent text-accent-foreground px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-accent/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Book Strategic Audit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border"
          >
            <div className="px-4 py-4 space-y-4">
              {links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="block w-full text-left py-2 text-foreground/80 hover:text-primary font-medium"
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => handleNav("#contact")}
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-bold shadow-md active:scale-95 transition-transform"
              >
                Book Strategic Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
