import { useState, useEffect, useRef } from 'react';
import { Leaf, Mountain, Sparkles, Wind, Sun, Moon, Droplet } from 'lucide-react';

const BashoHomepage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [, setActiveSection] = useState<number>(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getOpacity = (index: number) => {
    const section = sectionsRef.current[index];
    if (!section) return 0;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top > windowHeight) return 0;
    if (rect.bottom < 0) return 0;

    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const opacity = Math.min(visibleHeight / (windowHeight * 0.6), 1);

    return opacity;
  };

  const getTransform = (index: number) => {
    const section = sectionsRef.current[index];
    if (!section) return 'translateY(100px)';

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top > windowHeight) return 'translateY(100px)';
    if (rect.bottom < 0) return 'translateY(-50px)';

    const progress = 1 - (rect.top / windowHeight);
    const translateY = Math.max(0, 100 - (progress * 150));

    return `translateY(${translateY}px)`;
  };

  return (
    <div className="bg-stone-50 min-h-screen overflow-x-hidden">
      {/* Fixed Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 z-50">
        <div
          className="h-full bg-linear-to-r from-amber-700 to-amber-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-24 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full shadow-lg border border-stone-200">
        <div className="flex items-center space-x-8 text-sm">
          <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-amber-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">芭</span>
            </div>
            <span className="font-serif text-stone-800">Basho</span>
          </button>
          <div className="h-4 w-px bg-stone-300"></div>
          <button
            onClick={() => scrollToSection('story')}
            className="text-amber px-4 py-2 rounded-full 
             hover:bg-black hover:text-white 
             transition duration-300"
          >
            Story
          </button>

          <button
            onClick={() => scrollToSection('craft')}
            className="text-amber px-4 py-2 rounded-full 
             hover:bg-black hover:text-white 
             transition duration-300"
          >
            Craft
          </button>

          <button
            onClick={() => scrollToSection('collection')}
            className="text-amber px-4 py-2 rounded-full 
             hover:bg-black hover:text-white 
             transition duration-300"
          >
            Shop
          </button>
        </div>
      </nav>

      {/* Hero - Full Screen */}
      <section
        id="hero"
        ref={el => { sectionsRef.current[0] = el; }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="http://localhost:8000/media/extracted/page_2_img_1.jpeg"
            alt="Shivangi at Basho studio"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-b from-stone-50/60 via-stone-50/80 to-stone-50"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div
            className="absolute top-20 right-1/4 w-96 h-96 border border-amber-800/10 rounded-full"
            style={{
              transform: `scale(${1 + scrollProgress * 0.01}) rotate(${scrollProgress * 2}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/4 w-64 h-64 border border-stone-300/30 rounded-full"
            style={{
              transform: `scale(${1 - scrollProgress * 0.005}) rotate(-${scrollProgress}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
        </div>

        <div
          className="text-center z-10 px-6"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 0.02),
            transform: `translateY(-${scrollProgress * 1.5}px)`
          }}
        >
          <div className="mb-8">
            <Leaf className="mx-auto text-amber-800 animate-pulse" size={48} strokeWidth={1} />
          </div>
          <h1 className="text-8xl md:text-9xl text-stone-800 font-serif font-light mb-4 tracking-wider">
            芭蕉
          </h1>
          <p className="text-2xl md:text-3xl text-stone-600 font-light mb-8">
            Where Poetry Meets Clay
          </p>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Inspired by the wandering poet Matsuo Bashō, we craft tableware that tells stories
          </p>

          <div className="mt-16 animate-bounce">
            <Droplet className="mx-auto text-stone-400" size={24} />
          </div>
        </div>
      </section>

      {/* The Poet's Story */}
      <section
        id="story"
        ref={el => { sectionsRef.current[1] = el; }}
        className="min-h-screen flex items-center py-24 px-6"
      >
        <div
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
          style={{
            opacity: getOpacity(1),
            transform: getTransform(1),
            transition: 'all 0.6s ease-out'
          }}
        >
          <div>
            <span className="inline-block px-4 py-1 bg-amber-100 text-amber-900 rounded-full text-sm mb-6">
              The Wanderer
            </span>
            <h2 className="text-5xl font-serif font-light text-stone-800 mb-6 leading-tight">
              Matsuo Bashō
              <br />
              <span className="text-3xl text-stone-500">1644-1694</span>
            </h2>
            <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
              <p>
                Basho is more than a studio — it is <strong className="text-stone-800">A Place</strong> of happiness where every moment with clay is cherished.
              </p>
              <p>
                Inspired by the legendary Japanese poet known for haiku — short, flowing verses that capture life — pottery at Basho flows with <strong className="text-amber-800">rhythm and soul</strong>.
              </p>
              <p className="text-xl text-stone-700 italic border-l-4 border-amber-800 pl-6">
                "Each piece at Basho is crafted with love and individuality, making it truly one of a kind."
              </p>
              <p>
                Like poetry, we believe functional art should be a pause to notice beauty in the everyday. Come, discover Basho and create your own poetry.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-linear-to-br from-amber-100 to-stone-100 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="http://localhost:8000/media/extracted/page_2_img_1.jpeg"
                alt="Shivangi at the wheel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/40 to-transparent flex flex-col items-center justify-end p-8">
                <div className="text-center space-y-4 text-white">
                  <div className="text-3xl font-serif leading-relaxed">
                    古池や<br />
                    蛙飛びこむ<br />
                    水の音
                  </div>
                  <div className="text-sm opacity-90 pt-4 border-t border-white/30">
                    An ancient pond<br />
                    A frog jumps in<br />
                    The splash of water
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey Begins */}
      <section
        ref={el => { sectionsRef.current[2] = el; }}
        className="min-h-screen flex items-center py-24 px-6 bg-linear-to-b from-stone-50 to-amber-50"
      >
        <div
          className="max-w-5xl mx-auto text-center"
          style={{
            opacity: getOpacity(2),
            transform: getTransform(2),
            transition: 'all 0.6s ease-out'
          }}
        >
          <Sun className="mx-auto text-amber-700 mb-8" size={56} strokeWidth={1} />
          <h2 className="text-5xl font-serif font-light text-stone-800 mb-8">
            Shivangi's Journey
          </h2>
          <p className="text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed mb-16">
            Hi, I'm Shivangi — the hands and heart behind Basho.
            I created this sanctuary to transform earth into art and <span className="text-amber-800 font-medium">share the rhythm of soul</span>.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles size={40} />,
                title: "One of a Kind",
                text: "Each piece at Basho is crafted with love and individuality. No two pieces are ever the same.",
                color: "from-amber-100 to-amber-50",
                image: "http://localhost:8000/media/extracted/page_4_img_1.jpeg"
              },
              {
                icon: <Wind size={40} />,
                title: "Soulful Flow",
                text: "Much like a haiku, our pottery captures the essence of a moment through simple, flowing forms.",
                color: "from-stone-200 to-stone-100",
                image: "http://localhost:8000/media/extracted/page_12_img_1.jpeg"
              },
              {
                icon: <Moon size={40} />,
                title: "A Happy Place",
                text: "Basho is where time slows down. Every piece is an invitation to cherish your own happy place.",
                color: "from-amber-200 to-amber-100",
                image: "http://localhost:8000/media/extracted/page_18_img_1.jpeg"
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl transform hover:scale-105 transition-all duration-500 shadow-lg"
                style={{
                  opacity: getOpacity(2),
                  transform: `translateY(${Math.max(0, 50 - getOpacity(2) * 70)}px)`,
                  transitionDelay: `${idx * 100}ms`
                }}
              >
                <div className="aspect-square">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute inset-0 bg-linear-to-t ${item.color} opacity-90 group-hover:opacity-95 transition-opacity p-8 flex flex-col justify-end`}>
                  <div className="text-amber-800 mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-serif text-stone-800 mb-4">{item.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Philosophy - Large Text */}
      <section
        ref={el => { sectionsRef.current[3] = el; }}
        className="min-h-screen flex items-center py-24 px-6"
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            opacity: getOpacity(3),
            transform: getTransform(3),
            transition: 'all 0.6s ease-out'
          }}
        >
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-stone-200 text-stone-700 rounded-full text-sm mb-6">
              Japanese Aesthetics
            </span>
            <h2 className="text-6xl md:text-7xl font-serif font-light text-stone-800 mb-8">
              Wabi-Sabi
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16 mb-16">
            {[
              {
                kanji: "侘",
                word: "Wabi",
                meaning: "Finding beauty in simplicity and humble, rustic elegance",
                image: "http://localhost:8000/media/extracted/page_3_img_1.jpeg"
              },
              {
                kanji: "寂",
                word: "Sabi",
                meaning: "The beauty that comes with age — weathered, worn, telling stories",
                image: "http://localhost:8000/media/extracted/page_6_img_1.jpeg"
              },
              {
                kanji: "間",
                word: "Ma",
                meaning: "The space between. The pause. The breath. What's not there matters too.",
                image: "http://localhost:8000/media/extracted/page_7_img_1.jpeg"
              }
            ].map((concept, idx) => (
              <div
                key={idx}
                className="group"
                style={{
                  opacity: getOpacity(3),
                  transform: `scale(${0.8 + getOpacity(3) * 0.2})`,
                  transitionDelay: `${idx * 150}ms`
                }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <img
                    src={concept.image}
                    alt={concept.word}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="text-center">
                  <div className="text-6xl text-amber-800 mb-4 font-light">{concept.kanji}</div>
                  <h3 className="text-2xl font-serif text-stone-800 mb-4">{concept.word}</h3>
                  <p className="text-stone-600 leading-relaxed">{concept.meaning}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-2xl text-center text-stone-700 leading-relaxed italic">
              "Nothing lasts. Nothing is finished. Nothing is perfect."
            </p>
            <p className="text-center text-stone-500 mt-6">
              — The heart of wabi-sabi, the soul of every Basho piece
            </p>
          </div>
        </div>
      </section>

      {/* The Craft - Visual Heavy */}
      <section
        id="craft"
        ref={el => { sectionsRef.current[4] = el; }}
        className="min-h-screen py-24 px-6 bg-stone-100"
      >
        <div
          className="max-w-7xl mx-auto"
          style={{
            opacity: getOpacity(4),
            transform: getTransform(4),
            transition: 'all 0.6s ease-out'
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light text-stone-800 mb-6">
              Handcrafted. Honest. Yours.
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Every piece is wheel-thrown or hand-built in our studio, using natural clays and food-safe glazes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-linear-to-br from-amber-100 to-stone-100 rounded-3xl p-12 shadow-xl">
              <h3 className="text-3xl font-serif text-stone-800 mb-6">Natural Materials</h3>
              <ul className="space-y-4 text-lg text-stone-600">
                <li className="flex items-start">
                  <span className="text-amber-800 mr-3">•</span>
                  <span>Raw, earthy clays that celebrate texture and character</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-800 mr-3">•</span>
                  <span>Food-safe glazes in muted, organic tones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-800 mr-3">•</span>
                  <span>Each piece is unique — slight variations are the signature of handmade</span>
                </li>
              </ul>
            </div>

            <div className="bg-linear-to-br from-stone-200 to-amber-50 rounded-3xl p-12 shadow-xl">
              <h3 className="text-3xl font-serif text-stone-800 mb-6">Made for Life</h3>
              <ul className="space-y-4 text-lg text-stone-600">
                <li className="flex items-start">
                  <span className="text-amber-800 mr-3">✓</span>
                  <span>Microwave safe</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-800 mr-3">✓</span>
                  <span>Dishwasher safe</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-800 mr-3">✓</span>
                  <span>Built to last — and get better with age</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "http://localhost:8000/media/extracted/page_9_img_1.jpeg",
              "http://localhost:8000/media/extracted/page_10_img_2.jpeg",
              "http://localhost:8000/media/extracted/page_11_img_1.jpeg",
              "http://localhost:8000/media/extracted/page_13_img_1.jpeg"
            ].map((img, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-lg"
                style={{
                  opacity: getOpacity(4),
                  transform: `translateY(${Math.max(0, 30 - getOpacity(4) * 50)}px)`,
                  transitionDelay: `${idx * 100}ms`
                }}
              >
                <img
                  src={img}
                  alt={`Pottery process ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Showcase */}
      <section
        id="collection"
        ref={el => { sectionsRef.current[5] = el; }}
        className="min-h-screen py-24 px-6"
      >
        <div
          className="max-w-7xl mx-auto"
          style={{
            opacity: getOpacity(5),
            transform: getTransform(5),
            transition: 'all 0.6s ease-out'
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light text-stone-800 mb-6">
              The Collection
            </h2>
            <p className="text-xl text-stone-600">
              From tea bowls to serving platters — functional art for your table
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Tea Ceremony Bowls",
                desc: "Hand-thrown vessels for mindful moments",
                size: "md:col-span-2 md:row-span-2",
                image: "http://localhost:8000/media/extracted/page_16_img_1.jpeg"
              },
              {
                name: "Serving Plates",
                desc: "Rustic elegance for sharing meals",
                size: "",
                image: "http://localhost:8000/media/extracted/page_14_img_1.jpeg"
              },
              {
                name: "Sake Sets",
                desc: "Traditional forms, modern soul",
                size: "",
                image: "http://localhost:8000/media/extracted/page_15_img_2.jpeg"
              },
              {
                name: "Custom Tableware",
                desc: "Bespoke sets for your home",
                size: "",
                image: "http://localhost:8000/media/extracted/page_17_img_1.jpeg"
              },
              {
                name: "Vases & Décor",
                desc: "Sculptural pieces that breathe",
                size: "",
                image: "http://localhost:8000/media/extracted/page_18_img_3.jpeg"
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`${item.size} group relative aspect-square rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 cursor-pointer`}
                style={{
                  opacity: getOpacity(5),
                  transform: `scale(${0.95 + getOpacity(5) * 0.05})`,
                  transitionDelay: `${idx * 80}ms`
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-2xl font-serif mb-2">{item.name}</h3>
                  <p className="text-stone-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="px-12 py-4 bg-amber-800 text-white rounded-full hover:bg-amber-900 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg">
              Explore Full Collection
            </button>
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section
        ref={el => { sectionsRef.current[6] = el; }}
        className="min-h-screen flex items-center py-24 px-6 bg-linear-to-b from-amber-50 to-stone-50"
      >
        <div
          className="max-w-6xl mx-auto text-center"
          style={{
            opacity: getOpacity(6),
            transform: getTransform(6),
            transition: 'all 0.6s ease-out'
          }}
        >
          <h2 className="text-5xl font-serif font-light text-stone-800 mb-8">
            Learn the Art
          </h2>
          <p className="text-2xl text-stone-600 mb-16 max-w-3xl mx-auto leading-relaxed">
            Join us for pottery workshops where we slow down, get our hands dirty,
            and remember what it feels like to <span className="text-amber-800 font-medium">create</span>.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="aspect-video">
                <img
                  src="http://localhost:8000/media/extracted/page_20_img_2.jpeg"
                  alt="Pottery workshop teaching"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/90 to-stone-900/20"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-left">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <Leaf className="text-amber-800" size={32} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-4">Beginner Workshops</h3>
                <p className="text-stone-200 mb-6 leading-relaxed">
                  Learn wheel throwing, hand-building, and glazing. No experience needed — just curiosity.
                </p>
                <button className="text-amber-300 hover:text-amber-200 font-medium text-left">
                  See Schedule →
                </button>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="aspect-video">
                <img
                  src="http://localhost:8000/media/extracted/page_21_img_1.jpeg"
                  alt="Private studio gathering"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/90 to-stone-900/20"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-left">
                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-6">
                  <Mountain className="text-stone-700" size={32} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-4">Private Events</h3>
                <p className="text-stone-200 mb-6 leading-relaxed">
                  Host team-building sessions, birthday celebrations, or intimate gatherings in our studio.
                </p>
                <button className="text-amber-300 hover:text-amber-200 font-medium text-left">
                  Book Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery Preview */}
      <section
        ref={el => { sectionsRef.current[7] = el; }}
        className="py-24 px-6 bg-stone-100"
      >
        <div
          className="max-w-6xl mx-auto"
          style={{
            opacity: getOpacity(7),
            transform: getTransform(7),
            transition: 'all 0.6s ease-out'
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light text-stone-800 mb-6">
              Follow Our Journey
            </h2>
            <p className="text-xl text-stone-600">
              Daily inspiration, new pieces, and stories from the studio
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              "http://localhost:8000/media/extracted/page_4_img_2.jpeg",
              "http://localhost:8000/media/extracted/page_5_img_1.jpeg",
              "http://localhost:8000/media/extracted/page_8_img_2.jpeg",
              "http://localhost:8000/media/extracted/page_12_img_2.jpeg",
              "http://localhost:8000/media/extracted/page_19_img_2.jpeg",
              "http://localhost:8000/media/extracted/page_22_img_1.jpeg",
              "http://localhost:8000/media/extracted/page_10_img_3.jpeg",
              "http://localhost:8000/media/extracted/page_11_img_3.jpeg"
            ].map((img, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer"
                style={{
                  opacity: getOpacity(7),
                  transitionDelay: `${idx * 50}ms`
                }}
              >
                <img
                  src={img}
                  alt={`Instagram post ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.instagram.com/bashobyyshivangi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg font-medium"
            >
              @bashobyyshivangi
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={el => { sectionsRef.current[8] = el; }}
        className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="http://localhost:8000/media/extracted/page_1_img_1.jpeg"
            alt="Japanese pottery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-stone-900/90 to-amber-900/80"></div>
        </div>

        <div
          className="relative z-10 text-center text-white"
          style={{
            opacity: getOpacity(8),
            transform: getTransform(8),
            transition: 'all 0.6s ease-out'
          }}
        >
          <Leaf className="mx-auto mb-8 animate-pulse" size={64} strokeWidth={1} />
          <h2 className="text-6xl font-serif font-light mb-6">
            Begin Your Journey
          </h2>
          <p className="text-2xl text-stone-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Follow us on Instagram for daily inspiration, new collections, and stories from the studio
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://www.instagram.com/bashobyyshivangi/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-4 bg-white text-stone-800 rounded-full hover:bg-stone-100 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg font-medium"
            >
              Follow on Instagram
            </a>
            <button
              onClick={() => scrollToSection('collection')}
              className="px-12 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-stone-800 transition-all duration-300 transform hover:scale-105 text-lg font-medium"
            >
              Shop Collection
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">芭</span>
            </div>
            <span className="text-2xl font-serif text-stone-300">Basho by Shivangi</span>
          </div>
          <p className="text-stone-500 mb-8">
            Handcrafted pottery inspired by Japanese poetry and philosophy
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <button onClick={() => scrollToSection('story')} className="hover:text-amber-600 transition">About</button>
            <button onClick={() => scrollToSection('collection')} className="hover:text-amber-600 transition">Collection</button>
            <button onClick={() => scrollToSection('craft')} className="hover:text-amber-600 transition">Workshops</button>
            <a href="https://www.instagram.com/bashobyyshivangi/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition">Contact</a>
          </div>
          <div className="mt-8 pt-8 border-t border-stone-800 text-xs text-stone-600">
            © 2024 Basho by Shivangi. Crafted with intention.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BashoHomepage;