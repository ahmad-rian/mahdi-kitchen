// resources/js/Pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import Navbar from '@/Components/Navbar';

// Parallax Background Component
const ParallaxBackground = () => {
  const { scrollYProgress } = useViewportScroll();
  
  // Create parallax transformations
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

// Login Illustration Component
const LoginIllustration = () => (
  <motion.div 
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-[#F5F5F5] flex items-center justify-center p-8 rounded-l-xl"
  >
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Binggo Complete Kitchen</h2>
      <p className="text-gray-600 mb-6">Upgrade Your Culinary Experience</p>
      
      <div className="w-full max-w-xs mx-auto">
        <motion.img 
          src="/assets/login.svg" 
          alt="Binggo Kitchen Illustration" 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  </motion.div>
);

export default function Login({ status, canResetPassword, auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar auth={auth} />

      <div className="flex-1 flex items-center justify-center">
        <ParallaxBackground />
        <Head title="Log in" />

        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Illustration */}
              <div className="w-full md:w-1/2">
                <LoginIllustration />
              </div>

              {/* Right Side - Form */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full md:w-1/2 p-8"
              >
                <div className="max-w-sm mx-auto">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                  <p className="text-gray-600 mb-8">Please enter your login details</p>

                  {status && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6" 
                      role="alert"
                    >
                      {status}
                    </motion.div>
                  )}

                  <form onSubmit={submit} className="space-y-6">
                    {/* Email Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
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
                      transition={{ delay: 0.4 }}
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
                          placeholder="Enter your password"
                          autoComplete="current-password"
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

                    {/* Remember Me and Forgot Password */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <input
                          id="remember"
                          type="checkbox"
                          checked={data.remember}
                          onChange={(e) => setData('remember', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                          Remember me
                        </label>
                      </div>

                      {canResetPassword && (
                        <Link
                          href={route('password.request')}
                          className="text-sm text-blue-600 hover:text-blue-500"
                        >
                          Forgot password?
                        </Link>
                      )}
                    </motion.div>

                    {/* Login Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                      >
                        {processing ? 'Logging in...' : 'Log in'}
                      </button>
                    </motion.div>

                    {/* Sign Up Link */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-center"
                    >
                      <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link 
                          href={route('register')} 
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          Sign up
                        </Link>
                      </p>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}