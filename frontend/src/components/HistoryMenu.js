const HistoryMenu = ({ onClick, historyActive, allClicks, onWordClick }) => {
    let classname = 'history-button'
    if (historyActive)
      classname += ' is-active'
  
    return (
      <div className="history" id="recent_history">
        <ul className="history-list">
        {allClicks.map(d => {
          return (
            <li key={d} data-word={d}>
              <a href={`/word/${d}`} onClick={(e) => {
                e.preventDefault();
                onWordClick(d);
              }}>{d}</a>
            </li>
          );
        })} 
        </ul>
        <button 
          onClick={onClick} 
          className={classname}>
          <span></span>
          <span></span>
        </button>
      </div>
    )
  }

  export default HistoryMenu