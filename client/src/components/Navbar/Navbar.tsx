import { Link, useLocation } from "wouter";
import { Menu, X, DoorOpen } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/what-we-solve", label: t('navbar.what_we_solve') },
    { href: "/products", label: t('navbar.products') },
    { href: "/process", label: t('navbar.process') },
    { href: "/contact", label: t('navbar.contact') },
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
                className={`transition-all duration-300 font-bold text-sm px-5 py-2.5 rounded-full ${
                  location === link.href 
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:scale-105" 
                    : "text-foreground/70 hover:text-foreground hover:bg-accent/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Dashboard Icon - Always visible, redirects to login if not authenticated */}
            <Link
              href={isAuthenticated ? "/dashboard" : "/login"}
              className="ml-2 p-2.5 rounded-lg hover:bg-accent/10 transition-all duration-300 relative group"
              title={isAuthenticated ? "Dashboard" : "Login"}
            >
              <DoorOpen 
                className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" 
              />
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 dark:bg-card/95 border-t border-border backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 shadow-inner">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-colors text-lg ${
                    location === link.href 
                      ? "bg-accent/10 text-primary font-bold border-l-4 border-accent" 
                      : "text-foreground/80 hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Dashboard Link - Always visible in mobile */}
              <Link
                href={isAuthenticated ? "/dashboard" : "/login"}
                onClick={() => handleNav(isAuthenticated ? "/dashboard" : "/login")}
                className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-colors text-lg ${
                  location === "/dashboard" || location === "/login"
                    ? "bg-accent/10 text-primary font-bold border-l-4 border-accent"
                    : "text-foreground/80 hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <DoorOpen className="w-5 h-5" />
                  {isAuthenticated ? "Dashboard" : "Login"}
                </div>
              </Link>
              
              <div className="pt-4 mt-4 border-t border-border/50">
                <Link 
                  href="/contact"
                  onClick={() => handleNav("/contact")}
                >
                  <button className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-bold shadow-lg shadow-accent/20 active:scale-[0.98] transition-all text-center text-lg touch-manipulation">
                   {t('hero.cta_audit')}
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
