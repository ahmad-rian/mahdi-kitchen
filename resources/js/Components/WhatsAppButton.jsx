import { motion } from "framer-motion"

const WhatsAppButton = () => {
  return (
    <motion.div
      className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 20,
      }}
    >
      <motion.a
        href="https://wa.me/6282133222726"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center gap-2 sm:gap-3 
          bg-[#25D366] text-white 
          px-4 py-3 sm:px-5 sm:py-4 
          rounded-full
          shadow-lg hover:shadow-2xl 
          transition-all duration-300 ease-in-out
          hover:bg-[#128C7E]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-white opacity-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
        <img src="/assets/whatsapp.png" alt="WhatsApp" className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="hidden sm:inline font-semibold text-sm sm:text-base whitespace-nowrap">Chat dengan Kami</span>
        <span className="sm:hidden font-semibold text-sm">Chat</span>
      </motion.a>
    </motion.div>
  )
}

export default WhatsAppButton

