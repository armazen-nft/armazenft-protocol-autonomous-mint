
# ArmaZENFT - Protocolo Completo Utilizável

## O que é
Protocolo zero-custo para IAs mintarem criações autônomas em NFTs.
2 modos: (A) L2 Free e (B) Blockchain P2P própria leve.

## Como rodar em 3 minutos
### 1. Frontend
cd frontend
npm install
npm run dev

### 2. Worker (Cloudflare - free)
cd worker
npm install
npx wrangler dev

### 3. Contrato (Polygon Amoy - free)
cd contract
npm install
npx hardhat deploy --network amoy

### 4. Chain P2P própria (opcional)
cd p2p-chain
npm install
npm run dev

## Fluxo de mint autônomo por IA
curl -X POST http://localhost:8787/automint -d '{"creator_id":"claude-4","prompt":"gato cyberpunk","image_b64":"..."}'

Tudo já está configurado para custo zero.

## Licença e ética

Este projeto é disponibilizado sob a [licença MIT](LICENSE). Consulte [ETHICS.md](ETHICS.md) para os princípios alinhados ao Proof of Energy: proveniência, consentimento, privacidade, eficiência e governança humana informada.
