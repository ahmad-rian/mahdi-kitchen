import React, { useState, useEffect, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, 
  Menu, 
  X, 
  ShoppingBag, 
  Info, 
  Phone,
  UserPlus,
  LogIn,
  LogOut,
  User,
  Home
} from 'lucide-react';

const Navbar = ({ auth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
  }, [auth?.user]);

  // Check if user is admin
  const isAdmin = auth?.user?.role === 'admin';

  // Get profile route based on user role
  const getProfileRoute = () => {
    if (!auth?.user) return route('login');
    // Use admin.profile.edit for admin, user-profile.edit for regular users
    return isAdmin ? '/admin/profile' : route('user-profile.edit');
  };

  // Get dashboard route based on user role
  const getDashboardRoute = () => {
    if (!auth?.user) return route('login');
    return isAdmin ? route('admin.dashboard') : route('dashboard');
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: <Home size={18} /> },
    { href: route('about'), label: 'About', icon: <Info size={18} /> },
    { href: route('products.index'), label: 'Products', icon: <ShoppingBag size={18} /> },
    { href: route('contact'), label: 'Contact', icon: <Phone size={18} /> },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="navbar container mx-auto px-4">
        {/* Logo Section */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <ChefHat className="text-primary" size={32} />
            </motion.div>
            <span className="text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] sm:text-xl sm:max-w-none">
              Binggo Complete Kitchen
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Auth Buttons Section */}
        <div className="navbar-end">
          <div className="hidden lg:flex items-center gap-4">
            {auth?.user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={auth.user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${auth.user.name}`} alt="avatar" />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[100] p-2 shadow-xl menu menu-sm dropdown-content bg-white rounded-xl w-56 font-medium">
                 
                  <li>
                    <Link href={getProfileRoute()} className="flex items-center gap-2">
                      <User size={18} />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href={route('logout')} 
                      method="post" 
                      as="button"
                      className="flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                      <LogOut size={18} />
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href={route('login')} className="btn btn-ghost btn-sm gap-2">
                  <LogIn size={18} />
                  Login
                </Link>
                <Link href={route('register')} className="btn btn-primary btn-sm gap-2">
                  <UserPlus size={18} />
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost btn-circle"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-lg border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="menu w-full space-y-2">
                {/* User Info for Mobile - Show when logged in */}
                {auth?.user && (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img 
                            src={auth.user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${auth.user.name}`} 
                            alt="avatar" 
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{auth.user.name}</p>
                        <p className="text-sm text-gray-500">{auth.user.email}</p>
                      </div>
                    </div>
                  </>
                )}

                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </li>
                ))}

                {/* Auth Links */}
                {auth?.user ? (
                  <>
                    <div className="divider my-4"></div>
                    <li>
                      <Link 
                        href={getDashboardRoute()}
                        className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-gray-700"
                        onClick={() => setIsOpen(false)}
                      >
                        <Home size={18} />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href={getProfileRoute()}
                        className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-gray-700"
                        onClick={() => setIsOpen(false)}
                      >
                        <User size={18} />
                        <span className="font-medium">Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-2 p-3 hover:bg-red-50 rounded-lg text-red-600 w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <div className="divider my-4"></div>
                    <li>
                      <Link 
                        href={route('login')}
                        className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700"
                        onClick={() => setIsOpen(false)}
                      >
                        <LogIn size={18} />
                        <span className="font-medium">Login</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href={route('register')}
                        className="flex items-center gap-2 p-3 bg-primary text-white hover:bg-primary-focus rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <UserPlus size={18} />
                        <span className="font-medium">Register</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;