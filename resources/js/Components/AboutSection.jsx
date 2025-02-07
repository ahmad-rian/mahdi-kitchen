import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, CheckCircle, Users, Star } from "lucide-react";

const StatCard = ({ icon, value, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
          {value}
        </h4>
        <p className="text-base-content/70 font-medium">{label}</p>
      </div>
    </div>
  </motion.div>
);

const AboutSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    "Besi Stainless steel food grade terbaik",
    "Plat Stainless Terbaik",
    "Kitchen Set Stainless Steel terbaik",
  ];

  const stats = [
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      value: "15+",
      label: "Tahun Pengalaman",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      value: "1000+",
      label: "Proyek Selesai",
    },
    {
      icon: <Star className="w-6 h-6 text-primary" />,
      value: "500+",
      label: "Pelanggan Puas",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-base-100 to-base-200/50" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <motion.div 
        className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image Section */}
          <motion.div variants={itemVariants} className="relative order-2 lg:order-1">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/api/placeholder/800/800"
                alt="Our Workshop"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="max-w-md mx-auto text-white">
                  <h3 className="text-2xl font-bold mb-3">Workshop Kami</h3>
                  <p className="text-white/90">
                    Purwokerto Barat, belakang Balai Desa Pasir Wetan (Lapangan Volly)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div variants={itemVariants} className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Sejak 2008 Melayani Kebutuhan{" "}
                <span className="text-primary">Dapur Profesional</span>
              </h2>
              <p className="text-base-content/70 text-lg leading-relaxed">
                Usaha Di Bidang Equipment Kitchen ini Berdiri dari Tanggal 8 Februari 
                Tahun 2008. Kami bergerak di berbagai bidang pekerjaan, mulai dari 
                Equipment Kitchen hingga interior custom.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Kami menawarkan berbagai peralatan dapur stainless steel yang terbuat 
                dari material berkualitas:
              </h3>
              <ul className="space-y-4">
                {features.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-4 p-4 bg-base-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <CheckCircle className="text-primary w-5 h-5" />
                    </div>
                    <span className="text-base-content/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;