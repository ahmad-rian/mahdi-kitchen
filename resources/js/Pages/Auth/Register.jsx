import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import Navbar from '@/Components/Navbar';

// Parallax Background Component (tidak berubah)
const ParallaxBackground = () => {
  const { scrollYProgress } = useViewportScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], ['100%', '110%']);

  return (
    <motion.div 
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        y: backgroundY,
        scale: backgroundScale,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 opacity-50"></div>
      <div 
        className="absolute inset-0 bg-[url('/assets/kitchen-pattern.svg')] opacity-10 bg-repeat"
        style={{ backgroundSize: '200px 200px' }}
      ></div>
    </motion.div>
  );
};

// Registration Illustration Component (tidak berubah)
const RegisterIllustration = () => (
  <motion.div 
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-[#F5F5F5] flex items-center justify-center p-8 rounded-l-xl"
  >
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Binggo Complete Kitchen</h2>
      <p className="text-gray-600 mb-6">Create Your Account</p>
      
      <div className="w-full max-w-xs mx-auto">
        <motion.img 
          src="/assets/register.svg" 
          alt="Binggo Kitchen Registration" 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  </motion.div>
);

// Main Register Component
export default function Register({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <div className="relative min-h-screen bg-transparent flex flex-col">
      <Navbar auth={auth} />

      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <ParallaxBackground />
        <Head title="Register" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-4xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          <RegisterIllustration />

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 flex flex-col justify-center"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h1>
            <p className="text-gray-600 mb-8">Create your Binggo Complete Kitchen account</p>

            <form onSubmit={submit} className="space-y-6">
              {/* Form fields tetap sama */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  isFocused={true}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  placeholder="Enter your email"
                  autoComplete="username"
                  required
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pr-12"
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pr-12"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                )}
              </motion.div>

              {/* Register Button and Login Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between"
              >
                <Link
                  href={route('login')}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Already registered?
                </Link>

                <button
                  type="submit"
                  disabled={processing}
                  className="flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                >
                  {processing ? 'Registering...' : 'Register'}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}