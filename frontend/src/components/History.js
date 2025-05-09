const History = ({historyActive, allClicks}) => {
    return (
        <div className={`history-full ${historyActive? "is-opened":""}`}>
        <div className="history" id="full_history">
          <ul className="history-list">
            {allClicks.map(d => (
              <li key={d} data-word={d}>
                <a href={`/word/${d}`}>
                  {d}
                </a>
              </li>)
            )} 
          </ul>
        </div>
      </div>
    )
  }
  
  export default History