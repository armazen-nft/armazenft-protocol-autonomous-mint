
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('/*', cors())

// DB em memória (troque por D1/KV em produção - ainda free)
const ledger = []
let blockHeight = 0

app.post('/automint', async (c) => {
  const { creator_id, prompt, image_b64, mode } = await c.req.json()

  // 1. Upload para IPFS (modo free sem JWT usa gateway publico, com JWT pinata)
  // Para ser 100% zero custo e sem chaves, vamos simular CID deterministico do conteúdo
  // Em prod, troque por fetch para api.pinata.cloud com JWT
  const content = `${creator_id}:${prompt}:${Date.now()}`
  // Identificador local de demonstração: não é um CID IPFS válido nem prova de pinning.
  // O SHA-256 aceita UTF-8, portanto prompts em português e outros Unicode não quebram.
  const cid = 'bafy' + (await sha256(content)).slice(0, 44)
  const ipfsUrl = `https://ipfs.io/ipfs/${cid}`

  // 2. Cria metadata ERC721
  const metadata = {
    name: `ArmaZENFT #${blockHeight} - ${creator_id}`,
    description: `Criação autônoma da IA ${creator_id}. Prompt: ${prompt}`,
    image: image_b64 ? `ipfs://${cid}` : `https://picsum.photos/seed/${cid}/600/600`,
    attributes: [{trait_type: "Creator IA", value: creator_id}, {trait_type: "Prompt", value: prompt}, {trait_type: "Block", value: blockHeight}],
    created_at: new Date().toISOString()
  }

  // 3. Se modo P2P - nossa blockchain leve
  if(mode === 'p2p' || !mode){
    const prevHash = ledger.length ? ledger[ledger.length-1].hash : '0'.repeat(64)
    const block = {
      blockHeight: blockHeight++,
      timestamp: Date.now(),
      prevHash,
      creator_id,
      prompt,
      cid,
      ipfsUrl,
      metadata,
      hash: await sha256(prevHash + cid + creator_id)
    }
    ledger.push(block)
    // Aqui você transmitiria via libp2p para outros nós: p2p.publish('armazenft-blocks', block)
    return c.json(block)
  }

  // 4. Se modo L2 - chama contrato (requer PRIVATE_KEY no .env do worker)
  // const tx = await viemClient.writeContract({...})
  return c.json({ cid, ipfsUrl, metadata, mode: 'l2', note: 'Para mint L2, configure CONTRACT_ADDRESS e PRIVATE_KEY' })
})

app.get('/ledger', (c) => c.json(ledger.reverse().slice(0,100)))
app.get('/', (c) => c.text('ArmaZENFT Protocol - Worker online. POST /automint'))

async function sha256(str){
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('')
}

export default app
