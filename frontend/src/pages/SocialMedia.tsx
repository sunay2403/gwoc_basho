import React, { useState, useEffect, useRef } from 'react';
import { Quote, Play, Instagram, Heart, MessageCircle, Sparkles, Leaf } from 'lucide-react';

const BashoMediaSocialProof = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const galleryRef = useRef(null);

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

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
      caption: "Morning tea bowl with natural ash glaze",
      likes: 342,
      type: "product"
    },
    {
      url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
      caption: "Hand-thrown dinner plate collection",
      likes: 287,
      type: "product"
    },
    {
      url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      caption: "Raw clay texture—embracing imperfection",
      likes: 421,
      type: "detail"
    },
    {
      url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      caption: "Workshop moment: First touch with clay",
      likes: 518,
      type: "workshop"
    },
    {
      url: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=800&q=80",
      caption: "Sake set for mindful gatherings",
      likes: 395,
      type: "product"
    },
    {
      url: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&q=80",
      caption: "Rustic serving bowls in earth tones",
      likes: 264,
      type: "product"
    },
    {
      url: "https://images.unsplash.com/photo-1580794852943-c38f85ff0d6e?w=800&q=80",
      caption: "Studio table—where poetry meets clay",
      likes: 389,
      type: "studio"
    },
    {
      url: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
      caption: "Minimalist tea ceremony setup",
      likes: 456,
      type: "lifestyle"
    },
    {
      url: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&q=80",
      caption: "Hands shaping—meditation in motion",
      likes: 612,
      type: "workshop"
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
    <div className="min-h-screen bg-[#f5f3ef]">
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
                    <Heart className="text-[#8b6f47]" size={20} strokeWidth={1.5} />
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
            <p className="text-lg text-[#c7b8a3] mb-8">
              Every piece tells a story. Every moment captured with intention.
            </p>
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
                      <span className="flex items-center space-x-1">
                        <Heart size={14} fill="white" />
                        <span>{image.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle size={14} />
                        <span>{Math.floor(image.likes * 0.15)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Moments - Authentic */}
      <section className="py-24 px-6 bg-linear-to-br from-[#e8e4dd] to-[#f5f3ef]">
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
      </section>

      {/* Studio & Behind The Scenes */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light text-[#2a2420] mb-4">
              Inside the Studio
            </h2>
            <p className="text-lg text-[#5a4a3a]">
              Where Shivangi transforms earth into art, silence into stories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1580794852943-c38f85ff0d6e?w=600&q=80"
                alt="Studio space"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#2a2420]/40 group-hover:bg-[#2a2420]/60 transition-colors flex items-end p-6">
                <p className="text-white font-serif text-xl">The Sacred Space</p>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                alt="Clay preparation"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#2a2420]/40 group-hover:bg-[#2a2420]/60 transition-colors flex items-end p-6">
                <p className="text-white font-serif text-xl">Raw Materials</p>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=600&q=80"
                alt="Exhibition setup"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#2a2420]/40 group-hover:bg-[#2a2420]/60 transition-colors flex items-end p-6">
                <p className="text-white font-serif text-xl">Pop-up Exhibitions</p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-[#8b6f47] to-[#6d5638] rounded-3xl p-12 text-white text-center">
            <Sparkles className="mx-auto mb-6 text-[#f5f3ef]" size={48} strokeWidth={1} />
            <h3 className="text-3xl font-serif font-light mb-4">A Living Art Space</h3>
            <p className="text-[#f5f3ef]/90 text-lg max-w-3xl mx-auto leading-relaxed">
              Basho isn't just a pottery studio. It's a sanctuary where time moves slower, 
              where imperfection is celebrated, and where every piece carries the spirit of Japanese minimalism.
            </p>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-24 px-6 bg-[#2a2420]">
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
      </section>

      {/* Customer Experience Stories */}
      <section className="py-24 px-6 bg-linear-to-b from-[#f5f3ef] to-white">
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
      </section>

      {/* Final Trust Banner */}
      <section className="py-24 px-6 bg-[#2a2420] relative overflow-hidden">
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