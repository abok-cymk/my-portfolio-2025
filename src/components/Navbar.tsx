import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'react-feather';

interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
    const location = useLocation();

    // Function to determine if a link is active
    const isActive = (path: string) => location.pathname === path;
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-3xl font-700 font-dancingScript text-gray-900 dark:text-white">
                            abok
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
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
            </div>
        </nav>
    );
}