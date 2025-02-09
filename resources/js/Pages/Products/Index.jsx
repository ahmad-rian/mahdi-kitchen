import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Star, Filter, X } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/Components/ui/dialog";

import WhatsAppButton from '@/Components/WhatsAppButton';

const ProductCard = ({ product }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden h-full">
                <div className="aspect-square overflow-hidden">
                    {product.image_url && !imageError ? (
                        <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                                console.error('Failed to load image:', product.image_url);
                                setImageError(true);
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400">No image available</span>
                        </div>
                    )}
                </div>
                <CardHeader className="p-4">
                    <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.kategori.name}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                            {product.average_rating || 'No ratings'}
                        </span>
                    </div>
                    <p className="font-bold text-lg">
                        Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                    </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                    <Link href={route('products.show', product.slug)} className="w-full">
                        <Button className="w-full">View Details</Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

const ProductsGrid = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.data.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

const Index = ({ products, categories, filters, auth }) => {
    const { url } = usePage();
    const [openFilter, setOpenFilter] = useState(false);

    const handleFilterChange = (params) => {
        const newFilters = { ...filters, ...params };
        
        // Gunakan Inertia untuk navigasi dengan query params
        window.location.href = route('products.index', 
            Object.fromEntries(
                Object.entries(newFilters).filter(([_, v]) => v != null)
            )
        );
    };

    const clearAllFilters = () => {
        window.location.href = route('products.index');
    };

    return (
        <>
            <Head title="Products - Binggo Complete Kitchen" />
            
            <Navbar auth={auth} />

            
            <WhatsAppButton />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary/20 via-base-100 to-primary/10">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <div className="container mx-auto px-4 relative">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                    Our Products
                                </h1>
                                <p className="text-xl text-base-content/80">
                                    Discover our high-quality kitchen equipment collection
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        {/* Filtering Section */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-4">
                                {/* Filter Dialog */}
                                <Dialog open={openFilter} onOpenChange={setOpenFilter}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                                            <Filter className="w-4 h-4" />
                                            Filter
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Filter Products</DialogTitle>
                                        </DialogHeader>
                                        
                                        {/* Category Filter */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Category</label>
                                                <Select 
                                                    value={filters.category || 'all'}
                                                    onValueChange={(value) => handleFilterChange({ 
                                                        category: value === 'all' ? null : value 
                                                    })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">All Categories</SelectItem>
                                                        {categories.map((category) => (
                                                            <SelectItem 
                                                                key={category.id} 
                                                                value={category.slug}
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Price Range Filter */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Price Range</label>
                                                <div className="flex items-center space-x-2">
                                                    <Input 
                                                        type="number" 
                                                        placeholder="Min Price"
                                                        value={filters.min_price || ''}
                                                        onChange={(e) => handleFilterChange({ 
                                                            min_price: e.target.value || null 
                                                        })}
                                                    />
                                                    <span>-</span>
                                                    <Input 
                                                        type="number" 
                                                        placeholder="Max Price"
                                                        value={filters.max_price || ''}
                                                        onChange={(e) => handleFilterChange({ 
                                                            max_price: e.target.value || null 
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Sorting Filter */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Sort By</label>
                                                <Select 
                                                    value={filters.sort || 'latest'}
                                                    onValueChange={(value) => handleFilterChange({ sort: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sort By" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="latest">Latest</SelectItem>
                                                        <SelectItem value="price_low">Price: Low to High</SelectItem>
                                                        <SelectItem value="price_high">Price: High to Low</SelectItem>
                                                        <SelectItem value="popular">Most Popular</SelectItem>
                                                        <SelectItem value="rating">Highest Rated</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                {/* Active Filters */}
                                <div className="flex items-center gap-2">
                                    {Object.entries(filters).map(([key, value]) => {
                                        if (value && key !== 'page') {
                                            return (
                                                <Button 
                                                    key={key} 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="flex items-center gap-2"
                                                    onClick={() => handleFilterChange({ [key]: null })}
                                                >
                                                    {key}: {value}
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            );
                                        }
                                        return null;
                                    })}

                                    {Object.keys(filters).length > 0 && (
                                        <Button 
                                            variant="destructive" 
                                            size="sm"
                                            onClick={clearAllFilters}
                                        >
                                            Clear All
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Total Products */}
                            <div className="text-sm text-muted-foreground">
                                {products.total} Products
                            </div>
                        </div>

                        {/* Products Grid */}
                        {products.data.length > 0 ? (
                            <ProductsGrid products={products} />
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No products found.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {products.links.length > 3 && (
                            <div className="mt-12 flex justify-center gap-2">
                                {products.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-4 py-2 rounded-md transition-colors ${
                                            link.active
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-background border hover:bg-accent'
                                        } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Index;