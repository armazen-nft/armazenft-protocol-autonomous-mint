# ArmaZenNFT = ZenWeaponNFT

Valor é artista e arte, não hype.

Aplicação React + Vite servida por Express ESM, preparada para Node.js 20 e deploy GitHub na Hostinger. Jardim Violeta com fonte Syne, dark/light, dez idiomas (PT, EN, ES, FR, DE, IT, JA, KO, ZH, AR), Feed Pulse, Vitrine, ações de demonstração e PWA com página offline. PT é o padrão em armazennft.com; EN em zenweaponnft.com, com ZEN → WEAPON no hover/foco.

## Executar e validar

```sh
npm install
npm run build
npm test
npm start
```

Abra http://localhost:3000. `GET /api/health` retorna exatamente `{"ok":true,"app":"ArmaZenNFT=ZenWeaponNFT"}`. O build gera `frontend/dist/index.html`. Para desenvolvimento, mantenha o backend ligado e execute `npm --prefix frontend run dev`; o Vite encaminha `/api` para a porta 3000.

## Hostinger via GitHub OAuth

Use o fluxo de **aplicação Node.js / Express**, conecte o repositório `armazen-nft/armazenft-protocol-autonomous-mint` na branch `main` e revise: Node 20, raiz `.`, entrypoint `server.js`, instalação `npm install`, build `npm run build`, saída frontend `frontend/dist`, start `npm start`.

O arquivo `hostinger.json` registra esses parâmetros, mas sua leitura automática não está confirmada na documentação oficial. Revise os valores detectados no hPanel. Com a integração e o deploy automático habilitados, cada push na `main` dispara o build e a reinicialização. DNS, SSL e a associação dos dois domínios ao mesmo deploy precisam estar configurados no hPanel. Sem SSH, ZIP ou File Manager manual.

Veja [o passo a passo e diagnóstico](docs/HOSTINGER_DEPLOY.md). O menu Git convencional em Avançado não substitui uma aplicação Node.js. Não há `public_html` nem `.htaccess` neste projeto. `PORT` vem do ambiente, com padrão local 3000.

## APIs e limites da demonstração

- `GET /api/health`: disponibilidade do servidor.
- `GET /api/feed`: obras de exemplo.
- `POST /api/biscuit`: simulação com `amount` inteiro entre 1 e 100.
- `POST /api/offer` e `/api/exchange`: simulações com `artwork` obrigatório, sem persistência ou transferência de ativos.
- `POST /api/auth/google` e `/api/auth/flow`: HTTP 501 até configurar autenticação real. Não emitem sessão ou identidade fictícia.

Pix, OAuth, carteira Flow, mint real, persistência e IPFS real não estão implementados. O worker é executável com `npm --prefix worker start` e retorna um identificador de demonstração, não um CID válido. A base ERC721 em [contract/](contract/) é não transferível, não foi implantada e não está conectada às ofertas/trocas da interface.

O service worker fornece uma página offline; não guarda respostas de APIs. A instalação da PWA depende do navegador. A fonte Syne é carregada pelo Google Fonts, com fallback local.

## Estrutura e build

`server.js` inicia o servidor, `app.js` contém Express e as rotas; `frontend/` contém o código-fonte. Arquivos `node_modules` e `dist` ficam fora do Git. Há lockfiles para reprodução das versões. O build instala também as devDependencies do frontend em ambiente de produção, e não oculta erros com `|| true`.

O backend serve `frontend/dist`, depois `dist`. Rotas SPA recebem o HTML; assets ausentes e APIs desconhecidas retornam 404. Sem build, procura ainda `frontend/index.html`; esse último é apenas fonte e requer compilação para carregar a aplicação. Sem nenhum HTML, responde `ArmaZenNFT build pending - rode npm run build`.
