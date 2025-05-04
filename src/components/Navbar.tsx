import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to determine if a link is active
    const isActive = (path: string) => location.pathname === path;

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Close mobile menu when window is resized to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-3xl font-700 font-dancingScript text-gray-900 dark:text-white">
                            abok
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 mr-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Open menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/"
                            className={`transition-colors relative ${isActive('/')
                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                        >
                            Home
                            {isActive('/') && (
                                <span className="absolute bottom-[-8px] left-0 w-full h-[3px] bg-green-700 dark:bg-green-600 rounded-full"></span>
                            )}
                        </Link>
                        <Link
                            to="/about"
                            className={`transition-colors relative ${isActive('/about')
                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                        >
                            About
                            {isActive('/about') && (
                                <span className="absolute bottom-[-8px] left-0 w-full h-[3px] bg-green-700 dark:bg-green-600 rounded-full"></span>
                            )}
                        </Link>
                        <Link
                            to="/projects"
                            className={`transition-colors relative ${isActive('/projects')
                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                        >
                            Projects
                            {isActive('/projects') && (
                                <span className="absolute bottom-[-8px] left-0 w-full h-[3px] bg-green-700 dark:bg-green-600 rounded-full"></span>
                            )}
                        </Link>
                        <Link
                            to="/education"
                            className={`transition-colors relative ${isActive('/education')
                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                        >
                            Education
                            {isActive('/education') && (
                                <span className="absolute bottom-[-8px] left-0 w-full h-[3px] bg-green-700 dark:bg-green-600 rounded-full"></span>
                            )}
                        </Link>
                        <Link
                            to="/contact"
                            className={`transition-colors relative ${isActive('/contact')
                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                        >
                            Contact
                            {isActive('/contact') && (
                                <span className="absolute bottom-[-8px] left-0 w-full h-[3px] bg-green-700 dark:bg-green-600 rounded-full"></span>
                            )}
                        </Link>

                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    to="/"
                                    className={`block px-3 py-2 rounded-md ${isActive('/')
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/about"
                                    className={`block px-3 py-2 rounded-md ${isActive('/about')
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    About
                                </Link>
                                <Link
                                    to="/projects"
                                    className={`block px-3 py-2 rounded-md ${isActive('/projects')
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    Projects
                                </Link>
                                <Link
                                    to="/education"
                                    className={`block px-3 py-2 rounded-md ${isActive('/education')
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    Education
                                </Link>
                                <Link
                                    to="/contact"
                                    className={`block px-3 py-2 rounded-md ${isActive('/contact')
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    Contact
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}