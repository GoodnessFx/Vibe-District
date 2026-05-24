import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Plus, Minus, ShoppingCart, Share2 } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { motion } from "motion/react";
import { toast } from "sonner";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleColorSelect = (color: string, index: number) => {
    setSelectedColor(color);
    // If the index matches an image, select it
    if (product && index < product.images.length) {
      setSelectedImage(index);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-accent font-bold hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi Vibe District! 🧢\n\nI want to order:\n\n🧢 Item: ${product.name}\n🎨 Colour: ${selectedColor}\n🔢 Qty: ${quantity}\n💰 Total: ₦${(product.price * quantity).toLocaleString()}\n\n📦 Deliver to: [Please enter address]\n📱 My number: [Please enter phone]\n\nIs this available? Let's go! 🔥`
    );
    window.open(`https://wa.me/2348140082457?text=${message}`, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} from Vibe District!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 rounded-lg overflow-hidden bg-muted min-h-[500px] flex items-center justify-center"
          >
            {product.images.length > 0 ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <p className="font-black text-3xl md:text-5xl text-muted-foreground/20 uppercase tracking-[0.2em]">
                  Coming Soon
                </p>
              </div>
            )}
          </motion.div>
          <div className="flex gap-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-1 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-accent" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {product.isNew && (
            <span className="inline-block bg-accent text-primary px-3 py-1 rounded-full text-sm font-bold mb-4">
              NEW ARRIVAL
            </span>
          )}
          {product.isPreorder && (
            <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-black tracking-wider mb-4 ml-2">
              PREORDER
            </span>
          )}
          <h1 className="text-4xl font-black mb-4">{product.name}</h1>
          <p className="text-3xl font-black text-accent mb-6">
            ₦{product.price.toLocaleString()}
          </p>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Stock Status */}
          {product.isPreorder ? (
            <p className="text-orange-500 font-bold mb-4">★ Preorder item (Ships in 7-14 days)</p>
          ) : product.stock <= 5 ? (
            <p className="text-destructive font-bold mb-4">
              ⚠️ Only {product.stock} left in stock!
            </p>
          ) : (
            <p className="text-green-600 font-bold mb-4">✓ In Stock</p>
          )}

          {/* Color Selector */}
          <div className="mb-6">
            <label className="block font-bold mb-3">
              Select Colour: <span className="text-accent">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color, index) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color, index)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                    selectedColor === color
                      ? "border-accent bg-accent text-primary"
                      : "border-border hover:border-accent"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block font-bold mb-3">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 bg-muted rounded-lg hover:bg-accent hover:text-primary transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 bg-muted rounded-lg hover:bg-accent hover:text-primary transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-lg font-bold hover:bg-accent hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {product.isPreorder ? "Preorder Now" : "Add to Cart"}
            </button>
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Order via WhatsApp
            </button>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <Share2 className="w-5 h-5" />
            Share this product
          </button>

          {/* Product Details */}
          <div className="border-t border-border pt-6 space-y-4">
            <details className="group">
              <summary className="font-bold cursor-pointer">Material & Care</summary>
              <p className="text-muted-foreground mt-2">
                Premium quality fabric with durable stitching. Hand wash recommended. Do not
                bleach.
              </p>
            </details>
            <details className="group">
              <summary className="font-bold cursor-pointer">Shipping & Delivery</summary>
              <p className="text-muted-foreground mt-2">
                Free delivery on orders above ₦15,000. Lagos delivery within 1-3 business days.
                Nationwide delivery within 3-7 business days.
              </p>
            </details>
            <details className="group">
              <summary className="font-bold cursor-pointer">Size Guide</summary>
              <p className="text-muted-foreground mt-2">
                Adjustable snapback fits most head sizes (54-61cm). For fitted caps, please
                contact us via WhatsApp for sizing.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl font-black mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">{relatedProduct.name}</h3>
                  <p className="text-2xl font-black">₦{relatedProduct.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
