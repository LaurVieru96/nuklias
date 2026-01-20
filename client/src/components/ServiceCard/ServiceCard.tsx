import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  features: string[];
  tier: "bronze" | "silver" | "gold";
  delay?: number;
}

import { useTranslation } from "react-i18next";
import { Link } from "wouter";

export function ServiceCard({ title, subtitle, features, tier, delay = 0 }: ServiceCardProps) {
  const { t } = useTranslation();
  const isGold = tier === "gold";
  
  const accentColor = 
    tier === "bronze" ? "border-sky-200 dark:border-sky-800/50 bg-sky-50/50 dark:bg-sky-900/20" : 
    tier === "silver" ? "border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-900/20" : 
    "border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/30";

  const checkStyles = 
    tier === "bronze" ? "bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400" :
    tier === "silver" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" :
    "bg-accent text-accent-foreground";

  const buttonStyles = 
    tier === "bronze" ? "bg-card border-2 border-sky-100 text-sky-600 hover:border-sky-300 hover:bg-sky-50 dark:bg-sky-600 dark:text-white dark:border-transparent dark:hover:bg-sky-500" :
    tier === "silver" ? "bg-card border-2 border-emerald-100 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 dark:bg-emerald-600 dark:text-white dark:border-transparent dark:hover:bg-emerald-500" :
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20";



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`
        relative p-8 rounded-2xl border ${accentColor}
        hover:shadow-xl transition-all duration-300 group
        flex flex-col h-full bg-card
        ${isGold ? 'shadow-lg shadow-primary/5 ring-1 ring-primary/20' : ''}
      `}
    >
      {isGold && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
          {t('products_section.most_popular')}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold font-display text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm font-medium">{subtitle}</p>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className={`mt-0.5 rounded-full p-0.5 ${checkStyles}`}>
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="text-foreground/80 text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <Link href="/contact" className={`
          w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm flex items-center justify-center
          ${buttonStyles}
        `}>
          {t('products_section.request_quote')}
        </Link>
    </motion.div>
  );
}
