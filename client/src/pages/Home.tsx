import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { useMessages } from "@/hooks/use-messages";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@/lib/api-mock";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRight, 
  BrainCircuit, 
  Layers, 
  Target, 
  Cpu, 
  Network, 
  BarChart3,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import heroImage from '../assets/photo_2026-01-19_10-50-29.jpg';

export default function Home() {
  const { toast } = useToast();
  const { createMessage, isSubmitting } = useMessages();

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

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-5xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground border border-accent/30 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse" />
                YOUR JOURNEY
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-display text-primary leading-[1.1] mb-6">
                From Chaos to Clarity: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                  Your Digital Growth Engine
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                We engineer automated ecosystems that convert passive followers into loyal customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToContact}
                  className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl shadow-xl shadow-accent/20 hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  Book a Strategic Audit
                  <ArrowRight size={18} />
                </button>
                <button className="px-8 py-4 bg-white border border-border text-primary font-bold rounded-xl hover:bg-gray-50 transition-colors">
                  Explore Our Plans
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-5xl"
            >
              {/* Abstract Tech Visual */}
              <div className="rounded-3xl bg-gradient-to-br from-primary to-purple-900 p-1">
                <div className="w-full rounded-[20px] bg-white/10 backdrop-blur-sm overflow-hidden relative">
                   {/* Decorative Abstract Image - Network Nodes */}
                   <img 
                    src={heroImage}
                    alt="Digital Network Abstract" 
                    className="w-full object-fit opacity-80 mix-blend-overlay"
                  />
                  
                  {/* Floating Cards Overlay */}
                  {/* <div className="absolute top-1/4 left-1/4 p-4 bg-white/90 backdrop-blur rounded-xl shadow-lg border border-white/20 max-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-accent rounded-lg">
                        <BarChart3 size={16} className="text-primary" />
                      </div>
                      <span className="text-xs font-bold text-primary">Conversion Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">+145%</div>
                  </div> 

                  <div className="absolute bottom-1/4 right-12 p-4 bg-primary/90 backdrop-blur rounded-xl shadow-lg border border-primary/20 max-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Cpu size={16} className="text-accent" />
                      </div>
                      <span className="text-xs font-bold text-white">System Load</span>
                    </div>
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent w-3/4" />
                    </div>
                  </div> */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The What we Solve Section */}
      <section id="solve" className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Our Promise</h2>
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">The only marketing that matters: The money in your pocket</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
            The only marketing that matters is the one you can observe in your pockets at the end of the month. We do not sell 'visibility' or 'likes'; we build the structural machinery that turns digital chaos into liquid cash with total predictability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BrainCircuit className="w-8 h-8 text-accent" />,
                title: "Operational Agility",
                desc: "While others get lost in the planning phase, we focus on immediate, high-impact implementation. We drive your projects forward with a level of intensity and precision that ensures you stay ahead of the market and see results faster."
              },
              {
                icon: <Network className="w-8 h-8 text-accent" />,
                title: "Integrated Growth Ecosystems",
                desc: "Stop investing in disconnected digital fragments. We architect unified ecosystems where SEO, Content, and Strategy function as a single, cohesive architecture designed to attract, engage, and convert your ideal leads 24/7."
              },
              {
                icon: <Target className="w-8 h-8 text-accent" />,
                title: "Revenue-First Engineering",
                desc: "We prioritize the metrics that directly impact your wallet and spending habits: We focus on the stability of your lead flow and amplify your profit, simple as that."
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
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Custom Website Subsection */}
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-display text-primary mb-3">
                Create Your Custom Website
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Pick the structure that matches where your business is today. Every option is built to be fast, clear, and conversion-focused.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              <ServiceCard
                title="Website Basic"
                subtitle="Essential Presence"
                tier="bronze"
                delay={0}
                features={[
                  "Custom 3–5 page website (Home, About, Services, Contact)",
                  "Modern, responsive design for all devices",
                  "Basic on-page SEO structure (titles, meta, headings)",
                  "Contact form and location/map integration",
                  "Performance-focused layout for clarity and trust"
                ]}
              />

              <ServiceCard
                title="Website + Hosting"
                subtitle="Managed Foundation"
                tier="silver"
                delay={0.1}
                features={[
                  "Everything in Website Basic",
                  "Premium, secure hosting fully managed for you",
                  "Custom domain setup & SSL certificate",
                  "Monthly uptime & performance monitoring",
                  "Technical maintenance so you never touch servers"
                ]}
              />

              <ServiceCard
                title="Website + Host + Growth"
                subtitle="Updates & Development"
                tier="gold"
                delay={0.2}
                features={[
                  "Everything in Website + Hosting",
                  "Monthly content & design updates included",
                  "New page development as your offers evolve",
                  "Ongoing UX and conversion optimization",
                  "Priority support for experiments and iterations"
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-6">
                  Real Systems.<br/>Real Results.
                </h2>
                <p className="text-white/70 mb-8 text-lg">
                  We took a local service business from page 3 obscurity to market dominance in just 90 days by restructuring their digital footprint.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-white">
                    <CheckCircle2 className="text-accent shrink-0" />
                    <span>300% Increase in Organic Leads</span>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <CheckCircle2 className="text-accent shrink-0" />
                    <span>50% Reduction in Ad Spend</span>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <CheckCircle2 className="text-accent shrink-0" />
                    <span>#1 Ranking for High-Value Keywords</span>
                  </div>
                </div>
              </div>
              <div className="relative bg-white/5 h-full min-h-[400px]">
                 {/* Abstract Chart/Graph Image */}
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                  alt="Growth Analytics Chart" 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-12 left-12 right-12">
                  <p className="text-accent font-bold tracking-wider uppercase text-sm mb-2">Case Study: Nexus Logistics</p>
                  <p className="text-white text-2xl font-display font-bold">"Nuklias didn't just build a site, they built a lead generation machine."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold font-display text-primary mb-4">Ready to Architect Your Growth?</h2>
            <p className="text-muted-foreground">
              Stop guessing. Start building. Request your strategic audit today.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-border">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Name</label>
                <input
                  {...form.register("name")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="John Doe"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Email</label>
                <input
                  {...form.register("email")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="john@company.com"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Message</label>
                <textarea
                  {...form.register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                  placeholder="Tell us about your current digital challenges..."
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-xs">{form.formState.errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">N</div>
            NUKLIAS
          </div>
          <div className="text-white/40 text-sm">
            © 2024 Nuklias Digital Architects. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
