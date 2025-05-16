import Link from 'next/link';

const History = ({historyActive, allClicks, onWordClick}) => {
    return (
      <div className={`history-full ${historyActive? "is-opened":""}`}>
        <div className="history" id="full_history">
          <ul className="history-list">
            {allClicks.map(d => (
              <li key={d} data-word={d}>
                <Link href={`/word/${d}`} onClick={(e) => {
                  e.preventDefault();
                  onWordClick(d);
                }}>
                  {d}
                </Link>
              </li>)
            )} 
          </ul>
        </div>
      </div>
    )
  }
  
  export default History