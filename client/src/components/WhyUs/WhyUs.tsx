import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Trophy, 
  Layers, 
  Zap, 
  MessageCircle, 
  BarChart3, 
  Heart 
} from "lucide-react";
import { useMemo } from "react";

export function WhyUs() {
  const { t } = useTranslation();

  const features = useMemo(() => [
    {
      icon: <Trophy className="w-8 h-8 text-accent" />,
      title: t('why_us.cards.1.title'),
      desc: t('why_us.cards.1.desc')
    },
    {
      icon: <Layers className="w-8 h-8 text-accent" />,
      title: t('why_us.cards.2.title'),
      desc: t('why_us.cards.2.desc')
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: t('why_us.cards.3.title'),
      desc: t('why_us.cards.3.desc')
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-accent" />,
      title: t('why_us.cards.4.title'),
      desc: t('why_us.cards.4.desc')
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-accent" />,
      title: t('why_us.cards.5.title'),
      desc: t('why_us.cards.5.desc')
    },
    {
      icon: <Heart className="w-8 h-8 text-accent" />,
      title: t('why_us.cards.6.title'),
      desc: t('why_us.cards.6.desc')
    }
  ], [t]);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-primary mb-4">
            {t('why_us.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('why_us.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
            >
              <div className="mb-6 w-14 h-14 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold font-display text-primary mb-3">
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
