import React, { useMemo } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { NavLink } from "react-router-dom";
import { Leaf, Calendar, Clock, Mail, Phone, Image } from "lucide-react";

import g1 from "../assets/gallary1.png";
import g2 from "../assets/gallary2.jpg";
import g3 from "../assets/gallary3.png";
import g4 from "../assets/gallary4.png";

type Exhibition = {
  id: number;
  title: string;
  date: string;
  desc?: string;
  image?: string;
};

type GalleryItem = {
  src: string;
};

const COLORS = {
  dark: "#3B2E27",
  deep: "#5A463B",
  mid: "#8E5022",
  accent: "#C07A63",
  pale: "#F6EDE6",
};

const StudioPage: React.FC = () => {
  const upcoming = useMemo<Exhibition[]>(
    () => [
      {
        id: 1,
        title: "Picasso Exhibition",
        date: "Jan 10 — Jan 20, 2026",
        desc: "Limited edition collection from Spain.",
      },
      {
        id: 2,
        title: "Collaborative Part",
        date: "Feb 5, 2026",
        desc: "Come make with us.",
      },
    ],
    []
  );

  const past = useMemo<Exhibition[]>(
    () => [
      {
        id: 11,
        title: "Autumn Impressions — Pop-up",
        date: "Oct 2025",
        desc: "Showcased seasonal tableware.",
      },
      {
        id: 12,
        title: "Mini Gallery: Forms",
        date: "Sep 2025",
        desc: "Sculptural pieces and installations.",
      },
    ],
    []
  );

  const gallery = useMemo<GalleryItem[]>(
    () => [{ src: g1 }, { src: g2 }, { src: g3 }, { src: g4 }],
    []
  );

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* ================= HERO ================= */}
      <header className="min-h-[70vh] flex items-center justify-center py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={g3}
            className="w-full h-full object-cover opacity-30"
            alt="studio"
          />
          <div className="absolute inset-0 bg-linear-to-b from-stone-50/75 to-stone-50" />
        </div>

        <div className="relative z-10 text-center max-w-6xl animate-fade-in">
          <Leaf size={64} className="mx-auto mb-6 text-amber-800 animate-pulse" />
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-light animate-slide-down"
            style={{ color: COLORS.dark }}
          >
            Our Studio
          </h1>
          <p className="mt-6 text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Visit the studio, browse collections in-person, and explore pop-ups,
            workshops, and exhibitions.
          </p>

          <div className="mt-6 flex justify-center">
            <NavLink
              to="/media"
              className="px-6 py-3 rounded-full bg-white shadow border flex items-center gap-2"
            >
              <Image size={16} /> Gallery
            </NavLink>
          </div>
        </div>
      </header>

      {/* ================= STUDIO LOCATION ================= */}
      <section className="mb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-serif font-light"
            style={{ color: COLORS.mid }}
          >
            Studio Location
          </h2>

          <p className="mt-4 text-stone-700 max-w-3xl">
            Surat, Gujarat, India — Visit us and make your own handmade pottery. A
            place full of creativity.
          </p>

          {/* Cards */}
          <div className="mt-8 grid md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1 */}
            <div
              className="p-8 rounded-2xl shadow-lg h-full hover:-translate-y-1 transition"
              style={{ background: COLORS.pale }}
            >
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Mail size={16} className="text-amber-700" /> Visit & Collection
              </h3>
              <ul className="mt-4 space-y-3 text-stone-700">
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-amber-700" />
                  bashobyyshivangi@gmail.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-amber-700" />
                  +91 98795 75601 (WhatsApp)
                </li>
                <li className="flex items-center gap-3">
                  <Image size={16} className="text-amber-700" />
                  Custom orders via website or WhatsApp
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div
              className="p-8 rounded-2xl shadow-lg border h-full hover:-translate-y-1 transition"
              style={{ borderColor: COLORS.mid }}
            >
              <h3 className="font-semibold text-lg">Studio Policies</h3>
              <ul className="mt-4 space-y-3 text-stone-700">
                <li>• Custom orders completed within 4–6 weeks</li>
                <li>• Contact us for glaze or defect concerns</li>
                <li>• Microwave & oven safety info provided</li>
              </ul>
            </div>

            {/* Card 3 */}
            <aside
              className="p-8 rounded-2xl border shadow-sm h-full hover:-translate-y-1 transition"
              style={{ borderColor: COLORS.deep }}
            >
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-amber-700" />
                <h3 className="font-semibold text-lg">Hours</h3>
              </div>
              <p className="mt-3 text-stone-700">
                Mon — Fri: 10:00 — 17:00
              </p>
              <p className="text-stone-700">
                Weekends: Open during scheduled pop-ups
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Mail size={16} className="text-amber-700" />
                <h3 className="font-semibold text-lg">Contact</h3>
              </div>
              <p className="mt-2 text-stone-700">
                bashobyyshivangi@gmail.com
              </p>
              <p className="mt-2 text-stone-700">
                +91 98795 75601</p>
            </aside>
          </div>
        </div>
      </section>

      {/* ================= POPUPS & EXHIBITIONS ================= */}
      <section className="mb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Calendar className="text-amber-700" />
            <h2
              className="text-3xl font-serif font-light"
              style={{ color: COLORS.deep }}
            >
              Pop-ups & Exhibitions
            </h2>
          </div>

          {/* Upcoming */}
          <div className="mt-6">
            <h3 className="font-medium text-lg">Upcoming</h3>
            <div className="mt-4 grid gap-6">
              {upcoming.map((e) => (
                <div
                  key={e.id}
                  className="rounded-2xl border bg-white shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <h4 className="font-medium text-lg">{e.title}</h4>
                    <div className="text-sm text-stone-500">{e.date}</div>
                    <p className="mt-2 text-stone-700">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past */}
          <div className="mt-8">
            <h3 className="font-medium text-lg">Past</h3>
            <div className="mt-4 grid gap-6">
              {past.map((e) => (
                <div
                  key={e.id}
                  className="rounded-2xl border bg-white shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <h4 className="font-medium text-lg">{e.title}</h4>
                    <div className="text-sm text-stone-500">{e.date}</div>
                    <p className="mt-2 text-stone-700">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-10">
            <h4 className="font-semibold">Event Gallery</h4>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {gallery.map((g) => (
                <div
                  key={g.src}
                  className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
                >
                  <img src={g.src} className="h-64 w-full object-cover" />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <NavLink
                to="/media"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow border"
              >
                View more <KeyboardDoubleArrowDownIcon fontSize="small" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudioPage;
