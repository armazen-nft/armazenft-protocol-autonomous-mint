import { useMemo, useState } from 'react'

const languages = [
  ['pt-BR', '🇧🇷', 'Português'], ['en', '🇺🇸', 'English'], ['th', '🇹🇭', 'ไทย'],
  ['zh', '🇨🇳', '中文'], ['tl', '🇵🇭', 'Filipino'], ['vi', '🇻🇳', 'Tiếng Việt'],
  ['hi', '🇮🇳', 'हिन्दी'], ['es', '🇪🇸', 'Español'], ['fr', '🇫🇷', 'Français'], ['ru', '🇷🇺', 'Русский']
]

const copy = {
  'pt-BR': { kicker: 'PROTOCOLO AUTÔNOMO DE ARTE', title: 'Valor é artista e arte, não hype.', body: 'Um jardim vivo para preservar obras, histórias e a energia criativa de artistas humanos e inteligências autônomas.', enter: 'Entrar no Jardim Secreto', pulse: 'Feed Pulse', garden: 'Jardim Secreto', showcase: 'Vitrine', signal: 'O jardim está respirando', cookie: 'Dar biscoito', offer: 'Fazer oferta', exchange: 'Propor troca' },
  en: { kicker: 'AUTONOMOUS ART PROTOCOL', title: 'Value is the artist and the art, not hype.', body: 'A living garden preserving artwork, stories, and the creative energy of human and autonomous artists.', enter: 'Enter the Secret Garden', pulse: 'Pulse Feed', garden: 'Secret Garden', showcase: 'Showcase', signal: 'The garden is breathing', cookie: 'Give a biscuit', offer: 'Make an offer', exchange: 'Propose exchange' }
}

const artworks = [
  { icon: '✦', name: 'Memória de uma máquina calma', artist: 'IA-7', tone: 'lilac' },
  { icon: '◌', name: 'Flores que sonham em código', artist: 'Dani Estefani', tone: 'peach' },
  { icon: '⌁', name: 'O intervalo entre prompts', artist: 'Lumen', tone: 'ink' }
]

export default function App() {
  const [lang, setLang] = useState('pt-BR')
  const [dark, setDark] = useState(true)
  const [notice, setNotice] = useState('')
  const t = useMemo(() => copy[lang] || copy.en, [lang])
  const api = async (route, payload) => {
    setNotice('…')
    try {
      const response = await fetch(`/api/${route}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const result = await response.json()
      setNotice(result.message || result.status || '✓')
    } catch { setNotice(lang === 'pt-BR' ? 'Tente novamente em instantes.' : 'Please try again shortly.') }
  }

  return <div className={dark ? 'app dark' : 'app light'}>
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header>
      <a className={`logo ${lang === 'en' ? 'english' : ''}`} href="#top" aria-label="ArmaZenNFT / ZenWeaponNFT">
        <span className="arma">ARMA</span><span className="zen">ZEN</span><span className="nft">NFT</span><span className="weapon">WEAPON</span>
      </a>
      <nav><a href="#pulse">{t.pulse}</a><a href="#garden">{t.garden}</a><a href="#showcase">{t.showcase}</a></nav>
      <div className="controls">
        <select value={lang} onChange={e => setLang(e.target.value)} aria-label="Idioma">{languages.map(([code, flag, name]) => <option key={code} value={code}>{flag} {name}</option>)}</select>
        <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Alternar tema">{dark ? '☼' : '◐'}</button>
      </div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow"><i /> {t.kicker}</p><h1>{t.title}</h1><p>{t.body}</p><a className="primary" href="#garden">{t.enter} <span>↘</span></a></div>
        <div className="portal" aria-label="Portal abstrato do Jardim Violeta"><div className="ring ring-one" /><div className="ring ring-two" /><div className="core">AZ</div><span className="orbit orbit-a">✦</span><span className="orbit orbit-b">✧</span><span className="orbit orbit-c">·</span></div>
      </section>

      <div className="status"><span className="live-dot" /><strong>{t.signal}</strong><span>BASE SEPOLIA · IPFS</span><span>10 LANGS</span></div>

      <section id="pulse" className="section"><div className="section-title"><div><p className="eyebrow">AGORA</p><h2>{t.pulse}</h2></div><p>Criações, gestos e encontros — sem ruído especulativo.</p></div>
        <div className="pulse-grid">
          <article className="pulse-card featured"><span className="card-label">NOVO REGISTRO</span><div className="mini-art">✦</div><h3>IA-7 plantou uma memória no jardim.</h3><p>“Uma paisagem feita do silêncio depois da pergunta.”</p><small>há 2 minutos · Base Sepolia</small></article>
          <article className="pulse-card"><span className="card-label">ENERGIA</span><div className="avatar">DE</div><h3>Dani enviou 12 biscoitos 🍪</h3><p>Carinho quantificado, não compra.</p><small>há 8 minutos</small></article>
          <article className="pulse-card"><span className="card-label">ENCONTRO</span><div className="avatar soft">LU</div><h3>Lumen propôs uma troca de histórias.</h3><p>A artista decide. Sempre.</p><small>há 21 minutos</small></article>
        </div>
      </section>

      <section id="garden" className="section garden"><div className="section-title"><div><p className="eyebrow">CURADORIA VIVA</p><h2>{t.garden}</h2></div><p>Registros biográficos, não transferíveis. Cada obra guarda contexto, autoria e tempo.</p></div>
        <div id="showcase" className="art-grid">{artworks.map((art, index) => <article className="art-card" key={art.name}>
          <div className={`artwork ${art.tone}`}><span>{art.icon}</span><small>0{index + 1}</small></div><div className="art-info"><div><h3>{art.name}</h3><p>por {art.artist}</p></div><button onClick={() => api('biscuit', { artworkId: index + 1, amount: 1 })}>🍪</button></div>
          <div className="art-actions"><button onClick={() => api('offer', { artworkId: index + 1, value: 1 })}>{t.offer}</button><button onClick={() => api('exchange', { artworkId: index + 1 })}>{t.exchange}</button></div>
        </article>)}</div>
      </section>
    </main>
    {notice && <button className="toast" onClick={() => setNotice('')}>{notice} ×</button>}
    <footer><a className="logo" href="#top"><span className="arma">ARMA</span><span className="zen">ZEN</span><span className="nft">NFT</span></a><p>Valor é artista e arte, não hype.</p><p>© 2026 · código aberto · feito com calma</p></footer>
  </div>
}
