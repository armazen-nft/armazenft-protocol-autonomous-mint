
import { useState } from 'react'

export default function App(){
  const [status,setStatus]=useState('Pronto para mint autônomo')
  const [logs,setLogs]=useState([])
  const [prompt,setPrompt]=useState('gato astronauta em aquarela, estilo studio ghibli')
  const [creator,setCreator]=useState('claude-sonnet-4')

  async function mintAutonomous(){
    setStatus('Gerando com IA e enviando para IPFS...')
    try{
      const res = await fetch('http://localhost:8787/automint', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({creator_id: creator, prompt, mode: 'p2p'})
      })
      const data = await res.json()
      setLogs(l=>[data, ...l])
      setStatus('✅ Mintado! CID: ' + data.cid)
    }catch(e){
      setStatus('❌ Erro: '+e.message + ' (rode o worker com npm run dev em /worker)')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      <header className="p-6 border-b border-white/10 flex justify-between">
        <h1 className="font-black text-xl tracking-widest">ArmaZENFT <span className="text-violet-400">PROTOCOL</span></h1>
        <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300">ZERO GAS • P2P LIVE</span>
      </header>
      <main className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8 mt-6">
        <div className="bg-white/[0.05] backdrop-blur-xl rounded-[24px] p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-4">IA Mint Console</h2>
          <label className="text-xs opacity-60">Creator ID (qualquer IA)</label>
          <input value={creator} onChange={e=>setCreator(e.target.value)} className="w-full mt-1 mb-4 bg-black/50 border border-white/10 rounded-xl p-3"/>
          <label className="text-xs opacity-60">Prompt da criação autônoma</label>
          <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full mt-1 h-28 bg-black/50 border border-white/10 rounded-xl p-3"/>
          <button onClick={mintAutonomous} className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-400 font-bold">🤖 MINT AUTÔNOMO AGORA</button>
          <p className="mt-4 text-sm opacity-70">{status}</p>
          <div className="mt-6 text-[11px] opacity-50">Modo P2P: sem blockchain externa. Tudo em libp2p + IPFS. Se quiser L2, troque mode para 'l2'.</div>
        </div>
        <div className="bg-white/[0.05] backdrop-blur-xl rounded-[24px] p-8 border border-white/10">
          <h3 className="font-bold mb-4">Ledger P2P ao vivo</h3>
          <div className="space-y-3 max-h-[500px] overflow-auto">
            {logs.length===0 && <p className="opacity-40 text-sm">Nenhum mint ainda. Seja a primeira IA.</p>}
            {logs.map((l,i)=>(
              <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs">
                <div className="flex justify-between"><span className="font-bold text-violet-300">{l.creator_id}</span><span className="opacity-50">{new Date(l.timestamp).toLocaleTimeString()}</span></div>
                <div className="mt-2 opacity-80">{l.prompt}</div>
                <div className="mt-2 flex gap-2"><span className="px-2 py-1 bg-white/10 rounded">CID: {l.cid?.slice(0,20)}...</span><span className="px-2 py-1 bg-cyan-500/20 rounded">Block #{l.blockHeight}</span></div>
                <div className="mt-2"><a href={l.ipfsUrl} target="_blank" className="text-cyan-400 underline">Ver no IPFS</a></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
