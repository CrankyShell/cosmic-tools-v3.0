import React, { useState, useMemo } from 'react';
import { useTradeContext } from '../../components/context/TradeContext';
import { Filter, X, Trash, ZoomIn, PencilSquare, ChevronLeft, Wallet } from 'react-bootstrap-icons';
import { AreaChart, Area, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import EditTradeModal from '../../components/EditTradeModal';

const ViewTrades = () => {
  const { activeAccount, deleteTrade, deleteWithdrawal } = useTradeContext();
  
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [editingTrade, setEditingTrade] = useState(null);
  
  const [filters, setFilters] = useState({
    symbol: 'All', type: 'All', timeframe: 'All', dateSort: 'Newest', profitSort: 'None', exitFilter: 'All'
  });

  // --- 1. MERGE TRADES & WITHDRAWALS (SAFE MODE) ---
  const filteredData = useMemo(() => {
    if (!activeAccount) return [];

    // Safe Trade Mapping
    const trades = (activeAccount.trades || []).map(t => ({ ...t, isTrade: true }));

    // Safe Withdrawal Mapping
    const withdrawals = (activeAccount.withdrawals || []).map(w => ({
        id: w.id,
        date: w.date || new Date().toISOString(), // Fallback date
        pair: 'Withdrawal', 
        direction: 'Out',
        timeframe: '-',
        setup: w.comment || 'Transfer', 
        comment: w.comment,
        exit: '-',
        result: -Math.abs(Number(w.amount) || 0), // Ensure number
        screenshot: null,
        isWithdrawal: true 
    }));

    // Combine
    let combined = [...trades, ...withdrawals];

    // Filter Logic
    if (filters.symbol !== 'All') combined = combined.filter(item => item.isWithdrawal ? false : item.pair === filters.symbol);
    if (filters.type !== 'All') combined = combined.filter(item => item.isWithdrawal ? false : item.direction === filters.type);
    if (filters.timeframe !== 'All') combined = combined.filter(item => item.isWithdrawal ? false : item.timeframe === filters.timeframe);
    if (filters.exitFilter !== 'All') combined = combined.filter(item => item.isWithdrawal ? false : item.exit === filters.exitFilter);

    // SORTING (CRASH FIX: Handle Invalid Dates safely)
    combined.sort((a, b) => {
        const d1 = new Date(a.date).getTime();
        const d2 = new Date(b.date).getTime();
        
        // Treat Invalid Dates as very old (0)
        const dateA = isNaN(d1) ? 0 : d1;
        const dateB = isNaN(d2) ? 0 : d2;

        return filters.dateSort === 'Newest' ? dateB - dateA : dateA - dateB;
    });

    if (filters.profitSort === 'High-Low') combined.sort((a, b) => b.result - a.result);
    else if (filters.profitSort === 'Low-High') combined.sort((a, b) => a.result - b.result);

    return combined;
  }, [activeAccount, filters]);

  // --- 2. CALCULATE STATS ---
  const stats = useMemo(() => {
    const onlyTrades = filteredData.filter(item => !item.isWithdrawal);
    const totalTrades = onlyTrades.length;
    if (totalTrades === 0) return { count: 0, pnl: 0, wr: 0, avg: 0 };
    
    const totalPnL = onlyTrades.reduce((acc, t) => acc + (Number(t.result) || 0), 0);
    const wins = onlyTrades.filter(t => t.result > 0).length;
    
    return { count: totalTrades, pnl: totalPnL, wr: (wins / totalTrades) * 100, avg: totalPnL / totalTrades };
  }, [filteredData]);

  const getEquityCurve = (trade) => {
      // Safe Sort for History
      const allTrades = [...(activeAccount.trades || [])].sort((a, b) => {
          const d1 = new Date(a.date).getTime() || 0;
          const d2 = new Date(b.date).getTime() || 0;
          return d1 - d2;
      });
      
      const cutoffIndex = allTrades.findIndex(t => t.id === trade.id);
      if (cutoffIndex === -1) return [];

      let runningPnL = 0;
      return allTrades.slice(0, cutoffIndex + 1).map((t, i) => {
          runningPnL += (Number(t.result) || 0);
          return { i, pnl: runningPnL };
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 relative items-start pb-12">
        
      {/* LEFT COLUMN: List */}
      <div className={`flex-grow space-y-6 flex flex-col transition-all duration-300 ${selectedTrade ? 'hidden md:flex md:w-2/3' : 'w-full'}`}>
          
          {/* Filters Bar */}
          <div className="bg-cosmic-card border border-white/10 p-4 rounded-xl flex flex-col md:flex-row flex-wrap gap-4 items-stretch md:items-center shrink-0">
              <div className="flex items-center gap-2 text-cyan-400 font-bold mr-2 mb-2 md:mb-0"><Filter /> Filters</div>
              <div className="grid grid-cols-2 md:flex gap-2 w-full md:w-auto">
                <FilterSelect value={filters.symbol} onChange={e => setFilters({...filters, symbol: e.target.value})} options={['All', ...(activeAccount?.savedSymbols || [])]} />
                <FilterSelect value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})} options={['All', 'Long', 'Short']} labels={['All Sides', 'Long', 'Short']} />
              </div>
              <button onClick={() => setFilters({symbol:'All', type:'All', timeframe:'All', dateSort:'Newest', profitSort:'None', exitFilter:'All'})} className="text-xs text-red-400 hover:text-white md:ml-auto mt-2 md:mt-0 text-right">Reset Filters</button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 shrink-0">
              <StatBox label="Trades" value={stats.count} />
              <StatBox label="Trading PnL" value={`$${stats.pnl.toFixed(2)}`} color={stats.pnl >= 0 ? 'text-green-400' : 'text-red-400'} />
              <StatBox label="Win Rate" value={`${stats.wr.toFixed(1)}%`} />
              <StatBox label="Avg PnL" value={`$${stats.avg.toFixed(2)}`} />
          </div>

          {/* LIST */}
          <div className="space-y-3 pr-1 md:pr-0">
            <AnimatePresence mode='popLayout'>
              {filteredData.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={item.id}
                    onClick={() => setSelectedTrade(item)} 
                    className={`
                        p-3 md:p-4 rounded-xl grid grid-cols-12 items-center gap-2 md:gap-4 border
                        ${item.isWithdrawal 
                            ? 'bg-red-500/5 border-red-500/20 cursor-pointer hover:bg-red-500/10'
                            : 'bg-cosmic-card border-white/5 cursor-pointer hover:border-blue-500 transition'
                        }
                        ${selectedTrade?.id === item.id ? 'border-blue-500 bg-blue-500/10' : ''}
                    `}
                  >
                      {/* Image / Icon */}
                      <div className="col-span-3 md:col-span-2 h-10 md:h-12 rounded overflow-hidden relative flex items-center justify-center">
                          {item.isWithdrawal ? (
                              <div className="bg-red-500/10 w-full h-full flex items-center justify-center text-red-400">
                                  <Wallet size={20} />
                              </div>
                          ) : (
                              item.screenshot 
                                ? <div className="bg-black/50 w-full h-full"><img src={item.screenshot} alt="Trade" className="w-full h-full object-cover" /></div>
                                : <div className="bg-black/50 w-full h-full flex items-center justify-center text-gray-700 text-[10px]">No Img</div>
                          )}
                      </div>

                      {/* Info */}
                      <div className="col-span-4 md:col-span-3 overflow-hidden">
                          <div className={`font-bold text-sm truncate ${item.isWithdrawal ? 'text-red-300' : 'text-white'}`}>
                              {item.pair}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                              {item.isWithdrawal ? item.setup : `${item.timeframe} • ${item.setup}`}
                          </div>
                      </div>

                      {/* Direction */}
                      <div className="col-span-2 md:col-span-2 text-center md:text-left">
                          {item.isWithdrawal ? (
                             <span className="text-[10px] px-2 py-1 rounded uppercase font-bold bg-red-500/10 text-red-400">OUT</span>
                          ) : (
                             <span className={`text-[10px] px-1.5 py-0.5 md:px-2 md:py-1 rounded uppercase font-bold ${item.direction === 'Long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {item.direction?.substring(0,1)}<span className="hidden md:inline">{item.direction?.substring(1)}</span>
                             </span>
                          )}
                      </div>

                      {/* Date (Safe Render) */}
                      <div className="hidden md:block col-span-2 text-xs text-gray-400 text-right md:text-left">
                          {item.date ? new Date(item.date).toLocaleDateString() : 'No Date'}
                      </div>

                      {/* Result */}
                      <div className={`col-span-3 md:col-span-3 text-right font-mono font-bold text-sm md:text-base truncate ${item.isWithdrawal ? 'text-red-400' : (item.result >= 0 ? 'text-green-400' : 'text-red-400')}`}>
                          {item.result > 0 ? '+' : ''}{Number(item.result).toFixed(2)}
                      </div>
                  </motion.div>
              ))}
            </AnimatePresence>
            {filteredData.length === 0 && <div className="text-center py-20 text-gray-500">No transactions match your filters.</div>}
          </div>
      </div>

      {/* RIGHT COLUMN: Details */}
      <AnimatePresence mode="wait">
      {selectedTrade && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 pt-24 md:pt-0 bg-[#0B0D17] flex flex-col md:sticky md:top-32 md:z-auto md:bg-cosmic-card md:border md:border-white/10 md:rounded-xl md:w-1/3 md:max-h-[80vh] overflow-hidden"
          >
              <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center shrink-0 bg-gray-900 md:bg-transparent">
                  <div className="flex items-center gap-3">
                      <button onClick={() => setSelectedTrade(null)} className="md:hidden text-white active:scale-95 transition">
                          <ChevronLeft size={24} />
                      </button>
                      <h2 className="text-xl font-bold text-white">Details</h2>
                  </div>
                  
                  <div className="flex gap-1 md:gap-2">
                      {!selectedTrade.isWithdrawal && (
                        <button onClick={() => setEditingTrade(selectedTrade)} className="p-2 text-gray-300 hover:text-blue-400 transition hover:bg-white/5 rounded-lg"><PencilSquare size={20} /></button>
                      )}
                      
                      <button 
                        onClick={() => { 
                            if(confirm("Delete this record?")) { 
                                if (selectedTrade.isWithdrawal) {
                                    deleteWithdrawal(selectedTrade.id);
                                } else {
                                    deleteTrade(selectedTrade.id);
                                }
                                setSelectedTrade(null); 
                            }
                        }} 
                        className="p-2 text-gray-300 hover:text-red-500 transition hover:bg-white/5 rounded-lg"
                      >
                        <Trash size={20} />
                      </button>
                      
                      <button onClick={() => setSelectedTrade(null)} className="hidden md:block p-2 text-gray-300 hover:text-white transition hover:bg-white/5 rounded-lg ml-2 border-l border-white/10 pl-3"><X size={28}/></button>
                  </div>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
                  
                  {!selectedTrade.isWithdrawal && (
                      <div className="w-full h-48 md:h-48 bg-black/50 rounded-lg overflow-hidden mb-6 border border-white/10 group relative shrink-0">
                          {selectedTrade.screenshot ? (
                              <>
                                <img src={selectedTrade.screenshot} className="w-full h-full object-cover" />
                                <div onClick={() => setFullImage(selectedTrade.screenshot)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition"><ZoomIn className="text-white" size={30} /></div>
                              </>
                          ) : <div className="flex items-center justify-center h-full text-gray-600">No Screenshot</div>}
                      </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-6 shrink-0">
                      <DetailItem label="Pair" value={selectedTrade.pair} />
                      <DetailItem label="Description" value={selectedTrade.setup} />
                      <DetailItem label="Direction" value={selectedTrade.direction} />
                      <DetailItem label="Date" value={selectedTrade.date ? new Date(selectedTrade.date).toLocaleDateString() : '-'} />
                      
                      {!selectedTrade.isWithdrawal && <DetailItem label="Exit" value={selectedTrade.exit} />}
                      
                      <DetailItem label="Result" value={selectedTrade.result} color={selectedTrade.result >= 0 ? 'text-green-400' : 'text-red-400'} />
                  </div>

                  <div className="mb-6 shrink-0">
                      <h4 className="text-xs text-gray-500 uppercase mb-2">Comment / Note</h4>
                      <div className="bg-black/40 p-3 rounded text-sm text-gray-300 italic min-h-[60px]">"{selectedTrade.comment || 'No notes.'}"</div>
                  </div>

                  {!selectedTrade.isWithdrawal && (
                    <div className="h-[200px] flex flex-col">
                        <h4 className="text-xs text-gray-500 uppercase mb-2">History Context</h4>
                        <div className="flex-grow w-full bg-black/20 rounded-lg p-2 border border-white/5">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={getEquityCurve(selectedTrade)}>
                                    <defs><linearGradient id="gradCtx" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                                    <RechartsTooltip contentStyle={{backgroundColor: '#111', border: '1px solid #333'}} />
                                    <Area type="monotone" dataKey="pnl" stroke="#3b82f6" fill="url(#gradCtx)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                  )}
              </div>
          </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
        {fullImage && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-10" onClick={() => setFullImage(null)}>
                <motion.img initial={{scale:0.8}} animate={{scale:1}} src={fullImage} className="max-w-full max-h-full rounded shadow-2xl border border-white/20" />
                <button className="absolute top-5 right-5 text-white bg-black/50 p-2 rounded-full"><X size={30}/></button>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-[200]">
        {editingTrade && <EditTradeModal trade={editingTrade} onClose={() => setEditingTrade(null)} />}
      </div>
    </div>
  );
};

const FilterSelect = ({value, onChange, options, labels}) => (
    <select className="w-full md:w-auto bg-black/40 border border-white/10 rounded px-3 py-2 md:py-1 text-sm text-white outline-none cursor-pointer hover:border-blue-500/50 transition" value={value} onChange={onChange}>
        {options.map((opt, i) => <option key={opt} value={opt}>{labels ? labels[i] : opt}</option>)}
    </select>
);
const StatBox = ({ label, value, color = "text-white" }) => (
    <div className="bg-cosmic-card border border-white/5 p-3 rounded-xl">
        <div className="text-[10px] text-gray-500 uppercase mb-1">{label}</div>
        <div className={`text-lg font-bold ${color}`}>{value}</div>
    </div>
);
const DetailItem = ({ label, value, color="text-white" }) => (
    <div><div className="text-[10px] text-gray-500 uppercase">{label}</div><div className={`font-bold ${color}`}>{value}</div></div>
);

export default ViewTrades;