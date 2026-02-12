import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        gsap.fromTo(
            ".nav-link",
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out", delay: 0.5 }
        );
    }, []);

    const navLinks = [
        { name: 'FinTech', href: '#fintech' },
        { name: 'VAS', href: '#vas' },
        { name: 'Food Tech', href: '#foodtech' },
        { name: 'Ticket Tech', href: '#tickettech' },
        { name: 'Program', href: '#program' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="text-xl font-bold tracking-tighter text-white">
                            Biz<span className="text-gray-500">mobia</span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="nav-link text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-wide"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a href="#contact" className="nav-link text-sm font-medium text-white border-b border-white/20 hover:border-white transition-all pb-1">
                            Contact
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gray-300 focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10">
                    <div className="px-4 py-8 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block text-lg font-medium text-gray-400 hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a href="#contact" className="block text-lg font-medium text-white pt-4" onClick={() => setIsOpen(false)}>
                            Contact Us
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
