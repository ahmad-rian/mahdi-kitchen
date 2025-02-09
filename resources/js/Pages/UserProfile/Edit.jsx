import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import UpdateProfileForm from './Partials/UpdateProfileForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteAccountForm from './Partials/DeleteAccountForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Navbar auth={auth} />
            <Head title="My Profile" />

            <div className="pt-20 pb-12 bg-gray-50">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Profile Information
                        </h2>
                        <UpdateProfileForm
                            auth={auth}
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Update Password
                        </h2>
                        <UpdatePasswordForm />
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-lg font-medium text-red-600 mb-4">
                            Delete Account
                        </h2>
                        <DeleteAccountForm />
                    </div>
                </div>
            </div>
        </>
    );
}