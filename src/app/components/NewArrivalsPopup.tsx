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

export function NewArrivalsPopup() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const newProducts = [...products].filter((p) => p.isNew).reverse().slice(0, 4);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("newArrivalsShown");
    if (!hasShown && newProducts.length > 0) {
      // Delay slightly for better UX
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("newArrivalsShown", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [newProducts.length]);

  if (newProducts.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            New Arrivals! <span role="img" aria-label="fire">🔥</span>
          </DialogTitle>
          <DialogDescription className="text-base">
            We've just added some fresh new items to our collection. Check them out before they're gone!
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {newProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => {
              setOpen(false);
              navigate(`/product/${product.id}`);
            }}>
              <div className="aspect-square w-full overflow-hidden rounded-md border bg-muted transition-transform group-hover:scale-105">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-center line-clamp-2 leading-tight h-8">
                {product.name}
              </span>
            </div>
          ))}
        </div>
        <DialogFooter className="flex-row gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1 sm:flex-none"
          >
            Later
          </Button>
          <Button
            className="flex-1 sm:flex-none bg-accent text-primary hover:bg-accent/90 font-bold"
            onClick={() => {
              setOpen(false);
              navigate("/shop");
            }}
          >
            Shop Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
