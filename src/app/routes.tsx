import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Lookbook } from "./pages/Lookbook";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { TrackOrder } from "./pages/TrackOrder";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "lookbook", Component: Lookbook },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "track", Component: TrackOrder },
      { path: "*", Component: NotFound },
    ],
  },
]);
