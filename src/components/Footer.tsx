
import { Mail, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <a href="/" className="text-xl font-bold mb-6 block text-white">
                            Biz<span className="font-bold text-white">mobia</span>
                        </a>
                        <p className="text-zinc-200 text-sm leading-relaxed max-w-xs font-medium">
                            Engineering digital ecosystems for the enterprise of tomorrow.
                        </p>
                    </div>

                    {/* Sitemaps */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Solutions</h3>
                        <ul className="space-y-4">
                            <li><a href="#fintech" className="text-zinc-200 hover:text-white transition-colors text-sm font-medium">FinTech</a></li>
                            <li><a href="#vas" className="text-zinc-200 hover:text-white transition-colors text-sm font-medium">VAS</a></li>
                            <li><a href="#foodtech" className="text-zinc-200 hover:text-white transition-colors text-sm font-medium">Food Tech</a></li>
                            <li><a href="#tickettech" className="text-zinc-200 hover:text-white transition-colors text-sm font-medium">Ticket Tech</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Company</h3>
                        <ul className="space-y-4">
                            <li><a href="#program" className="text-zinc-200 hover:text-white transition-colors text-sm font-medium">Co-Founder Program</a></li>
                            <li><a href="#about" className="text-zinc-200 hover:text-white transition-colors text-sm font-medium">About</a></li>
                            <li><a href="#careers" className="text-zinc-200 hover:text-white transition-colors text-sm font-medium">Careers</a></li>
                            <li><a href="#contact" className="text-zinc-200 hover:text-white transition-colors text-sm font-medium">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Connect</h3>
                        <div className="flex space-x-6">
                            <a href="#" className="text-zinc-200 hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-zinc-200 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-zinc-200 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="mailto:info@bizmobia.com" className="text-zinc-200 hover:text-white transition-colors"><Mail size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-zinc-400 text-xs font-medium">
                        &copy; {new Date().getFullYear()} Bizmobia Software Pvt Ltd.
                    </p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <a href="#" className="text-zinc-400 hover:text-white text-xs font-medium">Privacy</a>
                        <a href="#" className="text-zinc-400 hover:text-white text-xs font-medium">Terms</a>
                        <a href="#" className="text-zinc-400 hover:text-white text-xs font-medium">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
