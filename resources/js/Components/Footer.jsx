import React from 'react';
import { 
  ChefHat, 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Send,
  Mail,
  ExternalLink 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      href: 'https://instagram.com/mahdy_Binggo',
      color: 'hover:text-rose-400'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      href: 'https://facebook.com/Binggo.surabaya',
      color: 'hover:text-blue-400'
    },
    {
      name: 'TikTok',
      icon: <Send size={20} />,
      href: 'https://tiktok.com/@Mahdy.Surabaya',
      color: 'hover:text-pink-400'
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-base-200 to-base-300">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="py-12 px-4">
          <div className="bg-base-100 rounded-2xl p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-base-content/70">
                  Subscribe untuk mendapatkan info terbaru dari kami
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="join w-full">
                  <input 
                    type="email" 
                    placeholder="Email anda..." 
                    className="input input-bordered join-item flex-1" 
                  />
                  <button className="btn btn-primary join-item">
                    Subscribe
                    <Mail size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-4 py-16">
          {/* Brand Column */}
          <div>
            <motion.div 
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 bg-primary/10 rounded-xl">
                <ChefHat size={32} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Binggo Complete Kitchen</h2>
                <p className="text-sm text-base-content/70">Professional Kitchen Equipment</p>
              </div>
            </motion.div>
            <p className="text-base-content/70 leading-relaxed">
              Memasak Lebih Mudah, Dengan Binggo* . Solusi peralatan dapur profesional untuk bisnis Anda.
            </p>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Phone size={20} className="text-primary" />
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:082133222726" 
                  className="flex items-center gap-3 text-base-content/70 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-base-100 flex items-center justify-center shadow-sm">
                    <Phone size={18} />
                  </div>
                  <span>082133222726</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-base-content/70">
                  <div className="w-10 h-10 rounded-lg bg-base-100 flex items-center justify-center shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <span>Purwokerto Barat</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3 text-base-content/70">
                  <div className="w-10 h-10 rounded-lg bg-base-100 flex items-center justify-center shadow-sm">
                    <Clock size={18} />
                  </div>
                  <span>Senin - Sabtu: 9:00 - 17:00</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Products', 'About Us', 'Contact', 'FAQ'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-circle btn-ghost ${social.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-base-content/70 leading-relaxed">
              Workshop Kami Di Purwokerto Barat, Belakang Balai Desa Pasir Wetan (Lapangan Volly)
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-content/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-base-content/70 text-sm">
                &copy; {new Date().getFullYear()} Binggo Complete Kitchen. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-base-content/70">
                <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;