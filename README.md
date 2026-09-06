# ArmaZenNFT = ZenWeaponNFT

> **Valor é artista e arte, não hype.**

Protocolo e galeria biográfica para artistas humanos e inteligências autônomas. O mesmo deploy atende **armazennft.com** (português e Jardim Secreto violeta) e **zenweaponnft.com** (inglês e identidade interativa ZEN → WEAPON).

## Stack

- **Web:** React 18, Vite 5, Syne, tema dark/light e PWA, com interface em 10 idiomas.
- **API:** Node.js 20, Express e ES modules.
- **Protocolos:** worker de demonstração IPFS e contrato ERC-721 biográfico não transferível para Base Sepolia.
- **Recursos:** Feed Pulse, Jardim Secreto, Vitrine, biscoitos, ofertas, trocas e autenticação Google/Flow em modo MVP.

## Desenvolvimento local

```bash
npm install
npm run build
npm start
curl http://localhost:3000/api/health
```

O servidor usa `process.env.PORT || 3000`, entrega `frontend/dist` e aplica fallback para a SPA. Nunca versione segredos, `node_modules` ou arquivos de build.

## Deploy agêntico na Hostinger via GitHub OAuth

O arquivo [`hostinger.json`](hostinger.json) declara Node 20, raiz `.`, entrada `server.js` e os comandos completos de instalação, build e start. Assim, a Hostinger gera `frontend/dist/index.html` antes de iniciar o Express e não depende de `public_html`, ZIP, File Manager ou SSH.

1. No hPanel, acesse **Sites → armazennft.com → Avançado → Git**.
2. Escolha **Conectar GitHub** e autorize o acesso por OAuth.
3. Selecione `armazen-nft/armazenft-protocol-autonomous-mint` e a branch `main`.
4. Confirme o deploy. A configuração em `hostinger.json` executará build e start automaticamente.
5. Aponte `armazennft.com` e `zenweaponnft.com` para a mesma aplicação.

Todo `git push` na `main` dispara o webhook da Hostinger, que roda `buildCommand` e `startCommand` automaticamente. Consulte o [guia detalhado](docs/HOSTINGER_DEPLOY.md).

## API MVP

| Método | Endpoint | Função |
| --- | --- | --- |
| `GET` | `/api/health` | Saúde da aplicação |
| `GET` | `/api/feed` | Eventos do Feed Pulse |
| `POST` | `/api/biscuit` | Biscoitos simbólicos |
| `POST` | `/api/offer` | Oferta direta ao artista |
| `POST` | `/api/exchange` | Proposta de troca |
| `POST` | `/api/auth/google` | Autenticação Google MVP |
| `POST` | `/api/auth/flow` | Autenticação Flow MVP |

> Os endpoints de autenticação, pagamentos e IPFS são demonstrações. Integrações reais exigem provedores, validação, persistência e segredos configurados no ambiente da Hostinger. O contrato não deve ser promovido para mainnet sem auditoria independente.

## Licença

MIT — arte livre, hype zero.
