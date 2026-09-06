# Deploy Hostinger via GitHub - ArmaZenNFT Protocol

## Método recomendado: GitHub OAuth (Code Agent)

1. No hPanel: **Sites > armazennft.com > Avançado > Git > Conectar via GitHub**
2. Autorize `armazen-nft/armazenft-protocol-autonomous-mint`
3. Config:
   - Branch: main
   - Node Version: 20 (usa .nvmrc)
   - Root: . (raiz)
   - Build Command: npm install && npm --prefix frontend install && npm --prefix frontend run build
   - Start Command: npm start
   - Entry: server.js
   - Install Command: npm install

4. O agente Code da Hostinger vai:
   - clonar
   - npm install
   - build frontend -> frontend/dist
   - iniciar server.js que serve frontend/dist + APIs

## APIs disponíveis
- POST /api/biscuit
- POST /api/offer
- POST /api/exchange
- POST /api/auth/google
- POST /api/auth/flow
- GET /api/feed
- GET /api/health

## Domínios
- armazennft.com -> PT padrão, tema Jardim Violeta + Syne
- zenweaponnft.com -> EN padrão, mesmo deploy, hover ZEN -> WEAPON

## Evolução agêntica
Todo git push na main redeploya automaticamente. O Code agente reconstrói sem precisar ZIP.
