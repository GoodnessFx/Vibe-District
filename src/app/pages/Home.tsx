import React from "react";
import { Link } from "react-router";
import { ArrowRight, Truck, Users, Shield, Gift } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { motion } from "motion/react";

export function Home() {
  const { addToCart } = useCart();
  const featuredProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, product.colors[0], 1);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center bg-gradient-to-br from-primary via-muted-foreground to-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="/image-1.png"
          alt="Vibe District Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            It's More Than a Cap.
            <br />
            <span className="text-accent">It's a Statement.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-primary-foreground/90"
          >
            Premium streetwear caps and durags for every vibe, every lifestyle.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/lookbook"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-lg font-bold hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              View Lookbook
            </Link>
          </motion.div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.isNew && (
                  <span className="absolute top-4 right-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-bold">
                    NEW
                  </span>
                )}
                {product.stock <= 5 && (
                  <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                    Only {product.stock} left!
                  </span>
                )}
              </Link>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {product.colors.length} colors available
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black">₦{product.price.toLocaleString()}</span>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-accent hover:text-primary transition-colors font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
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
                src={i % 2 === 0 ? "src/imports/image.png" : "src/imports/image-1.png"}
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
