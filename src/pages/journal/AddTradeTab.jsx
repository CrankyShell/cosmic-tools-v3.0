import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useTradeContext } from '../../components/context/TradeContext';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Plus, Wallet, Camera, Trash, Trophy, GraphUp, Lightning, PieChart, ExclamationCircle, CheckCircle, Link45deg, PersonBadge } from 'react-bootstrap-icons';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine } from 'recharts';
import { AnimatePresence, motion } from 'framer-motion';

const AddTradeTab = () => {
  const { activeAccount, addTrade, addWithdrawal } = useTradeContext();

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    type: 'Buy',
    pair: '',
    timeframe: '',
    entryStrategy: 'Candle Close',
    customEntry: '',
    exitStrategy: 'Take Profit', 
    customExit: '',
    result: '',
    comment: '',
    image: null
  });

  // --- UI STATE ---
  const [activeStats, setActiveStats] = useState(() => {
    try {
        const saved = localStorage.getItem('addTrade_widgets');
        return saved ? JSON.parse(saved) : ['equity', 'recent', 'best_pair', 'avg_wl'];
    } catch(e) { return ['equity', 'recent', 'best_pair', 'avg_wl']; }
  });

  const [showStatMenu, setShowStatMenu] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [widgetError, setWidgetError] = useState(''); 
  const [notification, setNotification] = useState(null); // { message, type }

  // --- CTRADER STATE ---
  const [ctAccounts, setCtAccounts] = useState([]);
  const [selectedCtAccount, setSelectedCtAccount] = useState(localStorage.getItem('ctrader_account_id') || '');
  const [isLinked, setIsLinked] = useState(!!localStorage.getItem('ctrader_token'));

  const [withdrawData, setWithdrawData] = useState({ 
      amount: '', 
      date: new Date().toISOString().split('T')[0], 
      comment: '' 
  });

  useEffect(() => {
      localStorage.setItem('addTrade_widgets', JSON.stringify(activeStats));
  }, [activeStats]);

  // --- CTRADER LOGIC ---
  useEffect(() => {
    // 1. Handle OAuth Callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        fetch(`http://localhost:4000/exchange?code=${code}`)
            .then(res => res.json())
            .then(data => {
                if (data.access_token) {
                    localStorage.setItem('ctrader_token', data.access_token);
                    setIsLinked(true);
                    window.history.replaceState({}, document.title, window.location.pathname);
                    showNotification("Connected to cTrader!", "success");
                    fetchCtAccounts(data.access_token);
                }
            })
            .catch(err => showNotification("Connection Failed", "error"));
    } else if (isLinked) {
        // 2. Fetch Accounts if already linked
        const token = localStorage.getItem('ctrader_token');
        fetchCtAccounts(token);
    }
  }, [isLinked]);

  const fetchCtAccounts = (token) => {
      fetch('https://api.ctrader.com/connect/tradingaccounts', {
          headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
          if (data && Array.isArray(data.data)) {
              setCtAccounts(data.data);
              // Auto-select first if none selected
              if (!selectedCtAccount && data.data.length > 0) {
                  handleSelectAccount(data.data[0].accountId);
              }
          }
      })
      .catch(err => console.error("Failed to load accounts", err));
  };

  const handleSelectAccount = (id) => {
      setSelectedCtAccount(id);
      localStorage.setItem('ctrader_account_id', id);
  };

  const handleConnectCTrader = () => {
    window.location.href = 'http://localhost:4000/login';
  };

  const handleUnlink = () => {
      localStorage.removeItem('ctrader_token');
      localStorage.removeItem('ctrader_account_id');
      setIsLinked(false);
      setCtAccounts([]);
      setSelectedCtAccount('');
      showNotification("Account Unlinked", "success");
  };

  // --- HANDLERS ---
  
  const showNotification = (message, type = 'success') => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
  };

  const handleSymbolChange = (e) => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
    if (val.length > 3) {
        val = val.slice(0, 3) + '/' + val.slice(3, 6);
    }
    setFormData({ ...formData, pair: val });
  };

  const handleTimeframeBlur = () => {
    let val = formData.timeframe.trim();
    if (val && !isNaN(val)) {
        setFormData(prev => ({ ...prev, timeframe: val + 'm' }));
    }
  };

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setFormData(prev => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: {'image/*': []}, maxFiles: 1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Date Construction
    let dateStr = formData.date;
    let timeStr = formData.time || '00:00';
    let finalDateTime = `${dateStr}T${timeStr}`;
    let dateObj = new Date(finalDateTime);
    if (isNaN(dateObj.getTime())) dateObj = new Date();
    const validDateISO = dateObj.toISOString();

    const finalEntry = formData.entryStrategy === 'Other (Specify)' ? formData.customEntry : formData.entryStrategy;
    const finalExit = formData.exitStrategy === 'Other (Specify)' ? formData.customExit : formData.exitStrategy;

    const tradePayload = {
        id: Date.now(),
        date: validDateISO,
        direction: formData.type === 'Buy' ? 'Long' : 'Short',
        pair: formData.pair.toUpperCase(),
        timeframe: formData.timeframe,
        setup: finalEntry,
        exit: finalExit,
        result: parseFloat(formData.result) || 0,
        comment: formData.comment,
        screenshot: formData.image
    };

    addTrade(tradePayload);
    handleClear();
    showNotification("Trade logged successfully!", "success");
  };

  const handleClear = () => {
    setFormData({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        type: 'Buy',
        pair: '',
        timeframe: '',
        entryStrategy: 'Candle Close',
        customEntry: '',
        exitStrategy: 'Take Profit', 
        customExit: '',
        result: '',
        comment: '',
        image: null
    });
  };

  const handleWithdraw = (e) => {
      e.preventDefault();
      if (!withdrawData.amount) return;
      addWithdrawal(parseFloat(withdrawData.amount), withdrawData.date, withdrawData.comment);
      setWithdrawData({ amount: '', date: new Date().toISOString().split('T')[0], comment: '' });
      setShowWithdraw(false);
      showNotification("Withdrawal processed", "success");
  };

  const handleAddStat = (statId) => {
      if (activeStats.includes(statId)) return;
      if (activeStats.length >= 4) {
          setWidgetError('Limit reached (Max 4)');
          setTimeout(() => setWidgetError(''), 3000);
          return;
      }
      setActiveStats([...activeStats, statId]);
      setShowStatMenu(false);
      setWidgetError('');
  };

  const handleRemoveStat = (statId) => {
      setActiveStats(activeStats.filter(id => id !== statId));
      setWidgetError('');
  };

  // --- ANALYTICS CALCULATIONS ---
  const analytics = useMemo(() => {
      if (!activeAccount || !activeAccount.trades) return null;

      const trades = activeAccount.trades;
      const wins = trades.filter(t => t.result > 0);
      const losses = trades.filter(t => t.result < 0);
      
      const winRate = trades.length ? (wins.length / trades.length) * 100 : 0;
      const totalPnL = trades.reduce((a,b) => a + (Number(b.result) || 0), 0);
      const expectancy = trades.length ? (totalPnL / trades.length).toFixed(2) : 0;

      const grossWin = wins.reduce((a,b) => a + (Number(b.result) || 0), 0);
      const grossLoss = Math.abs(losses.reduce((a,b) => a + (Number(b.result) || 0), 0));
      const profitFactor = grossLoss === 0 ? (grossWin > 0 ? '∞' : '0.00') : (grossWin / grossLoss).toFixed(2);

      const pairPerf = {};
      trades.forEach(t => {
          const val = Number(t.result) || 0;
          pairPerf[t.pair] = (pairPerf[t.pair] || 0) + val;
      });
      const bestPair = Object.keys(pairPerf).reduce((a, b) => pairPerf[a] > pairPerf[b] ? a : b, 'N/A');
      const bestPairPnL = pairPerf[bestPair] || 0;

      const avgWin = wins.length ? (grossWin / wins.length) : 0;
      const avgLoss = losses.length ? (grossLoss / losses.length) : 0;

      const safeSortedTrades = [...trades].map(t => ({
          ...t,
          _ts: new Date(t.date).getTime() || 0 
      })).sort((a,b) => a._ts - b._ts);

      const recentData = [...safeSortedTrades].reverse().slice(0, 10).map((t, i) => ({ 
        val: t.result, color: t.result >= 0 ? '#4ade80' : '#ef4444' 
      }));

      let runningPnL = 0;
      const equityData = safeSortedTrades.map((t, i) => { 
          runningPnL += (Number(t.result) || 0); 
          return { idx: i, pnl: runningPnL }; 
      });

      return { winRate, expectancy, profitFactor, bestPair, bestPairPnL, avgWin, avgLoss, recentData, equityData };
  }, [activeAccount]);

  const Widget = ({ type }) => {
      if (!analytics) return null;

      return (
        <div className="bg-cosmic-card border border-white/10 rounded-xl p-4 h-48 relative group animate-in fade-in zoom-in-95 duration-200 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    {type === 'equity' && <><GraphUp/> Equity Curve</>}
                    {type === 'recent' && <><GraphUp/> Recent PnL</>}
                    {type === 'winrate' && <><PieChart/> Win Rate</>}
                    {type === 'expectancy' && <><Wallet/> Expectancy</>}
                    {type === 'profit_factor' && <><Lightning/> Profit Factor</>}
                    {type === 'best_pair' && <><Trophy/> Best Pair</>}
                    {type === 'avg_wl' && <><GraphUp/> Avg Win/Loss</>}
                </h4>
                <button type="button" onClick={() => handleRemoveStat(type)} className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><X/></button>
            </div>
            
            <div className="h-[80%] w-full flex items-center justify-center">
                {type === 'equity' && (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analytics.equityData}>
                            <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                            <Area type="monotone" dataKey="pnl" stroke="#3b82f6" fill="url(#g1)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
                {type === 'recent' && (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analytics.recentData}>
                            <ReferenceLine y={0} stroke="#666" />
                            <Bar dataKey="val">{analytics.recentData.map((e,i) => <Cell key={i} fill={e.color}/>)}</Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {type === 'winrate' && <div className="text-4xl font-bold text-cyan-400">{analytics.winRate.toFixed(1)}%</div>}
                {type === 'expectancy' && (
                    <div className="text-center">
                        <div className={`text-3xl font-bold ${analytics.expectancy >= 0 ? 'text-blue-400' : 'text-red-400'}`}>${analytics.expectancy}</div>
                        <div className="text-xs text-gray-500 mt-1">Avg per trade</div>
                    </div>
                )}
                {type === 'profit_factor' && (
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400">{analytics.profitFactor}</div>
                        <div className="text-xs text-gray-500 mt-1">Gross Win / Gross Loss</div>
                    </div>
                )}
                {type === 'best_pair' && (
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                             <Trophy className="text-yellow-500" size={24} /> {analytics.bestPair}
                        </div>
                        <div className={`text-sm font-mono ${analytics.bestPairPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {analytics.bestPairPnL > 0 ? '+' : ''}{analytics.bestPairPnL.toFixed(2)}
                        </div>
                    </div>
                )}
                {type === 'avg_wl' && (
                    <div className="w-full space-y-3 px-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-green-400">Avg Win</span>
                            <span className="font-bold">${analytics.avgWin.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-red-400">Avg Loss</span>
                            <span className="font-bold">${analytics.avgLoss.toFixed(0)}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden flex">
                            <div className="bg-green-500 h-full" style={{ width: `${(analytics.avgWin / (analytics.avgWin + analytics.avgLoss || 1)) * 100}%` }}></div>
                            <div className="bg-red-500 h-full" style={{ width: `${(analytics.avgLoss / (analytics.avgWin + analytics.avgLoss || 1)) * 100}%` }}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      );
  };

  const InputClass = "w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-cyan-400 outline-none transition text-sm";
  const LabelClass = "block text-xs text-gray-500 uppercase tracking-wider mb-1";
  const getPnLColor = (val) => {
      const num = parseFloat(val);
      if (isNaN(num)) return 'text-white';
      return num > 0 ? 'text-green-400' : num < 0 ? 'text-red-400' : 'text-white';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full pb-10 relative">
        
        {/* ---------------- LEFT COLUMN: INPUTS (50%) ---------------- */}
        <div className="bg-cosmic-card border border-white/10 rounded-xl p-6 relative flex flex-col h-fit shadow-xl shadow-blue-900/5">
            
            {/* Header & Buttons */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <h3 className="font-bold text-white text-lg">Log New Trade</h3>
                <div className="flex gap-2">
                     {!isLinked ? (
                         <button type="button" onClick={handleConnectCTrader} className="text-xs text-blue-400 hover:text-white flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 transition">
                            <Link45deg size={14}/> Link cTrader
                         </button>
                     ) : (
                         <button type="button" onClick={handleUnlink} className="text-xs text-green-400 hover:text-white flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 transition">
                            <CheckCircle size={14}/> Linked
                         </button>
                     )}
                    <button type="button" onClick={() => setShowWithdraw(!showWithdraw)} className="text-xs text-red-400 hover:text-white flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded border border-red-500/20 transition">
                        <Wallet size={14}/> {showWithdraw ? 'Cancel' : 'Withdraw'}
                    </button>
                </div>
            </div>

            {/* CTRADER ACCOUNT SELECTOR (Only shows if linked) */}
            {isLinked && (
                <div className="mb-4 bg-blue-600/10 border border-blue-500/30 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <PersonBadge className="text-blue-400" size={20}/>
                        <div>
                            <div className="text-xs text-blue-200 font-bold uppercase">Syncing Account</div>
                            {ctAccounts.length > 0 ? (
                                <select 
                                    className="bg-transparent text-sm text-white font-mono outline-none cursor-pointer hover:text-blue-300"
                                    value={selectedCtAccount}
                                    onChange={(e) => handleSelectAccount(e.target.value)}
                                >
                                    {ctAccounts.map(acc => (
                                        <option key={acc.accountId} value={acc.accountId} className="bg-gray-900">
                                            {acc.accountId} ({acc.live ? 'Live' : 'Demo'})
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className="text-xs text-gray-400 animate-pulse">Loading accounts...</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* WITHDRAWAL FORM (Conditional) */}
            {showWithdraw && (
                <div className="mb-6 bg-red-500/5 border border-red-500/20 p-4 rounded-lg animate-in slide-in-from-top-2 space-y-3">
                    <h4 className="text-red-400 text-sm font-bold">Record Withdrawal</h4>
                    <div className="flex gap-3">
                        <input type="number" placeholder="Amount" className={InputClass} value={withdrawData.amount} onChange={e => setWithdrawData({...withdrawData, amount: e.target.value})} />
                        <input type="date" className={InputClass} value={withdrawData.date} onChange={e => setWithdrawData({...withdrawData, date: e.target.value})} />
                    </div>
                    <textarea placeholder="Withdrawal Note..." rows="2" className={InputClass} value={withdrawData.comment} onChange={e => setWithdrawData({...withdrawData, comment: e.target.value})} />
                    
                    <button type="button" onClick={handleWithdraw} className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-sm">Confirm Withdrawal</button>
                </div>
            )}

            {/* MAIN FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Row 1: Date, Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div><label className={LabelClass}>Date</label><input type="date" className={InputClass} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
                    <div><label className={LabelClass}>Time</label><input type="time" className={InputClass} value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} /></div>
                </div>

                {/* Row 2: Pair, Direction */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={LabelClass}>Symbol</label>
                        <input 
                            type="text" 
                            placeholder="EUR/USD" 
                            className={`${InputClass} font-bold tracking-wider`}
                            value={formData.pair} 
                            onChange={handleSymbolChange} 
                        />
                    </div>
                    <div>
                        <label className={LabelClass}>Direction</label>
                        <div className="flex bg-black/40 rounded p-1 border border-white/10 h-[46px]">
                            {['Buy', 'Sell'].map(type => (
                                <button key={type} type="button" onClick={()=>setFormData({...formData, type})} 
                                    className={`flex-1 text-xs font-bold rounded transition ${formData.type === type ? (type === 'Buy' ? 'bg-green-600 text-white' : 'bg-red-600 text-white') : 'text-gray-400 hover:text-white'}`}>
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Row 3: Timeframe, Strategy */}
                <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className={LabelClass}>Timeframe</label>
                          <input 
                            type="text" 
                            placeholder="M5, H1" 
                            className={InputClass} 
                            value={formData.timeframe} 
                            onChange={e => setFormData({...formData, timeframe: e.target.value})}
                            onBlur={handleTimeframeBlur} 
                          />
                      </div>
                      <div>
                          <label className={LabelClass}>Entry Strategy</label>
                          <select className={InputClass} value={formData.entryStrategy} onChange={e => setFormData({...formData, entryStrategy: e.target.value})}>
                              <option>Candle Close</option>
                              <option>Candle Break</option>
                              <option>Flip</option>
                              <option>Other (Specify)</option>
                          </select>
                          {formData.entryStrategy === 'Other (Specify)' && (
                            <input 
                                type="text" 
                                placeholder="Specify..." 
                                className={`${InputClass} mt-2 bg-blue-500/10 border-blue-500/30`} 
                                value={formData.customEntry} 
                                onChange={e => setFormData({...formData, customEntry: e.target.value})} 
                            />
                          )}
                      </div>
                </div>

                {/* Row 4: Result, Exit */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={LabelClass}>Result (PnL)</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            placeholder="-50 or +100" 
                            className={`${InputClass} font-mono font-bold ${getPnLColor(formData.result)}`} 
                            value={formData.result} 
                            onChange={e => setFormData({...formData, result: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className={LabelClass}>Exit Reason</label>
                        <select className={InputClass} value={formData.exitStrategy} onChange={e => setFormData({...formData, exitStrategy: e.target.value})}>
                              <option>Take Profit</option>
                              <option>Stop Loss</option>
                              <option>Breakeven</option>
                              <option>Other (Specify)</option>
                        </select>
                        {formData.exitStrategy === 'Other (Specify)' && (
                            <input 
                                type="text" 
                                placeholder="Specify..." 
                                className={`${InputClass} mt-2 bg-blue-500/10 border-blue-500/30`} 
                                value={formData.customExit} 
                                onChange={e => setFormData({...formData, customExit: e.target.value})} 
                            />
                        )}
                    </div>
                </div>

                {/* Dropzone */}
                <div {...getRootProps()} className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-cyan-500/50 transition cursor-pointer bg-black/20 group">
                    <input {...getInputProps()} />
                    {formData.image ? (
                        <div className="relative h-20 w-full"><img src={formData.image} className="h-full w-full object-contain"/><button type="button" onClick={(e)=>{e.stopPropagation(); setFormData({...formData, image:null})}} className="absolute top-0 right-0 bg-red-500 p-1 rounded text-white"><X/></button></div>
                    ) : <div className="text-gray-500 group-hover:text-cyan-400 transition"><Camera className="mx-auto mb-1 text-xl"/> <span className="text-xs">Drop screenshot</span></div>}
                </div>

                {/* Comment */}
                <div><label className={LabelClass}>Comments</label><textarea rows="2" className={InputClass} value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})}></textarea></div>

                {/* Submit */}
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition shadow-lg shadow-blue-900/20">
                    Log Trade
                </button>
            </form>
        </div>

        {/* ---------------- RIGHT COLUMN: WIDGETS (50%) ---------------- */}
        <div className="space-y-6">
            
            <div className="flex justify-between items-center relative">
                <div className="flex items-center gap-3">
                    <h3 className="text-gray-400 text-sm font-bold uppercase">Quick Stats</h3>
                    <AnimatePresence>
                        {widgetError && (
                            <motion.span initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} exit={{opacity:0}} className="text-red-400 text-xs flex items-center gap-1">
                                <ExclamationCircle/> {widgetError}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <button 
                    type="button"
                    onClick={() => setShowStatMenu(!showStatMenu)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-400 hover:text-white transition flex items-center gap-2 text-xs border border-white/5"
                >
                    <Plus size={16} /> Add
                </button>

                {showStatMenu && (
                    <div className="absolute top-10 right-0 w-48 bg-gray-900 border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                        <div className="p-2 text-xs font-bold text-gray-500 uppercase border-b border-white/5 bg-white/5">Select Widget</div>
                        
                        {!activeStats.includes('equity') && <button onClick={() => handleAddStat('equity')} className="w-full text-left p-3 hover:bg-white/10 text-sm text-gray-300 border-b border-white/5">Equity Curve</button>}
                        {!activeStats.includes('best_pair') && <button onClick={() => handleAddStat('best_pair')} className="w-full text-left p-3 hover:bg-white/10 text-sm text-gray-300 border-b border-white/5">Best Pair</button>}
                        {!activeStats.includes('winrate') && <button onClick={() => handleAddStat('winrate')} className="w-full text-left p-3 hover:bg-white/10 text-sm text-gray-300 border-b border-white/5">Win Rate</button>}
                        
                        {!activeStats.includes('profit_factor') && <button onClick={() => handleAddStat('profit_factor')} className="w-full text-left p-3 hover:bg-white/10 text-sm text-gray-300 border-b border-white/5">Profit Factor</button>}
                        {!activeStats.includes('recent') && <button onClick={() => handleAddStat('recent')} className="w-full text-left p-3 hover:bg-white/10 text-sm text-gray-300 border-b border-white/5">Recent PnL</button>}
                        {!activeStats.includes('avg_wl') && <button onClick={() => handleAddStat('avg_wl')} className="w-full text-left p-3 hover:bg-white/10 text-sm text-gray-300 border-b border-white/5">Avg Win/Loss</button>}
                        {!activeStats.includes('expectancy') && <button onClick={() => handleAddStat('expectancy')} className="w-full text-left p-3 hover:bg-white/10 text-sm text-gray-300">Expectancy</button>}
                    </div>
                )}
            </div>
            
            <div className={`grid gap-4 ${activeStats.length > 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {activeStats.map(stat => <Widget key={stat} type={stat} />)}
            </div>

            {activeStats.length === 0 && (
                <div className="h-40 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center text-gray-600 text-sm">
                    No widgets selected
                </div>
            )}

        </div>

        {/* --- CUSTOM NOTIFICATION --- */}
        <AnimatePresence>
            {notification && (
                <motion.div 
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-6 right-6 z-50 bg-[#0B0D17] border border-blue-500/30 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
                >
                    <CheckCircle className="text-green-400 text-xl" />
                    <div>
                        <div className="font-bold text-sm">Success</div>
                        <div className="text-xs text-gray-400">{notification.message}</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default AddTradeTab;