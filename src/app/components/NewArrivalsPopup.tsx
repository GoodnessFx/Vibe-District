import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { products } from "../data/products";
import { useNavigate } from "react-router";
import { ArrowRight, Flame } from "lucide-react";

export function NewArrivalsPopup() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const newProducts = [...products]
    .filter((p) => p.isNew)
    .reverse()
    .slice(0, 4);
  // Create a version based on the new products IDs to track changes
  const newProductsVersion = "deals-v3-" + newProducts.map(p => p.id).slice(0, 5).join("-");

  useEffect(() => {
    const storedVersion = sessionStorage.getItem("newArrivalsVersion");
    if (storedVersion !== newProductsVersion && newProducts.length > 0) {
      // Delay slightly for better UX
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("newArrivalsVersion", newProductsVersion);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [newProductsVersion, newProducts.length]);

  if (newProducts.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[92vh] flex flex-col p-4 sm:p-6 overflow-hidden">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-accent text-primary">
              <Flame className="w-3.5 h-3.5 fill-primary" />
              HOT NEW DEALS JUST DROPPED
            </span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
            Fresh Drops & Exclusive Deals! 🔥
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-muted-foreground">
            We've just uploaded brand new <strong>Press-On Nails</strong>, <strong>Y2K & Chic Eyewear</strong>, and <strong>Luxury Hair Accessories</strong>. Check out our freshest deals below before they sell out!
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Products Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-3 pb-4 overflow-y-auto pr-1 max-h-[62vh] md:max-h-[68vh]"
          style={{ minHeight: 200 }}
        >
          {newProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-card border border-border/60 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:shadow-accent/20"
              onClick={() => {
                setOpen(false);
                navigate(`/product/${product.id}`);
              }}
            >
              {/* Product Image */}
              <div
                className="relative w-full h-48 sm:h-52 bg-gradient-to-br from-muted to-muted/50 overflow-hidden"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                {/* Fallback gradient so card is never blank if image is slow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200/40 to-gray-100/40 pointer-events-none" />
                <span className="absolute top-2 right-2 bg-black/80 text-white px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  NEW DEAL
                </span>
              </div>
              {/* Product Info */}
              <div className="p-3 flex flex-col gap-1.5">
                <span className="text-xs sm:text-sm font-bold line-clamp-2 text-primary group-hover:text-accent transition-colors leading-tight">
                  {product.name}
                </span>
                <span className="text-sm font-black text-accent">
                  ₦{product.price.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="flex flex-row gap-2 pt-2 border-t border-border/40 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1 sm:flex-none text-xs sm:text-sm font-semibold"
          >
            Later
          </Button>
          <Button
            className="flex-1 sm:flex-none bg-accent text-primary hover:bg-accent/90 font-black text-xs sm:text-sm inline-flex items-center gap-1.5"
            onClick={() => {
              setOpen(false);
              navigate("/shop");
            }}
          >
            <span>Shop All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
