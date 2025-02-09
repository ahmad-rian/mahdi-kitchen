import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Badge
} from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Star, ChevronLeft, CheckCircle2 } from 'lucide-react';

const RatingStars = ({ rating, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onRatingChange(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                >
                    <Star
                        className={`w-6 h-6 ${
                            star <= (hoverRating || rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                        }`}
                    />
                </button>
            ))}
        </div>
    );
};

const ReviewForm = ({ product }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        rating: 0,
        comment: '',
        product_id: product.id
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('products.reviews.store', product.id), {
            preserveScroll: true,
            onSuccess: () => {
                // Reset form
                setData('rating', '');
                setData('comment', '');
                
                toast({
                    title: "Success",
                    description: "Review submitted successfully",
                    variant: "default",
                    className: "bg-green-500 text-white border-none"
                });
            },
            onError: (errors) => {
                toast({
                    title: "Error",
                    description: errors.error || "Failed to submit review",
                    variant: "destructive"
                });
            }
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Write a Review</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rating</label>
                        <RatingStars
                            rating={data.rating}
                            onRatingChange={(value) => setData('rating', value)}
                        />
                        {errors.rating && (
                            <p className="text-sm text-red-500">{errors.rating}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Your Review</label>
                        <Textarea
                            value={data.comment}
                            onChange={e => setData('comment', e.target.value)}
                            rows={4}
                            placeholder="Share your experience with this product..."
                        />
                        {errors.comment && (
                            <p className="text-sm text-red-500">{errors.comment}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={processing}>
                        Submit Review
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

const Show = ({ product, auth }) => {
    return (
        <>
            <Head title={product.name} />
            
            <Navbar auth={auth} />

            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link 
                            href={route('products.index')} 
                            className="inline-flex items-center text-sm mb-8 hover:text-primary transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Products
                        </Link>
                    </motion.div>

                    {/* Product Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        {/* Product Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                        >
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h1 className="text-3xl font-bold">{product.name}</h1>
                                    {product.is_active && (
                                        <Badge variant="secondary" className="ml-2">
                                            In Stock
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-base-content/80 mb-4">
                                    Category: {product.kategori.name}
                                </p>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i < Math.floor(product.average_rating)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-base-content/60">
                                        ({product.reviews_count} reviews)
                                    </span>
                                </div>
                                <p className="text-3xl font-bold">
                                    Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-2">Description</h2>
                                <p className="text-base-content/70 whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>

                            <div className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-sm text-base-content/60">
                                        Stock: {product.stock} units available
                                    </p>
                                    {product.stock <= 10 && (
                                        <Badge variant="destructive">
                                            Low Stock
                                        </Badge>
                                    )}
                                </div>
                                <Button size="lg" className="w-full">
                                    Add to Cart
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Reviews Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Customer Reviews</h2>
                            {!auth.user && (
                                <Link href={route('login')}>
                                    <Button variant="outline">
                                        Login to Write a Review
                                    </Button>
                                </Link>
                            )}
                        </div>
                        
                        {/* Review Form */}
                        {auth.user && (
                            <div className="mb-8">
                                <ReviewForm product={product} />
                            </div>
                        )}

                        {/* Reviews List */}
                        <div className="space-y-6">
                            {product.reviews.length > 0 ? (
                                product.reviews.map((review, index) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <Card>
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium">{review.user.name}</p>
                                                            {review.is_verified && (
                                                                <Badge variant="secondary" className="flex items-center gap-1">
                                                                    <CheckCircle2 className="w-3 h-3" />
                                                                    Verified Purchase
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-base-content/60">
                                                            {new Date(review.created_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${
                                                                    i < review.rating
                                                                        ? 'fill-yellow-400 text-yellow-400'
                                                                        : 'text-gray-300'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-base-content/80">{review.comment}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-base-content/60">No reviews yet. Be the first to review this product!</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Show;