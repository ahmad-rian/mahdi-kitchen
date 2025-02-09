import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "@inertiajs/react";
import { 
    Star, 
    ChefHat,
    ArrowRight,
    ShoppingCart,
    Sparkles
} from "lucide-react";

const ProductCard = ({ product, index }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Badge */}
            {product.is_featured && (
                <div className="absolute top-4 left-4 z-10">
                    <div className="bg-primary px-3 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-primary-foreground" />
                        <span className="text-xs font-medium text-primary-foreground">Featured</span>
                    </div>
                </div>
            )}

            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                    src={product.image_url || "/api/placeholder/400/300"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Quick Action Button */}
                <motion.div 
                    className="absolute top-4 right-4 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300">
                        <ShoppingCart className="w-5 h-5 text-gray-700" />
                    </button>
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="mb-4">
                    <Link 
                        href={route('products.show', product.slug)}
                        className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors duration-300 line-clamp-1"
                    >
                        {product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                        {product.kategori?.name}
                    </p>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                            {product.average_rating || "0"} 
                            <span className="text-muted-foreground ml-1">
                                ({product.reviews_count || 0})
                            </span>
                        </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                        Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {product.description}
                </p>

                <Link 
                    href={route('products.show', product.slug)}
                    className="inline-flex w-full items-center justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-primary text-primary-foreground py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2"
                    >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
};

const ProductsPreviewSection = ({ products = [], title = "Featured Products" }) => {
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

    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                        <ChefHat className="w-5 h-5" />
                        <span className="text-sm font-medium">Premium Quality</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {title}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Discover our collection of high-quality kitchen equipment, designed to enhance your cooking experience
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.slice(0, 3).map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
                    }}
                    className="text-center mt-16"
                >
                    <Link href={route('products.index')}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
                        >
                            View All Products
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductsPreviewSection;