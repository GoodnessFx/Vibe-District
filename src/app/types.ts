export interface Product {
  id: string;
  name: string;
  price: number;
  category: "snapback" | "durag" | "fitted" | "custom" | "beanie" | "finger-sleeves" | "skull-cap";
  colors: string[];
  images: string[];
  description: string;
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isPreorder?: boolean;
}

export interface CartItem {
  product: Product;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  items: CartItem[];
  deliveryAddress: string;
  city: string;
  state: string;
  landmark: string;
  deliveryMethod: "delivery" | "pickup";
  paymentMethod: "transfer" | "pod";
  total: number;
  status: "confirmed" | "processing" | "dispatched" | "delivered";
  createdAt: Date;
}
