import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { PlusSquare, ListUl, BarChartLine, Wallet } from 'react-bootstrap-icons'; 
import { useTradeContext } from '../../components/context/TradeContext';

const JournalLayout = () => {
  const { activeAccount } = useTradeContext();

  // Helper: Get Color or Default to Blue
  const accountColor = activeAccount.color || '#3b82f6';

  const tabStyle = ({ isActive }) => `
    flex items-center gap-2 px-4 md:px-6 py-3 border-b-2 transition-colors duration-300 font-medium whitespace-nowrap flex-shrink-0 text-sm md:text-base
    ${isActive 
      ? 'border-cyan-400 text-cyan-400 bg-white/5' 
      : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'}
  `;

  return (
    <div className="max-w-[1400px] mx-auto min-h-[90vh] p-4 md:p-6">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Trading Journal</h1>
          
          {/* Portfolio Name with Color Indicator */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
             <span>Portfolio:</span>
             
             {/* The Glowing Dot */}
             <div 
                className="w-3 h-3 rounded-full" 
                style={{ 
                    backgroundColor: accountColor,
                    boxShadow: `0 0 10px ${accountColor}` 
                }} 
             />
             
             <span className="font-bold text-white tracking-wide">
                {activeAccount.name}
             </span>
          </div>
        </div>

        {/* Balance Display - Removed background/border, kept text Green */}
        <div className="flex justify-between md:block items-center min-w-[150px] md:text-right">
             <div className="text-xs text-gray-400 uppercase md:mb-1">Current Balance</div>
             <div className="text-xl md:text-2xl font-mono font-bold text-green-400">
               ${activeAccount.size.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
             </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex mb-6 overflow-x-auto pb-1 gap-1 border-b border-white/5 md:border-none">
        <NavLink to="/journal/add" className={tabStyle}>
          <PlusSquare className="text-lg"/> 
          <span>Add Trade</span>
        </NavLink>
        <NavLink to="/journal/view" className={tabStyle}>
          <ListUl className="text-lg"/> 
          <span>View Trades</span>
        </NavLink>
        <NavLink to="/journal/analytics" className={tabStyle}>
          <BarChartLine className="text-lg"/> 
          <span>Analytics</span>
        </NavLink>
        <NavLink to="/journal/accounts" className={tabStyle}>
          <Wallet className="text-lg"/> 
          <span>Accounts</span>
        </NavLink>
      </nav>

      {/* PAGE CONTENT */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default JournalLayout;