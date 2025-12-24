import React, { useMemo } from "react";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { NavLink } from "react-router-dom";
import g1 from '../assets/gallary1.png';
import g2 from '../assets/gallary2.jpg';
import g3 from '../assets/gallary3.png';
import g4 from '../assets/gallary4.png';

type Exhibition = {
    id: number;
    title: string;
    date: string;
    desc?: string;
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
            <header className="min-h-[40vh] flex items-center justify-center py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-light" style={{ color: COLORS.dark }}>Our Studio</h1>
                    <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">Visit the studio, browse collections in-person, and learn about pop-ups and events.</p>
                </div>
            </header>

            {/* Studio location & visit info */}
            <section className="mb-16 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">
                <div className="col-span-2">
                    <h2 className="text-3xl md:text-4xl font-serif font-light" style={{ color: COLORS.mid }}>Studio Location</h2>
                    <p className="mt-4 text-stone-700 max-w-3xl leading-relaxed">Surat, Gujarat, India — Visit us and make your own handmade pottery. A place full of creativity.</p>

                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl shadow-lg" style={{ background: COLORS.pale }}>
                            <h3 className="font-semibold text-base">Visit & Collection</h3>
                            <ul className="mt-3 text-sm text-stone-700 space-y-2">
                                <li>- Our email : bashobyyshivangi@gmail.com</li>
                                <li>- Contact   : +91 98795 75601 via whatsapp</li>
                                <li>- Order custome pottery via website or whatsapp</li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl shadow-lg border" style={{ borderColor: COLORS.mid }}>
                            <h3 className="font-semibold text-base">Studio Policies</h3>
                            <ul className="mt-3 text-sm text-stone-700 space-y-2">
                                <li>- Custome orders are done within 4-6 weeks</li>
                                <li>- contact us for any defacts</li>
                                <li>- Microwave safe, Oven safe details are given while purchasing</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Timing */}
                <aside className="p-6 rounded-2xl border shadow-sm" style={{ borderColor: COLORS.deep }}>
                    <h3 className="font-semibold text-base">Hours</h3>
                    <p className="text-sm text-stone-700 mt-2">Mon — Fri: 10:00 — 17:00</p>
                    <p className="text-sm text-stone-700">Weekends: Open during scheduled pop-ups</p>
                    <h3 className="font-semibold text-base mt-6">Contact</h3>
                    <p className="text-sm text-stone-700 mt-2">bashobyshivangi@gmail.com • +91 98795 75601</p>
                </aside>
                </div>
            </section>

            {/* Pop-ups & Exhibitions */}
            <section className="mb-10 px-6">
                <div className="max-w-6xl mx-auto mt-6">
                    <h2 className="text-3xl font-serif font-light" style={{ color: COLORS.deep }}>Pop-ups & Exhibitions</h2>
                    <div style={{ height: 6, background: COLORS.dark, width: 120, borderRadius: 4 }} className="mt-3" />

                    {/* Upcoming events */}
                    <div className="mt-6">
                        <h3 className="font-medium text-lg">Upcoming</h3>
                        <div className="mt-4 grid md:grid-cols-2 gap-6">
                            {upcoming.map(e => (
                                <div key={e.id} className="mb-4 p-4 rounded-2xl border bg-white shadow-sm" style={{ borderColor: COLORS.pale }}>
                                    <h4 className="font-medium text-lg text-stone-800">{e.title}</h4>
                                    <div className="text-sm text-stone-500">{e.date}</div>
                                    <p className="mt-2 text-sm text-stone-700">{e.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* separator before past */}
                    <div className="mt-8">
                        <div style={{ height: 6, background: COLORS.dark, width: 120, borderRadius: 4 }} />
                        <h3 className="font-medium text-lg mt-4">Past</h3>
                        <div className="mt-4 grid md:grid-cols-2 gap-6">
                            {past.map(e => (
                                <div key={e.id} className="mb-4 p-4 rounded-2xl border bg-white shadow-sm" style={{ borderColor: COLORS.pale }}>
                                    <h4 className="font-medium text-lg text-stone-800">{e.title}</h4>
                                    <div className="text-sm text-stone-500">{e.date}</div>
                                    <p className="mt-2 text-sm text-stone-700">{e.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Event gallery below lists */}
                    <div className="mt-8">
                        <h4 className="font-semibold">Event Gallery</h4>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {gallery.map(g => (
                                <div key={g.src} className="relative overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105 h-40">
                                    <img src={g.src} alt="event" className="w-full h-40 object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute left-4 bottom-4">
                                        <div className="text-white text-sm bg-black/30 px-3 py-1 rounded">Event image</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <NavLink to="/media" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow border" aria-label="View more media">
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