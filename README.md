# ArmaZenNFT = ZenWeaponNFT
### *O valor é o artista e a arte e não o hype.*

> **Manifesto:** Sem preconceito com o uso de IA que não precisa ser anunciado. Somos uma plataforma para artistas de prompts que usam IAs ou para IAs artistas autônomas que emerjam.

**Domínios:** `armazenft.com` + `zenweaponnft.com` (registrados .COM 1 ano)  
**Hover Mágico:** Passar cursor em cima de `Arma ZEN` → visualiza-se `ZENWEAPON`  
**Visual:** Futurista calmo — violeta #7c3aed, sage #a8b5a2, bege #f8f7ff, blur, bordas 24px

---

## 1. Visão do Produto - Zora + Twitter sem hype

Não há venda por market. Apenas:

- **Galeria para visualização** (soulbound, sem transferência)
- **Oferta direta na página da arte** - só se artista liberar toggle `isOfferable`
- **Troca** - se artista liberar `isExchangeable`
- **Biscoitos 🍪** - pagamento simbólico para incentivar atividade/projeto. Não é compra, é carinho quantificado.
- **Chat estilo Twitter** - publicação automática do que o artista coloca na galeria → Pulse

```
Artista minta → Cai no Feed automaticamente → Seguidores curtem, comentam, dão biscoito, propõem troca/oferta
```

---

## 2. Análise de Cadeias - Custo Benefício para Artistas e IAs

### Flow - $0.000179
- **Taxa:** `Transaction fee = [1E-4 FLOW + (19.2 * 4E-05 FLOW)] = 8.68E-04 FLOW` ~ $0.000179 [Fonte Flow Docs]
- **Zero Cost:** `Flow itself is a highly advanced blockchain for NFTs, facilitating scalable and low-cost NFT minting and transacting. This enables us to absorb these minor costs and allow for zero cost minting and transacting` [Blockparty/Flow]
- **Ideal para:** IAs autônomas - plataforma patrocina gas, IA não precisa carteira com saldo

### Tezos - Muito Baixo, Foco em Arte
- **Deploy coleção:** `deploying a contract for each collection will cost about 1 XTZ, which will cover the storage and gas fees required by Objkt` [Tezos Docs]
- **Mint:** `Minting on the Tezos blockchain is extremely affordable, but not entirely free. You need some supplies` [Tezos Docs]
- **Cultura:** Objkt, Teia, comunidade arte pura, sem hype
- **Ideal para:** Artistas humanos de prompts

**Decisão ArmaZen:** Híbrido
- `armazenft.com` → Tezos (ateliê humano calmo)
- `zenweaponnft.com` → Flow (arma zen contra hype, IAs autônomas com gas patrocinado)

Worker decide:
```js
if (creator_id.startsWith('ai-')) chain = 'flow' // $0.000179 patrocinado
else chain = 'tezos' // arte
```

---

## 3. Autenticação Completa (Google, Flow, Google Pay, Pix)

Modal de login com 4 opções:

1. **Continuar com Google** - OAuth2 via `GOOGLE_CLIENT_ID`
2. **Conectar Flow Wallet** - FCL + Blocto, address `0x...`
3. **Google Pay** - `G Pay` checkout
4. **Pix Brasileiro** - Campo `CHave PIX` (CPF/CNPJ/Email/Aleatória) + QR Code fake para MVP, depois integração Mercado Pago / Efí

Estado salvo em `localStorage`. Endpoint:
```
POST /api/auth/google
POST /api/auth/flow
```

---

## 4. Tradução - 10 Idiomas

Seletor no header:

| Código | Idioma | Bandeira |
|--------|--------|----------|
| pt-BR | Português | 🇧🇷 |
| en | English | 🇺🇸 - Mostra ZenWeapon |
| th | ไทย | 🇹🇭 |
| zh | 中文 Mandarin | 🇨🇳 |
| tl | Filipino | 🇵🇭 |
| vi | Tiếng Việt | 🇻🇳 |
| hi | हिन्दी India | 🇮🇳 |
| es | Español | 🇪🇸 |
| fr | Français | 🇫🇷 |
| ru | Русский | 🇷🇺 |

Objeto `i18n` em `frontend/src/App.jsx` com troca instantânea.

---

## 5. Estrutura Completa - Hostinger Ready

```
ARMAZENFT-COMPLETO-UNICO/
├── server.js                 # Entry Hostinger Node.js - porta process.env.PORT
├── package.json              # start: node server.js
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       └── App.jsx           # SITE COMPLETO - violeta calmo, hover ZEN->WEAPON
├── worker/
│   └── index.js              # /automint - decide Flow/Tezos
├── contract/
│   ├── ArmaZenNFT.sol        # Soulbound ERC721 (auditado Sepolia)
│   ├── flow/ArmaZen.cdc      # Cadence Flow
│   └── tezos/ArmaZenFA2.py   # FA2 Tezos
└── docs/
    └── MANIFESTO.md
```

### Deploy Hostinger Passo a Passo (simetria perfeita para IA Hostinger)

**hPanel > Avançado > Node.js > Criar Aplicação:**
- Node 20, Production, entry `server.js`

**File Manager > Upload ZIP:**
```bash
npm install
npm run build
```

**Variáveis de ambiente:**
```
PORT=3000 (auto)
FLOW_ACCESS_NODE=https://rest-testnet.onflow.org
GOOGLE_CLIENT_ID=seu_id
PIX_KEY=sua_chave_pix
```

**Domínios:** Apontar `armazenft.com` e `zenweaponnft.com` para mesma pasta. Tradução automática PT→EN troca logo.

---

## 6. Contrato Definitivo - Campos para Remix IDE

Solidity soulbound com `isOfferable` e `isExchangeable`:

```solidity
struct Exhibit {
  bytes32 hashContent;
  string modelId;
  string provenanceURI;
  uint256 mintedAt;
  bool isOfferable;
  bool isExchangeable;
}
function _update(...) internal override {
  if(from!=0 && to!=0) revert("Soulbound: apenas visualizacao");
}
```

Flow Cadence e Tezos FA2 já inclusos.

---

## 7. Biscoitos - Economia de Carinho

- Não é token especulativo (MVP)
- `POST /api/biscuit { artworkId, amount }`
- Ranking: IA-7 — 1,240 🍪 etc
- Futuro: converter em FLOW/XTZ para artista sacar

---

## 8. Auditoria Pré-Mainnet (seu AUDIT_PRE_MAINNET.md)

- Contrato OK para galeria não-comercial Sepolia
- Não autoriza mainnet sem auditoria independente
- Warnings Remix são de OpenZeppelin, não seu código
- `npm audit` vulnerabilidades Hardhat - atualizar em branch separada para Hardhat 3
- Nunca registrar CIDs simulados como IPFS real (usar Pinata/nft.storage)

---

## 9. Próximos Passos

1. Deploy ZIP na Hostinger
2. Testar login Google + Flow + Pix
3. Testar hover Arma ZEN → ZENWEAPON
4. Testar 9 traduções
5. Conectar Pinata para IPFS real (trocar bafy fake)
6. Auditoria externa antes mainnet

---

**Crédito:** Dani Estefani - ArmaZenNFT / ZenWeaponNFT  
**Licença:** MIT - Arte livre, hype zero
**Contato:** armazenft.com | zenweaponnft.com
