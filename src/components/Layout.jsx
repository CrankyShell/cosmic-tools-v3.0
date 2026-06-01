import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X } from 'react-bootstrap-icons';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Helper to check if a link is active
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => setIsMobileOpen(false);

  const toolsList = [
    { name: 'Market Analyzer', path: '/analyzer' },
    { name: 'Position Calculator', path: '/risk' }, 
    { name: 'Trading Journal', path: '/journal' },            
  ];

  return (
    // 1. MAIN CONTAINER
    <div className="h-screen w-screen relative overflow-hidden text-white font-sans selection:bg-cyan-500/30">
      
      {/* 2. FIXED BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/background.jpg" 
          alt="Space Background" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-[#0B0D17]/50" />
      </div>

      {/* 3. SCROLLABLE CONTENT AREA */}
      <main className="absolute inset-0 overflow-y-auto z-10 custom-scrollbar scroll-smooth">
        <div className="container mx-auto px-4 pt-28 pb-8 min-h-screen flex flex-col">
            <div className="flex-grow animate-fade-in">
               {children}
            </div>

            <footer className="w-full text-center py-6 mt-12 text-xs text-gray-500 border-t border-white/5">
               <p>© 2026 Cosmic Tools v3.0 | Created with love by PaulFX</p>
            </footer>
        </div>
      </main>

      {/* 4. FROSTED GLASS NAVBAR */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-8 py-4 flex justify-between items-center backdrop-blur-xl bg-[#0B0D17]/60 border-b border-white/10 shadow-lg shadow-cyan-900/10">
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-4 group cursor-pointer" onClick={closeMobileMenu}>
            <img 
              src="/logo.png" 
              alt="Cosmic Logo" 
              className="h-8 w-8 md:h-10 md:w-10 object-contain transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
            />
            <Link to="/" className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tight group-hover:to-cyan-300 transition-all duration-300">
             COSMIC TOOLS
            </Link>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider">
          <NavLink to="/" isActive={isActive('/')}>HOME</NavLink>
          
          {/* TOOLS DROPDOWN */}
          <div className="relative group py-2">
            <button className={`flex items-center gap-1 transition-all duration-300 ${
                location.pathname.includes('/analyzer') || location.pathname.includes('/risk') || location.pathname.includes('/journal')
                ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' 
                : 'text-gray-300 hover:text-cyan-400'
              }`}>
              TOOLS
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <div className="bg-[#11131f] border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-2xl ring-1 ring-white/5">
                {toolsList.map((tool) => (
                  <Link 
                    key={tool.name}
                    to={tool.path} 
                    className={`block px-5 py-3 text-sm transition-all duration-200 border-b border-white/5 last:border-0 hover:bg-white/5 hover:pl-7
                      ${isActive(tool.path) ? 'text-cyan-400 bg-white/5' : 'text-gray-400 hover:text-white'}
                    `}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink to="/about" isActive={isActive('/about')}>ABOUT</NavLink>
          <NavLink to="/contact" isActive={isActive('/contact')}>CONTACT</NavLink>
        </div>

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        <button 
          className="md:hidden text-gray-300 hover:text-white p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={28} /> : <List size={28} />}
        </button>

        {/* --- MOBILE MENU OVERLAY --- */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-[#0B0D17]/95 backdrop-blur-2xl border-b border-white/10 md:hidden shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-2">
                <MobileLink to="/" isActive={isActive('/')} onClick={closeMobileMenu}>
                  HOME
                </MobileLink>
                
                {/* Mobile Tools Section */}
                <div className="py-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-4 mb-2 block">
                    Tools
                  </span>
                  <div className="flex flex-col bg-white/5 rounded-lg border border-white/5 overflow-hidden">
                    {toolsList.map((tool) => (
                      <Link 
                        key={tool.name}
                        to={tool.path}
                        onClick={closeMobileMenu}
                        className={`px-4 py-3 text-sm transition-colors ${
                          isActive(tool.path) 
                            ? 'text-cyan-400 bg-cyan-500/10' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <MobileLink to="/about" isActive={isActive('/about')} onClick={closeMobileMenu}>
                  ABOUT
                </MobileLink>
                <MobileLink to="/contact" isActive={isActive('/contact')} onClick={closeMobileMenu}>
                  CONTACT
                </MobileLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>

    </div>
  );
};

// --- HELPER COMPONENT FOR DESKTOP LINKS ---
const NavLink = ({ to, children, isActive }) => (
  <Link 
    to={to} 
    className="relative group py-2"
  >
    <span className={`transition-all duration-300 ${
      isActive 
        ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]' 
        : 'text-gray-300 hover:text-white'
    }`}>
      {children}
    </span>
    
    <span className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300 ease-out
      ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}
    `}></span>
  </Link>
);

// --- HELPER COMPONENT FOR MOBILE LINKS ---
const MobileLink = ({ to, children, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block px-4 py-3 rounded-lg text-sm font-bold tracking-wider transition-all ${
      isActive 
        ? 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 text-cyan-400 border border-cyan-500/20' 
        : 'text-gray-300 hover:bg-white/5 hover:text-white'
    }`}
  >
    {children}
  </Link>
);

export default Layout;