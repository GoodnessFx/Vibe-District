import React, { useState, useEffect } from "react";
import { Search, Package, Truck, CheckCircle, MapPin, Clock, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";

export function TrackOrder() {
  const [trackingInfo, setTrackingInfo] = useState("");
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInfo.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setOrderStatus("confirmed");
        setIsSearching(false);
      }, 1500);
    }
  };

  const statuses = [
    { 
      key: "confirmed", 
      label: "Order Confirmed", 
      icon: CheckCircle, 
      time: "10:30 AM", 
      description: "We've received your order and it's being processed.",
      color: "bg-blue-500"
    },
    { 
      key: "processing", 
      label: "Processing", 
      icon: Package, 
      time: "11:45 AM", 
      description: "Your items are being carefully packed and quality checked.",
      color: "bg-purple-500"
    },
    { 
      key: "dispatched", 
      label: "Out for Delivery", 
      icon: Truck, 
      time: "02:15 PM", 
      description: "Our rider is on the way to your location.",
      color: "bg-amber-500"
    },
    { 
      key: "delivered", 
      label: "Delivered", 
      icon: ShieldCheck, 
      time: "Pending", 
      description: "Order has been successfully delivered. Enjoy your vibe!",
      color: "bg-green-500"
    },
  ];

  const currentStatusIndex = statuses.findIndex((s) => s.key === orderStatus);

  return (
    <div className="min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full font-bold text-sm mb-4"
        >
          REAL-TIME TRACKING
        </motion.div>
        <h1 className="text-6xl font-black mb-6 tracking-tight">Track Your Vibes</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Enter your phone number or order reference to see exactly where your fresh gear is.
        </p>
      </div>

      {/* Tracking Form */}
      <motion.div 
        layout
        className="bg-card p-10 rounded-3xl shadow-2xl border border-border/50 mb-16 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <form onSubmit={handleTrack} className="relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={trackingInfo}
                onChange={(e) => setTrackingInfo(e.target.value)}
                placeholder="Order ID (e.g., VD-12345) or Phone Number"
                className="w-full bg-input-background px-6 py-5 rounded-2xl border-2 border-border focus:border-accent outline-none transition-all text-lg font-medium"
                required
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-black text-xl hover:bg-accent hover:text-primary transition-all hover:scale-105 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
            >
              {isSearching ? (
                <div className="w-6 h-6 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              ) : (
                <>Track Order</>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      <AnimatePresence mode="wait">
        {orderStatus && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="space-y-12"
          >
            {/* Pictorial Representation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Timeline Card */}
              <div className="lg:col-span-2 bg-card p-8 rounded-3xl shadow-xl border border-border">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black">Live Progress</h2>
                  <div className="flex items-center gap-2 text-accent bg-accent/10 px-4 py-2 rounded-xl font-bold">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    Real-time
                  </div>
                </div>

                <div className="relative space-y-12">
                  {/* Vertical Line */}
                  <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
                      className="w-full bg-accent transition-all duration-1000"
                    />
                  </div>

                  {statuses.map((status, index) => {
                    const Icon = status.icon;
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;

                    return (
                      <motion.div 
                        key={status.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-8 relative"
                      >
                        <div 
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 ${
                            isCompleted ? 'bg-accent text-primary shadow-lg shadow-accent/20' : 'bg-muted text-muted-foreground'
                          } ${isCurrent ? 'ring-4 ring-accent/30 scale-110' : ''}`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className={`text-xl font-black ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {status.label}
                            </h3>
                            <span className="text-sm font-bold text-muted-foreground flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {status.time}
                            </span>
                          </div>
                          <p className={`text-lg ${isCompleted ? 'text-muted-foreground font-medium' : 'text-muted-foreground/50'}`}>
                            {status.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Info Card */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-primary text-primary-foreground p-8 rounded-3xl shadow-xl relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  <h3 className="text-2xl font-black mb-6">Delivery Details</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="p-3 bg-white/10 rounded-xl">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest">Address</p>
                        <p className="text-lg font-bold">Moremi, OUI, Lagos</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="p-3 bg-white/10 rounded-xl">
                        <Truck className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary-foreground/60 uppercase tracking-widest">Courier</p>
                        <p className="text-lg font-bold">Vibe District Express</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-8 rounded-3xl shadow-xl border border-border text-center">
                  <h3 className="text-xl font-black mb-4">Estimated Delivery</h3>
                  <div className="text-4xl font-black text-accent mb-2">Today</div>
                  <p className="text-muted-foreground font-medium">By 6:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Section */}
      <div className="mt-20 text-center">
        <h3 className="text-3xl font-black mb-8">Having trouble?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-card p-8 rounded-3xl border border-border hover:border-accent transition-colors">
            <WhatsAppIcon className="w-10 h-10 text-accent mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">WhatsApp Support</h4>
            <p className="text-muted-foreground mb-6">Chat with us for instant updates</p>
            <a
              href="https://wa.me/2348140082457?text=Hi%20Vibe%20District%2C%20I%27d%20like%20to%20track%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-accent font-black hover:underline"
            >
              Start Chat
            </a>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border hover:border-accent transition-colors">
            <Clock className="w-10 h-10 text-accent mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Business Hours</h4>
            <p className="text-muted-foreground mb-6">Mon - Sat: 10am - 7pm</p>
            <a href="/contact" className="inline-block text-accent font-black hover:underline">
              View Contact Info
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
