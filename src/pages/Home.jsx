import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  JournalRichtext, 
  Activity, 
  Calculator, 
  ShieldLock, 
  LightningCharge, 
  Wallet2, 
  HddNetwork,
  ChevronLeft,
  ChevronRight
} from 'react-bootstrap-icons';
import { motion, AnimatePresence } from 'framer-motion';

// --- FOOTER COMPONENT ---
const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-transparent mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              Cosmic Tools
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Privacy-first trading utilities.
            </p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <Link to="/about" className="hover:text-white transition">About</Link>
            <Link to="#" className="hover:text-white transition">Privacy</Link>
            <Link to="#" className="hover:text-white transition">Disclaimer</Link>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- FEATURE ITEM COMPONENT ---
const FeatureItem = ({ icon, title, text }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors duration-300">
    <div className="text-cyan-400 mb-4 bg-blue-500/10 p-4 rounded-full">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
  </div>
);

// --- TOOL CARD COMPONENT ---
const ToolCard = ({ title, desc, link, baseImageName, imageCount = 1 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = Array.from({ length: imageCount }, (_, i) => {
    return i === 0 
      ? `/${baseImageName}.jpg` 
      : `/${baseImageName}${i}.jpg`;
  });

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (imageCount <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    }, 8000);
    return () => clearInterval(timer);
  }, [imageCount]);

  const nextSlide = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % imageCount);
  };

  const prevSlide = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col md:flex-row w-full max-w-6xl mx-auto"
    >
      {/* Image Container 
          CHANGED: Added 'aspect-video'. This forces the 16:9 ratio. 
          Removed 'absolute' positioning tricks that caused the bars.
      */}
      <div className="w-full md:w-2/3 relative aspect-video group bg-gray-900 border-b md:border-b-0 md:border-r border-white/5">
        
        <AnimatePresence>
          <motion.img 
            key={currentImageIndex}
            src={images[currentImageIndex]} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            alt={`${title} screenshot`} 
            // CHANGED: 'object-cover' is safe now because the container is locked to 16:9
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Controls */}
        {imageCount > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-md p-2 md:p-3 rounded-full text-white hover:bg-cyan-500 hover:text-black transition-all opacity-0 group-hover:opacity-100 border border-white/10"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-md p-2 md:p-3 rounded-full text-white hover:bg-cyan-500 hover:text-black transition-all opacity-0 group-hover:opacity-100 border border-white/10"
            >
              <ChevronRight size={20} />
            </button>
            
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.preventDefault(); setCurrentImageIndex(idx); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/30 hover:bg-white/60'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Content Section 
          CHANGED: Added 'self-center' to vertically center text if the image is taller
      */}
      <div className="p-6 md:p-10 flex flex-col justify-center md:w-1/3 bg-gradient-to-b from-gray-900 to-black relative z-20 self-center h-full">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">{title}</h3>
        <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
            {desc}
        </p>
        
        <div className="mt-auto space-y-4 w-full">
            <Link 
                to={link}
                className="block w-full py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-center rounded-xl hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-900/20"
            >
                Launch Tool
            </Link>
            <p className="text-center text-xs text-gray-500 uppercase tracking-widest">
                Local Storage Only
            </p>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow max-w-7xl mx-auto space-y-32 pb-20 pt-16 px-4 w-full">
        
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
          >
              <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-6 inline-block">
                  Version 3.0 Live
              </span>
              <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tight">
                  Command Your <br className="hidden md:block" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
                      Capital
                  </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Professional-grade journaling, analysis, and risk management.
                  <br className="hidden md:block"/> 
                  <span className="text-cyan-400">No Servers. No Fees. 100% Private.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                  <Link to="/journal" className="px-8 py-4 rounded-lg bg-white text-black font-bold hover:bg-cyan-50 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                      Start Journaling
                  </Link>
                  <Link to="/about" className="px-8 py-4 rounded-lg border border-white/20 text-white hover:bg-white/10 transition backdrop-blur-sm">
                      How It Works
                  </Link>
              </div>
          </motion.div>
        </section>

        {/* Tools Section */}
        <section className="space-y-16">
          <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-white/10 flex-grow"></div>
              <h2 className="text-2xl font-bold text-gray-200 uppercase tracking-widest">The Toolkit</h2>
              <div className="h-px bg-white/10 flex-grow"></div>
          </div>
          
          <div className="flex flex-col gap-12 md:gap-20">
            {/* Heil Hitler */}
            <ToolCard 
              title="Trading Journal" 
              desc="The core of your business. Log trades with rich text and screenshots, track performance by strategy, and visualize your equity curve. Features multi-account support, deposit/withdrawal tracking, and advanced calendar analytics."
              link="/journal"
              baseImageName="journal"
              imageCount={4} 
            />
            
            <ToolCard 
              title="Market Analyzer" 
              desc="Stay ahead of the move. Includes real-time economic calendars, live news timelines (FinancialJuice), and multi-chart layouts powered by TradingView. Customize your dashboard to see exactly what matters to your session."
              link="/analyzer"
              baseImageName="analyzer"
              imageCount={3}
            />
            
            <ToolCard 
              title="Risk Calculator" 
              desc="Protect your capital with precision. Instantly calculate position sizes, stop loss values, and risk/reward ratios. Visualizes the trade impact on your account balance before you pull the trigger."
              link="/risk"
              baseImageName="riskcalc"
              imageCount={1}
            />
          </div>
        </section>

        {/* Why Cosmic Tools Section */}
        <section>
          <div className="bg-gray-900/50 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">Why Traders Choose Cosmic</h2>
                  <p className="text-gray-400">Built by a trader, for traders. No corporate bloat.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FeatureItem 
                      icon={<ShieldLock size={30}/>}
                      title="100% Private"
                      text="Your data never leaves your device. We use local browser storage, meaning no servers can ever see your trades."
                  />
                  <FeatureItem 
                      icon={<Wallet2 size={30}/>}
                      title="Always Free"
                      text="No monthly subscriptions, no premium tiers, and no hidden fees. Professional tools accessible to everyone."
                  />
                  <FeatureItem 
                      icon={<HddNetwork size={30}/>}
                      title="No Sign-up"
                      text="Forget passwords and verification emails. Just open the site and start trading immediately."
                  />
                  <FeatureItem 
                      icon={<LightningCharge size={30}/>}
                      title="Blazing Fast"
                      text="Powered by Vite and React, the interface is instant. No server lag, just pure client-side speed."
                  />
              </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default Home;