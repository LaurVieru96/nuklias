import { Navbar } from "@/components/Navbar";
import { 
  BrainCircuit, 
  Network, 
  Target,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function WhatWeSolve() {
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
              WHAT WE SOLVE
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-display text-primary leading-[1.1] mb-6">
              Our Promise
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 text-foreground">
              The only marketing that matters: The money in your pocket
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              The only marketing that matters is the one you can observe in your pockets at the end of the month. We do not sell 'visibility' or 'likes'; we build the structural machinery that turns digital chaos into liquid cash with total predictability.
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl shadow-xl shadow-accent/20 hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto">
                Get Started
                <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">What We Do</h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
              We transform your digital presence into a revenue-generating machine. Our approach is systematic, measurable, and focused on one thing: growing your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
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

          {/* Additional Description */}
          <div className="max-w-4xl mx-auto mt-16 bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl">
            <h3 className="text-2xl font-bold font-display mb-4 text-white">Our Approach</h3>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                At Nuklias, we don't believe in one-size-fits-all solutions. Every business is unique, and your digital strategy should reflect that. We start by understanding your specific challenges, goals, and market position.
              </p>
              <p>
                Our team combines deep technical expertise with strategic business thinking. We build systems that work not just today, but evolve with your business. From initial analysis to ongoing optimization, we're with you every step of the way.
              </p>
              <p>
                We measure success in real results: increased revenue, qualified leads, and sustainable growth. No vanity metrics. No empty promises. Just proven systems that deliver measurable outcomes for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-display text-primary mb-4">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Let's discuss how we can build a growth engine tailored specifically to your business.
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl shadow-xl shadow-accent/20 hover:scale-105 transition-transform inline-flex items-center gap-2">
              Contact Us Today
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
