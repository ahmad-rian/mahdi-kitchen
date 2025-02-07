'use client';

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChefHat, Shield, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const FeatureCard = ({ icon, title, description, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
      }}
      className="relative p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-100/50 to-primary-300/50 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="text-primary-500 mb-6 p-3 bg-primary-100 rounded-2xl inline-block">
          {React.cloneElement(icon, { size: 48, strokeWidth: 1.5 })}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <ChefHat />,
      title: "Desain Modern",
      description: "Peralatan dapur dengan desain modern dan fungsional untuk memenuhi kebutuhan dapur profesional Anda."
    },
    {
      icon: <Shield />,
      title: "Kualitas Premium",
      description: "Menggunakan stainless steel food grade terbaik untuk menjamin kualitas dan daya tahan produk."
    },
    {
      icon: <Star />,
      title: "Layanan Kustom",
      description: "Menerima pesanan kustom sesuai kebutuhan untuk restoran, cafe, hotel, dan dapur rumah."
    }
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Keunggulan Kami
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Binggo Complete Kitchen menyediakan solusi peralatan dapur profesional 
            dengan kualitas terbaik untuk bisnis Anda
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
