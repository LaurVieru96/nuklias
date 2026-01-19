import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  features: string[];
  tier: "bronze" | "silver" | "gold";
  delay?: number;
}

export function ServiceCard({ title, subtitle, features, tier, delay = 0 }: ServiceCardProps) {
  const isGold = tier === "gold";
  
  const accentColor = 
    tier === "bronze" ? "border-orange-200 bg-orange-50/50" : 
    tier === "silver" ? "border-slate-200 bg-slate-50/50" : 
    "border-purple-200 bg-purple-50/50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`
        relative p-8 rounded-2xl border ${accentColor}
        hover:shadow-xl transition-all duration-300 group
        flex flex-col h-full
        ${isGold ? 'shadow-lg shadow-primary/5 ring-1 ring-primary/20' : ''}
      `}
    >
      {isGold && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold font-display text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm font-medium">{subtitle}</p>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className={`mt-0.5 rounded-full p-0.5 ${isGold ? 'bg-accent text-accent-foreground' : 'bg-primary/10 text-primary'}`}>
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="text-foreground/80 text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`
        w-full py-3 rounded-xl font-bold text-sm transition-all duration-300
        ${isGold 
          ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20' 
          : 'bg-white border-2 border-primary/10 text-primary hover:border-primary/30 hover:bg-primary/5'
        }
      `}>
        Request a Quote
      </button>
    </motion.div>
  );
}
