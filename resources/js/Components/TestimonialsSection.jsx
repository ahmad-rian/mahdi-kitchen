
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Restaurant Owner",
      role: "Fine Dining Restaurant",
      content: "Kualitas produk Binggo Kitchen sangat memuaskan dan tahan lama. Sangat membantu operasional dapur kami."
    },
    {
      name: "Head Chef",
      role: "Hotel Bintang 5",
      content: "Desain yang modern dan fungsional membuat pekerjaan di dapur menjadi lebih efisien."
    },
    {
      name: "Cafe Owner",
      role: "Specialty Coffee Shop",
      content: "Pelayanan custom sesuai kebutuhan dan hasil yang sempurna. Sangat merekomendasikan!"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Testimoni dari pelanggan yang telah menggunakan produk dan layanan kami
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={20}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;