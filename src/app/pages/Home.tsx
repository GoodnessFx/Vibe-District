import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Truck, Users, Shield, Gift, Zap } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "motion/react";

const SOCIAL_PROOFS = [
  "Emeka from Lagos just copped a Snapback ⚡",
  "Tunde from Abuja just ordered a Durag 🔥",
  "Chioma from Port Harcourt just joined the tribe ✨",
  "Kola from Ibadan just ordered a Beanie ❄️",
  "Ayo from Lagos just copped a Chain ⛓️",
];

export function Home() {
  const { addToCart } = useCart();
  const featuredProducts = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const [proofIndex, setProofIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProofIndex((prev) => (prev + 1) % SOCIAL_PROOFS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, product.colors[0], 1);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Social Proof Ticker */}
      <div className="fixed bottom-24 left-4 z-[40] hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={proofIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white/90 backdrop-blur-md border border-accent/20 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium"
          >
            <Zap className="w-4 h-4 text-accent fill-accent" />
            <span>{SOCIAL_PROOFS[proofIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        <img
          src="/hero-banner.png"
          alt="Vibe District Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 mb-6 border border-accent/30 bg-accent/10 rounded-full"
          >
            <span className="text-accent text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
              New Season Drop
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-black font-bebas tracking-tighter mb-6 text-[#FAF8F5] leading-[0.9]"
          >
            IT'S MORE THAN <br />
            <span className="text-accent">A STATEMENT.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl mb-10 text-white/80 max-w-2xl mx-auto font-medium"
          >
            Premium streetwear accessories crafted for the bold. 
            Elevate your vibe with Lagos' finest headwear.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link
              to="/shop"
              className="group relative inline-flex items-center justify-center gap-2 bg-accent text-primary px-10 py-5 rounded-none font-bold overflow-hidden transition-all hover:pr-12"
            >
              <span className="relative z-10">SHOP COLLECTION</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/lookbook"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-10 py-5 rounded-none font-bold hover:bg-white hover:text-black transition-all"
            >
              EXPLORE LOOKBOOK
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-accent to-transparent animate-pulse"></div>
        </motion.div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto border-b border-border/10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-5xl md:text-7xl font-black font-bebas tracking-tighter mb-4">
              NEW <span className="text-accent">ARRIVALS</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              The latest drops from Vibe District. Stay ahead of the curve with our newest accessories.
            </p>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-accent font-bold hover:gap-4 transition-all uppercase tracking-widest text-sm"
          >
            Explore All Arrivals
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product, index) => (
            <motion.div
              key={`new-${product.id}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card border border-border/40 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <span className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                  New Drop
                </span>
              </Link>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg uppercase tracking-tight truncate flex-1">
                    {product.name}
                  </h3>
                  <p className="font-mono font-bold text-accent ml-2">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-1 uppercase tracking-wider">
                  {product.category}
                </p>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full bg-primary text-primary-foreground py-3 font-bold text-sm hover:bg-accent hover:text-primary transition-colors uppercase tracking-widest"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">Best Sellers</h2>
          <p className="text-muted-foreground text-lg">
            Our most popular caps, loved by customers across Lagos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card border border-border/40 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                    New Drop
                  </span>
                )}
                {product.stock <= 5 && (
                  <span className="absolute top-4 right-4 bg-destructive text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                    Last Pieces
                  </span>
                )}
              </Link>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg uppercase tracking-tight truncate flex-1">
                    {product.name}
                  </h3>
                  <p className="font-mono font-bold text-accent ml-2">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-1 uppercase tracking-wider">
                  {product.category}
                </p>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full bg-primary text-primary-foreground py-3 font-bold text-sm hover:bg-accent hover:text-primary transition-colors uppercase tracking-widest"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold hover:bg-accent hover:text-primary transition-colors"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Quick delivery across Lagos and Nigeria",
              },
              {
                icon: Users,
                title: "Bulk Orders Welcome",
                description: "Special discounts for bulk purchases",
              },
              {
                icon: Shield,
                title: "Quality Guaranteed",
                description: "Premium materials and craftsmanship",
              },
              {
                icon: Gift,
                title: "Perfect Gift",
                description: "Gift wrapping and custom messages available",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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

      {/* Instagram Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">Follow The Vibe</h2>
          <p className="text-muted-foreground text-lg mb-4">
            @vibe_district0 on Instagram
          </p>
          <a
            href="https://www.instagram.com/vibe_district0?igsh=MXE0YXR3NHlncGYzMQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent font-bold hover:underline"
          >
            Follow Us
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-muted rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={i % 2 === 0 ? "/social-preview.png" : "/hero-banner.png"}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Make a Statement?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of satisfied customers across Lagos
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform text-lg"
          >
            Start Shopping
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
