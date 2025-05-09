const Nav = ({menuActive}) => {
  return (
    <nav className={ menuActive ? 'menu is-opened' : 'menu is-closed'}>
      <h2 className="app-title">Suiren <span className="version">2.0</span></h2>
      <p className="app-description">Suiren [睡蓮 - lilypad] is a fun way to explore the Japanese language using Kanji to hop from one word to another, creating memorable connections.</p>
      <p className="app-description">A Kanji Relationship Explorer made by <a href="http://twitter.com/oiorain" target="_blank">Marion Kamoike-Bouguet</a> with <a href="http://aqworks.com" target="_blank">AQ</a>, using data from <a href="http://jisho.org" target="_blank">jisho.org</a>.</p>
      <p className="app-description">Suiren 2.0 is a reworked version using <a href="http://strapi.io" target="_blank">Strapi and hosted on strapicloud</a></p>

      <p>Made by Japanese learners for Japanese learners.</p>
    </nav>
  )
}

export default Nav