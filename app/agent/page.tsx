"use client";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";
import { useState } from "react";

// Sample product data (in a real app, fetch from backend or API)
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    description: "100% cotton, unisex, all sizes.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    featured: true,
  },
  {
    id: 2,
    name: "Blue Denim Jeans",
    description: "Slim fit, stretchable, durable.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    featured: true,
  },
  {
    id: 3,
    name: "Sneakers",
    description: "Comfortable everyday shoes.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },
  {
    id: 4,
    name: "Leather Wallet",
    description: "Genuine leather, multiple slots.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1526178613658-3f1622045557?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },
  {
    id: 5,
    name: "Baseball Cap",
    description: "Adjustable, breathable fabric.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    featured: false,
  },
];

export default function Storefront() {
  // Filter featured products for the carousel
  const featured = products.filter((p) => p.featured);

  // Use cart context
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  // State for cart drawer visibility
  const [cartOpen, setCartOpen] = useState(false);

  // Calculate cart total
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
      {/* Sticky Top Navbar */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <Link href="/agent" className="text-2xl font-bold tracking-tight text-primary">
            Agent Shop
          </Link>
          <button
            className="relative px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/80 transition"
            onClick={() => setCartOpen(true)}
          >
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section with background image and overlay */}
      <section className="relative w-full h-[320px] flex items-center justify-center mb-12">
        <Image
          src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80"
          alt="Shop Hero"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-zinc-100/60 dark:from-zinc-900/80 dark:to-zinc-800/60" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary drop-shadow-lg">Welcome to Agent Shop</h1>
          <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-200 mb-6 font-medium drop-shadow">Discover quality essentials for your everyday style.</p>
          <a href="#products" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow hover:bg-primary/90 transition">Shop Now</a>
        </div>
      </section>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />
          {/* Drawer */}
          <aside className="relative w-full max-w-md h-full bg-white dark:bg-zinc-900 shadow-2xl p-6 flex flex-col gap-4 animate-slide-in-right border-l border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-2xl font-bold"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                &times;
              </button>
            </div>
            {cartItems.length === 0 ? (
              <div className="text-zinc-500 text-center py-12">Your cart is empty.</div>
            ) : (
              <ul className="flex-1 overflow-y-auto divide-y divide-zinc-200 dark:divide-zinc-800">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-4 flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={48}
                      className="rounded shadow"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-zinc-500">${item.price.toFixed(2)} x {item.quantity}</div>
                    </div>
                    <button
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {/* Cart total and actions */}
            <div className="mt-4 border-t pt-4 flex flex-col gap-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                className="w-full bg-zinc-800 text-white py-2 rounded hover:bg-zinc-700 disabled:opacity-50"
                onClick={clearCart}
                disabled={cartItems.length === 0}
              >
                Clear Cart
              </button>
              {/* Go to Checkout button */}
              <Link
                href="/checkout"
                className={`w-full block mt-2 ${cartItems.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => setCartOpen(false)}
              >
                <Button className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:bg-primary/80" disabled={cartItems.length === 0}>
                  Go to Checkout
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Featured Products Carousel */}
      <section className="w-full max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary">Featured Products</h2>
        <Carousel className="relative">
          <CarouselContent>
            {featured.map((product) => (
              <CarouselItem key={product.id} className="flex justify-center">
                <Card className="w-full max-w-md shadow-lg hover:shadow-2xl transition-shadow border border-zinc-200 dark:border-zinc-800 rounded-xl">
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden mb-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-lg"
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority
                      />
                    </div>
                    <div className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => addToCart(product)}>
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Product Grid Section */}
      <section id="products" className="w-full max-w-6xl mx-auto px-2 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Shop Products</h2>
        {/* Responsive grid: 1 col on mobile, 2 on sm, 3 on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow border border-zinc-200 dark:border-zinc-800 rounded-xl">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
