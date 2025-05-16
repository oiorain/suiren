import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load history from localStorage after mount
  useEffect(() => {
    if (isClient) {
      try {
        const savedHistory = localStorage.getItem('wordHistory');
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory);
          if (Array.isArray(parsedHistory)) {
            setHistory(parsedHistory);
          }
        }
      } catch (error) {
        console.error('Error loading history from localStorage:', error);
      }
    }
  }, [isClient]);

  const addToHistory = useCallback((word) => {
    if (!word) return;
    
    setHistory(prev => {
      // Create new history array without the word if it exists
      const filteredHistory = prev.filter(w => w !== word);
      // Add word to the beginning and limit to 30 items
      const newHistory = [word, ...filteredHistory].slice(0, 30);
      
      // Save to localStorage only on client side
      if (isClient) {
        try {
          localStorage.setItem('wordHistory', JSON.stringify(newHistory));
        } catch (error) {
          console.error('Error saving history to localStorage:', error);
        }
      }
      
      return newHistory;
    });
  }, [isClient]); // Add isClient to dependencies

  return (
    <HistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
} 