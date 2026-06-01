import React, { createContext, useState, useEffect, useContext } from 'react';

const TradeContext = createContext();

// Default Data Structure
const defaultAccount = {
  id: 'default',
  name: 'Main Account',
  size: 10000,
  currency: 'USD',
  trades: [],
  withdrawals: [],
  // Memory Lists
  savedSymbols: ['XAU/USD', 'EUR/USD', 'USD/JPY', 'GBP/USD', 'BTC/USD'],
  savedTimeframes: ['1m', '5m', '15m', '1h', '4h', 'D'],
  savedEntryStrategies: ['Candle Close', 'Flip', 'Candle Break'],
  savedExitStrategies: ['TP', 'SL', 'BE', 'Decision']
};

export const TradeProvider = ({ children }) => {
  // 1. Load Accounts (Handle potential bad data)
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('cosmic_data');
      return saved ? JSON.parse(saved) : [defaultAccount];
    } catch (e) {
      return [defaultAccount];
    }
  });

  // 2. Load Active ID
  const [activeAccountId, setActiveAccountId] = useState(() => {
    return localStorage.getItem('cosmic_active_id') || 'default';
  });

  // 3. Persist Data
  useEffect(() => {
    localStorage.setItem('cosmic_data', JSON.stringify(accounts));
    localStorage.setItem('cosmic_active_id', activeAccountId);
  }, [accounts, activeAccountId]);

  // 4. Safe Active Account Retrieval (FIX: Loose comparison for String vs Number IDs)
  const activeAccount = accounts.find(a => String(a.id) === String(activeAccountId)) || accounts[0];

  // --- ACTIONS ---

  const createAccount = (name, size, color = '#3b82f6', description = '') => {
      const newAccount = {
        id: Date.now(),
        name,
        size: parseFloat(size) || 0, // Safety check
        color,
        description,
        trades: [],
        withdrawals: [],
        deposits: [],
        // Initialize Defaults so Add Trade doesn't crash later
        savedSymbols: ['XAU/USD', 'EUR/USD', 'USD/JPY'],
        savedTimeframes: ['5m', '15m', '1h', '4h'],
        savedEntryStrategies: ['Candle Close', 'Break & Retest'],
        savedExitStrategies: ['TP', 'SL']
      };
      setAccounts([...accounts, newAccount]);
      setActiveAccountId(newAccount.id);
    };

  const deleteAccount = (id) => {
    if (accounts.length === 1) return alert("Cannot delete the last account!");
    const newList = accounts.filter(a => a.id !== id);
    setAccounts(newList);
    // If we deleted the active account, switch to the first available one
    if (String(activeAccountId) === String(id)) {
        setActiveAccountId(newList[0].id);
    }
  };

  const updateAccount = (id, updates) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === id ? { ...acc, ...updates } : acc
    ));
  };

  const addTrade = (trade) => {
    setAccounts(prev => prev.map(acc => {
      // FIX: Loose comparison
      if (String(acc.id) === String(activeAccountId)) {
        
        // FIX: Handle missing arrays safely (Imported accounts might lack these)
        const currentSymbols = acc.savedSymbols || [];
        const currentTimeframes = acc.savedTimeframes || [];
        const currentStrategies = acc.savedEntryStrategies || [];

        // Update Memory
        const newSymbols = Array.from(new Set([...currentSymbols, trade.pair]));
        const newTimeframes = Array.from(new Set([...currentTimeframes, trade.timeframe]));
        const newStrategies = Array.from(new Set([...currentStrategies, trade.setup]));

        // Safe Result Calculation
        const tradeResult = parseFloat(trade.result);
        const validResult = isNaN(tradeResult) ? 0 : tradeResult;

        return {
          ...acc,
          size: acc.size + validResult,
          trades: [...acc.trades, trade],
          savedSymbols: newSymbols,
          savedTimeframes: newTimeframes,
          savedEntryStrategies: newStrategies
        };
      }
      return acc;
    }));
  };

  const deleteTrade = (tradeId) => {
    setAccounts(prev => prev.map(acc => {
      if (String(acc.id) === String(activeAccountId)) {
        const trade = acc.trades.find(t => t.id === tradeId);
        if (!trade) return acc;
        return {
          ...acc,
          size: acc.size - (parseFloat(trade.result) || 0),
          trades: acc.trades.filter(t => t.id !== tradeId)
        };
      }
      return acc;
    }));
  };

  const editTrade = (tradeId, updatedData) => {
    setAccounts(prev => prev.map(acc => {
      if (String(acc.id) === String(activeAccountId)) {
        const oldTrade = acc.trades.find(t => t.id === tradeId);
        if (!oldTrade) return acc;

        // Revert old result, add new result
        const oldRes = parseFloat(oldTrade.result) || 0;
        const newRes = parseFloat(updatedData.result) || 0;
        const newSize = (acc.size - oldRes) + newRes;
        
        const newTrades = acc.trades.map(t => 
            t.id === tradeId ? { ...t, ...updatedData } : t
        );

        return { ...acc, size: newSize, trades: newTrades };
      }
      return acc;
    }));
  };

  const addWithdrawal = (amount, date, comment) => {
    setAccounts(prev => prev.map(acc => {
      if (String(acc.id) === String(activeAccountId)) {
        return {
          ...acc,
          size: acc.size - (parseFloat(amount) || 0),
          withdrawals: [...(acc.withdrawals || []), { id: Date.now(), amount, date, comment }]
        };
      }
      return acc;
    }));
  };

  const deleteWithdrawal = (id) => {
    setAccounts(prev => prev.map(acc => {
      if (String(acc.id) === String(activeAccountId)) {
        const withdrawal = (acc.withdrawals || []).find(w => w.id === id);
        const amountToRefund = withdrawal ? parseFloat(withdrawal.amount) : 0;

        return {
          ...acc,
          size: acc.size + amountToRefund,
          withdrawals: (acc.withdrawals || []).filter(w => w.id !== id)
        };
      }
      return acc;
    }));
  };

  const importData = (jsonData) => {
    try {
        const parsed = JSON.parse(jsonData);
        // Basic Validation
        if (Array.isArray(parsed) && (parsed.length === 0 || parsed[0].id)) {
            setAccounts(parsed);
            // If imported list is not empty, switch to the first one
            if (parsed.length > 0) setActiveAccountId(parsed[0].id);
            alert("Data imported successfully!");
        } else {
            alert("Invalid file format.");
        }
    } catch (e) {
        alert("Error reading file.");
    }
  };

  return (
    <TradeContext.Provider value={{
      activeAccount,
      accounts,
      setActiveAccountId,
      createAccount,
      deleteAccount,
      updateAccount,
      addTrade,
      deleteTrade,
      editTrade,
      addWithdrawal,
      deleteWithdrawal,
      importData
    }}>
      {children}
    </TradeContext.Provider>
  );
};

export const useTradeContext = () => useContext(TradeContext);