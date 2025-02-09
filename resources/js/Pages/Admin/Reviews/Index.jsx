
import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ReviewDataTable from '@/Components/Admin/Review/ReviewDataTable';

const Index = () => {
    return (
        <AdminLayout>
            <Head title="Reviews Management" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ReviewDataTable />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;