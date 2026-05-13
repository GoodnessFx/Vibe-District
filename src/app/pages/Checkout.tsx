import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";

import { CartItem } from "../types";

type Step = 1 | 2 | 3 | 4;

export function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    deliveryMethod: "delivery" as "delivery" | "pickup",
    paymentMethod: "transfer" as "transfer" | "pod",
  });

  const deliveryFee = formData.deliveryMethod === "pickup" ? 0 : getCartTotal() >= 15000 ? 0 : 2000;
  const total = getCartTotal() + deliveryFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.phone || !formData.whatsapp) {
          toast.error("Please fill in all required contact details");
          return false;
        }
        const phoneRegex = /^[0-9]{10,14}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
          toast.error("Please enter a valid phone number");
          return false;
        }
        return true;
      case 2:
        if (formData.deliveryMethod === "delivery") {
          if (!formData.address || !formData.city || !formData.state) {
            toast.error("Please fill in all delivery details");
            return false;
          }
        }
        return true;
      case 3:
      case 4:
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1) as Step);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as Step);
  };

  const handleSubmit = () => {
    const items = cart
      .map(
        (item: CartItem, i: number) =>
          `${i + 1}. ${item.product.name} (${item.color}) x${item.quantity} - ₦${(
            item.product.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    const deliveryInfo =
      formData.deliveryMethod === "delivery"
        ? `📦 Delivery to: ${formData.address}, ${formData.city}, ${formData.state}${
            formData.landmark ? `\n🗺️ Landmark: ${formData.landmark}` : ""
          }`
        : `📦 Pickup at: Moremi Building, OUI, Lagos`;

    const message = encodeURIComponent(
      `Hi Vibe District! 👋\n\nI'd like to place an order:\n\n${items}\n\n💰 Subtotal: ₦${getCartTotal().toLocaleString()}\n🚚 Delivery: ₦${deliveryFee.toLocaleString()}\n💵 Total: ₦${total.toLocaleString()}\n\n👤 Name: ${
        formData.fullName
      }\n📱 Phone: ${formData.phone}\n💬 WhatsApp: ${formData.whatsapp}${
        formData.email ? `\n📧 Email: ${formData.email}` : ""
      }\n\n${deliveryInfo}\n\n💳 Payment: ${
        formData.paymentMethod === "transfer" ? "Bank Transfer" : "Pay on Delivery"
      }\n\nPlease confirm this order. Thank you!`
    );

    window.open(`https://wa.me/2348140082457?text=${message}`, "_blank");

    setTimeout(() => {
      clearCart();
      toast.success("Order placed! We'll confirm via WhatsApp within 1 hour.");
      navigate("/");
    }, 1000);
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const steps = [
    { number: 1, title: "Contact Info" },
    { number: 2, title: "Delivery" },
    { number: 3, title: "Review" },
    { number: 4, title: "Payment" },
  ];

  return (
    <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= step.number
                      ? "bg-accent text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className="text-xs mt-2 font-medium hidden sm:block">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > step.number ? "bg-accent" : "bg-muted"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-card rounded-lg p-6 shadow-md mb-6">
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-black mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-input-background px-4 py-3 rounded-lg border border-border"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-input-background px-4 py-3 rounded-lg border border-border"
                    placeholder="08123456789"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-input-background px-4 py-3 rounded-lg border border-border"
                    placeholder="08123456789"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-2">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-input-background px-4 py-3 rounded-lg border border-border"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-black mb-6">Delivery Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Delivery Method</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-accent transition-colors">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={formData.deliveryMethod === "delivery"}
                      onChange={handleChange}
                      className="w-5 h-5 accent-accent"
                    />
                    <div>
                      <div className="font-bold">Home Delivery</div>
                      <div className="text-sm text-muted-foreground">
                        Delivered to your address
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-accent transition-colors">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === "pickup"}
                      onChange={handleChange}
                      className="w-5 h-5 accent-accent"
                    />
                    <div>
                      <div className="font-bold">Pickup</div>
                      <div className="text-sm text-muted-foreground">
                        Moremi Building, OUI
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {formData.deliveryMethod === "delivery" && (
                <>
                  <div>
                    <label className="block font-bold mb-2">Delivery Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-input-background px-4 py-3 rounded-lg border border-border"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-input-background px-4 py-3 rounded-lg border border-border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full bg-input-background px-4 py-3 rounded-lg border border-border"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold mb-2">Landmark (Optional)</label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      className="w-full bg-input-background px-4 py-3 rounded-lg border border-border"
                      placeholder="Nearest landmark for easy location"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-black mb-6">Order Review</h2>
            <div className="space-y-4">
              {cart.map((item: CartItem) => (
                <div
                  key={`${item.product.id}-${item.color}`}
                  className="flex gap-4 pb-4 border-b border-border"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">Colour: {item.color}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              <div className="space-y-2 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">₦{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₦${deliveryFee.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-xl border-t border-border pt-2">
                  <span className="font-black">Total</span>
                  <span className="font-black text-accent">₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-black mb-6">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-accent transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="transfer"
                  checked={formData.paymentMethod === "transfer"}
                  onChange={handleChange}
                  className="w-5 h-5 accent-accent mt-1"
                />
                <div className="flex-1">
                  <div className="font-bold mb-2">Bank Transfer</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Transfer to our account and upload proof of payment
                  </div>
                  {formData.paymentMethod === "transfer" && (
                    <div className="bg-muted p-4 rounded-lg text-sm border-l-4 border-accent">
                      <p className="font-black mb-2 text-primary">Bank Details:</p>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bank:</span>
                          <span className="font-bold">OPay</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Account Name:</span>
                          <span className="font-bold">Hephzibah omodayo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Account Number:</span>
                          <span className="font-bold text-accent tracking-wider">81400082457</span>
                        </div>
                      </div>
                      <p className="mt-4 text-muted-foreground italic">
                        Send payment proof via WhatsApp after transfer for instant confirmation.
                      </p>
                    </div>
                  )}
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-accent transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pod"
                  checked={formData.paymentMethod === "pod"}
                  onChange={handleChange}
                  className="w-5 h-5 accent-accent mt-1"
                />
                <div>
                  <div className="font-bold">Pay on Delivery</div>
                  <div className="text-sm text-muted-foreground">
                    Pay with cash when you receive your order
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="flex-1 px-8 py-4 border-2 border-primary text-primary rounded-2xl font-black text-lg hover:bg-primary/5 transition-all active:scale-95"
          >
            Previous Step
          </button>
        )}
        {currentStep < 4 ? (
          <button
            onClick={nextStep}
            className="flex-1 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:bg-accent hover:text-primary transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            Continue to {steps[currentStep].title}
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#25D366]/30 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <WhatsAppIcon className="w-6 h-6 animate-pulse" />
            <span className="relative z-10">Confirm & Order via WhatsApp</span>
          </button>
        )}
      </div>
    </div>
  );
}
