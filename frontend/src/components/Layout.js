import Nav from './Nav'
import History from './History'
import HistoryMenu from './HistoryMenu'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useHistory } from './HistoryProvider'

const MenuButton = ({ onClick, menuActive }) => (
  <button 
    onClick={onClick} 
    className={menuActive? 'menu-button is-active':'menu-button'}>
    <div className="menu-button-lines">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </button>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

export default function Layout({ children }){
  let [ menuActive, setMenu ] = useState(false)
  let [ historyActive, setHistory ] = useState(false)
  const router = useRouter()
  const isFromHistory = useRef(false)
  const { history, addToHistory } = useHistory()

  // Update history when route changes
  useEffect(() => {
    if (router.query.id && !isFromHistory.current) {
      addToHistory(router.query.id);
    }
    // Reset the flag after navigation
    isFromHistory.current = false;
  }, [router.query.id, addToHistory]);

  // Handle history clicks
  const handleHistoryClick = (word) => {
    isFromHistory.current = true;
    router.push(`/word/${word}`);
  };

  return (<>
      <Nav menuActive={menuActive}/>
      <History historyActive={historyActive} allClicks={history} onWordClick={handleHistoryClick} />
      <div className={`app-container ${menuActive ? "menu-is-opened" : ""} ${historyActive ? "history-full-is-opened" : ""}`}>
        <div className="app-container-inner">
          <MenuButton
            onClick={() => setMenu(!menuActive)} 
            menuActive={menuActive}>
          </MenuButton>
          <header className="app-header">
            <form className="search" id="search" onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.querySelector('input');
              const searchWord = input.value.trim();
              if (searchWord) {
                addToHistory(searchWord);
                router.push(`/word/${searchWord}`);
                input.value = ''; // Clear input after search
              }
            }}>
              <input 
                type="text" 
                placeholder="Search for a word"
                aria-label="Search for a word"
              />
              <span className="search-active"></span>
              <button type="submit" className="search-button">
                <div className="magnifier">
                  <div className="magnifier-circle"></div>
                  <div className="magnifier-handle"></div>
                </div>
              </button>
            </form>
          </header>
          <HistoryMenu 
            onClick={() => setHistory(!historyActive)} 
            historyActive={historyActive}
            allClicks={history}
            onWordClick={handleHistoryClick} >
          </HistoryMenu>
        </div>
        {children}
      </div>
    </>)
}
