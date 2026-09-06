# Contrato biográfico — Base Sepolia

Base ERC721 não transferível, com URI biográfica imutável pela API pública e mint restrito ao proprietário. Sem integração de carteira no frontend e sem deploy realizado. As ofertas/trocas da interface são simulações; este NFT não pode ser negociado por transferência.

Instale e compile: `npm install` e `npm run compile` dentro de `contract/`. Também há `foundry.toml` para Foundry após instalar as dependências npm. Rede de destino: Base Sepolia, chain ID 84532. Configure `BASE_SEPOLIA_RPC_URL` no ambiente, sem commitar segredos. Um deploy exige carteira, saldo de teste e revisão do contrato; não faz parte do deploy web Hostinger.
