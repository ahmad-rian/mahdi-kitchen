import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ProductForm from '@/Components/Admin/Product/ProductForm';

const Edit = ({ product, categories }) => {
    return (
        <AdminLayout>
            <Head title="Edit Product" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ProductForm product={product} categories={categories} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Edit;