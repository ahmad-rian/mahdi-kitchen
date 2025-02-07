import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ChevronRight, Phone, ChefHat } from 'lucide-react';

// Background Shapes Component
const BackgroundShapes = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Animated gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-white"></div>
    
    {/* Animated circles */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    
    {/* Grid pattern */}
    <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
    
    {/* Floating particles */}
    <div className="particles-container">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            '--delay': `${Math.random() * 5}s`,
            '--size': `${Math.random() * 10 + 5}px`,
            left: `${Math.random() * 100}%`,
          }}
        ></div>
      ))}
    </div>
  </div>
);

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <BackgroundShapes />
      
      <div className="container mx-auto px-4 z-10 relative py-20">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="space-y-8">
            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm font-semibold"
              >
                <ChefHat className="w-5 h-5" />
                Binggo Complete Kitchen
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Memasak Lebih Mudah, {" "}
                <span className="text-gradient">Dengan Binggo*</span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-700 leading-relaxed"
              >
                Solusi peralatan dapur profesional untuk bisnis Anda.
              </motion.p>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(79, 70, 229, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className="neon-button w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center"
                >
                  Lihat Produk
                  <ChevronRight className="w-5 h-5 ml-2" />
                </motion.button>
              </Link>
              
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-button w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Hubungi Kami
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div
            variants={itemVariants}
            className="relative hidden md:block"
          >
            <motion.div 
              className="rounded-2xl shadow-2xl overflow-hidden glass-card"
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img 
                  src="/assets/kitchen.jpeg"
                  alt="Kitchen Equipment"
                  className="w-full h-[600px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="text-white text-3xl font-bold drop-shadow-lg">
                    Peralatan Dapur Modern
                  </h2>
                  <p className="text-white/90 text-xl mt-2 drop-shadow-md">
                    Desain canggih, kualitas premium
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;