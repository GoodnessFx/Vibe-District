import React from "react";
import { Link } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";

export function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const deliveryFee = getCartTotal() >= 15000 ? 0 : 2000;
  const total = getCartTotal() + deliveryFee;

  const handleWhatsAppOrder = () => {
    const items = cart
      .map(
        (item: CartItem, i: number) =>
          `[${i + 1}] ${item.product.name} — ${item.color} — ₦${item.product.price.toLocaleString()} × ${item.quantity}`
      )
      .join("\n");

    const message = encodeURIComponent(
      `Hi Vibe District! 👕\n\nMy order:\n\n${items}\n\n🛒 Subtotal: ₦${getCartTotal().toLocaleString()}\n🚚 Delivery: ₦${deliveryFee.toLocaleString()}\n💰 Total: ₦${total.toLocaleString()}\n\n📦 Deliver to: [Please enter address]\n📱 My number: [Please enter phone]\n\nPlease confirm all available! 🔥`
    );
    window.open(`https://wa.me/2348140082457?text=${message}`, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="relative mb-8">
            <ShoppingBag className="w-32 h-32 mx-auto text-muted/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground animate-bounce" />
            </div>
          </div>
          <h1 className="text-4xl font-black mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Looks like you haven't added any vibes yet. Explore our latest caps and durags!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-black text-xl hover:bg-accent hover:text-primary transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30 group"
          >
            <span>Start Shopping</span>
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-5xl font-black">Shopping Cart</h1>
        <span className="bg-accent text-primary px-3 py-1 rounded-full text-sm font-bold">
          {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => {
            const colorIndex = item.product.colors.indexOf(item.color);
            const itemImage = colorIndex !== -1 && item.product.images[colorIndex] 
              ? item.product.images[colorIndex] 
              : item.product.images[0];

            return (
              <div
                key={`${item.product.id}-${item.color}`}
                className="group bg-card rounded-xl p-4 sm:p-5 flex items-center gap-4 sm:gap-6 border border-border/60 hover:border-accent/30 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted border border-border/50">
                  <img
                    src={itemImage}
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content Container */}
                <div className="flex-1 min-w-0 flex flex-col h-20 sm:h-28 justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-bold text-base sm:text-lg hover:text-accent transition-colors block truncate leading-tight"
                      >
                        {item.product.name}
                        {item.product.isPreorder && (
                          <span className="ml-2 text-[9px] bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider inline-block align-middle">
                            Preorder
                          </span>
                        )}
                      </Link>
                      <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                        <span className="opacity-70">Colour:</span> <span className="font-medium text-foreground/80">{item.color}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.color)}
                      className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-md transition-all flex-shrink-0"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity and Price Row */}
                  <div className="flex items-center justify-between gap-4 mt-auto">
                    <div className="flex items-center bg-muted/40 rounded-lg border border-border/50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.color, item.quantity - 1)}
                        className="p-1.5 sm:p-2 hover:bg-muted/80 text-muted-foreground transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold w-8 text-center text-sm sm:text-base text-foreground/90">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.color, item.quantity + 1)}
                        className="p-1.5 sm:p-2 hover:bg-muted/80 text-muted-foreground transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg sm:text-xl font-bold text-foreground">
                        ₦{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between items-center pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-accent font-bold hover:underline"
            >
              <Minus className="w-4 h-4 rotate-180" />
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-muted-foreground hover:text-destructive font-medium flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-3xl p-8 shadow-xl border border-border sticky top-24">
            <h2 className="text-3xl font-black mb-8">Order Summary</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground font-medium">Subtotal</span>
                <span className="font-bold">₦{getCartTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground font-medium">Delivery Fee</span>
                <span className="font-bold">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-black">FREE</span>
                  ) : (
                    `₦${deliveryFee.toLocaleString()}`
                  )}
                </span>
              </div>
              
              {getCartTotal() < 15000 && (
                <div className="bg-accent/10 p-4 rounded-xl">
                  <p className="text-sm font-bold text-accent">
                    🚀 Add ₦{(15000 - getCartTotal()).toLocaleString()} more for FREE delivery!
                  </p>
                  <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-500"
                      style={{ width: `${(getCartTotal() / 15000) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="border-t border-border pt-6 mt-6">
                <div className="flex justify-between items-end">
                  <span className="text-xl font-black">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-accent block">
                      ₦{total.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      Inclusive of all taxes
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                to="/checkout"
                className="block w-full bg-primary text-primary-foreground px-6 py-5 rounded-2xl font-black text-xl hover:bg-accent hover:text-primary transition-all hover:scale-[1.02] active:scale-[0.98] text-center shadow-lg shadow-primary/20"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-5 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <WhatsAppIcon className="w-7 h-7 animate-pulse relative z-10" />
                <span className="relative z-10">Order via WhatsApp</span>
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-border flex flex-wrap gap-4 justify-center grayscale opacity-50">
              {/* Payment methods placeholder icons would go here */}
              <span className="text-xs font-bold uppercase tracking-widest">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
