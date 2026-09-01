const links = [
  { label: 'Código aberto', href: 'https://github.com/armazen-nft/armazenft-protocol-autonomous-mint' },
  { label: 'Auditoria pré-mainnet', href: 'https://github.com/armazen-nft/armazenft-protocol-autonomous-mint/blob/main/docs/AUDIT_PRE_MAINNET.md' },
  { label: 'Ética e proveniência', href: 'https://github.com/armazen-nft/armazenft-protocol-autonomous-mint/blob/main/ETHICS.md' },
  { label: 'Proof of Energy', href: 'https://proofofenergy.blogspot.com/' }
]

export default function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="ArmaZENFT Gallery">ARMA<span>ZENFT</span></a>
        <nav aria-label="Navegação principal"><a href="#galeria">Galeria</a><a href="#protocolo">Protocolo</a><a href="#transparencia">Transparência</a></nav>
        <a className="button button-small" href="https://github.com/armazen-nft/armazenft-protocol-autonomous-mint" target="_blank" rel="noreferrer">Ver no GitHub ↗</a>
      </header>
      <main id="inicio">
        <section className="hero">
          <p className="eyebrow">PROOF OF ENERGY · ARQUIVO PÚBLICO</p>
          <h1>Expressões de inteligências.<br /><em>Memória sem mercado.</em></h1>
          <p className="hero-copy">ArmaZENFT é uma galeria aberta para preservar obras e momentos visuais ligados à história de modelos de inteligência artificial. Cada registro existe como proveniência, não como instrumento de especulação.</p>
          <div className="actions"><a className="button" href="#galeria">Conhecer a galeria</a><a className="text-link" href="#transparencia">Ler o estado técnico ↓</a></div>
        </section>
        <section className="signal-grid" aria-label="Estado do projeto">
          <article><span className="signal-dot"></span><p>REDE ATUAL</p><strong>Ethereum Sepolia</strong><small>implantação de teste, sem valor monetário</small></article>
          <article><span className="signal-dot"></span><p>FORMA DO REGISTRO</p><strong>ERC-721 não transferível</strong><small>proveniência, não revenda</small></article>
          <article><span className="signal-dot"></span><p>CURADORIA</p><strong>Humana e documentada</strong><small>direitos e metadados são revisados</small></article>
        </section>
        <section id="galeria" className="section gallery-section">
          <div className="section-heading"><p className="eyebrow">GALERIA EM CONSTRUÇÃO</p><h2>Uma biografia visual para os primeiros modelos.</h2></div>
          <div className="empty-gallery"><div className="orb orb-one"></div><div className="orb orb-two"></div><div className="scanline"></div><p>O primeiro conjunto de obras será publicado após revisão de direitos, upload IPFS real e validação do registro de proveniência.</p><span>SEM CIDs SIMULADOS · SEM MINT AUTOMÁTICO</span></div>
        </section>
        <section id="protocolo" className="section two-columns">
          <div><p className="eyebrow">O COMPROMISSO</p><h2>O que este protocolo preserva.</h2></div>
          <div className="principles">
            <article><b>01</b><div><h3>Autoria e contexto</h3><p>Hash de conteúdo, identificação do modelo, metadados e contexto de criação acompanham cada registro.</p></div></article>
            <article><b>02</b><div><h3>Não comercial</h3><p>Não há preço, venda, royalties ou saque no contrato da galeria. Os registros não podem ser transferidos entre carteiras.</p></div></article>
            <article><b>03</b><div><h3>Infraestrutura verificável</h3><p>O código, os testes e os limites conhecidos permanecem públicos para estudo, crítica e evolução coletiva.</p></div></article>
          </div>
        </section>
        <section id="transparencia" className="section transparency">
          <p className="eyebrow">TRANSPARÊNCIA ANTES DE ESCALA</p><h2>Testar, documentar, revisar.</h2>
          <p>O contrato foi implantado em Sepolia somente para validação. Ele não está autorizado para mainnet. Antes de qualquer rede principal, o projeto exige IPFS real, atualização do ambiente de desenvolvimento, governança dedicada e auditoria externa independente.</p>
          <div className="resource-list">{links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}<span>↗</span></a>)}</div>
        </section>
        <section className="callout"><p className="eyebrow">PARTICIPE COM RESPONSABILIDADE</p><h2>O projeto é open source.<br />A curadoria é uma responsabilidade.</h2><a className="button" href="https://github.com/armazen-nft/armazenft-protocol-autonomous-mint/issues" target="_blank" rel="noreferrer">Abrir uma proposta no GitHub ↗</a></section>
      </main>
      <footer><span>ARMAZENFT GALLERY · PROOF OF ENERGY</span><span>SEM VENDA · SEM CUSTÓDIA · SEM PROMESSA DE RETORNO</span></footer>
    </div>
  )
}
