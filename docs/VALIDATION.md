# Validação local

Verificado em 2026-09-06:

- Instalação npm e build Vite gerando `frontend/dist/index.html` e assets.
- Testes de integração em Node 20.20.2: health exato, SPA, assets, APIs desconhecidas, validação das simulações, autenticação não configurada, feed, PWA e dez idiomas.
- `npm start` na porta 3000; servidor respeita a variável `PORT`.
- Navegador: layout desktop escuro e mobile claro, mudança PT → EN, simulação de biscoito e mensagem de autenticação Google não configurada. Sem overflow horizontal no viewport mobile testado.
- Compilação Solidity 0.8.30 com OpenZeppelin 5.4.0; worker IPFS mock executado.
- `npm audit` na raiz e em `contract/`: zero vulnerabilidades após atualizar as dependências transitivas `qs` e `tmp` via overrides.

## Limitações conhecidas

O Vite 5 solicitado está em 5.4.21 e a auditoria do frontend ainda reporta dois pacotes vulneráveis: Vite (alta) e esbuild (moderada), relacionados ao servidor de desenvolvimento. O servidor público usa Express e os arquivos compilados; não execute `vite dev` ou `vite preview` como serviço público de produção. Eliminar esses alertas exige atualizar a versão principal solicitada e validar a compatibilidade.

Não foi validado deploy no hPanel, DNS, SSL, OAuth real, Pix, mint em rede nem segurança comportamental do contrato com uma suíte de EVM. A compilação do contrato não equivale a auditoria. A fonte depende do Google Fonts. A PWA oferece fallback offline, mas a instalação varia por navegador.
