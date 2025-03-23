import React, { useEffect, useState } from 'react';
import WhatsAppButton from '@/Components/WhatsAppButton';
import YouTubeButton from '@/Components/YouTubeButton';

export default function WhatsAppButtonAndYouTubeButton() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  
  useEffect(() => {
    // Periksa apakah URL saat ini berada di area admin atau profile
    const path = window.location.pathname;
    setIsAdminRoute(
      path.includes('/admin') || 
      path.includes('/profile')
    );
  }, []);
  
  // Jika berada di area admin atau profile, jangan tampilkan tombol-tombol
  if (isAdminRoute) {
    return null;
  }
  
  return (
    <>
      <WhatsAppButton />
      <YouTubeButton />
    </>
  );
}