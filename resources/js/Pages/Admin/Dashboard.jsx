import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Package, ListOrdered, MessageCircle, Users } from 'lucide-react';

const Dashboard = ({ stats }) => {
    const cards = [
        {
            title: "Total Products",
            value: stats.products_count,
            icon: <Package className="h-4 w-4 text-muted-foreground" />,
            description: "Total products in database"
        },
        {
            title: "Total Categories",
            value: stats.categories_count,
            icon: <ListOrdered className="h-4 w-4 text-muted-foreground" />,
            description: "Active categories"
        },
        {
            title: "Total Reviews",
            value: stats.reviews_count,
            icon: <MessageCircle className="h-4 w-4 text-muted-foreground" />,
            description: "Customer reviews"
        },
        {
            title: "Total Users",
            value: stats.users_count,
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
            description: "Registered users"
        }
    ];

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {card.title}
                            </CardTitle>
                            {card.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {card.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    );
};

export default Dashboard;