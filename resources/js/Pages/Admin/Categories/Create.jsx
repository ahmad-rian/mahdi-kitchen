import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import CategoryForm from '@/Components/Admin/Category/CategoryForm';

const Create = () => {
    return (
        <AdminLayout>
            <Head title="Create Category" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <CategoryForm />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Create;