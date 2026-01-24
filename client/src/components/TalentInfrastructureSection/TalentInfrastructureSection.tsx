import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Workflow, Cpu, Server } from "lucide-react";
import { useMemo } from "react";

export function TalentInfrastructureSection() {
  const { t } = useTranslation();

  const features = useMemo(() => [
    {
      icon: <Workflow className="w-10 h-10 text-accent" />,
      title: t('talent_section.cards.1.title'),
      desc: t('talent_section.cards.1.desc')
    },
    {
      icon: <Cpu className="w-10 h-10 text-accent" />,
      title: t('talent_section.cards.2.title'),
      desc: t('talent_section.cards.2.desc')
    },
    {
      icon: <Server className="w-10 h-10 text-accent" />,
      title: t('talent_section.cards.3.title'),
      desc: t('talent_section.cards.3.desc')
    }
  ], [t]);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Abstract Background Element to match "embedded" feel */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-display text-accent mb-4 md:text-5xl">
            {t('talent_section.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('talent_section.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card border border-primary/20 p-8 rounded-2xl shadow-lg shadow-primary/5 hover:border-primary/50 hover:shadow-primary/10 transition-all duration-300 group flex flex-col"
            >
              <div className="mb-6 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
