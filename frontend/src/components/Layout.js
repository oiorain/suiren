import Nav from './Nav'

export default function Layout({ children }){
  const onClick = () => {console.log("history")}

  return (<>
      <Nav/>
      <div class="history-full">
        <div class="history" id="full_history">
          <ul class="history-list"></ul>
        </div>
      </div>
      <div class="app-container">
        <div class="app-container-inner">
          <button class="menu-button">
            <div class="menu-button-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <header class="app-header">
            <form class="search" id="search">
              <span class="search-active"></span>
              <button class="search-button">
                <div class="magnifier">
                  <div class="magnifier-circle"></div>
                  <div class="magnifier-handle"></div>
                </div>
              </button>
            </form>
          </header>
          <div class="history" id="recent_history">
            <ul class="history-list"></ul>
            <button class="history-button" onClick={onClick}>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        {children}
      </div>
    </>)
}
