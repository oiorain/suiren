export default function Legend({ word }) {
    console.log(word)
    return (
        <div className="legend" id="legend">
            <div className="legend-inner">
                <div className="legend-expand">
                    <span className="show">SHOW</span>
                    <span className="hide">HIDE</span>
                </div>
                <h1>{word.kanji}</h1>
                <p className="hiragana"><strong>{word.hiragana} / {word.romaji}</strong></p>

                <p className="english"> {word.english}</p>
            </div>
        </div>
    )
}