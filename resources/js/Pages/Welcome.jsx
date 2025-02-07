// resources/js/Pages/Welcome.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import HeroSection from '@/Components/HeroSection';
import FeaturesSection from '@/Components/FeaturesSection';
import ProductsPreviewSection from '@/Components/ProductsPreviewSection';
import AboutSection from '@/Components/AboutSection';
import TestimonialsSection from '@/Components/TestimonialsSection';
import WhatsAppButton from '@/Components/WhatsAppButton';

export default function Welcome({ auth = {}, products = [] }) {
  return (
    <>
      <Head>
        <title>Binggo Complete Kitchen - Peralatan Dapur Profesional</title>
        <meta 
          name="description" 
          content="Binggo Complete Kitchen menyediakan peralatan dapur stainless steel berkualitas tinggi untuk kebutuhan profesional." 
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Navbar auth={auth} />
        
        <main>
          <HeroSection />
          <FeaturesSection />
          <ProductsPreviewSection products={products} />
          <AboutSection />
          <TestimonialsSection />
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}