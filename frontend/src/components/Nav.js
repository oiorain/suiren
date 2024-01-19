export default function Nav({ children }){
  return (
    <nav class="menu">
      <h2 class="app-title">Suiren <span class="version">1.1</span></h2>
      <p class="app-description">Suiren [睡蓮 - lilypad] is a fun way to explore the Japanese language using Kanji to hop from one word to another, creating memorable connections.</p>
      <p class="app-description">A Kanji Relationship Explorer made by <a href="http://twitter.com/oiorain" target="_blank">Marion Kamoike-Bouguet</a> with <a href="http://aqworks.com" target="_blank">AQ</a>, using data from <a href="http://jisho.org" target="_blank">jisho.org</a>.</p>

      <p>Made by Japanese learners for Japanese learners.</p>
      <br/>
      <p>Follow <a href="https://twitter.com/suiren_daily" target="_blank">@suiren_daily</a> on Twitter to discover or review one word each day.</p>
    </nav>
  )
}
