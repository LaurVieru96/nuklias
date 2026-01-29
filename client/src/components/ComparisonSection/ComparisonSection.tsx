import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Search, Lightbulb, TrendingUp, Cpu, Globe, Zap, Target } from "lucide-react";

interface ComparisonRow {
  id: number;
  traditional: string;
  nuklias: string;
  iconTraditional?: React.ReactNode;
  iconNuklias?: React.ReactNode;
  bgTraditional: string;
  bgNuklias: string;
}

export function ComparisonSection() {
  const { t } = useTranslation();

  const comparisonData = useMemo<ComparisonRow[]>(() => [
    {
      id: 1,
      traditional: t('comparison.rows.1.traditional'),
      nuklias: t('comparison.rows.1.nuklias'),
      iconTraditional: <Search className="w-8 h-8 md:w-10 md:h-10 text-white opacity-40 group-hover:opacity-100 transition-opacity" />,
      iconNuklias: <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-white animate-pulse" />,
      bgTraditional: "bg-red-600/90 dark:bg-red-900/40",
      bgNuklias: "bg-primary"
    },
    {
      id: 2,
      traditional: t('comparison.rows.2.traditional'),
      nuklias: t('comparison.rows.2.nuklias'),
      bgTraditional: "bg-red-600/80 dark:bg-red-900/30",
      bgNuklias: "bg-primary/90 dark:bg-primary/80"
    },
    {
      id: 3,
      traditional: t('comparison.rows.3.traditional'),
      nuklias: t('comparison.rows.3.nuklias'),
      bgTraditional: "bg-red-600/70 dark:bg-red-900/20",
      bgNuklias: "bg-primary/80 dark:bg-primary/70"
    },
    {
      id: 4,
      traditional: t('comparison.rows.4.traditional'),
      nuklias: t('comparison.rows.4.nuklias'),
      bgTraditional: "bg-red-600/60 dark:bg-red-900/10",
      bgNuklias: "bg-primary/70 dark:bg-primary/60"
    }
  ], [t]);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Decorative Elements - Reduced blur for perf */}
        <div className="absolute top-1/4 -left-20 w-60 h-60 md:w-80 md:h-80 bg-primary/5 rounded-full blur-3xl md:blur-[100px] pointer-events-none will-change-transform" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 md:w-80 md:h-80 bg-red-600/5 rounded-full blur-3xl md:blur-[100px] pointer-events-none will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="md:rounded-[2.5rem] md:overflow-hidden md:shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:border border-border/50">
          {/* Header Row - Hidden on mobile to save space, shown on md+ */}
          <div className="hidden md:grid md:grid-cols-2">
            <div className="bg-red-600/10 dark:bg-red-900/20 p-8 md:p-12 text-center border-b border-border/50">
               <span className="text-xl md:text-3xl font-black font-display text-red-600 dark:text-red-500 tracking-tighter">
                {t('comparison.traditional_title')}
               </span>
            </div>
            <div className="bg-primary/10 p-8 md:p-12 text-center border-b border-border/50">
               <span className="text-xl md:text-3xl font-black font-display text-primary tracking-tighter">
                {t('comparison.nuklias_title')}
               </span>
            </div>
          </div>

          {/* Data Rows */}
          {comparisonData.map((row, idx) => (
            <motion.div 
              key={row.id} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 group md:border-b md:border-white/5 md:last:border-0 mb-6 md:mb-0 rounded-3xl md:rounded-none overflow-hidden shadow-lg md:shadow-none"
            >
              {/* Traditional Side */}
              <div className={`${row.bgTraditional} p-8 md:p-12 border-b-2 border-dashed border-white/10 md:border-b-0 md:border-r md:border-solid flex flex-col items-center justify-center text-center transition-colors duration-500 group-hover:bg-red-600/100 dark:group-hover:bg-red-900/50 relative overflow-hidden`}>
                {/* Mobile Label */}
                <span className="md:hidden text-xs font-bold uppercase tracking-widest text-white/50 mb-4 bg-black/20 px-3 py-1 rounded-full">
                  {t('comparison.traditional_title')}
                </span>

                {row.iconTraditional && (
                   <div 
                     className="mb-4 md:mb-6 p-3 md:p-4 bg-white/10 rounded-2xl backdrop-blur-md transform transition-transform group-hover:scale-110 duration-300"
                   >
                     {row.iconTraditional}
                   </div>
                )}
                <p className="text-white text-lg md:text-xl font-medium leading-relaxed max-w-sm">
                  {row.traditional}
                </p>
              </div>

              {/* Nuklias Side */}
              <div className={`${row.bgNuklias} p-8 md:p-12 flex flex-col items-center justify-center text-center transition-colors duration-500 group-hover:bg-primary/100 dark:group-hover:bg-primary/90 relative overflow-hidden`}>
                {/* Mobile Label */}
                <span className="md:hidden text-xs font-bold uppercase tracking-widest text-white/50 mb-4 bg-black/20 px-3 py-1 rounded-full">
                   {t('comparison.nuklias_title')}
                </span>

                {row.iconNuklias && (
                   <div 
                     className="mb-4 md:mb-6 p-3 md:p-4 bg-white/10 rounded-2xl backdrop-blur-md transform transition-transform group-hover:scale-110 duration-300 shadow-lg"
                   >
                     {row.iconNuklias}
                   </div>
                )}
                <p className="text-white text-lg md:text-xl font-bold leading-relaxed max-w-sm drop-shadow-sm">
                  {row.nuklias}
                </p>
                
                {/* Mobile accent indicator */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
