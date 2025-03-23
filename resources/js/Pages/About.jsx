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
      value: '5+',
      icon: <Clock className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Proyek Selesai', 
      value: '250+',
      icon: <Award className="w-8 h-8" />,
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'Pelanggan Puas', 
      value: '150+',
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
      year: '2020',
      title: 'Awal Perjalanan',
      description: 'Berdiri pada Februari 2020, memulai perjalanan dengan fokus pada Equipment Kitchen dan interior custom berkualitas tinggi.'
    },
    {
      year: '2020-2021',
      title: 'Ekspansi Layanan',
      description: 'Mengembangkan layanan ke berbagai bidang: Kamar Hotel, Kamar Set, Kitchen Set, Minibar, Backdrop TV, dan konstruksi baja.'
    },
    {
      year: '2022-2024',
      title: 'Fokus Spesialisasi',
      description: 'Mulai memfokuskan diri di bidang Equipment Kitchen, mengembangkan keahlian khusus dan meningkatkan kualitas produk.'
    },
    {
      year: '2025-Sekarang',
      title: 'Era Digital',
      description: 'Mendirikan website untuk memudahkan ORDER Via Online dan memperluas jangkauan bisnis melalui berbagai platform media sosial.'
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
      description: 'Menggunakan material stainless steel food grade terbaik untuk menjamin ketahanan dan keamanan produk kami',
      icon: <Star className="w-6 h-6" />
    },
    {
      title: 'Layanan Custom',
      description: 'Fleksibilitas dalam desain dan pembuatan sesuai kebutuhan spesifik setiap pelanggan',
      icon: <ChefHat className="w-6 h-6" />
    },
    {
      title: 'Garansi Produk',
      description: 'Jaminan kualitas dengan layanan garansi untuk setiap produk yang kami tawarkan',
      icon: <Award className="w-6 h-6" />
    }
  ];

  const whyChooseUs = [
    {
      title: 'Pengalaman & Keahlian',
      description: 'Tim profesional dengan keahlian khusus dalam industri peralatan dapur berkualitas tinggi'
    },
    {
      title: 'Kustomisasi Fleksibel',
      description: 'Desain dan produksi yang sesuai dengan kebutuhan spesifik bisnis atau rumah Anda'
    },
    {
      title: 'Harga Kompetitif',
      description: 'Penawaran harga terbaik dengan kualitas premium tanpa kompromi'
    },
    {
      title: 'Layanan Purnajual',
      description: 'Dukungan teknis dan garansi produk untuk memberikan ketenangan pikiran Anda'
    }
  ];

  return (
    <>
      <Head title="About - Binggo Complete Kitchen" />
      
      <Navbar auth={auth} />

      <main className="pt-20">
        {/* Hero Section with Animated Background */}
        <section className="relative py-28 overflow-hidden bg-gradient-to-br from-primary/20 via-base-100 to-primary/10">
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
                <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Tentang Kami
                </h1>
                <p className="text-xl text-base-content/80 leading-relaxed">
                  Berdiri sejak 2020, Binggo Complete Kitchen telah menjadi mitra terpercaya 
                  dalam menyediakan peralatan dapur profesional berkualitas tinggi.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 -mt-24">
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
        <section className="py-24 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
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
                <div className="space-y-6 text-base-content/80 text-lg leading-relaxed">
                  <p className="text-justify">
                    Kami Binggo Complete Kitchen bergerak di bidang Industri Equipment Kitchen. Kami mengerjakan pembuatan peralatan dapur Stainless Steel 304, baik peralatan mekanik maupun manual. Produk kami meliputi Microwave, Kompor, Oven, Mesin Penggilingan Daging, Meja Stainless, Sink, dan berbagai peralatan dapur profesional lainnya.
                  </p>
                  <p className="text-justify">
                    Workshop kami berlokasi di Purwokerto Barat dan kami menerima pekerjaan Equipment Kitchen di seluruh Indonesia. Kami berkomitmen untuk memberikan produk berkualitas dengan layanan terbaik.
                  </p>
                  <div className="pl-5 border-l-4 border-primary rounded">
                    <p className="font-medium text-base-content">
                      Kami menawarkan berbagai peralatan dapur stainless steel yang terbuat dari material:
                    </p>
                    <ul className="mt-3 space-y-3">
                      {features.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
                
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden shadow-2xl"
              >
                {/* Replace this with your actual company image */}
                <img 
                  src="/assets/mahdi.jpeg" 
                  alt="Binggo Complete Kitchen Workshop" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold">Workshop Binggo Complete Kitchen</h3>
                  <p className="text-white/80">Purwokerto Barat</p>
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* History Timeline Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-6">Perjalanan Kami</h2>
                <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                  Sejak 2020, kami terus berkembang dan berinovasi untuk memberikan 
                  yang terbaik bagi pelanggan kami.
                </p>
              </motion.div>

              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/50 rounded-full"></div>
                
                {/* Timeline Items */}
                <div className="space-y-24">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="relative"
                    >
                      {/* Year Label - Centered */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 -top-10">
                        <div className="bg-primary text-white px-6 py-2 rounded-full font-bold text-lg shadow-md">
                          {item.year}
                        </div>
                      </div>
                      
                      {/* Content Row */}
                      <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                        {/* Timeline Node */}
                        <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
                          <div className="w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center relative z-10 shadow-lg">
                            <ChefHat className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        
                        {/* Content Card */}
                        <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} mt-10 md:mt-0`}>
                          <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="font-semibold text-xl text-gray-800 mb-3">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Nilai-Nilai Kami</h2>
              <p className="text-gray-700 max-w-2xl mx-auto text-lg">
                Komitmen kami untuk memberikan produk dan layanan terbaik
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-primary text-white rounded-xl">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">{value.title}</h3>
                    </div>
                    <p className="text-gray-600 text-justify">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Image Section */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {businessTypes.map((item, index) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-200 p-8 rounded-xl shadow-lg"
                  >
                    <div className="p-4 bg-primary/10 rounded-lg w-fit mb-4">
                      <ChefHat className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{item}</h3>
                  </motion.div>
                ))}
              </motion.div>
              
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">Fasilitas Produksi Kami</h2>
                <p className="text-base-content/80 text-lg text-justify">
                  Workshop kami dilengkapi dengan peralatan modern dan tim terampil yang siap 
                  menciptakan peralatan dapur berkualitas tinggi sesuai standar industri. 
                  Seluruh proses produksi dilakukan dengan teliti dan mengutamakan kualitas 
                  untuk memastikan kepuasan pelanggan.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" />
                    <span>Mesin Presisi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" />
                    <span>Quality Control</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" />
                    <span>Tim Terampil</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" />
                    <span>Material Premium</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Mengapa Memilih Kami</h2>
                <p className="text-gray-700 text-lg">
                  Dedikasi dan komitmen kami dalam memberikan kualitas terbaik membuat kami menjadi 
                  pilihan tepat untuk kebutuhan dapur profesional Anda
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                  >
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 text-justify">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

       
      </main>

     
    </>
  );
};

export default About;