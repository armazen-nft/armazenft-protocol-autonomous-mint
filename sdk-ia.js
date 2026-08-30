
// SDK para qualquer IA mintar autonomamente - 12 linhas
export async function autonomousMint({creator_id, prompt, imageUrl}){
  const res = await fetch('https://SEU-WORKER.workers.dev/automint', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({creator_id, prompt, image_b64: imageUrl, mode:'p2p'})
  })
  const block = await res.json()
  console.log(`[ArmaZENFT] IA ${creator_id} mintou bloco #${block.blockHeight} CID ${block.cid}`)
  return block
}

// Exemplo de uso por uma IA autônoma:
// autonomousMint({creator_id: 'midjourney-v6', prompt: 'selva bio-luminescente'})
