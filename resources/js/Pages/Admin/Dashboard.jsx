import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Package, ListOrdered, MessageCircle, Users, TrendingUp, Star, ShoppingCart, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = ({ stats, recentProducts, recentReviews }) => {
    const cards = [
        {
            title: "Total Products",
            value: stats.products_count,
            icon: <Package className="h-4 w-4 text-primary" />,
            trend: "+12% from last month",
            color: "bg-blue-50"
        },
        {
            title: "Total Categories",
            value: stats.categories_count,
            icon: <ListOrdered className="h-4 w-4 text-green-600" />,
            trend: "Active categories",
            color: "bg-green-50"
        },
        {
            title: "Total Reviews",
            value: stats.reviews_count,
            icon: <MessageCircle className="h-4 w-4 text-yellow-600" />,
            trend: "+5 new today",
            color: "bg-yellow-50"
        },
        {
            title: "Total Users",
            value: stats.users_count,
            icon: <Users className="h-4 w-4 text-purple-600" />,
            trend: "+3 this week",
            color: "bg-purple-50"
        }
    ];

    const activityData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 500 },
        { name: 'Jun', value: 700 },
    ];

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={index}
                        >
                            <Card className={`${card.color} border-none`}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {card.title}
                                    </CardTitle>
                                    <div className={`p-2 rounded-full ${card.color}`}>
                                        {card.icon}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{card.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {card.trend}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

        </AdminLayout>
    );
};

export default Dashboard;