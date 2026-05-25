import React, { useState } from "react";
import { Link } from "react-router";
import { Filter, X } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { motion } from "motion/react";

type Category = "all" | "snapback" | "durag" | "fitted" | "custom" | "beanie" | "finger-sleeves" | "skull-cap" | "necklace" | "watch" | "accessories";
type SortBy = "newest" | "price-low" | "price-high" | "best-selling";

export function Shop() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [filterOpen, setFilterOpen] = useState(false);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, product.colors[0], 1);
    }
  };

  const filteredProducts = products
    .filter((p) => selectedCategory === "all" || p.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "best-selling":
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        case "newest":
        default:
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
    });

  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">Shop All Products</h1>
        <p className="text-muted-foreground">
          {filteredProducts.length} products available
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="lg:hidden flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>

        {/* Sidebar Filters */}
        <aside
          className={`${
            filterOpen ? "block" : "hidden"
          } lg:block w-full lg:w-64 space-y-6 bg-card p-6 rounded-lg h-fit`}
        >
          <div className="flex items-center justify-between lg:hidden">
            <h3 className="font-bold text-lg">Filters</h3>
            <button onClick={() => setFilterOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="font-bold mb-4">Category</h3>
            <div className="space-y-2">
              {[
                { value: "all", label: "All Products" },
                { value: "snapback", label: "Snapbacks" },
                { value: "durag", label: "Durags" },
                { value: "beanie", label: "Beanies" },
                { value: "watch", label: "Wrist Watches" },
                { value: "necklace", label: "Necklaces" },
                { value: "finger-sleeves", label: "Finger Sleeves" },
                { value: "skull-cap", label: "Skull Caps" },
                { value: "custom", label: "Custom Caps" },
              ].map((cat) => (
                <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat.value}
                    checked={selectedCategory === cat.value}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value as Category);
                      setFilterOpen(false);
                    }}
                    className="w-4 h-4 accent-accent"
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="font-bold mb-4">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="w-full bg-input-background px-4 py-2 rounded-lg border border-border"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="best-selling">Best Selling</option>
            </select>
          </div>

          {/* Availability */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span>Low Stock</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span>New Arrival</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-muted min-h-[288px] flex items-center justify-center">
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <p className="font-black text-2xl text-muted-foreground/30 uppercase tracking-widest">
                        Coming Soon
                      </p>
                    </div>
                  )}
                  {product.isPreorder && (
                    <span className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-black tracking-wider">
                      PREORDER
                    </span>
                  )}
                  {product.isNew && (
                    <span className="absolute top-4 right-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-bold">
                      NEW
                    </span>
                  )}
                  {!product.isPreorder && product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                      Only {product.stock} left!
                    </span>
                  )}
                </Link>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {product.colors.length} color{product.colors.length > 1 ? "s" : ""} available
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.colors.slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-border"
                        style={{
                          backgroundColor:
                            color === "Black"
                              ? "#000"
                              : color === "Navy"
                              ? "#001f3f"
                              : color === "Cream"
                              ? "#faf8f5"
                              : color === "Gold"
                              ? "#d4af37"
                              : "#888",
                        }}
                        title={color}
                      ></div>
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-muted-foreground self-center">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-accent hover:text-primary transition-colors font-medium text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No products found</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSortBy("newest");
                }}
                className="mt-4 text-accent font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
