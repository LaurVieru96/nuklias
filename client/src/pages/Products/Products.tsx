import { Navbar } from "@/components/Navbar/Navbar";
import { 
  Palette,
  Share2,
  TrendingUp,
  Mail,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: t('products_page.services.brand_design.title'),
      color: "from-blue-500 to-cyan-500",
      description: t('products_page.services.brand_design.desc'),
      process: t('products_page.services.brand_design.process', { returnObjects: true }) as string[],
      benefits: t('products_page.services.brand_design.benefits', { returnObjects: true }) as string[]
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: t('products_page.services.social_media.title'),
      color: "from-purple-500 to-pink-500",
      description: t('products_page.services.social_media.desc'),
      process: t('products_page.services.social_media.process', { returnObjects: true }) as string[],
      benefits: t('products_page.services.social_media.benefits', { returnObjects: true }) as string[]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('products_page.services.digital_marketing.title'),
      color: "from-orange-500 to-red-500",
      description: t('products_page.services.digital_marketing.desc'),
      process: t('products_page.services.digital_marketing.process', { returnObjects: true }) as string[],
      benefits: t('products_page.services.digital_marketing.benefits', { returnObjects: true }) as string[]
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: t('products_page.services.email_marketing.title'),
      color: "from-green-500 to-emerald-500",
      description: t('products_page.services.email_marketing.desc'),
      process: t('products_page.services.email_marketing.process', { returnObjects: true }) as string[],
      benefits: t('products_page.services.email_marketing.benefits', { returnObjects: true }) as string[]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('products_page.services.website_dev.title'),
      color: "from-indigo-500 to-purple-500",
      description: t('products_page.services.website_dev.desc'),
      process: t('products_page.services.website_dev.process', { returnObjects: true }) as string[],
      benefits: t('products_page.services.website_dev.benefits', { returnObjects: true }) as string[]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: t('products_page.services.growth.title'),
      color: "from-yellow-500 to-amber-500",
      description: t('products_page.services.growth.desc'),
      process: t('products_page.services.growth.process', { returnObjects: true }) as string[],
      benefits: t('products_page.services.growth.benefits', { returnObjects: true }) as string[]
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground border border-accent/30 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse" />
              {t('products_page.badge')}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-display text-primary leading-[1.1] mb-6">
              {t('products_page.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('products_page.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50 dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-card rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl font-bold font-display">{service.title}</h2>
                  </div>
                  <p className="text-white/90 leading-relaxed">{service.description}</p>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Process */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">{t('products_page.labels.process')}</h3>
                    <ul className="space-y-3">
                      {Array.isArray(service.process) && service.process.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">{t('products_page.labels.benefits')}</h3>
                    <ul className="space-y-2">
                      {Array.isArray(service.benefits) && service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Packages CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-display mb-6">
              {t('products_page.cta.title')}
            </h2>
            <p className="text-white/70 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              {t('products_page.cta.desc')}
            </p>
            <p className="text-white/80 mb-8 font-semibold">
              {t('products_page.cta.text')}
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl shadow-xl shadow-accent/20 hover:scale-105 transition-transform inline-flex items-center gap-2">
                {t('products_page.cta.btn')}
                <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
