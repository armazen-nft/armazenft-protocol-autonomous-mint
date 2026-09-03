# Publicação na Hostinger

O site público está em `frontend/`. Ele é estático: não depende do Worker, não pede carteira, não oferece mint e não processa pagamentos.

## Subir na Hostinger

1. Abra **hPanel → Websites → Gerenciar → File Manager**.
2. Abra `public_html` do domínio que será usado para a galeria.
3. Faça backup ou mova o `index.html` antigo, se houver.
4. Envie `frontend/index.html`, `frontend/gallery.html` e a pasta `frontend/src/` para `public_html`, preservando a estrutura: `public_html/index.html`, `public_html/gallery.html`, `public_html/src/style.css` e `public_html/src/gallery.css`.
5. Abra o domínio em janela anônima e verifique os links para GitHub, auditoria, ética e Proof of Energy.

## Antes de publicar

- Confirmar o domínio e o conteúdo existente em `public_html`.
- Não publicar uma chave, frase-semente, JWT Pinata ou qualquer segredo.
- Não anunciar o contrato como mainnet; o site afirma corretamente que a implantação é de teste em Sepolia.
- Quando o endereço completo do contrato for confirmado no explorador Sepolia, adicionar uma ligação verificável ao site em commit separado.
