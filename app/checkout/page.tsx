"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Review
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  // react-hook-form for form state and validation
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle order placement (simulate async)
  async function onSubmit() {
    setLoading(true);
    setOrderError("");
    try {
      // Simulate network delay
      await new Promise(res => setTimeout(res, 1200));
      clearCart();
      setOrderPlaced(true);
    } catch (e) {
      setOrderError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Step 1: Shipping/Payment form
  function ShippingForm() {
    return (
      <form onSubmit={handleSubmit(() => setStep(2))} aria-label="Shipping and Payment Form">
        <h2 className="text-xl font-bold mb-4">Shipping & Payment Info</h2>
        <div className="mb-2">
          <label className="block mb-1 font-medium" htmlFor="name">Full Name</label>
          <input id="name" {...register("name", { required: true })} className="input w-full px-3 py-2 border rounded" />
          {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium" htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email", { required: true, pattern: /.+@.+\..+/ })} className="input w-full px-3 py-2 border rounded" />
          {errors.email && <span className="text-red-500 text-xs">Valid email is required</span>}
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium" htmlFor="address">Shipping Address</label>
          <input id="address" {...register("address", { required: true })} className="input w-full px-3 py-2 border rounded" />
          {errors.address && <span className="text-red-500 text-xs">Address is required</span>}
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-medium" htmlFor="payment">Payment Method</label>
          <select id="payment" {...register("payment", { required: true })} className="input w-full px-3 py-2 border rounded">
            <option value="">Select...</option>
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
          {errors.payment && <span className="text-red-500 text-xs">Select a payment method</span>}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 mt-2 mb-4">
          <FaLock className="text-green-600" /> Secure Checkout
        </div>
        <Button type="submit" className="w-full mt-2">Continue</Button>
      </form>
    );
  }

  // Step 2: Review & Place Order
  function ReviewStep() {
    const values = getValues();
    return (
      <form onSubmit={handleSubmit(onSubmit)} aria-label="Review and Place Order">
        <h2 className="text-xl font-bold mb-4">Review & Confirm</h2>
        <div className="mb-4">
          <div className="font-medium">Shipping To:</div>
          <div>{values.name}</div>
          <div>{values.email}</div>
          <div>{values.address}</div>
        </div>
        <div className="mb-4">
          <div className="font-medium">Payment Method:</div>
          <div>{values.payment === "credit" ? "Credit Card" : values.payment === "paypal" ? "PayPal" : "-"}</div>
        </div>
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800 mb-6">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-4">
              <Image src={item.image} alt={item.name} width={64} height={48} className="rounded" />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-zinc-500">${item.price.toFixed(2)} x {item.quantity}</div>
              </div>
              <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center font-semibold text-lg mb-6">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {orderError && <div className="text-red-500 text-sm mb-2">{orderError}</div>}
        <Button type="submit" className="w-full" disabled={loading} aria-busy={loading} aria-disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </Button>
        <Button type="button" variant="outline" className="w-full mt-2" onClick={() => setStep(1)} disabled={loading}>
          Back
        </Button>
      </form>
    );
  }

  // Show thank you or empty cart as before
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
          <p className="mb-6">Your order has been placed successfully.</p>
          <Link href="/agent">
            <Button>Back to Store</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/agent">
            <Button>Back to Store</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Main checkout UI with progress bar and stepper
  return (
    <div className="min-h-screen flex flex-col items-center bg-background px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-zinc-200 rounded-full h-2">
            <div className={`bg-primary h-2 rounded-full transition-all`} style={{ width: step === 1 ? "50%" : "100%" }} />
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className={step === 1 ? "font-bold text-primary" : "text-zinc-500"}>Shipping</span>
            <span className={step === 2 ? "font-bold text-primary" : "text-zinc-500"}>Review</span>
          </div>
        </div>
        {step === 1 ? <ShippingForm /> : <ReviewStep />}
        <Link href="/agent" className="block text-center mt-4 text-primary hover:underline">
          &larr; Back to Store
        </Link>
      </div>
    </div>
  );
} 