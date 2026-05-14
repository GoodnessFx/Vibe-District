import { Product } from "../types";

export const products: Product[] = [
  {
    id: "snapback-1",
    name: "Vibe District Snapback",
    price: 10000,
    category: "snapback",
    colors: ["Black", "Blue Green", "Blue", "Red", "Sky Blue"],
    images: [
      "/products/cap black.jpeg",
      "/products/cap blue green.jpeg",
      "/products/cap blue.jpeg",
      "/products/cap red.jpeg",
      "/products/cap sky blue.jpeg",
      "/products/cap blue.jfif",
    ],
    description: "Premium quality Vibe District snapback. Available in multiple colors to match your style. Professional finish and comfortable fit.",
    stock: 50,
    isBestSeller: true,
  },
  {
    id: "durag-1",
    name: "Premium Satin Durag",
    price: 4000,
    category: "durag",
    colors: ["Black", "Navy", "Burgundy", "Gold"],
    images: [
      "/products/durag.jpeg",
    ],
    description: "Ultra-smooth satin durag for perfect waves. Breathable and comfortable professional grade material.",
    stock: 100,
    isBestSeller: true,
  },
  {
    id: "beanie-1",
    name: "Vibe District Beanie",
    price: 7000,
    category: "beanie",
    colors: ["Army", "Fashion", "Grey Cross", "Lego"],
    images: [
      "/products/Beanie Army design 01.jpeg",
      "/products/Beanie fashion.jpeg",
      "/products/Beanie flor.jpeg",
      "/products/Beanie grey cross.jpeg",
      "/products/Beanie lego fashion.jpeg",
      "/products/beanie inspiration.jpeg",
    ],
    description: "Keep warm and stylish with our premium beanies. High-quality knit with various designs.",
    stock: 40,
    isNew: true,
  },
  {
    id: "finger-sleeves-1",
    name: "Gaming Finger Sleeves",
    price: 2000,
    category: "finger-sleeves",
    colors: ["Standard"],
    images: [
      "/products/finger sleeves.jpeg",
      "/products/finger sleeves 02.jpeg",
    ],
    description: "High-sensitivity gaming finger sleeves. Perfect for mobile gaming, providing smooth movement and sweat resistance. Sold per pair.",
    stock: 200,
    isNew: true,
  },
  {
    id: "skull-cap-1",
    name: "Professional Skull Cap",
    price: 4000,
    category: "skull-cap",
    colors: ["Black"],
    images: [
      "/products/beanie inspiration.jpeg", // Using a placeholder if no specific skull cap image
    ],
    description: "Sleek and professional skull cap. Perfect for under-helmet wear or as a minimal head covering.",
    stock: 30,
  },
  {
    id: "custom-1",
    name: "Custom Design Cap",
    price: 15000, // Adjusted price for custom work
    category: "custom",
    colors: ["Any Color"],
    images: [
      "/products/cap sky blue.jpeg",
    ],
    description: "Create your own design! Add your name, logo, or custom embroidery. Contact us for details.",
    stock: 10,
    isNew: true,
  },
];
