import React, { useMemo } from "react";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { NavLink } from "react-router-dom";
import { Leaf, Calendar, Clock, Mail, Phone, Image } from 'lucide-react';
import g1 from '../assets/gallary1.png';
import g2 from '../assets/gallary2.jpg';
import g3 from '../assets/gallary3.png';
import g4 from '../assets/gallary4.png';

type Exhibition = {
    id: number;
    title: string;
    date: string;
    desc?: string;
    image?: string;
}

type GalleryItem = {
    src : string,
}

const COLORS = {
    dark: "#3B2E27",
    deep: "#5A463B",
    mid: "#8E5022",
    accent: "#C07A63",
    pale: "#F6EDE6",
};

const StudioPage: React.FC = () => {

    

    const upcoming = useMemo<Exhibition[]>(() => [
        { id: 1, title: "Picasso Exhibition", date: "Jan 10 — Jan 20, 2026", desc: "Limited edition collection from Spain." },
        { id: 2, title: "Collaborative part", date: "Feb 5, 2026", desc: "Come make with us." }
    ], []);

    const past = useMemo<Exhibition[]>(() => [
        { id: 11, title: "Autumn Impressions — Pop-up", date: "Oct 2025", desc: "Showcased seasonal tableware." },
        { id: 12, title: "Mini Gallery: Forms", date: "Sep 2025", desc: "Sculptural pieces and installations." }
    ], []);

    const gallery = useMemo<GalleryItem[]>(() => [
        {src:g1},
        {src:g2},
        {src:g3},
        {src:g4},
    ], []);
    

    return (
        <div className="bg-stone-50 min-h-screen">
            <header className="min-h-[70vh] flex items-center justify-center py-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&q=80" alt="studio background" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-linear-to-b from-stone-50/75 to-stone-50" />
                </div>

                <div className="relative z-10 text-center animate-fade-in max-w-6xl">
                    <Leaf className="mx-auto text-amber-800 animate-pulse mb-6" size={64} />
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light animate-slide-down" style={{ color: COLORS.dark }}>Our Studio</h1>
                    <p className="mt-6 text-lg md:text-xl lg:text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed animate-slide-up">Visit the studio, browse collections in-person, and learn about pop-ups and events. Experience hands-on workshops and curated pop-ups.</p>
                    <div className="mt-6 flex justify-center gap-4">
                        <NavLink to="/media" className="px-6 py-3 border border-stone-200 bg-white rounded-full shadow-sm flex items-center gap-2" aria-label="Gallery">
                            <Image size={16} /> Gallery
                        </NavLink>
                    </div>
                </div>
            </header>

            {/* Studio location & visit info */}
            <section className="mb-16 px-6 relative overflow-hidden">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">
                <div className="col-span-2 animate-fade-in-left">
                    <h2 className="text-3xl md:text-4xl font-serif font-light animate-slide-down" style={{ color: COLORS.mid }}>Studio Location</h2>
                    <p className="mt-4 text-stone-700 max-w-3xl leading-relaxed animate-slide-up">Surat, Gujarat, India — Visit us and make your own handmade pottery. A place full of creativity.</p>

                        <div className="mt-8 grid md:grid-cols-2 gap-6">
                            <div className="p-8 rounded-2xl shadow-lg" style={{ background: COLORS.pale }}>
                                <h3 className="font-semibold text-lg flex items-center gap-2"><Mail size={16} className="text-amber-700" /> Visit & Collection</h3>
                                <ul className="mt-4 text-base text-stone-700 space-y-3">
                                    <li className="flex items-center gap-3"><Mail size={16} className="text-amber-700" /> bashobyyshivangi@gmail.com</li>
                                    <li className="flex items-center gap-3"><Phone size={16} className="text-amber-700" /> +91 98795 75601 (WhatsApp)</li>
                                    <li className="flex items-center gap-3"><Image size={16} className="text-amber-700" /> Order custom pottery via website or WhatsApp</li>
                                </ul>
                            </div>

                            <div className="p-8 rounded-2xl shadow-lg border" style={{ borderColor: COLORS.mid }}>
                                <h3 className="font-semibold text-lg">Studio Policies</h3>
                                <ul className="mt-4 text-base text-stone-700 space-y-3">
                                    <li>• Custom orders are completed within 4–6 weeks</li>
                                    <li>• Contact us for defects or glaze concerns</li>
                                    <li>• Microwave & oven safety details provided at purchase</li>
                                </ul>
                            </div>
                        </div>
                </div>

                {/* Timing */}
                <aside className="p-8 rounded-2xl border shadow-sm animate-fade-in-right" style={{ borderColor: COLORS.deep }}>
                    <div className="flex items-center gap-3"><Clock size={18} className="text-amber-700" /><h3 className="font-semibold text-lg">Hours</h3></div>
                    <p className="text-base text-stone-700 mt-3">Mon — Fri: 10:00 — 17:00</p>
                    <p className="text-base text-stone-700">Weekends: Open during scheduled pop-ups</p>
                    <div className="mt-6 flex items-center gap-3"><Mail size={16} className="text-amber-700" /><h3 className="font-semibold text-lg">Contact</h3></div>
                    <p className="text-base text-stone-700 mt-2">bashobyyshivangi@gmail.com • +91 98795 75601</p>
                </aside>
                </div>
            </section>

            {/* Pop-ups & Exhibitions */}
            <section className="mb-10 px-6">
                <div className="max-w-6xl mx-auto mt-6 animate-fade-in">
                    <div className="flex items-center gap-3">
                        <Calendar className="text-amber-700" />
                        <h2 className="text-3xl font-serif font-light animate-slide-down" style={{ color: COLORS.deep }}>Pop-ups & Exhibitions</h2>
                    </div>
                    <div style={{ height: 6, background: COLORS.dark, width: 140, borderRadius: 4 }} className="mt-3" />

                    {/* Upcoming events */}
                    <div className="mt-6">
                        <h3 className="font-medium text-lg">Upcoming</h3>
                        <div className="mt-4 grid grid-cols-1 gap-6">
                            {upcoming.map((e, idx) => (
                                <div key={e.id} className="mb-0 rounded-2xl border bg-white shadow-sm overflow-hidden transform transition-all duration-500 hover:scale-102 animate-fade-in-up" style={{ borderColor: COLORS.pale, animationDelay: `${idx * 100}ms` }}>
                                    <div className="h-36 w-full bg-stone-100">
                                        {e.image ? (
                                            <img src={e.image} alt={e.title} className="w-full h-36 object-cover" />
                                        ) : (
                                            <div className="w-full h-36 bg-linear-to-br from-amber-50 to-stone-50" />
                                        )}
                                    </div>
                                    <div className="p-6 h-40">
                                        <h4 className="font-medium text-lg text-stone-800">{e.title}</h4>
                                        <div className="text-sm text-stone-500">{e.date}</div>
                                        <p className="mt-2 text-sm text-stone-700">{e.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Past events */}
                    <div className="mt-8">
                        <div style={{ height: 6, background: COLORS.dark, width: 120, borderRadius: 4 }} />
                        <h3 className="font-medium text-lg mt-4">Past</h3>
                        <div className="mt-4 grid grid-cols-1 gap-6">
                            {past.map((e, idx) => (
                                <div key={e.id} className="mb-0 rounded-2xl border bg-white shadow-sm overflow-hidden transform transition-all duration-500 hover:scale-102 animate-fade-in-up" style={{ borderColor: COLORS.pale, animationDelay: `${idx * 100}ms` }}>
                                    <div className="h-36 w-full bg-stone-100">
                                        {e.image ? (
                                            <img src={e.image} alt={e.title} className="w-full h-36 object-cover" />
                                        ) : (
                                            <div className="w-full h-36 bg-linear-to-br from-stone-100 to-stone-50" />
                                        )}
                                    </div>
                                    <div className="p-6 h-40">
                                        <h4 className="font-medium text-lg text-stone-800">{e.title}</h4>
                                        <div className="text-sm text-stone-500">{e.date}</div>
                                        <p className="mt-2 text-sm text-stone-700">{e.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Event gallery below lists */}
                    <div className="mt-8">
                        <h4 className="font-semibold">Event Gallery</h4>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {gallery.map((g, idx) => (
                                    <div key={g.src} className="relative overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105 h-64 animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 80}ms` }}>
                                        <img src={g.src} alt="event" className="w-full h-64 object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                ))}
                            </div>

                        <div className="mt-6 flex justify-center">
                            <NavLink to="/media" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow border animate-bounce-subtle" aria-label="View more media">
                                <span className="text-sm font-medium">View more</span>
                                <KeyboardDoubleArrowDownIcon fontSize="small" />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default StudioPage;