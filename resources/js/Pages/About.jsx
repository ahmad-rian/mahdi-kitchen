// resources/js/Pages/About.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Award, 
  Users, 
  ChefHat,
  CheckCircle,
  Star,
  ArrowRight,
  MapPin
} from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const About = ({ auth }) => {
  const stats = [
    { 
      label: 'Tahun Pengalaman', 
      value: '15+',
      icon: <Clock className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Proyek Selesai', 
      value: '1000+',
      icon: <Award className="w-8 h-8" />,
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'Pelanggan Puas', 
      value: '500+',
      icon: <Users className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const features = [
    'Besi Stainless steel food grade terbaik',
    'Plat Stainless Terbaik',
    'Kitchen Set Stainless Steel terbaik',
    'Desain modern dan fungsional',
    'Harga kompetitif',
    'Bergaransi'
  ];

  const businessTypes = ['Restoran', 'Cafe', 'Rumah Makan', 'Dapur Rumah', 'Resto Hotel'];
  
  const timeline = [
    {
      year: '2008',
      title: 'Awal Perjalanan',
      description: 'Berdiri pada tanggal 8 Februari 2008, memulai berbagai macam pekerjaan termasuk Equipment Kitchen dan interior custom.'
    },
    {
      year: '2008-2015',
      title: 'Ekspansi Layanan',
      description: 'Mengembangkan layanan ke berbagai bidang: Kamar Hotel, Kamar Set, Kitchen Set, Minibar, Backdrop TV, dan konstruksi baja.'
    },
    {
      year: '2015-2020',
      title: 'Fokus Spesialisasi',
      description: 'Mulai memfokuskan diri di bidang Equipment Kitchen, mengembangkan keahlian dan kualitas produk.'
    },
    {
      year: '2020-Sekarang',
      title: 'Era Digital',
      description: 'Mendirikan website untuk memudahkan ORDER Via Online dan memperluas jangkauan melalui media sosial.'
    }
  ];

  const services = [
    'Interior Custom',
    'Kitchen Set',
    'Kamar Hotel',
    'Dapur Restoran',
    'Minibar',
    'Backdrop TV'
  ];

  const values = [
    {
      title: 'Kualitas Premium',
      description: 'Menggunakan material stainless steel food grade terbaik untuk menjamin ketahanan dan keamanan',
      icon: <Star className="w-6 h-6" />
    },
    {
      title: 'Layanan Custom',
      description: 'Fleksibilitas dalam desain dan pembuatan sesuai kebutuhan spesifik pelanggan',
      icon: <ChefHat className="w-6 h-6" />
    },
    {
      title: 'Garansi Produk',
      description: 'Jaminan kualitas dengan layanan garansi untuk setiap produk kami',
      icon: <Award className="w-6 h-6" />
    }
  ];

  const whyChooseUs = [
    {
      title: 'Pengalaman & Keahlian',
      description: 'Lebih dari 15 tahun pengalaman dalam industri peralatan dapur profesional'
    },
    {
      title: 'Kustomisasi Fleksibel',
      description: 'Desain dan produksi sesuai kebutuhan spesifik bisnis Anda'
    },
    {
      title: 'Harga Kompetitif',
      description: 'Penawaran harga terbaik dengan kualitas premium'
    },
    {
      title: 'Layanan Purnajual',
      description: 'Dukungan teknis dan garansi untuk ketenangan pikiran Anda'
    }
  ];

  const socialMedia = [
    { name: 'Youtube', color: 'bg-red-500' },
    { name: 'TikTok', color: 'bg-black' },
    { name: 'Facebook', color: 'bg-blue-600' },
    { name: 'Instagram', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' }
  ];

  return (
    <>
      <Head title="About - Binggo Complete Kitchen" />
      
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
                  Tentang Kami
                </h1>
                <p className="text-xl text-base-content/80">
                  Berdiri sejak 2008, Binggo Complete Kitchen telah menjadi mitra terpercaya 
                  dalam menyediakan peralatan dapur profesional berkualitas tinggi.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 -mt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.color} p-8 text-white shadow-lg`}
                >
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="mb-4 p-3 bg-white/20 rounded-xl w-fit">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/90 text-lg">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Description Section */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="relative">
                  <div className="absolute -left-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                  <h2 className="text-3xl font-bold relative z-10">Tentang Binggo Complete Kitchen</h2>
                </div>
                <div className="space-y-4 text-base-content/80 text-lg leading-relaxed">
                  <p>
                    Dengan Binggo Complete Kitchen, nikmati pengalaman memasak yang lebih mudah dan 
                    menyenangkan. Menggunakan produk kami, Anda dapat meningkatkan efisiensi dan 
                    kualitas memasak.
                  </p>
                  <div className="pl-4 border-l-4 border-primary">
                    <p className="font-medium text-base-content">
                      Kami menawarkan berbagai peralatan dapur stainless steel yang terbuat dari material:
                    </p>
                    <ul className="mt-2 space-y-2">
                      {['Besi Stainless steel food grade terbaik', 'Plat Stainless Terbaik', 'Kitchen Set Stainless Steel terbaik'].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {businessTypes.map((item, index) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-200 p-6 rounded-xl shadow-lg"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3">
                      <ChefHat className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{item}</h3>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* History Timeline Section */}
        <section className="py-20 bg-base-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">Perjalanan Kami</h2>
                <p className="text-base-content/70">
                  Sejak 2008, kami terus berkembang dan berinovasi untuk memberikan 
                  yang terbaik bagi pelanggan kami.
                </p>
              </motion.div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
                
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className={`flex items-center gap-8 ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      <div className="w-1/2 text-right">
                        <div className={`space-y-2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          <div className="text-primary font-bold text-xl">{item.year}</div>
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-base-content/70">{item.description}</p>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-center w-12">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white relative z-10">
                          <ChefHat className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="w-1/2"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nilai-Nilai Kami</h2>
              <p className="text-base-content/70 max-w-2xl mx-auto">
                Komitmen kami untuk memberikan produk dan layanan terbaik
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="card bg-base-200 hover:shadow-xl transition-shadow"
                >
                  <div className="card-body">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary text-primary-content rounded-xl">
                        {value.icon}
                      </div>
                      <h3 className="card-title">{value.title}</h3>
                    </div>
                    <p className="text-base-content/70">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Showcase
        <section className="py-16 bg-base-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Layanan Komprehensif</h2>
              <p className="text-base-content/70 max-w-2xl mx-auto">
                Dari pembuatan hingga instalasi, kami menyediakan solusi lengkap untuk kebutuhan dapur profesional Anda
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <img
                      src={`/api/placeholder/600/400`}
                      alt={service}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="text-xl font-semibold mb-2">{service}</h3>
                        <div className="h-0.5 w-12 bg-primary group-hover:w-24 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Mengapa Memilih Kami</h2>
                <p className="text-base-content/70">
                  Pengalaman lebih dari 15 tahun dalam industri membuat kami menjadi pilihan tepat untuk kebutuhan dapur profesional Anda
                </p>
              </div>
              <div className="grid gap-6">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="card bg-base-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="card-body">
                      <h3 className="card-title text-primary">{item.title}</h3>
                      <p className="text-base-content/70">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social Media
        <section className="py-16 bg-base-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Media Sosial Kami</h2>
              <p className="text-base-content/70">
                Dokumentasi hasil pekerjaan kami dapat dilihat di berbagai platform media sosial
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {socialMedia.map((platform) => (
                <motion.a
                  key={platform.name}
                  href="#"
                  whileHover={{ y: -5 }}
                  className={`${platform.color} p-6 rounded-xl text-white text-center shadow-lg`}
                >
                  <h3 className="font-semibold text-lg">{platform.name}</h3>
                  <p className="text-sm opacity-90">Follow Us</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section
        <section className="py-16 bg-primary text-primary-content">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  Siap Meningkatkan Kualitas Dapur Anda?
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  Hubungi kami sekarang untuk konsultasi gratis mengenai kebutuhan dapur profesional Anda
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="https://wa.me/6282133222726" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg bg-green-500 hover:bg-green-600 border-none gap-2"
                  >
                    <img 
                      src="/assets/whatsapp.png" 
                      alt="WhatsApp" 
                      className="w-6 h-6"
                    />
                    Chat WhatsApp
                  </a>
                  <a 
                    href="/contact" 
                    className="btn btn-lg bg-white text-primary hover:bg-white/90"
                  >
                    Hubungi Kami
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </>
  );
};

export default About;