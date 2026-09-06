# Deploy Hostinger - Passo a Passo
1. hPanel > Avançado > Node.js > Criar App Node 20, entry server.js, Production
2. File Manager > Upload ZIP completo > Extrair
3. No terminal Node.js: npm install && npm --prefix frontend install && npm --prefix frontend run build
4. Variáveis: FLOW_ACCESS_NODE, GOOGLE_CLIENT_ID, PIX_KEY
5. Reiniciar App
6. Domínios armazenft.com e zenweaponnft.com apontados para mesma pasta - tradução troca logo automaticamente
Hover Arma ZEN -> ZENWEAPON já funciona.
Auth Google, Flow, Google Pay, Pix com CHave PIX já no App.jsx.
