import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import UserForm from '@/Components/Admin/Users/UserForm';

const Edit = ({ user }) => {
   return (
       <AdminLayout>
           <Head title="Edit User" />
           <div className="py-12">
               <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                   <UserForm user={user} />
               </div>
           </div>
       </AdminLayout>
   );
};

export default Edit;