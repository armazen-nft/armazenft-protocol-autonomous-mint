// Worker para Hostinger e Cloudflare - decide cadeia pelo criador
// Flow: taxa 8.68E-04 FLOW ~ $0.000179 - permite patrocinio gratuito
// Tezos: ~1 XTZ deploy, mint extremamente acessivel
export default {
  async fetch(request, env, ctx){
    const url = new URL(request.url);
    if (url.pathname === '/automint' && request.method === 'POST') {
      try {
        const body = await request.json();
        const isAI = body.creator_id?.startsWith('ai-') || body.artist_type === 'ia';
        const chain = isAI ? 'flow' : 'tezos';
        const feeInfo = chain==='flow' ? '~0.000868 FLOW ~ $0.000179 patrocinavel' : '~0.02 XTZ extremamente acessivel';
        // Aqui integraria FCL Flow ou Taquito Tezos
        return new Response(JSON.stringify({
          ok: true,
          chain,
          fee: feeInfo,
          cid: 'bafy' + Math.random().toString(36).slice(2),
          blockHeight: Math.floor(Math.random()*100000),
          isOfferable: body.isOfferable ?? false,
          isExchangeable: body.isExchangeable ?? false,
          ...body
        }), { headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' } });
      } catch(e){
        return new Response(JSON.stringify({ok:false, error:e.message}), {status:400});
      }
    }
    return new Response(JSON.stringify({ok:true, app:'ArmaZenNFT=ZenWeaponNFT', manifesto:'Valor artista e arte, nao hype'}), {headers:{'Content-Type':'application/json'}});
  }
}
