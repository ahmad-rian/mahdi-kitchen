// resources/js/Pages/Contact.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram,
  Facebook
} from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const Contact = ({ auth }) => {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telepon",
      content: "082133222726",
      link: "tel:082133222726"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "bnggomahdy@gmail.com",
      link: "mailto:bnggomahdy@gmail.com"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Alamat Workshop",
      content: "Purwokerto Barat, Belakang Balai Desa Pasir Wetan (Lapangan Volly)",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Jam Operasional",
      content: "Senin - Sabtu: 9:00 - 17:00",
    }
  ];

  const socialMedia = [
    {
      icon: <Instagram className="w-5 h-5" />,
      name: "Instagram",
      username: "@mahdy_Binggo",
      link: "https://instagram.com/mahdy_Binggo",
      bgColor: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500"
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      name: "Facebook",
      username: "@Binggo.surabaya",
      link: "https://facebook.com/Binggo.surabaya",
      bgColor: "bg-blue-600"
    }
  ];

  return (
    <>
      <Head title="Contact - Binggo Complete Kitchen" />
      
      <Navbar auth={auth} />

      <main className="pt-20">
        {/* Hero Section with Animated Background */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary/20 via-base-100 to-primary/10">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <motion.div 
            className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Hubungi Kami
                </h1>
                <p className="text-xl text-base-content/80">
                  Siap membantu Anda dengan solusi peralatan dapur profesional terbaik
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 relative bg-base-200">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-6 content-start">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="card-body">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{info.title}</h3>
                          {info.link ? (
                            <a 
                              href={info.link}
                              className="text-base-content/70 hover:text-primary transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-base-content/70">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Maps Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="card bg-base-100 shadow-xl overflow-hidden"
              >
                <div className="card-body p-0 aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.675474410655!2d109.2133334!3d-7.3833333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655c5b86b6817d%3A0x8c4c4b4c4b4c4b4c!2sPurwokerto%20Barat%2C%20Pasir%20Wetan%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Media & WhatsApp Section */}
        <section className="py-16 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Social Media */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-8">Ikuti Kami</h2>
                  <div className="grid gap-4">
                    {socialMedia.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.bgColor} p-4 rounded-xl text-white flex items-center gap-4 hover:scale-105 transition-transform`}
                        whileHover={{ y: -5 }}
                      >
                        <div className="p-2 bg-white/20 rounded-lg">
                          {social.icon}
                        </div>
                        <div>
                          <div className="font-semibold">{social.name}</div>
                          <div className="text-white/80">{social.username}</div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* WhatsApp CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
                >
                  <div className="card-body text-center">
                    <div className="mb-6">
                      <img 
                        src="/assets/whatsapp.png" 
                        alt="WhatsApp" 
                        className="w-24 h-24 mx-auto"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      Chat dengan Kami
                    </h3>
                    <p className="mb-6 text-white/90">
                      Dapatkan respon cepat melalui WhatsApp
                    </p>
                    <motion.a
                      href="https://wa.me/6282133222726"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-lg bg-white text-green-600 hover:bg-white/90 border-none"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Chat Sekarang
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;