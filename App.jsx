import { useState } from 'react'

const i18nDict = {
  'pt-BR': { feed:'Feed', atelies:'Ateliês', galeria:'Galeria', biscoitos:'Biscoitos', pulse:'Pulse', entrar:'Entrar', doarBiscoito:'Doar Biscoito 🍪', oferta:'Oferta Direta', troca:'Propor Troca', verPerfil:'Ver perfil', recentes:'Recentes', emAlta:'Em Alta', trocaAberta:'Troca Aberta', ranking:'Ranking de Biscoitos', verRanking:'Ver ranking completo →', escreverPulse:'Escrever no Pulse...', manifesto:'O valor é o artista e a arte e não o hype. Sem preconceito com IA. Plataforma para artistas de prompts e IAs autônomas que emerjam.', nivelZen:'Nível Zen', reputacao:'Reputação', criador:'Criador', colecoes:'Coleções', seguidores:'seg.', soVisual:'Só visualização • Sem hype', carregarMais:'Carregar mais obras ↓' },
  'en': { feed:'Feed', atelies:'Ateliers', galeria:'Gallery', biscoitos:'Biscuits', pulse:'Pulse', entrar:'Sign In', doarBiscoito:'Give Biscuit 🍪', oferta:'Direct Offer', troca:'Propose Trade', verPerfil:'View profile', recentes:'Recent', emAlta:'Trending', trocaAberta:'Open Trade', ranking:'Biscuit Ranking', verRanking:'View full ranking →', escreverPulse:'Write in Pulse...', manifesto:'Value is the artist and the art, not the hype. No prejudice against AI. Platform for prompt artists and emergent autonomous AI artists.', nivelZen:'Zen Level', reputacao:'Reputation', criador:'Creator', colecoes:'Collections', seguidores:'followers', soVisual:'View only • No hype', carregarMais:'Load more ↓' },
  'es': { feed:'Feed', atelies:'Talleres', galeria:'Galería', biscoitos:'Galletas', pulse:'Pulso', entrar:'Entrar', doarBiscoito:'Dar Galleta 🍪', oferta:'Oferta Directa', troca:'Proponer Intercambio', verPerfil:'Ver perfil', recentes:'Recientes', emAlta:'En Alta', trocaAberta:'Intercambio Abierto', ranking:'Ranking de Galletas', verRanking:'Ver ranking completo →', escreverPulse:'Escribir en Pulso...', manifesto:'El valor es el artista y el arte, no el hype.', nivelZen:'Nivel Zen', reputacao:'Reputación', criador:'Creador', colecoes:'Colecciones', seguidores:'seg.', soVisual:'Solo visualización', carregarMais:'Cargar más ↓' },
  'fr': { feed:'Feed', atelies:'Ateliers', galeria:'Galerie', biscoitos:'Biscuits', pulse:'Pulse', entrar:'Connexion', doarBiscoito:'Donner Biscuit 🍪', oferta:'Offre Directe', troca:'Proposer Échange', verPerfil:'Voir profil', recentes:'Récents', emAlta:'Tendance', trocaAberta:'Échange Ouvert', ranking:'Classement Biscuits', verRanking:'Voir classement →', escreverPulse:'Écrire...', manifesto:'La valeur est l artiste et l art, pas le hype.', nivelZen:'Niveau Zen', reputacao:'Réputation', criador:'Créateur', colecoes:'Collections', seguidores:'abonnés', soVisual:'Vue seule', carregarMais:'Charger plus ↓' },
  'ru': { feed:'Лента', atelies:'Ателье', galeria:'Галерея', biscoitos:'Печенье', pulse:'Пульс', entrar:'Войти', doarBiscoito:'Дать печенье 🍪', oferta:'Прямое предложение', troca:'Предложить обмен', verPerfil:'Профиль', recentes:'Недавние', emAlta:'Тренды', trocaAberta:'Открытый обмен', ranking:'Рейтинг печенья', verRanking:'Весь рейтинг →', escreverPulse:'Написать...', manifesto:'Ценность — художник и искусство, а не хайп.', nivelZen:'Уровень Дзен', reputacao:'Репутация', criador:'Создатель', colecoes:'Коллекции', seguidores:'подп.', soVisual:'Только просмотр', carregarMais:'Загрузить ещё ↓' },
  'th': { feed:'ฟีด', atelies:'อาทลิเยร์', galeria:'แกลเลอรี', biscoitos:'บิสกิต', pulse:'พัลส์', entrar:'เข้าสู่ระบบ', doarBiscoito:'ให้บิสกิต 🍪', oferta:'ข้อเสนอโดยตรง', troca:'เสนอแลกเปลี่ยน', verPerfil:'ดูโปรไฟล์', recentes:'ล่าสุด', emAlta:'มาแรง', trocaAberta:'เปิดแลกเปลี่ยน', ranking:'อันดับบิสกิต', verRanking:'ดูทั้งหมด →', escreverPulse:'เขียนใน Pulse...', manifesto:'คุณค่าคือศิลปินและศิลปะ ไม่ใช่กระแส', nivelZen:'ระดับเซน', reputacao:'ชื่อเสียง', criador:'ผู้สร้าง', colecoes:'คอลเลกชัน', seguidores:'ผู้ติดตาม', soVisual:'ดูอย่างเดียว', carregarMais:'โหลดเพิ่ม ↓' },
  'zh': { feed:'动态', atelies:'工作室', galeria:'画廊', biscoitos:'饼干', pulse:'脉冲', entrar:'登录', doarBiscoito:'赠送饼干 🍪', oferta:'直接报价', troca:'提议交换', verPerfil:'查看资料', recentes:'最新', emAlta:'热门', trocaAberta:'开放交换', ranking:'饼干排名', verRanking:'查看完整排名 →', escreverPulse:'在Pulse中输入...', manifesto:'价值在于艺术家和艺术，而非炒作。', nivelZen:'禅等级', reputacao:'声誉', criador:'创作者', colecoes:'收藏', seguidores:'粉丝', soVisual:'仅查看', carregarMais:'加载更多 ↓' },
  'tl': { feed:'Feed', atelies:'Atelier', galeria:'Gallery', biscoitos:'Biskwit', pulse:'Pulse', entrar:'Mag-sign In', doarBiscoito:'Magbigay ng Biskwit 🍪', oferta:'Direktang Alok', troca:'Magmungkahi ng Palitan', verPerfil:'Tingnan profile', recentes:'Kamakailan', emAlta:'Trending', trocaAberta:'Bukas na Palitan', ranking:'Ranking ng Biskwit', verRanking:'Tingnan lahat →', escreverPulse:'Sumulat sa Pulse...', manifesto:'Ang halaga ay ang artist at sining, hindi hype.', nivelZen:'Antas Zen', reputacao:'Reputasyon', criador:'Tagalikha', colecoes:'Mga Koleksyon', seguidores:'tagasunod', soVisual:'View only', carregarMais:'Mag-load pa ↓' },
  'vi': { feed:'Bảng tin', atelies:'Xưởng', galeria:'Thư viện', biscoitos:'Bánh quy', pulse:'Nhịp', entrar:'Đăng nhập', doarBiscoito:'Tặng bánh quy 🍪', oferta:'Đề nghị trực tiếp', troca:'Đề xuất trao đổi', verPerfil:'Xem hồ sơ', recentes:'Gần đây', emAlta:'Thịnh hành', trocaAberta:'Trao đổi mở', ranking:'Xếp hạng Bánh quy', verRanking:'Xem tất cả →', escreverPulse:'Viết trong Pulse...', manifesto:'Giá trị là nghệ sĩ và nghệ thuật, không phải hype.', nivelZen:'Cấp Zen', reputacao:'Danh tiếng', criador:'Người tạo', colecoes:'Bộ sưu tập', seguidores:'người theo dõi', soVisual:'Chỉ xem', carregarMais:'Tải thêm ↓' },
  'hi': { feed:'फीड', atelies:'एटेलियर', galeria:'गैलरी', biscoitos:'बिस्किट', pulse:'पल्स', entrar:'साइन इन', doarBiscoito:'बिस्किट दें 🍪', oferta:'प्रत्यक्ष प्रस्ताव', troca:'विनिमय प्रस्ताव', verPerfil:'प्रोफ़ाइल देखें', recentes:'हालिया', emAlta:'ट्रेंडिंग', trocaAberta:'खुला विनिमय', ranking:'बिस्किट रैंकिंग', verRanking:'पूरी रैंकिंग देखें →', escreverPulse:'Pulse में लिखें...', manifesto:'मूल्य कलाकार और कला में है, हाइप में नहीं।', nivelZen:'ज़ेन स्तर', reputacao:'प्रतिष्ठा', criador:'निर्माता', colecoes:'संग्रह', seguidores:'फॉलोअर्स', soVisual:'केवल देखें', carregarMais:'और लोड करें ↓' },
}

const mockObras = [
  {id:1, titulo:'Jardim Secreto - Neon Orgânico', prompt:'gato astronauta em aquarela, studio ghibli', artista:'Dani', tipo:'humano', biscoitos:42, liberado:'oferta', valor:'0,12 ETH', img:'https://picsum.photos/seed/zen1/800/600'},
  {id:2, titulo:'IA-7 - Emergência #003', prompt:'autonomous dream, latent space emergent', artista:'IA-7', tipo:'ia', biscoitos:128, liberado:'troca', valor:'0,08 ETH', img:'https://picsum.photos/seed/zen2/800/600'},
  {id:3, titulo:'Respiro Violeta', prompt:'futuristic calm, sage and lilac gradients', artista:'Dani', tipo:'humano', biscoitos:12, liberado:'visual', valor:'—', img:'https://picsum.photos/seed/zen3/800/600'},
  {id:4, titulo:'Ateliê Compartilhado', prompt:'collaboration human and AI, no prejudice', artista:'Coletivo', tipo:'ambos', biscoitos:89, liberado:'oferta', valor:'0,15 ETH', img:'https://picsum.photos/seed/zen4/800/600'},
]

export default function App(){
  const [lang,setLang] = useState('pt-BR')
  const [zenHover,setZenHover] = useState(false)
  const [user,setUser] = useState(null)
  const [showAuth,setShowAuth] = useState(false)
  const [showOffer,setShowOffer] = useState(null)
  const [biscoitos,setBiscoitos] = useState(mockObras)
  const [pulseMsg,setPulseMsg] = useState('')
  const [pulses,setPulses] = useState([
    {user:'Mira', time:'2min', text:'Acabei de ofertar 0,12 ETH na Lâmina Sussurro 🍪'},
    {user:'Orion', time:'5min', text:'Nova troca aceita: Kunai Flor ↔ Sora'},
    {user:'Sistema', time:'12min', text:'Coleção Serenidade foi atualizada! +3 novas obras'},
    {user:'Riku', time:'22min', text:'Alguém tem offer na Lâmina? Querendo trocar'},
  ])
  const t = i18nDict[lang] || i18nDict['pt-BR']

  const darBiscoito = (id)=> setBiscoitos(b=> b.map(o=> o.id===id? {...o, biscoitos:o.biscoitos+1}: o))
  const sendPulse = ()=> { if(!pulseMsg.trim()) return; setPulses([{user:user?.name||'Você', time:'agora', text:pulseMsg}, ...pulses]); setPulseMsg('') }

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#2a2a2a]">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-violet-100">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-baseline gap-0 select-none cursor-pointer" onMouseEnter={()=>setZenHover(true)} onMouseLeave={()=>setZenHover(false)}>
              <span className="text-[28px] font-black tracking-tight" style={{fontFamily:'Fraunces'}}>Arma</span>
              <span className="text-[22px] font-black px-3 py-1 rounded-xl mx-1 transition-all duration-500" style={{fontFamily:'Fraunces', background: zenHover? '#7c3aed':'#ede9fe', color: zenHover? 'white':'#7c3aed', transform: zenHover? 'scale(1.05)': 'scale(1)'}}>
                {zenHover? 'WEAPON':'ZEN'}
              </span>
              <span className="text-[28px] font-black tracking-tight" style={{fontFamily:'Fraunces'}}>NFT</span>
            </div>
            {zenHover && <span className="hidden lg:block text-xs px-3 py-1 rounded-full bg-violet-600 text-white animate-pulse">ArmaZen = ZenWeapon - A arma zen é a arte</span>}
            <nav className="hidden md:flex gap-6 text-sm font-medium opacity-70"><span>{t.feed}</span><span>{t.atelies}</span><span>{t.galeria}</span></nav>
          </div>
          <div className="flex gap-3 items-center">
            <select value={lang} onChange={e=>setLang(e.target.value)} className="text-xs px-3 py-2 rounded-full border bg-white cursor-pointer">
              <option value="pt-BR">🇧🇷 PT-BR</option><option value="en">🇺🇸 EN</option><option value="es">🇪🇸 ES</option><option value="fr">🇫🇷 FR</option><option value="ru">🇷🇺 RU</option><option value="th">🇹🇭 TH</option><option value="zh">🇨🇳 ZH</option><option value="tl">🇵🇭 TL</option><option value="vi">🇻🇳 VI</option><option value="hi">🇮🇳 HI</option>
            </select>
            {user? <span className="text-sm font-semibold px-3 py-2 bg-violet-100 rounded-full">🍪 {user.name}</span> : <button onClick={()=>setShowAuth(true)} className="px-5 py-2.5 rounded-full bg-[#2a2a2a] text-white text-sm font-semibold hover:bg-black transition">{t.entrar}</button>}
          </div>
        </div>
        <div className="text-center py-1 text-[10px] tracking-widest opacity-50 border-t border-violet-50">ARMAZENFT.COM • ZENWEAPONNFT.COM • TAMBÉM ZENWEAPONNFT</div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* Left */}
        <aside className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-white rounded-[24px] p-6 border border-violet-100 shadow-sm">
            <h3 className="font-bold text-sm flex items-center gap-2">👤 Perfil do Artista</h3>
            <div className="mt-4 flex items-center gap-3">
              <img src="https://picsum.photos/seed/dani/80/80" className="w-12 h-12 rounded-full"/>
              <div><p className="font-bold text-sm">Dani • Artista ✓</p><p className="text-xs opacity-60">{t.criador} • 12 {t.colecoes} • 4,3 mil {t.seguidores}</p></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#f8f7ff] rounded-xl p-3"><p>🍃 {t.nivelZen}</p><b>14</b></div>
              <div className="bg-[#f8f7ff] rounded-xl p-3"><p>⭐ {t.reputacao}</p><b>98%</b></div>
            </div>
            <button className="mt-4 w-full py-2.5 rounded-full bg-violet-100 text-violet-700 font-semibold text-sm">{t.verPerfil}</button>
          </div>
          <div className="bg-white rounded-[24px] p-6 border shadow-sm">
            <h4 className="font-bold text-sm">{t.ranking} 🍪</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between"><span>🥇 1. Mira — 1.248 🍪</span><span className="text-[10px] bg-violet-100 px-2 py-1 rounded-full">+42 hoje</span></li>
              <li className="flex justify-between"><span>🥈 2. Orion — 982 🍪</span><span className="text-[10px] bg-violet-50 px-2 py-1 rounded-full">+18 hoje</span></li>
              <li className="flex justify-between"><span>🥉 3. Sora — 754 🍪</span><span className="text-[10px] bg-violet-50 px-2 py-1 rounded-full">+12 hoje</span></li>
              <li className="flex justify-between"><span>4. Riku — 612 🍪</span><span className="text-[10px]"> </span></li>
            </ul>
            <a className="mt-4 inline-block text-xs text-violet-600 font-semibold">{t.verRanking}</a>
          </div>
          <div className="bg-[#2a2a2a] text-white rounded-[24px] p-6">
            <h4 className="font-bold text-sm">Manifesto</h4><p className="text-xs mt-3 opacity-80 leading-relaxed">{t.manifesto}</p>
            <p className="text-[10px] mt-4 opacity-50">Flow ~$0.000179 • Tezos arte • Sem hype</p>
          </div>
        </aside>

        {/* Center Feed */}
        <section className="col-span-12 lg:col-span-6 space-y-6">
          <div>
            <h1 className="text-[32px] font-black leading-none" style={{fontFamily:'Fraunces'}}>Feed Zen — Novas Obras</h1>
            <p className="text-sm opacity-60 mt-2">Momentos tranquilos & armas zen • {t.manifesto.slice(0,60)}...</p>
            <div className="mt-4 flex gap-2">
              <span className="px-4 py-1.5 rounded-full bg-violet-600 text-white text-xs font-semibold">{t.recentes}</span>
              <span className="px-4 py-1.5 rounded-full bg-white border text-xs">{t.emAlta}</span>
              <span className="px-4 py-1.5 rounded-full bg-white border text-xs">{t.trocaAberta}</span>
            </div>
          </div>

          {biscoitos.map(o=>(
            <div key={o.id} className="bg-white rounded-[28px] border border-violet-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={o.img} alt={o.titulo} className="w-full h-[380px] object-cover"/>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div><h3 className="font-bold text-[18px]" style={{fontFamily:'Fraunces'}}>{o.titulo}</h3><p className="text-xs opacity-60 mt-1">por {o.artista} • {o.tipo} • Ed. 1/50 • {o.tipo}</p></div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#a8b5a2]/20">{o.artista}</span>
                </div>
                <p className="text-xs mt-3 opacity-60">prompt: {o.prompt} • hash: 0x... • model: SDXL</p>
                <div className="mt-5 flex items-center gap-2 flex-wrap">
                  <button onClick={()=>darBiscoito(o.id)} className="px-4 py-2 rounded-full bg-[#f8f7ff] border text-sm font-semibold hover:bg-violet-50">🍪 {o.biscoitos}</button>
                  <button className="px-4 py-2 rounded-full bg-white border text-sm">❤️</button>
                  <button className="px-4 py-2 rounded-full bg-white border text-sm">💬</button>
                  {o.liberado!=='visual' && <button onClick={()=>setShowOffer(o)} className="ml-auto px-5 py-2.5 rounded-full bg-[#2a2a2a] text-white text-sm font-semibold hover:bg-black">{o.liberado==='oferta'? t.oferta : t.troca}</button>}
                  {o.liberado==='visual' && <span className="ml-auto text-[10px] px-3 py-2 rounded-full bg-[#a8b5a2]/20">{t.soVisual}</span>}
                  {o.valor!=='—' && <span className="text-sm font-bold text-violet-700 ml-2">{o.valor}</span>}
                </div>
              </div>
            </div>
          ))}
          <p className="text-center text-sm py-6 opacity-60">{t.carregarMais}</p>
        </section>

        {/* Right Pulse */}
        <aside className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-white rounded-[24px] p-6 border shadow-sm">
            <h4 className="font-bold text-sm">Pulse — Chat ao Vivo <span className="ml-2 text-[10px] px-2 py-1 rounded-full bg-green-100 text-green-700">ao vivo</span></h4>
            <div className="mt-4 space-y-4">
              {pulses.map((p,i)=>(
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex-shrink-0"/>
                  <div><p className="text-xs font-semibold">{p.user} • {p.time}</p><p className="text-xs opacity-70 mt-1">{p.text}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <input value={pulseMsg} onChange={e=>setPulseMsg(e.target.value)} onKeyDown={e=> e.key==='Enter' && sendPulse()} placeholder={t.escreverPulse} className="flex-1 px-4 py-2.5 rounded-full border text-xs"/>
              <button onClick={sendPulse} className="px-4 py-2 rounded-full bg-violet-600 text-white text-sm">→</button>
            </div>
          </div>
        </aside>
      </main>

      {showAuth && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[28px] p-8 max-w-[380px] w-full shadow-2xl">
            <h3 className="font-black text-[22px]" style={{fontFamily:'Fraunces'}}>Entrar no ArmaZen</h3>
            <p className="text-xs opacity-60 mt-2 mb-6">Google, Flow Wallet, Google Pay ou Pix Brasileiro</p>
            <div className="space-y-3">
              <button onClick={()=>{setUser({name:'Dani • Google'}); setShowAuth(false)}} className="w-full py-3 rounded-full border flex items-center justify-center gap-2 text-sm font-semibold hover:bg-gray-50">🔵 Continuar com Google</button>
              <button onClick={()=>{setUser({name:'Dani • Flow'}); setShowAuth(false)}} className="w-full py-3 rounded-full bg-[#00ef8b] font-bold text-sm hover:bg-[#00d97a]">⬡ Conectar Flow Wallet (Blocto)</button>
              <button onClick={()=>{setUser({name:'Dani • Pay'}); setShowAuth(false)}} className="w-full py-3 rounded-full bg-[#2a2a2a] text-white text-sm font-semibold">G Pay • Google Pay</button>
              <div className="pt-4 border-t">
                <p className="text-xs font-bold mb-2">Pix Brasileiro — CHave PIX</p>
                <input placeholder="CPF, CNPJ, Email, Telefone ou Chave aleatória" className="w-full px-4 py-3 rounded-full border text-sm"/>
                <button onClick={()=>{setUser({name:'Dani • Pix'}); setShowAuth(false)}} className="mt-3 w-full py-3 rounded-full bg-violet-600 text-white font-bold text-sm">Entrar com Pix</button>
                <p className="text-[10px] opacity-50 mt-2 text-center">Você está sem a tecla S, por isso usa CH no lugar - entendido!</p>
              </div>
            </div>
            <button onClick={()=>setShowAuth(false)} className="mt-6 w-full text-xs opacity-50">Fechar</button>
          </div>
        </div>
      )}

      {showOffer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] p-6 max-w-sm w-full">
            <h3 className="font-bold">{showOffer.liberado==='oferta'? 'Oferta Direta':'Propor Troca'} - {showOffer.titulo}</h3>
            <p className="text-xs opacity-60 mt-1">Artista: {showOffer.artista} • Oferta só se liberado</p>
            <input placeholder="Valor em Biscoitos ou ETH" className="mt-4 w-full px-4 py-3 rounded-full border text-sm"/>
            <textarea placeholder="Mensagem para o artista..." className="mt-3 w-full px-4 py-3 rounded-2xl border text-sm h-20"></textarea>
            <div className="mt-4 flex gap-2"><button onClick={()=>setShowOffer(null)} className="flex-1 py-3 rounded-full border text-sm">Cancelar</button><button onClick={()=>setShowOffer(null)} className="flex-1 py-3 rounded-full bg-[#2a2a2a] text-white text-sm font-bold">Enviar</button></div>
          </div>
        </div>
      )}

      <footer className="mt-20 py-10 text-center text-[11px] opacity-50 border-t border-violet-100">ArmaZenNFT.com • ZenWeaponNFT.com • © 2026 • Feito com biscoitos e calma • Flow ~$0.000179 ultrabaixo • Tezos arte • {t.manifesto}</footer>
    </div>
  )
}
