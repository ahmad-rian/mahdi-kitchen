import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import CategoryDataTable from '@/Components/Admin/Category/CategoryDataTable';

const Index = () => {
    return (
        <AdminLayout>
            <Head title="Kategori" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <CategoryDataTable />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;