import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { 
  FileText, 
  Search, 
  Rocket, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from "lucide-react";

interface JourneyStep {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  gradient: string;
}

export function ClientJourney() {
  const { t } = useTranslation();

  const journeySteps: JourneyStep[] = useMemo(() => [
    {
      id: "step1",
      icon: <FileText className="w-7 h-7" />,
      titleKey: "client_journey.steps.1.title",
      descKey: "client_journey.steps.1.desc",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "step2",
      icon: <Search className="w-7 h-7" />,
      titleKey: "client_journey.steps.2.title",
      descKey: "client_journey.steps.2.desc",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "step3",
      icon: <Rocket className="w-7 h-7" />,
      titleKey: "client_journey.steps.3.title",
      descKey: "client_journey.steps.3.desc",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "step4",
      icon: <BarChart3 className="w-7 h-7" />,
      titleKey: "client_journey.steps.4.title",
      descKey: "client_journey.steps.4.desc",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "step5",
      icon: <CheckCircle2 className="w-7 h-7" />,
      titleKey: "client_journey.steps.5.title",
      descKey: "client_journey.steps.5.desc",
      gradient: "from-violet-500 to-purple-600",
    },
  ], []);

  return (
    <div className="relative w-full max-w-7xl mx-auto">

      {/* Journey Container with Enhanced Background */}
      <div className="relative bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-purple-900/10 dark:to-pink-900/10 rounded-3xl p-8 md:p-16 overflow-hidden border border-primary/10 dark:border-primary/20 shadow-2xl">
        {/* Animated Background Orbs - Optimized: Reduced scale variance and blur radius */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-24 -left-24 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-2xl md:blur-3xl animate-pulse"
            style={{ animationDuration: '8s' }}
          />
          <div
            className="absolute -bottom-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-2xl md:blur-3xl animate-pulse"
            style={{ animationDuration: '10s', animationDelay: '1s' }}
          />
        </div>

        {/* Steps Grid with Enhanced Layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-6">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step Number Badge with Glow */}
              <div 
                className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/80 text-accent-foreground font-bold text-base flex items-center justify-center shadow-lg shadow-accent/20 z-20 border-2 border-white dark:border-background"
              >
                {index + 1}
              </div>

              {/* Icon Circle with Enhanced Gradient and Glow */}
              <div 
                className={`relative mb-6 w-24 h-24 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2 z-10 will-change-transform`}
              >
                {/* Static Glow Ring (replacing expensive animation) */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} blur-xl opacity-40`} />
                
                {/* Inner Shine Effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="relative z-10">
                  {step.icon}
                </div>
              </div>

              {/* Arrow Between Steps - Desktop Only */}
              {index < journeySteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 z-5">
                  <ArrowRight className="w-6 h-6 text-primary/30 dark:text-primary/20" />
                </div>
              )}

              {/* Content with Enhanced Typography */}
              <div className="space-y-3 relative z-10">
                <h3 className="text-lg md:text-xl font-bold font-display text-primary group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[220px] group-hover:text-foreground/80 transition-colors duration-300">
                  {t(step.descKey)}
                </p>
              </div>

              {/* Enhanced Hover Card Background */}
              <div
                className="absolute inset-0 -inset-x-4 -inset-y-6 rounded-3xl bg-white/50 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mt-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="">
            {t("client_journey.title")}
          </span>
        </div>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t("client_journey.subtitle")}
        </p>
      </motion.div>
    </div>
  );
}
