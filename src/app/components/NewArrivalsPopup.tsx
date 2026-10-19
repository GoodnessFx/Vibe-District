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
  const newProducts = [...products].filter((p) => p.isNew).reverse();
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-4 sm:p-6 overflow-hidden">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 py-3 overflow-y-auto max-h-[50vh] pr-1">
          {newProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-card border border-border/60 hover:border-accent rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md"
              onClick={() => {
                setOpen(false);
                navigate(`/product/${product.id}`);
              }}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <span className="absolute top-1.5 right-1.5 bg-accent/90 text-primary px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                  NEW DEAL
                </span>
              </div>
              <div className="p-2 flex flex-col flex-1 justify-between">
                <span className="text-[11px] sm:text-xs font-bold line-clamp-1 group-hover:text-accent transition-colors">
                  {product.name}
                </span>
                <span className="text-xs font-black text-accent mt-1">
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
