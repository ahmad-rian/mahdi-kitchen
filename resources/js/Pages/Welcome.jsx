import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, canLogin, canRegister, featuredProducts, reviews, categories }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  
  const totalSlides = 6;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Carousel auto-rotation with proper cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Navigation functions
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, go to next slide
      nextSlide();
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  };

  // Product categories dengan slug yang sesuai dengan database
  const productCategories = [
    { id: 1, image: '/assets/carousel/lainnya/1.png', filterSlug: 'peralatan-memasak', name: 'Peralatan Memasak' },
    { id: 2, image: '/assets/carousel/lainnya/2.png', filterSlug: 'pengolahan-makanan', name: 'Pengolahan Makanan' },
    { id: 3, image: '/assets/carousel/lainnya/3.png', filterSlug: 'pendinginan-penyimpanan', name: 'Pendinginan & Penyimpanan' },
    { id: 4, image: '/assets/carousel/lainnya/4.png', filterSlug: 'baja-tahan-karat-furnitur-dapur', name: 'Baja Tahan Karat & Furnitur Dapur' },
    { id: 5, image: '/assets/carousel/lainnya/5.png', filterSlug: 'peralatan-minuman-kopi', name: 'Peralatan Minuman & Kopi' },
    { id: 6, image: '/assets/carousel/lainnya/6.png', filterSlug: 'pencucian-piring-sanitasi', name: 'Pencucian Piring & Sanitasi' }
  ];

  // Updated carousel slides with separate landscape and portrait images
  const carouselSlides = [
    { 
      id: 1, 
      landscapeImage: "/assets/carousel/atas/landscape/1.png",
      portraitImage: "/assets/carousel/atas/potrait/1.png"
    },
    { 
      id: 2, 
      landscapeImage: "/assets/carousel/atas/landscape/2.png",
      portraitImage: "/assets/carousel/atas/potrait/2.png"
    },
    { 
      id: 3, 
      landscapeImage: "/assets/carousel/atas/landscape/3.png",
      portraitImage: "/assets/carousel/atas/potrait/3.png"
    },
    { 
      id: 4, 
      landscapeImage: "/assets/carousel/atas/landscape/4.png",
      portraitImage: "/assets/carousel/atas/potrait/4.png"
    },
    { 
      id: 5, 
      landscapeImage: "/assets/carousel/atas/landscape/5.png",
      portraitImage: "/assets/carousel/atas/potrait/5.png"
    },
    { 
      id: 6, 
      landscapeImage: "/assets/carousel/atas/landscape/6.png",
      portraitImage: "/assets/carousel/atas/potrait/6.png"
    }
  ];

  return (
    <>
      <Head>
        <title>Binggo Complete Kitchen - Peralatan Dapur Profesional</title>
        <meta 
          name="description" 
          content="Binggo Complete Kitchen menyediakan peralatan dapur stainless steel berkualitas tinggi untuk kebutuhan profesional." 
        />
      </Head>
      
      {/* Spacer to account for fixed navbar - only on desktop */}
      {!isMobile && <div className="h-16"></div>}
      
      {/* Main Carousel - Responsive with different images for mobile/desktop */}
      <div className="relative w-full">
        {/* Carousel container with optimized aspect ratio */}
        <div 
          ref={carouselRef}
          className="relative w-full overflow-hidden"
          style={{ height: isMobile ? "100vh" : "calc(90vh - 64px)" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides with fade and slide transitions */}
          {carouselSlides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 z-10 translate-x-0' 
                  : index < currentSlide 
                    ? 'opacity-0 -translate-x-full z-0' 
                    : 'opacity-0 translate-x-full z-0'
              }`}
            >
              <div 
                className="w-full h-full bg-center bg-cover"
                style={{ 
                  backgroundImage: `url(${isMobile ? slide.portraitImage : slide.landscapeImage})`,
                  backgroundPosition: 'center',
                  backgroundSize: isMobile ? 'cover' : '100% auto'
                }}
              >
                {/* Enhanced overlay for better text contrast and elegance */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10"></div>
              </div>
            </div>
          ))}

          {/* Enhanced navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2 md:p-3 backdrop-blur-sm transition-all duration-300 shadow-md"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2 md:p-3 backdrop-blur-sm transition-all duration-300 shadow-md"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Elegant slide indicators */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2 md:gap-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-red-600 w-8 md:w-10' : 'bg-white/70 w-2 md:w-2.5 hover:bg-white/90'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          
        </div>

        {/* Product Categories Section - Original 3x3 grid with refined styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {productCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.filterSlug}`}
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                {/* Refined text overlay with better visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                  <div className="w-full p-3 md:p-4 text-white font-medium md:font-semibold text-center text-sm md:text-base">
                    {category.name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}