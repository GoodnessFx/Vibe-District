import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();
  const cartCount = getCartCount();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Lookbook", href: "/lookbook" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Track Order", href: "/track" },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hi Vibe District, I'd like to place an order!"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="mx-auto flex items-center justify-between px-4 py-4 max-w-7xl lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl tracking-wider font-bold">
              VIBE <span className="text-accent">DISTRICT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors hover:text-accent ${
                  location.pathname === item.href ? "text-accent" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-white/10">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-2 rounded-lg transition-colors hover:bg-white/10 ${
                    location.pathname === item.href ? "bg-white/10 text-accent" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Marquee Ticker */}
      <div className="bg-accent text-primary overflow-hidden py-2">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="inline-flex gap-8 items-center">
              <span>NEW DROPS</span>
              <span>✦</span>
              <span>SNAPBACKS</span>
              <span>✦</span>
              <span>DURAGS</span>
              <span>✦</span>
              <span>BEANIES</span>
              <span>✦</span>
              <span>FINGER SLEEVES</span>
              <span>✦</span>
              <span>FREE DELIVERY ON ORDERS ABOVE ₦15,000</span>
              <span>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="text-2xl tracking-wider font-bold mb-4">
                VIBE <span className="text-accent">DISTRICT</span>
              </div>
              <p className="text-primary-foreground/80 mb-4">
                Premium quality caps and durags for every vibe, every lifestyle.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/vibe_district0?igsh=MXE0YXR3NHlncGYzMQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={`https://wa.me/2348140082457?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {navigation.slice(0, 4).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>Moremi Building, OUI, Lagos</p>
                <p>08140082457</p>
                <p>@vibe_district0</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2026 Vibe District. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/2348140082457?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] hover:scale-110 transition-all z-50 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40"></div>
        <WhatsAppIcon className="w-8 h-8 relative z-10" />
      </a>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
