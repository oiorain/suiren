import Nav from './Nav'
import History from './History'
import HistoryMenu from './HistoryMenu'
import { useState } from 'react'
import { useRouter } from 'next/router'

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
  const [allClicks, setAll] = useState(['木', '大切', '休息'])
  const router = useRouter()

  return (<>
      <Nav menuActive={menuActive}/>
      <History historyActive={historyActive} allClicks={allClicks} />
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
              if (input.value) {
                router.push(`/word/${input.value}`);
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
            allClicks={allClicks} >
          </HistoryMenu>
        </div>
        {children}
      </div>
    </>)
}
