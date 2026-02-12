
import { ArrowRight } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-32 bg-zinc-950 text-white border-t border-white/5 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                            Let's Talk.
                        </h2>
                        <p className="text-gray-300 text-xl font-light max-w-md mb-12">
                            Ready to transform your business or start your next big venture? We are here to listen.
                        </p>

                        <div className="space-y-2 text-gray-400">
                            <p>Hyderabad, India</p>
                            <p>Dubai, UAE</p>
                            <p>United States</p>
                        </div>

                        <div className="mt-12">
                            <a href="mailto:info@bizmobia.com" className="text-2xl text-white hover:text-gray-300 transition-colors font-medium">
                                info@bizmobia.com
                            </a>
                        </div>
                    </div>

                    <form className="space-y-8 mt-8 lg:mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-white transition-colors">Name</label>
                                <input type="text" id="name" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors placeholder-gray-600" placeholder="Enter your name" />
                            </div>
                            <div className="group">
                                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-white transition-colors">Email</label>
                                <input type="email" id="email" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors placeholder-gray-600" placeholder="Enter your email" />
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-white transition-colors">Message</label>
                            <textarea id="message" rows={4} className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors placeholder-gray-600" placeholder="Tell us about your project"></textarea>
                        </div>

                        <button type="submit" className="group flex items-center justify-between w-full bg-white text-black px-8 py-6 text-lg font-bold hover:bg-gray-200 transition-colors mt-8">
                            <span>Send Inquiry</span>
                            <ArrowRight className="transform group-hover:translate-x-2 transition-transform" />
                        </button>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default Contact;
