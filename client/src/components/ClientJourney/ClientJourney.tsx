import { motion } from "framer-motion";
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

  const journeySteps: JourneyStep[] = [
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
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Title Section with Enhanced Styling */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="">
            {t("client_journey.title")}
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-display bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent mb-4 leading-tight">
          {t("client_journey.title")}
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t("client_journey.subtitle")}
        </p>
      </motion.div>

      {/* Journey Container with Enhanced Background */}
      <div className="relative bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-purple-900/10 dark:to-pink-900/10 rounded-3xl p-8 md:p-16 overflow-hidden border border-primary/10 dark:border-primary/20 shadow-2xl">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        {/* Animated Progress Line - Desktop */}
        {/* <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-1 -translate-y-1/2 z-0">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-full" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute inset-0 h-full bg-gradient-to-r from-primary/40 via-purple-500/40 to-primary/40 rounded-full origin-left shadow-lg shadow-primary/20"
          />
        </div> */}

        {/* Steps Grid with Enhanced Layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-6">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step Number Badge with Glow */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/80 text-accent-foreground font-bold text-base flex items-center justify-center shadow-xl shadow-accent/30 z-20 border-2 border-white dark:border-gray-900"
              >
                {index + 1}
              </motion.div>

              {/* Icon Circle with Enhanced Gradient and Glow */}
              <motion.div
                whileHover={{ 
                  scale: 1.15, 
                  rotate: [0, -5, 5, -5, 0],
                  y: -8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className={`relative mb-6 w-24 h-24 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-2xl group-hover:shadow-3xl transition-all duration-500 z-10`}
              >
                {/* Animated Glow Ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} blur-xl opacity-50`}
                />
                
                {/* Inner Shine Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="relative z-10">
                  {step.icon}
                </div>
              </motion.div>

              {/* Arrow Between Steps - Desktop Only */}
              {index < journeySteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 z-5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                    className="relative"
                  >
                    <ArrowRight className="w-6 h-6 text-primary/60 dark:text-primary/40 drop-shadow-lg" />
                  </motion.div>
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
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 -inset-x-4 -inset-y-6 rounded-3xl bg-gradient-to-br from-white/50 to-white/30 dark:from-white/5 dark:to-white/0 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-xl -z-10 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 right-8 hidden lg:block"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-purple-600/30 dark:from-primary/20 dark:to-purple-900/20 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </div>
  );
}
