import { Navbar } from "@/components/Navbar/Navbar";
import { 
  Smartphone,
  Mail,
  Scale,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export default function Process() {
  const { t } = useTranslation();
  const steps = [
    {
      number: 1,
      icon: <Smartphone className="w-8 h-8" />,
      title: t('process_page.steps.1.title'),
      description: t('process_page.steps.1.desc'),
      color: "purple",
      bgGradient: "from-purple-600 to-purple-800"
    },
    {
      number: 2,
      icon: <Mail className="w-8 h-8" />,
      title: t('process_page.steps.2.title'),
      description: t('process_page.steps.2.desc'),
      color: "purple",
      bgGradient: "from-purple-600 to-purple-800"
    },
    {
      number: 3,
      icon: <Scale className="w-8 h-8" />,
      title: t('process_page.steps.3.title'),
      description: t('process_page.steps.3.desc'),
      color: "green",
      bgGradient: "from-green-600 to-emerald-700"
    },
    {
      number: 4,
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('process_page.steps.4.title'),
      description: t('process_page.steps.4.desc'),
      color: "green",
      bgGradient: "from-green-600 to-emerald-700"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground border border-accent/30 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse" />
              {t('process_page.badge')}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-display text-primary dark:text-white mb-6 drop-shadow-lg">
              {t('process_page.title')}
            </h1>
            <p className="text-lg text-muted-foreground dark:text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('process_page.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-purple-600 to-green-600 transform -translate-y-1/2 opacity-30" />
            
            <div className="grid lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative">
                    <div className={`relative bg-gradient-to-r ${step.bgGradient} p-6 rounded-2xl shadow-2xl mb-6`}>
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-white rounded-full p-3 shadow-lg border-4 border-background">
                          <div className={step.color === "purple" ? "text-purple-600" : "text-green-600"}>
                            {step.icon}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 mb-4 flex justify-center">
                        <div className="h-12 border-l-2 border-dotted border-white/50" />
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        <div className={`w-4 h-4 rounded-full shadow-lg ${step.color === "purple" ? "bg-purple-400" : "bg-green-400"}`} />
                      </div>
                    </div>

                    <div className="text-center px-2">
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-bold mb-3 ${step.color === "purple" ? "bg-purple-500/20 text-purple-600 dark:text-purple-300" : "bg-green-500/20 text-green-600 dark:text-green-300"}`}>
                        {t('process_page.step')} {step.number}
                      </div>
                      <h3 className="text-xl font-bold font-display text-foreground dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-white/60 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 -right-4 z-20">
                      <ArrowRight className={`w-6 h-6 ${steps[i + 1].color === "purple" ? "text-purple-400" : "text-green-400"}`} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-24 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold font-display text-foreground dark:text-white mb-6">
              {t('process_page.info_title')}
            </h2>
            <p className="text-muted-foreground dark:text-white/70 mb-8 text-lg leading-relaxed">
              {t('process_page.info_desc_1')}
            </p>
            <p className="text-muted-foreground/80 dark:text-white/60 mb-8 leading-relaxed">
              {t('process_page.info_desc_2')}
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl shadow-xl shadow-accent/20 hover:scale-105 transition-transform inline-flex items-center gap-2">
                {t('process_page.btn_start')}
                <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
