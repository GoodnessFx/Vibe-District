import React, { useState } from "react";
import { MapPin, Phone, Instagram, Mail } from "lucide-react";
import { toast } from "sonner";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hi Vibe District!\n\nName: ${formData.name}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );
    window.open(`https://wa.me/2348140082457?text=${message}`, "_blank");
    toast.success("Redirecting to WhatsApp...");
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4">Get In Touch</h1>
        <p className="text-muted-foreground text-lg">
          We'd love to hear from you. Reach out anytime!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-card p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-black mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-input-background px-4 py-3 rounded-lg border border-border"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-input-background px-4 py-3 rounded-lg border border-border"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-input-background px-4 py-3 rounded-lg border border-border"
                rows={6}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Send via WhatsApp
            </button>
          </form>
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
                    href="https://instagram.com/vibedistrict"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    @vibedistrict
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
                <span className="font-medium">Closed</span>
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
  );
}
