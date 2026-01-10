import React, { useState, useEffect, useRef } from 'react';
import { Play, Instagram, Heart, MessageCircle, Sparkles, Leaf, Plus, X, Upload, Quote } from 'lucide-react';
import pottery1 from '../assets/pottery_1.png';
import pottery2 from '../assets/pottery_2.png';
import pottery3 from '../assets/pottery_3.png';
import plate from '../assets/plate.png';
import shivangiStory from '../assets/shivangi_story.png';
import shivangiPlates from '../assets/shivangi_plates.png';
import gallary1 from '../assets/gallary1.png';
import gallary2 from '../assets/gallary2.jpg';
import gallary3 from '../assets/gallary3.png';
import gallary4 from '../assets/gallary4.png';

const BashoMediaSocialProof = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [likedImages, setLikedImages] = useState<Record<number, boolean>>({});
  const galleryRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [textTestimonials, setTextTestimonials] = useState<any[]>([]);

  const [galleryImagesState, setGalleryImages] = useState<any[]>([
    { url: pottery1, caption: "Handcrafted with love", likes: 124, postUrl: "" },
    { url: pottery2, caption: "Sunflowers and ceramics", likes: 89, postUrl: "" },
    { url: pottery3, caption: "Serving joy", likes: 205, postUrl: "" }
  ]);
  const [videoTestimonialsState, setVideoTestimonials] = useState<any[]>([]);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    story: '',
    author: '',
    image: null as File | null
  });

  const fetchDynamicContent = async () => {
    try {
      const expResponse = await fetch('http://localhost:8000/api/experiences/');
      if (expResponse.ok) {
        const data = await expResponse.json();
        setExperiences(data);
      }

      const textResponse = await fetch('http://localhost:8000/api/text-testimonials/');
      if (textResponse.ok) {
        const data = await textResponse.json();
        if (data.length > 0) setTextTestimonials(data);
      }

      const galleryResponse = await fetch('http://localhost:8000/api/gallery/');
      if (galleryResponse.ok) {
        const data = await galleryResponse.json();
        const mappedData = data.map((item: any) => ({
          ...item,
          url: item.image.startsWith('http') ? item.image : `http://localhost:8000${item.image}`,
          postUrl: item.post_url
        }));
        if (mappedData.length > 0) setGalleryImages(mappedData);
      }

      const videoResponse = await fetch('http://localhost:8000/api/video-testimonials/');
      if (videoResponse.ok) {
        const data = await videoResponse.json();
        const mappedData = data.map((video: any) => ({
          ...video,
          thumbnail: video.thumbnail.startsWith('http') ? video.thumbnail : `http://localhost:8000${video.thumbnail}`
        }));
        if (mappedData.length > 0) setVideoTestimonials(mappedData);
      }
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchDynamicContent();
  }, []);


  // Toggle like on an image
  // Toggle like on an image
  const toggleLike = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Open Instagram post/profile
  const openInstagram = (url?: string) => {
    window.open(url || 'https://www.instagram.com/bashobyyshivangi/', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Display list: combine static placeholders with dynamic data
  const customerStories = [
    {
      title: "From Stranger to Creator",
      story: "I walked into Basho's workshop carrying the weight of a stressful job and a restless mind. Shivangi handed me a lump of clay and said, 'Let it guide you.' Three hours later, I had created something with my own hands—a wobbly bowl that held more than water.",
      author: "Meera Krishnan",
      image: gallary3
    }
  ];

  const allStories = experiences.length > 0 ? experiences : customerStories;

  // Real Instagram account data: @bashobyyshivangi

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, image: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('story', formData.story);
    data.append('author', formData.author);
    if (formData.image) data.append('image', formData.image);

    try {
      const response = await fetch('http://localhost:8000/api/experiences/', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        setShowExperienceForm(false);
        setFormData({ title: '', story: '', author: '', image: null });
        fetchDynamicContent();
      }
    } catch (error) {
      console.error('Error submitting experience:', error);
    }
  };

  // Real Instagram account data: @bashobyyshivangi
  // 1,320 Followers | 93 Following | 159 Posts
  // Bio: A sanctuary for clay art lovers 🌿✨ | Products ~ Shipping Pan India 🇮🇳 | Workshops ~ 📍Surat, Gujarat

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
            backgroundImage: `url(${shivangiPlates})`,
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
              Our Story
            </h2>
            <p className="text-lg text-[#5a4a3a]">
              The hands and heart behind Basho
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 bg-[#f5f3ef] rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200">
            <div className="md:w-1/2">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src={shivangiStory}
                  alt="Shivangi at the wheel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-900/40 to-transparent"></div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1 bg-[#8b6f47]/20 text-[#8b6f47] text-sm font-medium rounded-full mb-2">
                Meet the Artist
              </div>
              <h3 className="text-3xl font-serif text-[#2a2420] leading-tight">
                Hi, I’m Shivangi.
              </h3>
              <div className="text-[#5a4a3a] leading-relaxed space-y-4 font-light text-lg">
                <p>
                  <strong className="text-[#8b6f47]">Basho</strong> (Bashō) is a Japanese word that means <em>"A Place"</em>. But for me, it's my happy place, where every moment is cherished.
                </p>
                <p>
                  Each piece at Basho is crafted with love and individuality, making it truly one of a kind.
                </p>
                <p>
                  Basho was also the name of a legendary Japanese poet known for haiku. Haiku is short, flowing verses that capture life. Like poetry, pottery at Basho flows with rhythm and soul.
                </p>
                <p className="font-serif italic text-xl text-[#2a2420] pt-4">
                  "So come, discover Basho and create your own poetry."
                </p>
              </div>
            </div>
          </div>
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
                className="group relative p-8 bg-linear-to-br from-[#f5f3ef] to-[#e8e4dd] rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-200"
              >
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={64} className="text-[#8b6f47]" strokeWidth={1} />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#8b6f47]/20 text-[#8b6f47] text-xs font-medium rounded-full">
                      {testimonial.category}
                    </span>
                  </div>
                  <p className="text-lg text-[#2a2420] leading-relaxed mb-6 font-light italic flex-grow">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#8b6f47]/20">
                    <div>
                      <p className="text-sm font-medium text-[#2a2420]">{testimonial.author}</p>
                      <p className="text-xs text-[#5a4a3a]">{testimonial.location}</p>
                    </div>
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
              Products ~ Shipping Pan India 🇮🇳 | Workshops ~ 📍Surat, Gujarat | +91 9879575601
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
            {galleryImagesState.map((image, idx) => (
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
                src={gallary1}
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
                  src={gallary4}
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
                  src={gallary2}
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
                { step: "01", title: "Wedging", desc: "Preparing the clay, removing air bubbles", image: pottery1 },
                { step: "02", title: "Centering", desc: "Finding balance on the wheel", image: pottery2 },
                { step: "03", title: "Shaping", desc: "Hands guiding the form", image: pottery3 },
                { step: "04", title: "Firing", desc: "Transformation through fire", image: plate }
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
                src={gallary1}
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
                src={gallary2}
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
                src={gallary4}
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
            {videoTestimonialsState.map((video, idx) => (
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
      <section className="py-24 px-6 bg-linear-to-b from-[#f5f3ef] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-serif font-light text-[#2a2420] mb-4">
              Lived Experiences
            </h2>
            <p className="text-lg text-[#5a4a3a]">
              Not just reviews. Full stories of transformation through clay.
            </p>
          </div>

          <div className="flex flex-col items-center w-full mb-16">
            {showExperienceForm && (
              <div className="w-full max-w-xl mb-6 bg-white rounded-3xl p-8 shadow-2xl border border-stone-200 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-serif text-[#2a2420]">Share Your Story</h3>
                  <button
                    onClick={() => setShowExperienceForm(false)}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors cursor-pointer text-stone-400 hover:text-stone-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8b6f47]/20 outline-none transition-all"
                        placeholder="E.g. My First Workshop"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-2">Your Name</label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8b6f47]/20 outline-none transition-all"
                        placeholder="Meera Krishnan"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-2">Your Story</label>
                    <textarea
                      name="story"
                      value={formData.story}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#8b6f47]/20 outline-none resize-none transition-all"
                      placeholder="Tell us about your experience..."
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500 uppercase tracking-widest mb-2">Upload Photo</label>
                    <div className="relative group">
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        accept="image/*"
                      />
                      <div className="flex items-center justify-center space-x-3 px-6 py-4 bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl group-hover:bg-stone-100 group-hover:border-[#8b6f47]/50 transition-all">
                        <Upload className="text-stone-400 group-hover:text-[#8b6f47]" size={20} />
                        <span className="text-stone-600 font-medium group-hover:text-[#8b6f47]">
                          {formData.image ? (formData.image as File).name : "Click to upload an image"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#8b6f47] text-white rounded-xl hover:bg-[#6d5638] transition-all duration-300 shadow-md hover:shadow-lg font-medium text-lg cursor-pointer transform active:scale-95"
                  >
                    Publish Story
                  </button>
                </form>
              </div>
            )}
            <button
              onClick={() => setShowExperienceForm(!showExperienceForm)}
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer ${showExperienceForm ? 'bg-stone-200 text-stone-600 hover:bg-stone-300' : 'bg-[#8b6f47] text-white hover:bg-[#6d5638]'}`}
            >
              {showExperienceForm ? <X size={20} /> : <Plus size={20} />}
              <span>{showExperienceForm ? "Close" : "Add Your Story"}</span>
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {allStories.map((story, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center text-center"
              >
                <div className="aspect-square w-full rounded-2xl overflow-hidden mb-8 shadow-xl">
                  <img
                    src={story.image.startsWith('http') ? story.image : `http://localhost:8000${story.image}`}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-center mb-2">
                    <Sparkles className="text-[#8b6f47]/40" size={24} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-serif text-[#2a2420]">{story.title}</h3>
                  <p className="text-stone-600 leading-relaxed italic">
                    "{story.story.length > 200 ? story.story.substring(0, 197) + "..." : story.story}"
                  </p>
                  <p className="text-sm font-medium text-[#8b6f47] tracking-widest uppercase pt-2">
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
            backgroundImage: `url(${gallary3})`,
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
    </div >
  );
};

export default BashoMediaSocialProof;