import React, { useState } from "react";
import { Link } from "react-router";
import { X } from "lucide-react";
import { motion } from "motion/react";

const lookbookImages = [
  {
    id: 1,
    src: "/image.png",
    category: "snapback",
    productId: "1",
  },
  {
    id: 2,
    src: "/image-1.png",
    category: "lifestyle",
    productId: "2",
  },
  {
    id: 3,
    src: "/image.png",
    category: "durag",
    productId: "4",
  },
  {
    id: 4,
    src: "/image-1.png",
    category: "snapback",
    productId: "3",
  },
  {
    id: 5,
    src: "/image.png",
    category: "lifestyle",
    productId: "1",
  },
  {
    id: 6,
    src: "/image-1.png",
    category: "snapback",
    productId: "2",
  },
];

type FilterType = "all" | "snapback" | "durag" | "lifestyle";

export function Lookbook() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const filteredImages = lookbookImages.filter(
    (img) => selectedFilter === "all" || img.category === selectedFilter
  );

  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4">Lookbook</h1>
        <p className="text-muted-foreground text-lg">
          Style inspiration from the streets of Lagos
        </p>
      </div>

      {/* Filter */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {[
          { value: "all", label: "All" },
          { value: "snapback", label: "Snapbacks" },
          { value: "durag", label: "Durags" },
          { value: "lifestyle", label: "Lifestyle" },
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedFilter(filter.value as FilterType)}
            className={`px-6 py-2 rounded-lg font-bold transition-colors ${
              selectedFilter === filter.value
                ? "bg-accent text-primary"
                : "bg-muted hover:bg-accent hover:text-primary"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setLightboxImage(index)}
          >
            <img
              src={image.src}
              alt={`Lookbook ${image.id}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Link
                to={`/product/${image.productId}`}
                className="bg-accent text-primary px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform"
                onClick={(e) => e.stopPropagation()}
              >
                Shop This Look
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-accent"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={filteredImages[lightboxImage].src}
            alt="Lightbox"
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <Link
              to={`/product/${filteredImages[lightboxImage].productId}`}
              className="bg-accent text-primary px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              Shop This Look
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
