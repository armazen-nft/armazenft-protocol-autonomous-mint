# Deploy automático na Hostinger com GitHub OAuth

Este projeto foi organizado para o fluxo Git da Hostinger: o código fica na raiz clonada, o frontend é compilado automaticamente e `server.js` serve a aplicação e a API. **Não crie `public_html` dentro do repositório.**

## Conectar o repositório

1. Entre no **hPanel**.
2. Abra **Sites → armazennft.com → Avançado → Git**.
3. Clique em **Conectar GitHub** e conclua a autorização segura por **OAuth**.
4. Selecione `armazen-nft/armazenft-protocol-autonomous-mint`.
5. Selecione a branch `main` e mantenha a raiz do projeto como `.`.
6. Confirme o deploy e acompanhe o primeiro build pelo hPanel.

Não é necessário digitar senha em SSH, enviar ZIP ou copiar arquivos pelo File Manager.

## Configuração detectada

A Hostinger lê `hostinger.json` na raiz:

```json
{
  "nodeVersion": "20",
  "entry": "server.js",
  "root": ".",
  "buildCommand": "npm install && npm --prefix frontend install && npm --prefix frontend run build",
  "startCommand": "npm start",
  "installCommand": "npm install"
}
```

O build cria `frontend/dist/index.html`, eliminando o erro “não há build nem pacote de origem”. O start executa o backend Node 20 ESM; `server.js` usa `import` (inclusive para `cors`) e escuta `process.env.PORT || 3000`.

## Domínios e automação

- Aponte `armazennft.com` e `zenweaponnft.com` para a mesma aplicação no hPanel.
- Configure as credenciais reais somente nas variáveis de ambiente do painel; nunca no Git.
- Ative o deploy automático/webhook para a branch `main`.
- A cada push, a Hostinger instala, compila e reinicia a aplicação sem intervenção manual.
- Não use `.htaccess` na raiz da aplicação Node; o fallback SPA já é tratado pelo Express.

## Verificação pós-deploy

1. Abra `/api/health` e confirme `{"ok":true,"app":"ArmaZenNFT=ZenWeaponNFT"}`.
2. Abra os dois domínios e confirme que a SPA carrega.
3. Em inglês, passe o cursor sobre a marca e confirme a transição ZEN → WEAPON.
4. Teste tema, seletor de 10 idiomas, Feed Pulse e ações da Vitrine.
5. Consulte os logs no hPanel se o health check não responder; não recorra a um shell manual para completar o build.
