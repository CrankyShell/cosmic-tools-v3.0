import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    // 1. CHANGED: Selection color from purple to blue
    <div className="h-screen w-screen relative overflow-hidden text-white font-sans selection:bg-blue-500/30">
      
      {/* 2. Fixed Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/background.jpg" 
          alt="Space Background" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 3. SCROLLABLE CONTENT AREA */}
      <main className="absolute inset-0 overflow-y-auto z-10 custom-scrollbar">
        <div className="container mx-auto px-4 pt-28 pb-8 min-h-screen flex flex-col">
            <div className="flex-grow">
               {children}
            </div>

            <footer className="w-full text-center py-6 mt-12 text-xs text-gray-400 border-t border-white/10">
               <p>© 2026 Cosmic Tools v3.0 | Created with love by PaulFX</p>
            </footer>
        </div>
      </main>

      {/* 4. FROSTED GLASS NAVBAR */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Cosmic Logo" className="h-10 w-10 object-contain"/>
            
            {/* CHANGED: Gradient from Blue -> Purple is now Cyan -> Blue */}
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            COSMIC TOOLS
            </Link>
        </div>
        <div className="flex gap-6 text-sm font-semibold tracking-wider">
          {/* CHANGED: Hover text from purple-400 to cyan-400 (pops better on dark) */}
          <Link to="/" className="hover:text-cyan-400 transition drop-shadow-md">HOME</Link>
          <Link to="/about" className="hover:text-cyan-400 transition drop-shadow-md">ABOUT</Link>
          <Link to="/contact" className="hover:text-cyan-400 transition drop-shadow-md">CONTACT</Link>
        </div>
      </nav>

    </div>
  );
};

export default Layout;