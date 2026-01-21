import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Search, Lightbulb, TrendingUp, Cpu, Globe, Zap, Target } from "lucide-react";

export function ComparisonSection() {
  const { t } = useTranslation();

  const comparisonData = [
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
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={14} />
            {t('comparison.title')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-primary mb-4 leading-tight">
            {t('comparison.subtitle')}
          </h2>
        </motion.div>

        <div className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border/50">
          {/* Header Row */}
          <div className="grid grid-cols-2">
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
              className="grid grid-cols-2 group"
            >
              {/* Traditional Side */}
              <div className={`${row.bgTraditional} p-8 md:p-12 border-r border-white/10 flex flex-col items-center justify-center text-center transition-colors duration-500 group-hover:bg-red-600/100 dark:group-hover:bg-red-900/50`}>
                {row.iconTraditional && (
                   <motion.div 
                     whileHover={{ scale: 1.1, rotate: 10 }}
                     className="mb-6 p-4 bg-white/10 rounded-2xl backdrop-blur-md"
                   >
                     {row.iconTraditional}
                   </motion.div>
                )}
                <p className="text-white md:text-xl font-medium leading-relaxed max-w-sm">
                  {row.traditional}
                </p>
              </div>

              {/* Nuklias Side */}
              <div className={`${row.bgNuklias} p-8 md:p-12 flex flex-col items-center justify-center text-center transition-colors duration-500 group-hover:bg-primary/100 dark:group-hover:bg-primary/90`}>
                {row.iconNuklias && (
                   <motion.div 
                     whileHover={{ scale: 1.1, rotate: -10 }}
                     className="mb-6 p-4 bg-white/10 rounded-2xl backdrop-blur-md"
                   >
                     {row.iconNuklias}
                   </motion.div>
                )}
                <p className="text-white md:text-xl font-bold leading-relaxed max-w-sm drop-shadow-sm">
                  {row.nuklias}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
