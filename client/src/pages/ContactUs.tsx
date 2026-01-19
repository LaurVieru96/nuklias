import { Navbar } from "@/components/Navbar";
import { useMessages } from "@/hooks/use-messages";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Send, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  businessDomain: z.enum([
    "ecommerce",
    "services",
    "technology",
    "healthcare",
    "finance",
    "real-estate",
    "education",
    "other"
  ], {
    required_error: "Please select your business domain"
  }),
  businessType: z.string().min(1, "Please describe your business type"),
  mainChallenge: z.string().min(1, "Please tell us about your main challenge"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactUs() {
  const { toast } = useToast();
  const { createMessage, isSubmitting } = useMessages();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      businessDomain: undefined,
      businessType: "",
      mainChallenge: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Format the message to include all fields
    const formattedMessage = `
Hello,

I'm reaching out from ${data.location}.

Business Domain: ${data.businessDomain}
Business Type: ${data.businessType}
Main Challenge: ${data.mainChallenge}

${data.phone ? `Phone: ${data.phone}\n` : ''}

Message:
${data.message}
    `.trim();

    createMessage({
      name: data.name,
      email: data.email,
      message: formattedMessage,
    });

    // Reset form after successful submission
    form.reset();
  };

  const businessDomains = [
    { value: "ecommerce", label: "E-commerce & Retail" },
    { value: "services", label: "Professional Services" },
    { value: "technology", label: "Technology & SaaS" },
    { value: "healthcare", label: "Healthcare & Medical" },
    { value: "finance", label: "Finance & Banking" },
    { value: "real-estate", label: "Real Estate" },
    { value: "education", label: "Education & Training" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 overflow-hidden">
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
              CONTACT US
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-display text-primary leading-[1.1] mb-6">
              Let's Build Something Great Together
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your digital presence? Get in touch and let's discuss how we can help you achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50 dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-card rounded-2xl shadow-lg p-8 border border-border sticky top-24">
                <h2 className="text-2xl font-bold font-display text-primary mb-6">
                  Get In Touch
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Email</h3>
                      <a href="mailto:contact@nuklias.com" className="text-muted-foreground hover:text-primary transition-colors">
                        contact@nuklias.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Bucharest, Romania<br />
                        Remote consultations available worldwide
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We typically respond within 24 hours. For urgent matters, please call us directly.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold font-display text-primary">
                    Tell Us About Your Project
                  </h2>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Name *</label>
                      <input
                        {...form.register("name")}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="John Doe"
                      />
                      {form.formState.errors.name && (
                        <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Email *</label>
                      <input
                        type="email"
                        {...form.register("email")}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="john@company.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone and Location */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Phone</label>
                      <input
                        type="tel"
                        {...form.register("phone")}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="+1 (234) 567-890"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Location *</label>
                      <input
                        {...form.register("location")}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="City, Country"
                      />
                      {form.formState.errors.location && (
                        <p className="text-red-500 text-xs">{form.formState.errors.location.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Business Domain */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">What industry is your business in? *</label>
                    <select
                      {...form.register("businessDomain")}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    >
                      <option value="">Select your industry...</option>
                      {businessDomains.map((domain) => (
                        <option key={domain.value} value={domain.value}>
                          {domain.label}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.businessDomain && (
                      <p className="text-red-500 text-xs">{form.formState.errors.businessDomain.message}</p>
                    )}
                  </div>

                  {/* Business Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">What type of business do you have? *</label>
                    <input
                      {...form.register("businessType")}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="e.g., Online retail store, Local service business, SaaS platform..."
                    />
                    {form.formState.errors.businessType && (
                      <p className="text-red-500 text-xs">{form.formState.errors.businessType.message}</p>
                    )}
                  </div>

                  {/* Main Challenge */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">What's your main digital marketing challenge? *</label>
                    <textarea
                      {...form.register("mainChallenge")}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                      placeholder="e.g., Not getting enough qualified leads, Low conversion rates, Lack of brand visibility..."
                    />
                    {form.formState.errors.mainChallenge && (
                      <p className="text-red-500 text-xs">{form.formState.errors.mainChallenge.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Tell us more about your project *</label>
                    <textarea
                      {...form.register("message")}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                      placeholder="Share more details about what you're looking for, your goals, timeline, or any specific questions you have..."
                    />
                    {form.formState.errors.message && (
                      <p className="text-red-500 text-xs">{form.formState.errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
