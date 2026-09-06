# Deploy Node.js na Hostinger pelo GitHub

1. No hPanel, use **Sites → Adicionar site → Deploy Web App / aplicação Node.js → Importar repositório Git**. Para uma aplicação Node.js existente, abra suas configurações de deploy/redeploy.
2. Conecte o GitHub via OAuth e autorize o acesso ao repositório `armazen-nft/armazenft-protocol-autonomous-mint`. Selecione a branch `main`.
3. Revise as configurações detectadas: framework **Express**, Node **20**, raiz **.**, arquivo de entrada **server.js**, instalação **npm install**, build **npm run build**, saída do frontend **frontend/dist**, início **npm start**. Preserve o backend Node em execução; servir apenas os arquivos estáticos elimina as APIs.
4. Clique em Deploy e confirme nos logs a instalação, o build Vite e a inicialização do Express. O build precisa falhar caso o frontend não compile.
5. Confira `/api/health` com resposta HTTP 200 e `{"ok":true,"app":"ArmaZenNFT=ZenWeaponNFT"}`, a página inicial e uma rota SPA como `/garden`.
6. Confira que o deploy automático pela branch `main` está habilitado. Com a integração ativa, cada push nessa branch dispara novo build e reinício. Um push isolado não conecta sua conta Hostinger nem cria o site.
7. Associe `armazennft.com` e, se a configuração do plano permitir domínio adicional/alias para a aplicação, `zenweaponnft.com` ao mesmo deploy. Configure DNS e SSL conforme o hPanel. O idioma inicial é PT no primeiro domínio e EN no segundo; a preferência salva pelo visitante prevalece. O repositório não configura DNS.

`hostinger.json` registra os comandos solicitados como referência. A documentação oficial consultada descreve detecção e revisão de configurações no painel, mas não garante leitura automática desse arquivo. Portanto, confirme os valores no hPanel.

O fluxo antigo **Sites → armazennft.com → Avançado → Git** é destinado ao deploy Git convencional; não substitui a criação de uma aplicação Node.js. Não crie `public_html` no repositório e não adicione `.htaccess` ao servidor Express. Não é necessário SSH, ZIP ou upload pelo File Manager para este fluxo.

## Diagnóstico

- Sem pacote/fonte: confirme raiz `.`, `package.json` e `server.js`; não selecione `frontend/dist` como raiz do código.
- Build ausente: confirme instalação das dependências de desenvolvimento do frontend e `frontend/dist/index.html` nos logs. O build usa `--include=dev` mesmo se `NODE_ENV=production`.
- `require is not defined`: o backend usa ESM (`import`); não troque o entrypoint por um script CommonJS antigo.
- Porta: a Hostinger fornece `PORT`; o valor 3000 é apenas o padrão local.
- Google/Flow: 501 é esperado até implementar a integração real. Ofertas, trocas, biscoitos, feed e IPFS são demonstrações; Pix não está integrado.

Fontes oficiais consultadas em 2026-09-06:
- https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/
