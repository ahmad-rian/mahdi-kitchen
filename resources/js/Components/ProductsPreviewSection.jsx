"use client"

import React from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ShoppingCart, ArrowRight, Star } from "lucide-react"
import { Link } from "@inertiajs/react"

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={product.image || "/api/placeholder/400/300"}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
            <div className="flex items-center">
              <Star className="text-yellow-400 mr-1" size={16} />
              <span className="text-white text-sm">{product.rating || "4.5"}</span>
            </div>
          </div>
          <span className="text-white font-semibold text-lg">Rp {product.price?.toLocaleString("id-ID")}</span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <Link href={`/products/${product.slug}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-primary-500 text-white py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-primary-600 transition-colors duration-300"
          >
            <ShoppingCart size={20} />
            <span>Lihat Detail</span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

const ProductsPreviewSection = ({ products = [] }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Produk Unggulan</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Temukan berbagai peralatan dapur profesional yang dapat meningkatkan kualitas memasak Anda
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
          }}
          className="text-center mt-16"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-500 text-white px-10 py-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-300 flex items-center justify-center space-x-2 mx-auto"
            >
              <span>Lihat Semua Produk</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductsPreviewSection

