'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Import Lucide icons for a modern look
import { Sparkles, ArrowRight, CheckCircle, Star, Twitter, Github, Linkedin } from 'lucide-react';

// Helper: Array of testimonials for carousel
const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'Marketing Director',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'The AI companion has transformed how I work. It helps me draft emails, schedule meetings, and even gives me creative ideas for campaigns.'
  },
  {
    name: 'James Peters',
    title: 'Software Developer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'Having an AI that can explain complex coding concepts and help debug my code has been a game-changer for my productivity.'
  },
  {
    name: 'Elena Rodriguez',
    title: 'Small Business Owner',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    text: 'I feel like I have a personal assistant 24/7. From managing inventory to customer support drafts, this AI has become essential to my business.'
  },
];

// Main landing page component for the AI companion product
export default function AiCompanionLandingPage() {
  // State for the email input in the newsletter form
  const [email, setEmail] = useState('');
  // State for handling form submission
  const [isSubmitted, setIsSubmitted] = useState(false);
  // State for pricing toggle
  const [isYearly, setIsYearly] = useState(false);
  // State for testimonial carousel
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Handle newsletter form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 2000); // Hide after 2s
  };

  // Helper: Pricing values
  const pricing = {
    free: { price: 0, label: 'Free', desc: 'Get started with basic features' },
    pro: { price: isYearly ? 190 : 19, label: 'Pro', desc: 'Everything you need' },
    business: { price: isYearly ? 490 : 49, label: 'Business', desc: 'For teams and companies' },
  };

  // Helper: Animate to next testimonial
  const nextTestimonial = () => setTestimonialIdx((testimonialIdx + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-x-hidden">
      {/* Animated background shapes */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/30 to-purple-300/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-br from-pink-200/30 to-blue-200/10 rounded-full blur-2xl animate-pulse z-0" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1 bg-white/70 rounded-full shadow border border-blue-100 mb-4 animate-fade-in">
            <Sparkles className="w-5 h-5 text-blue-500 animate-bounce" />
            <span className="text-blue-600 font-semibold">New: AI Companion 2.0 just launched!</span>
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight drop-shadow-lg">
            Your AI Companion <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">for Everything</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-in">
            Meet your personal AI assistant that learns, adapts, and grows with you. Available 24/7 to help with tasks, answer questions, and keep you company.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all font-medium text-lg flex items-center gap-2 group">
              Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/80 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 hover:scale-105 transition-all font-medium text-lg flex items-center gap-2">
              See How It Works
            </button>
          </div>
          {/* Modern mockup/illustration */}
          <div className="relative h-[400px] md:h-[500px] w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-blue-100 bg-white/60 backdrop-blur-md flex items-center justify-center animate-fade-in">
            <Image src="/ai-mockup.png" alt="AI Companion Interface Preview" width={800} height={500} className="object-contain" />
            {/* If you don't have an image, fallback to text */}
            {/* <p className="text-gray-500 text-lg">AI Companion Interface Preview</p> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-14 tracking-tight">Why Choose Our AI Companion</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white/80 p-8 rounded-2xl shadow-lg border border-blue-100 hover:scale-105 hover:shadow-2xl transition-all group relative overflow-hidden">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-5 shadow group-hover:scale-110 transition-transform">
              <Sparkles className="h-7 w-7 text-blue-600 animate-spin-slow" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast Responses</h3>
            <p className="text-gray-600">Get instant answers and assistance without the wait. Our AI processes and responds in milliseconds.</p>
            <div className="absolute right-2 bottom-2 opacity-10 text-7xl pointer-events-none select-none">
              <Sparkles />
            </div>
          </div>
          {/* Feature 2 */}
          <div className="bg-white/80 p-8 rounded-2xl shadow-lg border border-blue-100 hover:scale-105 hover:shadow-2xl transition-all group relative overflow-hidden">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-5 shadow group-hover:scale-110 transition-transform">
              <ArrowRight className="h-7 w-7 text-purple-600 animate-bounce" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
            <p className="text-gray-600">Our AI adapts to your preferences, habits, and needs over time, becoming more helpful with each interaction.</p>
            <div className="absolute left-2 bottom-2 opacity-10 text-7xl pointer-events-none select-none">
              <ArrowRight />
            </div>
          </div>
          {/* Feature 3 */}
          <div className="bg-white/80 p-8 rounded-2xl shadow-lg border border-blue-100 hover:scale-105 hover:shadow-2xl transition-all group relative overflow-hidden">
            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-5 shadow group-hover:scale-110 transition-transform">
              <CheckCircle className="h-7 w-7 text-pink-600 animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-600">Your data stays private. We employ end-to-end encryption and never share your personal information with third parties.</p>
            <div className="absolute right-2 top-2 opacity-10 text-7xl pointer-events-none select-none">
              <CheckCircle />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Carousel on mobile */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white/80 rounded-2xl shadow-xl border border-blue-100">
        <h2 className="text-3xl font-extrabold text-center mb-14 tracking-tight">What Our Users Say</h2>
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center">
              <Image src={t.avatar} alt={t.name} width={64} height={64} className="rounded-full mb-4 shadow" />
              <h4 className="font-semibold text-lg">{t.name}</h4>
              <p className="text-gray-500 text-sm mb-2">{t.title}</p>
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, idx) => <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-600">&quot;{t.text}&quot;</p>
            </div>
          ))}
        </div>
        {/* Carousel for mobile */}
        <div className="md:hidden flex flex-col items-center">
          <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center w-full max-w-md">
            <Image src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} width={64} height={64} className="rounded-full mb-4 shadow" />
            <h4 className="font-semibold text-lg">{testimonials[testimonialIdx].name}</h4>
            <p className="text-gray-500 text-sm mb-2">{testimonials[testimonialIdx].title}</p>
            <div className="flex gap-1 mb-3">
              {[...Array(testimonials[testimonialIdx].rating)].map((_, idx) => <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-gray-600">&quot;{testimonials[testimonialIdx].text}&quot;</p>
          </div>
          <div className="flex gap-4 mt-4">
            <button onClick={prevTestimonial} className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition"><ArrowRight className="rotate-180" /></button>
            <button onClick={nextTestimonial} className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition"><ArrowRight /></button>
          </div>
        </div>
      </section>

      {/* Pricing Section with toggle */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-14 tracking-tight">Simple, Transparent Pricing</h2>
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow border border-blue-100">
            <span className={!isYearly ? 'font-bold text-blue-600' : 'text-gray-500'}>Monthly</span>
            <button
              className={`w-12 h-6 bg-blue-200 rounded-full relative transition-all duration-300 focus:outline-none mx-2`}
              onClick={() => setIsYearly(!isYearly)}
              aria-label="Toggle yearly pricing"
            >
              <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${isYearly ? 'translate-x-6' : ''}`}></span>
            </button>
            <span className={isYearly ? 'font-bold text-blue-600' : 'text-gray-500'}>Yearly <span className="text-xs">(save 20%)</span></span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Free Plan */}
          <div className="bg-white/90 p-10 rounded-2xl shadow-md border border-gray-200 flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-2">{pricing.free.label}</h3>
            <p className="text-gray-600 mb-6">{pricing.free.desc}</p>
            <p className="text-4xl font-bold mb-6">${pricing.free.price}<span className="text-lg text-gray-500 font-normal">/month</span></p>
            <ul className="space-y-3 mb-8 w-full">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />100 messages per day</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Basic personalization</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Web access only</li>
            </ul>
            <button className="w-full py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Start Free
            </button>
          </div>
          {/* Pro Plan - highlighted */}
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-500 p-10 rounded-2xl shadow-2xl text-white scale-105 border-4 border-yellow-400/80 flex flex-col items-center hover:scale-110 hover:shadow-2xl transition-all">
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg border border-yellow-300 animate-pulse">MOST POPULAR</span>
            <h3 className="text-2xl font-bold mb-2">{pricing.pro.label}</h3>
            <p className="text-blue-100 mb-6">{pricing.pro.desc}</p>
            <p className="text-4xl font-bold mb-6">${pricing.pro.price}<span className="text-lg text-blue-200 font-normal">/month</span></p>
            <ul className="space-y-3 mb-8 w-full">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-300 mr-2" />Unlimited messages</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-300 mr-2" />Advanced personalization</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-300 mr-2" />Mobile & desktop apps</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-300 mr-2" />Priority support</li>
            </ul>
            <button className="w-full py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-lg">
              Get Pro
            </button>
          </div>
          {/* Business Plan */}
          <div className="bg-white/90 p-10 rounded-2xl shadow-md border border-gray-200 flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-2">{pricing.business.label}</h3>
            <p className="text-gray-600 mb-6">{pricing.business.desc}</p>
            <p className="text-4xl font-bold mb-6">${pricing.business.price}<span className="text-lg text-gray-500 font-normal">/month</span></p>
            <ul className="space-y-3 mb-8 w-full">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />All Pro features</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Team collaboration</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Admin dashboard</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />API access</li>
            </ul>
            <button className="w-full py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* CTA & Newsletter Section with glassmorphism */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-blue-600 to-purple-500 text-white rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
          <div className="md:flex relative z-10">
            <div className="p-10 md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Ready to meet your AI companion?</h2>
              <p className="mb-6">Join thousands of satisfied users who have transformed their productivity and daily life.</p>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-lg flex items-center gap-2">
                Get Started Today <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="p-10 bg-blue-700/80 md:w-1/2 rounded-2xl flex flex-col justify-center items-center relative">
              <h3 className="text-xl font-bold mb-4">Stay updated with our newsletter</h3>
              <p className="mb-6">Get the latest news, tips, and special offers directly to your inbox.</p>
              <form onSubmit={handleSubmit} className="flex w-full max-w-md">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none bg-white/80 border border-blue-200"
                  required
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-500 rounded-r-lg hover:bg-blue-400 transition-colors text-white font-semibold"
                >
                  Subscribe
                </button>
              </form>
              {/* Success animation */}
              <div className="h-8 mt-2 flex items-center justify-center">
                {isSubmitted && (
                  <span className="flex items-center gap-2 text-blue-200 animate-fade-in">
                    <CheckCircle className="w-5 h-5 text-green-300 animate-bounce" />
                    Thanks for subscribing!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with social icons and gradient border */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-transparent bg-white/80 rounded-t-2xl shadow-inner mt-10">
        <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mb-8" />
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">AI Companion</h3>
            <p className="text-gray-600 max-w-md">Your personal AI assistant that learns, adapts, and grows with you.</p>
            <div className="flex gap-4 mt-4">
              <a href="#" aria-label="Twitter" className="text-blue-500 hover:text-blue-700"><Twitter /></a>
              <a href="#" aria-label="GitHub" className="text-gray-800 hover:text-black"><Github /></a>
              <a href="#" aria-label="LinkedIn" className="text-blue-700 hover:text-blue-900"><Linkedin /></a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Features</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Pricing</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">About</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Privacy</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Terms</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-blue-600">Security</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>© {new Date().getFullYear()} AI Companion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
