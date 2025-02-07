import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ProductDataTable from '@/Components/Admin/Product/ProductDataTable';

const Index = () => {
    return (
        <AdminLayout>
            <Head title="Products Management" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ProductDataTable />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;