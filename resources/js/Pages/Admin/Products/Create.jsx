import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ProductForm from '@/Components/Admin/Product/ProductForm';

const Create = ({ categories }) => {
    return (
        <AdminLayout>
            <Head title="Create Product" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ProductForm categories={categories} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Create;