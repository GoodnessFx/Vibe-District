import React, { useState } from "react";
import { MapPin, Phone, Instagram, Mail } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    // In a real app, this would send to a backend or email service
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully!");
  };

  const handleReset = () => {
    setFormData({ name: "", phone: "", email: "", message: "" });
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen">
      {/* Contact Hero with CEO Background */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden mb-12 min-h-[50vh] md:min-h-[60vh] flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/ceo.jpeg"
            alt="Vibe District CEO"
            className="w-full h-full object-cover object-center md:object-[center_25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black mb-6 tracking-tighter text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
          >
            Get In <span className="text-accent">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl font-bold text-white max-w-2xl mx-auto backdrop-blur-md bg-black/30 py-4 rounded-2xl px-8 border border-white/10"
          >
            We'd love to hear from you. Reach out anytime!
          </motion.p>
        </div>
      </section>

      <div className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-black mb-6">Send Us a Message</h2>
            
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-accent text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-8">
                  Thank you for reaching out. We've received your message and will get back to you shortly.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-accent hover:text-primary transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-2 text-sm">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full bg-input-background px-4 py-3 rounded-lg border border-border focus:border-accent outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2 text-sm">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 08123456789"
                      className="w-full bg-input-background px-4 py-3 rounded-lg border border-border focus:border-accent outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold mb-2 text-sm">Email Address (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-input-background px-4 py-3 rounded-lg border border-border focus:border-accent outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2 text-sm">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full bg-input-background px-4 py-3 rounded-lg border border-border focus:border-accent outline-none transition-colors"
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-lg font-bold hover:bg-accent hover:text-primary transition-all ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Prefer direct chat? <a href="https://wa.me/2348140082457" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-bold">WhatsApp us here</a>
                </p>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-card p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-black mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent text-primary rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Moremi Building, OUI, Lagos, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent text-primary rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <p className="text-muted-foreground">08140082457</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent text-primary rounded-lg">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/2348140082457"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent text-primary rounded-lg">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Instagram</h3>
                    <a
                      href="https://www.instagram.com/vibe_district0?igsh=MXE0YXR3NHlncGYzMQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      @vibe_district0
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-4">Business Hours</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-accent text-primary p-8 rounded-lg shadow-md text-center">
              <h3 className="font-black text-xl mb-2">Quick Order?</h3>
              <p className="mb-4">DM us directly for instant service</p>
              <a
                href="https://wa.me/2348140082457?text=Hi%20Vibe%20District%2C%20I%27d%20like%20to%20place%20an%20order%21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
