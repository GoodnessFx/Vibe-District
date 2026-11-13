import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "sonner";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
      <PWAInstallPrompt />
    </CartProvider>
  );
}