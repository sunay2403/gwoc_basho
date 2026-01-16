
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-stone-900 text-stone-400 py-12 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <div className="flex items-center justify-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">芭</span>
                    </div>
                    <span className="text-2xl font-serif text-stone-300">Basho by Shivangi</span>
                </div>
                <p className="text-stone-500 mb-8">
                    Where poetry meets clay. Handcrafted for your happy place.
                </p>

                <div className="flex flex-col text-sm space-y-4 md:space-y-0 md:flex-row md:justify-center md:gap-10 mb-12 font-medium tracking-wide text-stone-300">
                    <Link to="/home" className="hover:text-amber-500 transition-colors uppercase">Home</Link>
                    <Link to="/media" className="hover:text-amber-500 transition-colors uppercase">About</Link>
                    <Link to="/products" className="hover:text-amber-500 transition-colors uppercase">Collection</Link>
                    <Link to="/workshops" className="hover:text-amber-500 transition-colors uppercase">Workshop</Link>
                    <Link to="/studio" className="hover:text-amber-500 transition-colors uppercase">Contact</Link>
                </div>

                <div className="border-t border-stone-800 pt-8 text-sm text-stone-600">
                    <p>© {new Date().getFullYear()} Basho by Shivangi. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <Leaf size={16} className="text-stone-700" />
                        <span>Made with mud & soul in Surat</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;