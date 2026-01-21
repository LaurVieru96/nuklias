import { Navbar } from "@/components/Navbar/Navbar";
import { ServiceCard } from "@/components/ServiceCard/ServiceCard";
import { LegalModal } from "@/components/LegalModal/LegalModal";
import { ClientJourney } from "@/components/ClientJourney/ClientJourney";
import { ComparisonSection } from "@/components/ComparisonSection/ComparisonSection";
import { useMessages } from "@/hooks/use-messages";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@/lib/api-mock";
import { useToast } from "@/hooks/use-toast";
import { PrivacyPolicyContent, TermsOfServiceContent } from "@/lib/legal-content";
import { 
  ArrowRight, 
  BrainCircuit, 
  Layers, 
  Target, 
  Cpu, 
  Network, 
  BarChart3,
  CheckCircle2,
  Users,
  Lightbulb,
  Search,
  Zap,
  Heart,
  MessageCircle,
  Trophy
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import heroImage from '../../assets/photo_2026-01-19_10-50-29.jpg';

export default function Home() {
  const { toast } = useToast();
  const { createMessage, isSubmitting } = useMessages();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    createMessage(data);
  };


  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-7xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground border border-accent/30 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse" />
                {t('hero.badge')}
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-display text-primary leading-[1.1] mb-6">
                {t('hero.title_start')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                  {t('hero.title_end')}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl shadow-xl shadow-accent/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    {t('hero.cta_audit')}
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link href="/products">
                  <button className="px-8 py-4 bg-white/80 dark:bg-card/90 backdrop-blur-md border-2 border-border dark:border-primary/40 text-primary dark:text-white font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-card dark:hover:border-primary/60 transition-all shadow-sm">
                    {t('hero.cta_plans')}
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Client Journey Section */}
      <section className="py-24 bg-background overflow-hidden border-t border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <ClientJourney />
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonSection />

      {/* The What we Solve Section */}
      {/* <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">{t('what_we_solve.badge')}</h2>
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">{t('what_we_solve.title')}</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {t('what_we_solve.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BrainCircuit className="w-8 h-8 text-accent" />,
                title: t('what_we_solve.cards.1.title'),
                desc: t('what_we_solve.cards.1.desc')
              },
              {
                icon: <Network className="w-8 h-8 text-accent" />,
                title: t('what_we_solve.cards.2.title'),
                desc: t('what_we_solve.cards.2.desc')
              },
              {
                icon: <Target className="w-8 h-8 text-accent" />,
                title: t('what_we_solve.cards.3.title'),
                desc: t('what_we_solve.cards.3.desc')
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="mb-6 bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Products Section */}
      <section className="py-24 bg-gray-50 dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Custom Website Subsection */}
          <div className="mt-20 max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-display text-primary mb-3">
                {t('products_section.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('products_section.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              <ServiceCard
                title={t('products_section.tiers.bronze.title')}
                subtitle={t('products_section.tiers.bronze.subtitle')}
                tier="bronze"
                delay={0}
                features={[
                  t('products_section.tiers.bronze.features.1'),
                  t('products_section.tiers.bronze.features.2'),
                  t('products_section.tiers.bronze.features.3'),
                  t('products_section.tiers.bronze.features.4'),
                  t('products_section.tiers.bronze.features.5')
                ]}
              />

              <ServiceCard
                title={t('products_section.tiers.silver.title')}
                subtitle={t('products_section.tiers.silver.subtitle')}
                tier="silver"
                delay={0.1}
                features={[
                  t('products_section.tiers.silver.features.1'),
                  t('products_section.tiers.silver.features.2'),
                  t('products_section.tiers.silver.features.3'),
                  t('products_section.tiers.silver.features.4'),
                  t('products_section.tiers.silver.features.5')
                ]}
              />

              <ServiceCard
                title={t('products_section.tiers.gold.title')}
                subtitle={t('products_section.tiers.gold.subtitle')}
                tier="gold"
                delay={0.2}
                features={[
                  t('products_section.tiers.gold.features.1'),
                  t('products_section.tiers.gold.features.2'),
                  t('products_section.tiers.gold.features.3'),
                  t('products_section.tiers.gold.features.4'),
                  t('products_section.tiers.gold.features.5')
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
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
            {[
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
            ].map((item, i) => (
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



      {/* Footer */}
      <footer className="bg-primary dark:bg-primary/90 text-white py-12 border-t border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 font-display font-bold text-xl">
              <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                N
              </div>
              {t('footer.marketing')}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-white/60">
              <button
                onClick={() => setPrivacyOpen(true)}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                {t('footer.privacy')}
              </button>
              <span className="text-white/30">•</span>
              <button
                onClick={() => setTermsOpen(true)}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                {t('footer.terms')}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-white/60">
              <span className="text-white/40">
                {t('footer.copyright')}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModal
        open={privacyOpen}
        onOpenChange={setPrivacyOpen}
        title="Privacy Policy"
        content={<PrivacyPolicyContent />}
      />
      <LegalModal
        open={termsOpen}
        onOpenChange={setTermsOpen}
        title="Terms of Service"
        content={<TermsOfServiceContent />}
      />
    </div>
  );
}
