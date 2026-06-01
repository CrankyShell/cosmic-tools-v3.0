import React, { useState } from 'react';
import { useTradeContext } from '../../components/context/TradeContext';
import { Wallet, Plus, Trash, CheckCircle, Download, Upload, FileEarmarkSpreadsheet, FiletypeJson, PencilSquare, X, Palette, ExclamationCircle } from 'react-bootstrap-icons';
import { motion, AnimatePresence } from 'framer-motion';

// --- COLOR PRESETS ---
const COLORS = [
  { hex: '#3b82f6', name: 'Blue' },
  { hex: '#8b5cf6', name: 'Purple' },
  { hex: '#10b981', name: 'Green' },
  { hex: '#ef4444', name: 'Red' },
  { hex: '#f59e0b', name: 'Gold' },
  { hex: '#06b6d4', name: 'Cyan' },
  { hex: '#ec4899', name: 'Pink' },
];

const Accounts = () => {
  const { 
    accounts, 
    activeAccount, 
    setActiveAccountId, 
    createAccount, 
    deleteAccount,
    updateAccount, 
    importData 
  } = useTradeContext();

  const [newName, setNewName] = useState('');
  const [newBalance, setNewBalance] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newColor, setNewColor] = useState(COLORS[0].hex);
  const [editingAccount, setEditingAccount] = useState(null);

  const handleCreate = (e) => {
    e.preventDefault();
    if (newName && newBalance) {
      createAccount(newName, newBalance, newColor, newDesc);
      setNewName('');
      setNewBalance('');
      setNewDesc('');
      setNewColor(COLORS[0].hex);
    }
  };

  const handleUpdate = (e) => {
      e.preventDefault();
      if (editingAccount && editingAccount.name) {
          updateAccount(editingAccount.id, {
              name: editingAccount.name,
              description: editingAccount.description,
              color: editingAccount.color
          });
          setEditingAccount(null);
      }
  };

  // --- IMPORT LOGIC ---

  const parseCTrader = (lines) => {
    const headerIndex = lines.findIndex(l => l.includes('Closing Quantity') && l.includes('Net USD'));
    if (headerIndex === -1) return { trades: [], finalBalance: null };

    // 1. Parse Trades
    const trades = lines.slice(headerIndex + 1)
        .map((line, index) => {
            const cols = line.split(','); 
            if (cols.length < 8 || !cols[1]) return null;
            
            const direction = cols[1].trim().toLowerCase();
            if (direction !== 'buy' && direction !== 'sell') return null;

            const rawDate = cols[2];
            let dateObj = new Date(rawDate);
            if (isNaN(dateObj.getTime())) return null; 

            const size = parseFloat(cols[5].replace('Lots', '').replace(/\u00A0/g, '').trim()) || 0; 
            const result = parseFloat(cols[6].replace(/\s/g, '').replace(',', '.')) || 0;

            return {
                id: `ct_${Date.now()}_${index}`,
                date: dateObj.toISOString(),
                timestamp: dateObj.getTime(),
                pair: cols[0],
                direction: direction === 'buy' ? 'Long' : 'Short',
                type: direction === 'buy' ? 'Long' : 'Short',
                timeframe: 'H1', 
                entryPrice: parseFloat(cols[3]),
                exitPrice: parseFloat(cols[4]),
                size: size,
                result: result,
                setup: 'Imported (cTrader)',
                exit: 'TP/SL',   
                status: 'Closed'
            };
        }).filter(t => t !== null);

    // 2. Extract Final Balance
    let finalBalance = null;
    const balanceLineIndex = lines.findIndex(l => l.trim().startsWith('Balance'));
    if (balanceLineIndex !== -1 && lines[balanceLineIndex + 1]) {
        const rawBal = lines[balanceLineIndex + 1].trim().replace(/\s/g, '').replace(',', '.');
        finalBalance = parseFloat(rawBal);
    }

    return { trades, finalBalance };
  };

  const parseMT4 = (lines) => {
    const splitCSVLine = (line) => {
      const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      return matches ? matches.map(m => m.replace(/"/g, '')) : [];
    };

    const trades = lines.slice(1).map((line, index) => {
      const cols = splitCSVLine(line);
      if (cols.length < 10) return null; 

      const profit = parseFloat(cols[12] || 0);
      const commission = parseFloat(cols[11] || 0);
      const swap = parseFloat(cols[10] || 0);
      const result = profit + commission + swap;
      
      const rawOpenTime = cols[1]; 
      let dateObj = new Date(rawOpenTime);
      if (isNaN(dateObj.getTime())) dateObj = new Date(rawOpenTime.replace(' ', 'T'));
      if (isNaN(dateObj.getTime())) dateObj = new Date();

      return {
        id: cols[0] || `mt4_${Date.now()}_${index}`,
        date: dateObj.toISOString(),
        timestamp: dateObj.getTime(),
        type: cols[2].toLowerCase(),
        direction: cols[2].toLowerCase() === 'buy' ? 'Long' : 'Short',
        size: parseFloat(cols[3]),
        pair: cols[4],
        timeframe: 'H1',
        entryPrice: parseFloat(cols[5]),
        exitPrice: parseFloat(cols[9]),
        result: result,
        setup: 'Imported (MT4)',
        exit: 'TP/SL',
        status: 'Closed'
      };
    }).filter(t => t !== null);

    return { trades, finalBalance: null };
  };

  const handleImport = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      
      reader.onload = (event) => {
          try {
             const content = event.target.result;
             
             if (file.name.endsWith('.json')) {
                 const parsed = JSON.parse(content);
                 const dataToImport = Array.isArray(parsed) ? parsed : [parsed];
                 const safeData = dataToImport.map((acc, i) => ({
                     ...acc, 
                     id: `imp_${Date.now()}_${i}`,
                     color: acc.color || '#3b82f6',
                     description: acc.description || ''
                 }));
                 importData(JSON.stringify([...accounts, ...safeData]));
                 alert("JSON Import Successful!");
             } 
             else if (file.name.endsWith('.csv')) {
                 const lines = content.trim().split('\n');
                 let result = { trades: [], finalBalance: null };
                 let sourceName = "Imported";

                 if (content.includes('Closing Quantity') && content.includes('Net USD')) {
                     result = parseCTrader(lines);
                     sourceName = "cTrader Import";
                 } else {
                     result = parseMT4(lines);
                     sourceName = "MT4 Import";
                 }

                 if (result.trades.length === 0) {
                     alert("No valid trades found in CSV.");
                     return;
                 }

                 // Balance Calculation
                 let finalSize;
                 
                 if (result.finalBalance !== null && !isNaN(result.finalBalance)) {
                     finalSize = result.finalBalance; 
                 } else {
                     const totalPnL = result.trades.reduce((acc, t) => acc + t.result, 0);
                     finalSize = 10000 + totalPnL; 
                 }

                 const newAccount = {
                     id: `csv_${Date.now()}`,
                     name: `${sourceName} (${new Date().toLocaleDateString()})`,
                     size: parseFloat(finalSize.toFixed(2)), 
                     color: '#10b981', 
                     description: `Imported from ${file.name}`,
                     trades: result.trades,
                     withdrawals: [],
                     deposits: []
                 };

                 importData(JSON.stringify([...accounts, newAccount]));
                 alert(`Success! Imported ${result.trades.length} trades.`);
             }
          } catch (err) { 
              console.error(err);
              alert("Import failed. Check file format."); 
          }
      };
      
      reader.readAsText(file);
      e.target.value = ''; 
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(accounts));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `cosmic_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-12 animate-fade-in relative">
      
      {/* SECTION 1: Account List */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
            <Wallet className="text-blue-400"/> Your Portfolios
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
            {accounts.map(account => {
                const accColor = account.color || '#3b82f6';
                return (
                <div 
                    key={account.id}
                    onClick={() => setActiveAccountId(account.id)}
                    className="relative p-6 rounded-xl border cursor-pointer transition-all duration-300 group overflow-hidden"
                    style={{
                        backgroundColor: activeAccount.id === account.id ? `${accColor}15` : '#131520',
                        borderColor: activeAccount.id === account.id ? accColor : 'rgba(255,255,255,0.05)',
                        boxShadow: activeAccount.id === account.id ? `0 0 20px ${accColor}10` : 'none'
                    }}
                >
                    {activeAccount.id === account.id && (
                        <div className="absolute top-4 right-4" style={{ color: accColor }}>
                            <CheckCircle size={20}/>
                        </div>
                    )}
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: accColor }}></div>

                    <h3 className="text-xl font-bold text-white mb-1 truncate pr-8">{account.name}</h3>
                    
                    {account.description && (
                        <p className="text-xs text-gray-500 mb-3 italic truncate">{account.description}</p>
                    )}

                    <p className="text-gray-400 text-sm mb-4">
                        Balance: <span className="font-mono font-bold" style={{ color: accColor }}>${parseFloat(account.size).toLocaleString()}</span>
                    </p>
                    
                    <div className="text-xs text-gray-500 flex justify-between items-end">
                        <span className="flex items-center gap-1">
                          {account.trades?.length || 0} Trades logged
                        </span>
                        
                        <div className="flex gap-2">
                            <button 
                                onClick={(e) => { e.stopPropagation(); setEditingAccount(account); }}
                                className="text-gray-400 hover:text-white transition p-1 rounded hover:bg-white/5"
                            >
                                <PencilSquare size={16}/>
                            </button>
                            {accounts.length > 1 && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        if(confirm(`Delete ${account.name}?`)) deleteAccount(account.id);
                                    }}
                                    className="text-gray-400 hover:text-red-500 transition p-1 rounded hover:bg-white/5"
                                >
                                    <Trash size={16}/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )})}

            <div className="border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-6 text-gray-600 gap-2 min-h-[140px]">
                <Plus size={32} className="opacity-50"/>
                <span className="text-sm">Create below</span>
            </div>
        </div>
      </section>

      <hr className="border-white/5" />

      {/* SECTION 2: Creation Form */}
      <div className="grid md:grid-cols-2 gap-12">
          
          <div className="bg-cosmic-card p-8 rounded-xl border border-white/5 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Plus className="text-blue-400"/> Create New Portfolio
              </h3>
              <form onSubmit={handleCreate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs text-gray-400 mb-1 uppercase">Name</label>
                          <input 
                            type="text" 
                            placeholder="e.g. My Funded Challenge" 
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            required
                          />
                      </div>
                      <div>
                          <label className="block text-xs text-gray-400 mb-1 uppercase">Balance ($)</label>
                          <input 
                            type="number" 
                            placeholder="10000" 
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                            value={newBalance}
                            onChange={e => setNewBalance(e.target.value)}
                            required
                          />
                      </div>
                  </div>

                  <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase">Description (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Aggressive scalping strategy" 
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                        value={newDesc}
                        onChange={e => setNewDesc(e.target.value)}
                      />
                  </div>

                  <div>
                      <label className="block text-xs text-gray-400 mb-2 uppercase flex items-center gap-2"><Palette/> Color Tag</label>
                      <div className="flex gap-3">
                          {COLORS.map(c => (
                              <button
                                key={c.hex}
                                type="button"
                                onClick={() => setNewColor(c.hex)}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${newColor === c.hex ? 'border-white scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: c.hex }}
                              />
                          ))}
                      </div>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition mt-4">
                      Create Portfolio
                  </button>
              </form>
          </div>

          <div className="bg-cosmic-card p-8 rounded-xl border border-white/5 shadow-xl flex flex-col">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Download className="text-green-400"/> Data Management
              </h3>
              
              <div className="flex-grow mb-6">
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                    Backup your journal regularly. Supported formats for import: <span className="text-white font-bold">JSON, MT4/MT5, cTrader</span>.
                </p>

                {/* --- WARNING DISCLAIMER --- */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3 items-start">
                    <ExclamationCircle className="text-yellow-500 flex-shrink-0 mt-1" size={18} />
                    <div className="text-sm text-gray-300">
                        <strong className="text-yellow-500 block mb-1">Important Note on Imports</strong>
                        External platforms (cTrader, MT4/MT5) do not export personal data like <span className="text-white">Timeframes</span>, <span className="text-white">Strategies</span>, or <span className="text-white">Screenshots</span>. 
                        <br/><br/>
                        You will need to manually edit imported trades to populate these fields for accurate analytics.
                    </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-auto">
                  <button onClick={handleExport} className="flex-1 bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-white py-3 rounded-lg transition flex justify-center items-center gap-2 group">
                      <FiletypeJson/> Export JSON
                  </button>
                  <label className="flex-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white py-3 rounded-lg transition flex justify-center items-center gap-2 cursor-pointer">
                      <Upload/> Import File
                      <input type="file" onChange={handleImport} accept=".json,.csv" className="hidden" />
                  </label>
              </div>
          </div>
      </div>

      {/* --- EDIT MODAL --- */}
      <AnimatePresence>
          {editingAccount && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setEditingAccount(null)}>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#0B0D17] border border-white/10 p-6 rounded-xl w-full max-w-md shadow-2xl"
                    onClick={e => e.stopPropagation()}
                  >
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-white">Edit Portfolio</h3>
                          <button onClick={() => setEditingAccount(null)} className="text-gray-400 hover:text-white"><X size={24}/></button>
                      </div>

                      <form onSubmit={handleUpdate} className="space-y-4">
                          <div>
                              <label className="text-xs text-gray-500 uppercase">Name</label>
                              <input 
                                className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-blue-500"
                                value={editingAccount.name}
                                onChange={e => setEditingAccount({...editingAccount, name: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="text-xs text-gray-500 uppercase">Description</label>
                              <input 
                                className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-blue-500"
                                value={editingAccount.description || ''}
                                onChange={e => setEditingAccount({...editingAccount, description: e.target.value})}
                              />
                          </div>
                          <div>
                              <label className="text-xs text-gray-500 uppercase mb-2 block">Color Tag</label>
                              <div className="flex gap-2">
                                  {COLORS.map(c => (
                                      <button
                                        key={c.hex}
                                        type="button"
                                        onClick={() => setEditingAccount({...editingAccount, color: c.hex})}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform ${editingAccount.color === c.hex ? 'border-white scale-110' : 'border-transparent'}`}
                                        style={{ backgroundColor: c.hex }}
                                      />
                                  ))}
                              </div>
                          </div>

                          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded mt-4">
                              Save Changes
                          </button>
                      </form>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>

    </div>
  );
};

export default Accounts;