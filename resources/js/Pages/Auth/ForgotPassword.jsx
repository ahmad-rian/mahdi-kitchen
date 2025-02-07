import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChefHat, Send } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4 py-8">
            <Head title="Lupa Password" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
            >
                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <ChefHat className="mx-auto mb-4 text-blue-600" size={48} />
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Lupa Password</h1>
                        <p className="text-gray-600 text-sm">
                            Masukkan email Anda untuk mengatur ulang password
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg"
                        >
                            {status}
                        </motion.div>
                    )}

                    {/* Forgot Password Form */}
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Alamat Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                placeholder="Masukkan email Anda"
                                required
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <motion.button
                            type="submit"
                            disabled={processing}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50"
                        >
                            {processing ? 'Mengirim...' : 'Kirim Link Reset Password'}
                            <Send className="ml-2" size={20} />
                        </motion.button>
                    </form>

                    {/* Back to Login Link */}
                    <div className="mt-6 text-center">
                        <Link
                            href={route('login')}
                            className="text-sm text-blue-600 hover:text-blue-800 transition"
                        >
                            Kembali ke Halaman Login
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}