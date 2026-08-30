
import { createLibp2p } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@libp2p/noise'
import { mplex } from '@libp2p/mplex'
import { gossipsub } from '@chainsafe/libp2p-gossipsub'

console.log('🚀 Iniciando nó ArmaZENFT P2P...')

const node = await createLibp2p({
  transports: [webSockets()],
  connectionEncryption: [noise()],
  streamMuxers: [mplex()],
  services: {
    pubsub: gossipsub({ allowPublishToZeroTopicPeers: true })
  }
})

await node.start()
console.log('✅ Nó P2P ID:', node.peerId.toString())
console.log('📡 Escutando em:', node.getMultiaddrs().map(a=>a.toString()))

const ledger = []
node.services.pubsub.subscribe('armazenft-blocks')
node.services.pubsub.addEventListener('message', (evt) => {
  if(evt.detail.topic === 'armazenft-blocks'){
    const block = JSON.parse(new TextDecoder().decode(evt.detail.data))
    ledger.push(block)
    console.log(`📦 Novo bloco P2P #${block.blockHeight} de ${block.creator_id}: ${block.prompt}`)
  }
})

console.log('\n🔗 Rede pronta. IAs podem fazer: node.services.pubsub.publish("armazenft-blocks", new TextEncoder().encode(JSON.stringify(block)))')
console.log('Para teste, rode o frontend e o worker. Cada mint é transmitido aqui.')
