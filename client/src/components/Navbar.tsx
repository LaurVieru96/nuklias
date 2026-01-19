import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/what-we-solve", label: "What We Solve" },
    { href: "/products", label: "Products" },
    { href: "/process", label: "Process" },
    { href: "/contact", label: "Contact Us" },
  ];

  const handleNav = (href: string) => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-card/90 backdrop-blur-md border-b border-border/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="font-display text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">N</div>
            NUKLIAS MARKETING
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleNav(link.href)}
                className={`transition-colors font-medium text-sm ${
                  location === link.href 
                    ? "text-primary font-bold" 
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact"
              className="bg-accent text-accent-foreground px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-accent/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Book Strategic Audit
            </Link>
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
            className="md:hidden bg-white dark:bg-card border-t border-border"
          >
            <div className="px-4 py-4 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`block w-full text-left py-2 font-medium transition-colors ${
                    location === link.href 
                      ? "text-primary font-bold" 
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/contact"
                onClick={() => handleNav("/contact")}
                className="block w-full bg-accent text-accent-foreground py-3 rounded-lg font-bold shadow-md active:scale-95 transition-transform text-center"
              >
                Book Strategic Audit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
