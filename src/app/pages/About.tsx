import React from "react";
import { motion } from "motion/react";
import { Award, Palette, Truck, Users } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-muted-foreground text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-6"
          >
            About <span className="text-accent">Vibe District</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-primary-foreground/90"
          >
            Premium streetwear caps and durags crafted for every vibe, every lifestyle.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
           <img
             src="/products/cap blue green.jpeg"
             alt="Our Story Background"
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
         </div>

        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-black/40 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md"
          >
            <h2 className="text-4xl font-black mb-8 text-accent">Our Story</h2>
            <div className="space-y-6 text-lg md:text-xl font-medium text-white/90 leading-relaxed">
              <p>
                Founded by a visionary entrepreneur from Lagos, <span className="text-accent font-black">Vibe District</span> is established and run from the heart of <span className="text-accent">OUI Ife</span>. 
                The brand is led by a dedicated nursing student who balances the rigors of healthcare education with a passion for premium streetwear.
              </p>
              <p>
                We don't just sell headwear; we curate an experience. Vibe District is built on the philosophy of providing 
                <span className="text-accent font-black"> premium, affordable, and high-quality</span> accessories for those who value style without compromise. 
                Every piece in our collection is handpicked to ensure it meets our rigorous standards for comfort and aesthetic appeal.
              </p>
              <p>
                From the bustling streets of Lagos to the academic halls of Ife, Vibe District represents the hustle, the ambition, and the unique vibe of the modern trendsetter.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Quality Guaranteed",
                description:
                  "Premium materials and expert craftsmanship in every piece we create.",
              },
              {
                icon: Palette,
                title: "Available in Multiple Colours",
                description:
                  "Express yourself with our wide range of colors and custom options.",
              },
              {
                icon: Truck,
                title: "Fast & Reliable Delivery",
                description:
                  "Quick delivery across Lagos and nationwide shipping available.",
              },
              {
                icon: Users,
                title: "Bulk Orders Welcome",
                description:
                  "Special pricing for corporate gifts, events, and bulk purchases.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-primary rounded-full mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-12">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Snapbacks",
              description:
                "Classic fit, modern style. Adjustable for every head size with premium embroidery.",
              features: ["Classic fit", "Adjustable", "Premium embroidery"],
            },
            {
              title: "Durags",
              description:
                "Satin smooth and breathable. Perfect for waves, comfort, and style.",
              features: ["Satin smooth", "Breathable", "Extra-long ties"],
            },
            {
              title: "Custom Caps",
              description:
                "Your design, your vibe. Custom embroidery and personalization available.",
              features: ["Your design", "Your vibe", "Premium quality"],
            },
          ].map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-md"
            >
              <h3 className="font-black text-2xl mb-3">{product.title}</h3>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">Visit Us</h2>
          <p className="text-xl mb-2">Moremi Building, OUI, Lagos</p>
          <p className="text-primary-foreground/80 mb-6">
            Open Monday - Saturday, 10am - 7pm
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348140082457"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-primary px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              Chat on WhatsApp
            </a>
            <a
              href="tel:+2348140082457"
              className="inline-block bg-transparent border-2 border-primary-foreground px-8 py-4 rounded-lg font-bold hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
