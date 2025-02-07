import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import UserForm from '@/Components/Admin/Users/UserForm';

const Create = () => {
   return (
       <AdminLayout>
           <Head title="Create User" />
           <div className="py-12">
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                   <UserForm />
               </div>
           </div>
       </AdminLayout>
   );
};

export default Create;