import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import WhatsAppButtonAndYouTubeButton from '@/Components/WhatsAppButtonAndYouTubeButton';

export default function AppLayout({ children, auth }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar auth={auth} />
      
      <main>{children}</main>

      <Footer />
      <WhatsAppButtonAndYouTubeButton />
    </div>
  );
}