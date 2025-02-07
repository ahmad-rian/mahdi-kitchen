import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import UserDataTable from '@/Components/Admin/Users/UserDataTable';

const Index = () => {
   return (
       <AdminLayout>
           <Head title="Users Management" />
           <div className="py-12">
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                   <UserDataTable />
               </div>
           </div>
       </AdminLayout>
   );
};

export default Index;