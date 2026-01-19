import { Navbar } from "@/components/Navbar";
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

export default function Products() {
  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Design",
      color: "from-blue-500 to-cyan-500",
      description: "Create a visual identity that resonates with your audience and sets you apart from competitors.",
      process: [
        "Brand strategy and positioning analysis",
        "Logo design and visual identity development",
        "Color palette and typography selection",
        "Brand guidelines and style guide creation",
        "Visual assets for all touchpoints"
      ],
      benefits: [
        "Professional brand presence",
        "Consistent visual identity across all channels",
        "Increased brand recognition and recall",
        "Stronger emotional connection with your audience"
      ]
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Social Media Management",
      color: "from-purple-500 to-pink-500",
      description: "Build and engage a loyal community on the platforms where your audience spends their time.",
      process: [
        "Platform strategy and audience analysis",
        "Content calendar and campaign planning",
        "Creative content creation (graphics, videos, copy)",
        "Community management and engagement",
        "Performance tracking and optimization"
      ],
      benefits: [
        "Active, engaged community",
        "Increased brand visibility and reach",
        "Direct communication with your audience",
        "Data-driven content optimization"
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Digital Marketing",
      color: "from-orange-500 to-red-500",
      description: "Comprehensive marketing strategies that drive qualified leads and measurable growth.",
      process: [
        "Market research and competitor analysis",
        "Multi-channel marketing strategy development",
        "Campaign creation and execution",
        "Lead generation and nurturing systems",
        "Conversion optimization and ROI analysis"
      ],
      benefits: [
        "Consistent flow of qualified leads",
        "Multi-channel presence and reach",
        "Measurable ROI and performance metrics",
        "Scalable marketing systems"
      ]
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Marketing",
      color: "from-green-500 to-emerald-500",
      description: "Nurture relationships and drive conversions through strategic, personalized email campaigns.",
      process: [
        "Email list segmentation and strategy",
        "Automated email sequence development",
        "Campaign design and copywriting",
        "A/B testing and optimization",
        "Performance analytics and reporting"
      ],
      benefits: [
        "Direct communication channel with customers",
        "Automated nurturing sequences",
        "High ROI on marketing investment",
        "Personalized customer experiences"
      ]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Website Development",
      color: "from-indigo-500 to-purple-500",
      description: "Fast, conversion-focused websites that turn visitors into customers.",
      process: [
        "User experience and conversion optimization planning",
        "Custom design and development",
        "Mobile-responsive implementation",
        "SEO structure and technical optimization",
        "Ongoing maintenance and updates"
      ],
      benefits: [
        "Professional online presence",
        "Mobile-optimized experience",
        "Fast loading times and SEO-friendly structure",
        "Conversion-focused design"
      ]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Growth Strategy & Consulting",
      color: "from-yellow-500 to-amber-500",
      description: "Strategic guidance to accelerate your business growth and overcome obstacles.",
      process: [
        "Business audit and opportunity analysis",
        "Growth strategy development",
        "Implementation roadmap creation",
        "Performance tracking and KPIs setup",
        "Ongoing strategic consulting"
      ],
      benefits: [
        "Clear growth roadmap",
        "Data-driven decision making",
        "Strategic alignment across all channels",
        "Expert guidance and support"
      ]
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
              OUR SERVICES
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-display text-primary leading-[1.1] mb-6">
              Complete Digital Solutions
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              From brand identity to revenue growth, we offer comprehensive services designed to transform your digital presence and drive measurable business results.
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
                    <h3 className="text-lg font-bold text-foreground mb-4">Our Process</h3>
                    <ul className="space-y-3">
                      {service.process.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">What You Get</h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
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
              Custom Solutions for Your Business
            </h2>
            <p className="text-white/70 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              We understand that every business is unique. That's why we create custom packages tailored to your specific needs, goals, and budget. No cookie-cutter solutions—just strategic services designed to deliver the results you need.
            </p>
            <p className="text-white/80 mb-8 font-semibold">
              Ready to discuss your project? Let's explore how we can help you achieve your goals.
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl shadow-xl shadow-accent/20 hover:scale-105 transition-transform inline-flex items-center gap-2">
                Get a Custom Quote
                <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
