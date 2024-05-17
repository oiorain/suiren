export default function Legend({ word }) {
    return (
        <div className="legend" id="legend">
            <div className="legend-inner">
                <div className="legend-expand">
                    <span className="show">SHOW</span>
                    <span className="hide">HIDE</span>
                </div>
                <h1>{word.kanji}</h1>
                <p className="hiragana">{word.hiragana}</p>
                <div className="english"> {word.english}</div>
            </div>
        </div>
    )
}