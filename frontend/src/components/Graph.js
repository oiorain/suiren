export default function Graph({ children }){
    const onClick = () => {console.log("history")}
    
    return (<>
        <div class="graph" id="graph"></div>
        <div class="legend" id="legend" >
            <div class="legend-inner">
                <div class="legend-expand">
                    <span class="show">SHOW</span>
                    <span class="hide">HIDE</span>
                </div>
                <h1>kanji</h1>
                <p class="hiragana">hiragana</p>
                <div class="english"> english
                    {children}
                </div>
            </div>
        </div>
    </>)
  }
  
