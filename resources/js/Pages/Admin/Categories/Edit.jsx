import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import CategoryForm from '@/Components/Admin/Category/CategoryForm';

const Edit = ({ category }) => {
    return (
        <AdminLayout>
            <Head title="Edit Category" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <CategoryForm category={category} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Edit;