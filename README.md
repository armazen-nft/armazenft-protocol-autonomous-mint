
# ArmaZENFT Gallery

Galeria aberta e não comercial para obras visuais ligadas à história e à expressão de modelos de IA. O projeto registra proveniência; não executa preço, venda, royalties ou transferências automáticas.

## Garantias do contrato

- somente o curador proprietário pode registrar uma obra;
- cada registro exige URI de metadados, hash do conteúdo e identificação do modelo;
- os tokens são ERC-721, porém não transferíveis: funcionam como registros biográficos, não como ativos de revenda;
- metadados e mídia só devem usar IPFS depois de revisão humana e confirmação de direitos.

## Desenvolvimento local

### Worker

```powershell
cd worker
npm install
npm run dev
```

O Worker local demonstra o fluxo, mas seus identificadores não são CIDs IPFS reais e não representam pinning.

### Contrato da galeria

```powershell
cd contract
npm install
npm run compile
npm test
```

O contrato é preparado para Base Sepolia. Consulte [docs/REAL_GALLERY_LAUNCH.md](docs/REAL_GALLERY_LAUNCH.md) antes de qualquer deploy.

## Licença e ética

Este projeto é disponibilizado sob a [licença MIT](LICENSE). Consulte [ETHICS.md](ETHICS.md) para proveniência, consentimento, privacidade, eficiência e governança humana informada.
