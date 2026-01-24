import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Abstract Background Element - Optimized for performance */}
      <div 
        className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-2xl lg:blur-3xl -translate-y-1/2 translate-x-1/4 will-change-transform" 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-7xl will-change-transform"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground border border-accent/30 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_10px_rgba(var(--accent),0.3)]">
              <span className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse" />
              {t('hero.badge')}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display text-primary leading-[1.1] mb-6 tracking-tight">
              {t('hero.title_start')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400">
                {t('hero.title_end')}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 touch-manipulation"
              >
                  {t('hero.cta_audit')}
                  <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
