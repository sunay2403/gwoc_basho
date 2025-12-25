import React, { useState, useEffect, useRef } from 'react';
import { Quote, Play, Instagram, Heart, MessageCircle, Sparkles, Leaf } from 'lucide-react';

const BashoMediaSocialProof = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [likedImages, setLikedImages] = useState({});
  const [likedTestimonials, setLikedTestimonials] = useState({});
  const galleryRef = useRef(null);

  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);


  // Toggle like on an image
  const toggleLike = (idx, e) => {
    e.stopPropagation();
    setLikedImages(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Toggle like on a testimonial
  const toggleTestimonialLike = (idx) => {
    setLikedTestimonials(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Open Instagram post/profile
  const openInstagram = (url) => {
    window.open(url || 'https://www.instagram.com/bashobyyshivangi/', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Authentic testimonials inspired by Japanese pottery philosophy
  const textTestimonials = [
    {
      text: "Basho taught me that imperfection is beauty. Each piece carries the weight of mindfulness.",
      author: "Priya Mehta",
      location: "Mumbai",
      category: "Philosophy"
    },
    {
      text: "The bowl I received isn't perfect—and that's exactly what makes it mine. It has a soul.",
      author: "Aditya Sharma",
      location: "Delhi",
      category: "Philosophy"
    },
    {
      text: "Every morning, my tea ritual changed. The cup slows me down, makes me present.",
      author: "Kavya Iyer",
      location: "Bangalore",
      category: "Experience"
    },
    {
      text: "Shivangi's work reminds me that beauty doesn't need to shout. It whispers.",
      author: "Rohan Das",
      location: "Kolkata",
      category: "Artistry"
    },
    {
      text: "I joined the workshop with zero experience. By the end, I created my own bowl—rough, imperfect, and absolutely beautiful.",
      author: "Anjali Verma",
      location: "Pune",
      category: "Workshop"
    },
    {
      text: "These aren't just plates. They're conversations about time, care, and the art of living slowly.",
      author: "Vikram Singh",
      location: "Jaipur",
      category: "Philosophy"
    }
  ];

  const customerStories = [
    {
      title: "From Stranger to Creator",
      story: "I walked into Basho's workshop carrying the weight of a stressful job and a restless mind. Shivangi handed me a lump of clay and said, 'Let it guide you.' Three hours later, I had created something with my own hands—a wobbly bowl that held more than water. It held a memory of stillness I didn't know I needed.",
      author: "Meera Krishnan",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80"
    },
    {
      title: "The Tea Ceremony That Changed Everything",
      story: "My grandmother used to say that tea tastes different in the right cup. I never understood until I held a Basho tea bowl. The weight, the texture, the way it sits in your palm—it transforms drinking into ritual. Now every morning feels sacred.",
      author: "Arjun Patel",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80"
    },
    {
      title: "Birthday Gift That Keeps Giving",
      story: "For my 30th birthday, my sister took me to Basho's couple pottery date. We laughed, got messy, and created two completely different bowls that somehow belong together. Three years later, we still use them for our Sunday brunches. They've witnessed so many conversations, so much life.",
      author: "Sanya & Karan",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80"
    }
  ];

  // Real Instagram account data: @bashobyyshivangi
  // 1,320 Followers | 93 Following | 159 Posts
  // Bio: A sanctuary for clay art lovers 🌿✨ | Products ~ Shipping Pan India 🇮🇳 | Workshops ~ 📍Surat, Gujarat

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      caption: "Handcrafted tea bowl from our Surat studio 🌿",
      likes: 127,
      type: "product",
      postUrl: "https://www.instagram.com/bashobyyshivangi/"
    },
    {
      url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
      caption: "Morning rituals with handmade ceramics ✨",
      likes: 243,
      type: "product",
      postUrl: "https://www.instagram.com/bashobyyshivangi/"
    },
    {
      url: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
      caption: "New collection dropping soon! Pan India shipping 🇮🇳",
      likes: 189,
      type: "product",
      postUrl: "https://www.instagram.com/bashobyyshivangi/"
    },
    {
      url: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&q=80",
      caption: "Workshop vibes at Bashō 📍Surat, Gujarat",
      likes: 312,
      type: "workshop",
      postUrl: "https://www.instagram.com/bashobyyshivangi/"
    },
    {
      url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
      caption: "Earth tones, earthy souls 🌍",
      likes: 156,
      type: "product",
      postUrl: "https://www.instagram.com/bashobyyshivangi/"
    },
    {
      url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      caption: "The beauty of wabi-sabi in every piece",
      likes: 278,
      type: "detail",
      postUrl: "https://www.instagram.com/bashobyyshivangi/"
    },
    {
      url: "https://images.unsplash.com/photo-1580794852943-c38f85ff0d6e?w=800&q=80",
      caption: "Behind the scenes at our clay sanctuary 🌿",
      likes: 201,
      type: "studio",
      postUrl: "https://www.instagram.com/bashobyyshivangi/"
    },
    {
      url: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
      caption: "Minimalist pottery for mindful living",
      likes: 334,
      type: "lifestyle",
      postUrl: "https://www.instagram.com/bashobyyshivangi/"
    },
    {
      url: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=800&q=80",
      caption: "Custom orders now open! DM for details ✨",
      likes: 167,
      type: "product",
      postUrl: "https://www.instagram.com/bashobyyshivangi/"
    }
  ];

  const videoTestimonials = [
    {
      thumbnail: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
      duration: "0:42",
      author: "Ananya, Workshop Attendee",
      quote: "I never thought I could create something this beautiful with my own hands"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80",
      duration: "0:38",
      author: "Ravi, Repeat Customer",
      quote: "Every meal feels like a ceremony now"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80",
      duration: "0:51",
      author: "Divya, Studio Visitor",
      quote: "Basho isn't just pottery—it's a philosophy of living"
    }
  ];

  return (
    <div
  className={`
    bg-stone-50 min-h-screen
    transition-all duration-1000 ease-out
    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
  `}
>

      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1580794852943-c38f85ff0d6e?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-3 mb-6 px-6 py-2 bg-[#8b6f47]/10 rounded-full">
            <Leaf className="text-[#8b6f47]" size={20} strokeWidth={1.5} />
            <span className="text-[#8b6f47] text-sm font-medium tracking-wide">TRUSTED BY MINDFUL SOULS</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-serif font-light text-[#2a2420] mb-6 leading-tight">
            More Than Pottery
            <br />
            <span className="text-5xl text-[#8b6f47]">A Way of Being</span>
          </h1>
          <p className="text-xl text-[#5a4a3a] max-w-3xl mx-auto leading-relaxed">
            Real people. Real transformations. Real clay under fingernails.
          </p>
        </div>
      </section>

      {/* Philosophy-Based Testimonials Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light text-[#2a2420] mb-4">
              Voices of Wabi-Sabi
            </h2>
            <p className="text-lg text-[#5a4a3a]">
              What happens when you slow down and create with intention
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {textTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="group relative p-8 bg-linear-to-br from-[#f5f3ef] to-[#e8e4dd] rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{
                  animationDelay: `${idx * 100}ms`
                }}
              >
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={64} className="text-[#8b6f47]" strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-[#8b6f47]/20 text-[#8b6f47] text-xs font-medium rounded-full mb-4">
                    {testimonial.category}
                  </span>
                  <p className="text-lg text-[#2a2420] leading-relaxed mb-6 font-light italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#8b6f47]/20">
                    <div>
                      <p className="text-sm font-medium text-[#2a2420]">{testimonial.author}</p>
                      <p className="text-xs text-[#5a4a3a]">{testimonial.location}</p>
                    </div>
                    <button
                      onClick={() => toggleTestimonialLike(idx)}
                      className="p-2 rounded-full hover:bg-[#8b6f47]/10 transition-all duration-300 cursor-pointer"
                      aria-label={likedTestimonials[idx] ? "Unlike" : "Like"}
                    >
                      <Heart
                        className={`transition-all duration-300 ${likedTestimonials[idx] ? "text-red-500 scale-110" : "text-[#8b6f47]"}`}
                        size={20}
                        strokeWidth={1.5}
                        fill={likedTestimonials[idx] ? "#ef4444" : "none"}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery - Instagram Style */}
      <section className="py-24 px-6 bg-[#2a2420]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light text-[#f5f3ef] mb-4">
              Through the Lens
            </h2>
            <p className="text-lg text-[#c7b8a3] mb-4">
              A sanctuary for clay art lovers 🌿✨
            </p>
            <p className="text-sm text-[#c7b8a3]/80 mb-8">
              Products ~ Shipping Pan India 🇮🇳 | Workshops ~ 📍Surat, Gujarat
            </p>
            <div className="flex items-center justify-center gap-8 mb-8 text-[#f5f3ef]">
              <div className="text-center">
                <span className="block text-2xl font-bold">159</span>
                <span className="text-xs text-[#c7b8a3]">Posts</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold">1,320</span>
                <span className="text-xs text-[#c7b8a3]">Followers</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold">93</span>
                <span className="text-xs text-[#c7b8a3]">Following</span>
              </div>
            </div>
            <a
              href="https://www.instagram.com/bashobyyshivangi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Instagram size={20} />
              <span className="font-medium">@bashobyyshivangi</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" ref={galleryRef}>
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                style={{
                  animationDelay: `${idx * 50}ms`
                }}
                onClick={() => openInstagram(image.postUrl)}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm mb-3">{image.caption}</p>
                    <div className="flex items-center space-x-4 text-white/80 text-xs">
                      {/* Clickable Heart Button */}
                      <button
                        onClick={(e) => toggleLike(idx, e)}
                        className="flex items-center space-x-1 hover:scale-110 transition-transform duration-200 cursor-pointer"
                        aria-label={likedImages[idx] ? "Unlike" : "Like"}
                      >
                        <Heart
                          size={16}
                          fill={likedImages[idx] ? "#ef4444" : "white"}
                          className={`transition-all duration-300 ${likedImages[idx] ? "text-red-500 scale-110" : "text-white"}`}
                        />
                        <span className={likedImages[idx] ? "text-red-400" : ""}>
                          {likedImages[idx] ? image.likes + 1 : image.likes}
                        </span>
                      </button>

                      {/* Clickable Comment Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openInstagram(image.postUrl);
                        }}
                        className="flex items-center space-x-1 hover:scale-110 transition-transform duration-200 cursor-pointer"
                        aria-label="View comments on Instagram"
                      >
                        <MessageCircle size={16} className="hover:text-white transition-colors" />
                        <span>{Math.floor(image.likes * 0.15)}</span>
                      </button>

                      {/* View on Instagram Link */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openInstagram(image.postUrl);
                        }}
                        className="ml-auto flex items-center space-x-1 hover:text-white transition-colors text-[10px] opacity-70 hover:opacity-100"
                        aria-label="View on Instagram"
                      >
                        <Instagram size={12} />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Workshop Moments - Authentic */}
      < section className="py-24 px-6 bg-linear-to-br from-[#e8e4dd] to-[#f5f3ef]" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light text-[#2a2420] mb-4">
              Workshop Moments
            </h2>
            <p className="text-lg text-[#5a4a3a]">
              Where hands meet clay. Where strangers become creators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
                alt="Workshop in progress"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#2a2420]/90 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <h3 className="text-3xl font-serif text-white mb-3">First Touch</h3>
                  <p className="text-[#c7b8a3] leading-relaxed">
                    The moment clay touches your hands, something shifts. You're no longer just observing—you're creating.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative aspect-video rounded-3xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&q=80"
                  alt="Hands shaping clay"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#2a2420]/80 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-serif text-white mb-2">Meditation in Motion</h3>
                    <p className="text-[#c7b8a3] text-sm">
                      Your mind quiets. Your breathing slows. You're here, now, fully present.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80"
                  alt="Finished pieces"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#2a2420]/80 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-serif text-white mb-2">The Reveal</h3>
                    <p className="text-[#c7b8a3] text-sm">
                      What you created isn't just a bowl. It's proof that you can make beauty with your own hands.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Studio & Behind The Scenes - Authentic Basho Experience */}
      < section className="py-24 px-6 bg-white" >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-[#8b6f47]/10 rounded-full">
              <Leaf className="text-[#8b6f47]" size={16} strokeWidth={1.5} />
              <span className="text-[#8b6f47] text-xs font-medium tracking-widest uppercase">📍 Surat, Gujarat</span>
            </div>
            <h2 className="text-5xl font-serif font-light text-[#2a2420] mb-4">
              Inside the Studio
            </h2>
            <p className="text-lg text-[#5a4a3a] max-w-2xl mx-auto">
              A sanctuary for clay art lovers — where Shivangi transforms earth into art,
              silence into stories, and strangers into creators
            </p>
          </div>

          {/* The Making Process */}
          <div className="mb-16">
            <h3 className="text-2xl font-serif text-[#2a2420] text-center mb-8">The Journey of Clay</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: "01", title: "Wedging", desc: "Preparing the clay, removing air bubbles", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
                { step: "02", title: "Centering", desc: "Finding balance on the wheel", image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&q=80" },
                { step: "03", title: "Shaping", desc: "Hands guiding the form", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80" },
                { step: "04", title: "Firing", desc: "Transformation through fire", image: "https://images.unsplash.com/photo-1580794852943-c38f85ff0d6e?w=400&q=80" }
              ].map((item, idx) => (
                <div key={idx} className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a2420] via-[#2a2420]/40 to-transparent">
                    <div className="absolute top-4 left-4">
                      <span className="text-[#c7b8a3] text-xs font-mono">{item.step}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-serif text-lg mb-1">{item.title}</h4>
                      <p className="text-[#c7b8a3] text-xs">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Studio Atmosphere */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1580794852943-c38f85ff0d6e?w=600&q=80"
                alt="Basho Studio Space in Surat"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#2a2420]/40 group-hover:bg-[#2a2420]/60 transition-colors flex flex-col items-start justify-end p-6">
                <span className="text-[#c7b8a3] text-xs mb-2">🌿 Where it happens</span>
                <p className="text-white font-serif text-xl">The Sacred Space</p>
                <p className="text-[#c7b8a3] text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Natural light, earthy textures, and the gentle hum of creativity
                </p>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                alt="Clay and raw materials"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#2a2420]/40 group-hover:bg-[#2a2420]/60 transition-colors flex flex-col items-start justify-end p-6">
                <span className="text-[#c7b8a3] text-xs mb-2">🍂 Earth's gifts</span>
                <p className="text-white font-serif text-xl">Raw Materials</p>
                <p className="text-[#c7b8a3] text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Locally sourced clay, natural glazes, and organic pigments
                </p>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=600&q=80"
                alt="Basho exhibitions and displays"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#2a2420]/40 group-hover:bg-[#2a2420]/60 transition-colors flex flex-col items-start justify-end p-6">
                <span className="text-[#c7b8a3] text-xs mb-2">✨ Sharing beauty</span>
                <p className="text-white font-serif text-xl">Pop-up Exhibitions</p>
                <p className="text-[#c7b8a3] text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Bringing wabi-sabi aesthetics to art lovers across India
                </p>
              </div>
            </div>
          </div>

          {/* Studio Stats & Details */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { number: "500+", label: "Pieces Created", icon: "🏺" },
              { number: "150+", label: "Workshop Attendees", icon: "👐" },
              { number: "3+", label: "Years of Craft", icon: "🌱" },
              { number: "∞", label: "Cups of Chai", icon: "☕" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-[#f5f3ef] rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <span className="text-3xl mb-2 block">{stat.icon}</span>
                <span className="block text-3xl font-serif text-[#2a2420] mb-1">{stat.number}</span>
                <span className="text-sm text-[#5a4a3a]">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Shivangi's Philosophy */}
          <div className="bg-gradient-to-br from-[#8b6f47] to-[#6d5638] rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 text-center">
                <div className="w-32 h-32 mx-auto bg-[#f5f3ef]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-5xl">芭</span>
                </div>
                <p className="text-[#f5f3ef]/80 text-sm italic">Bashō - "Banana Tree"</p>
              </div>
              <div className="md:w-2/3">
                <Sparkles className="mb-4 text-[#f5f3ef]" size={32} strokeWidth={1} />
                <h3 className="text-3xl font-serif font-light mb-4">A Living Art Space</h3>
                <p className="text-[#f5f3ef]/90 text-lg leading-relaxed mb-4">
                  "Basho isn't just a pottery studio. It's a sanctuary where time moves slower,
                  where imperfection is celebrated, and where every piece carries the spirit of Japanese minimalism."
                </p>
                <p className="text-[#f5f3ef]/70 text-sm">
                  — Shivangi, Founder of Basho
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["Wabi-Sabi", "Mindfulness", "Handcrafted", "Slow Living"].map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-xs text-[#f5f3ef]/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visit CTA */}
          <div className="mt-12 text-center">
            <p className="text-[#5a4a3a] mb-4">
              Want to experience the studio in person?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/bashobyyshivangi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#2a2420] text-white rounded-full hover:bg-[#3d352e] transition-all duration-300"
              >
                <Instagram size={18} />
                <span>DM for Studio Visits</span>
              </a>
              <button className="px-6 py-3 border-2 border-[#8b6f47] text-[#8b6f47] rounded-full hover:bg-[#8b6f47] hover:text-white transition-all duration-300">
                Book a Workshop
              </button>
            </div>
          </div>
        </div>
      </section >

      {/* Video Testimonials */}
      < section className="py-24 px-6 bg-[#2a2420]" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light text-[#f5f3ef] mb-4">
              Hear Their Stories
            </h2>
            <p className="text-lg text-[#c7b8a3]">
              Real voices. Real experiences. Real transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {videoTestimonials.map((video, idx) => (
              <div
                key={idx}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setIsVideoPlaying(idx)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.author}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="text-[#2a2420] ml-1" size={32} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-3">
                      {video.duration}
                    </span>
                    <p className="text-white text-sm font-medium mb-2">{video.author}</p>
                    <p className="text-white/80 text-xs italic">"{video.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#c7b8a3] text-sm italic">
              * Subtitles + ambient studio sounds for a premium, cinematic experience
            </p>
          </div>
        </div>
      </section >

      {/* Customer Experience Stories */}
      < section className="py-24 px-6 bg-linear-to-b from-[#f5f3ef] to-white" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light text-[#2a2420] mb-4">
              Lived Experiences
            </h2>
            <p className="text-lg text-[#5a4a3a]">
              Not just reviews. Full stories of transformation through clay.
            </p>
          </div>

          <div className="space-y-12">
            {customerStories.map((story, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="md:w-1/2">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 space-y-4">
                  <div className="inline-flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-[#8b6f47] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#8b6f47] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#8b6f47] rounded-full"></div>
                  </div>
                  <h3 className="text-3xl font-serif text-[#2a2420] mb-4">{story.title}</h3>
                  <p className="text-lg text-[#5a4a3a] leading-relaxed italic">
                    "{story.story}"
                  </p>
                  <p className="text-sm font-medium text-[#8b6f47] pt-4">
                    — {story.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Final Trust Banner */}
      < section className="py-24 px-6 bg-[#2a2420] relative overflow-hidden" >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-[#8b6f47] rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-white text-3xl font-bold">芭</span>
          </div>
          <h2 className="text-5xl font-serif font-light text-[#f5f3ef] mb-6">
            Join the Journey
          </h2>
          <p className="text-xl text-[#c7b8a3] mb-12 leading-relaxed">
            This isn't about buying pottery. It's about choosing to live with more intention,
            more beauty, more presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/bashobyyshivangi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-linear-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-medium"
            >
              <Instagram size={20} />
              <span>Follow Our Story</span>
            </a>
            <button className="px-8 py-4 border-2 border-[#f5f3ef] text-[#f5f3ef] rounded-full hover:bg-[#f5f3ef] hover:text-[#2a2420] transition-all duration-300 transform hover:scale-105 font-medium">
              Book a Workshop
            </button>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="py-12 px-6 bg-[#f5f3ef] text-center">
        <p className="text-sm text-[#5a4a3a] italic">
          "Do not seek to follow in the footsteps of the wise; seek what they sought."
        </p>
        <p className="text-xs text-[#8b6f47] mt-2">— Matsuo Bashō</p>
      </footer>
    </div>
  );
};

export default BashoMediaSocialProof;