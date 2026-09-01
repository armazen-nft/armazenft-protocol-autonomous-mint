# Ativação real da ArmaZENFT Gallery

## O que já está pronto

`contract/contracts/ArmaZENFT.sol` é uma galeria ERC-721 não transferível. Ela registra `tokenURI`, hash SHA-256/Keccak do conteúdo, identificação do modelo e URI de proveniência. Não contém função de venda, preço ou royalties.

## Princípio de operação

1. Selecione uma mídia com direitos claros e aprovação humana.
2. Calcule o hash local do arquivo.
3. Envie mídia, metadados e proveniência para IPFS com pinning real.
4. Revise os URIs no gateway antes de registrar.
5. Use a carteira do curador para registrar a obra no contrato.

Não publique chaves privadas, frase-semente, JWTs de IPFS ou arquivos `.dev.vars` no GitHub ou no Blogger.

## Primeiro deploy seguro: Base Sepolia

Use uma carteira nova, exclusiva de teste, sem fundos de produção. Guarde a chave somente na sua máquina e obtenha ETH de teste por um faucet confiável da Base.

No PowerShell, dentro de `contract`:

```powershell
$env:PRIVATE_KEY = "CHAVE_DA_CARTEIRA_DE_TESTE"
npm run deploy:base-sepolia
Remove-Item Env:PRIVATE_KEY
```

O comando só deve ser executado depois de confirmar a carteira e a rede. O endereço retornado pelo deploy é o identificador da galeria de teste.

## Alternativa: Ethereum Sepolia

Se a carteira recebeu ETH de uma faucet Ethereum Sepolia, use esta rede de teste em vez da Base Sepolia:

```powershell
$env:PRIVATE_KEY = "CHAVE_DA_CARTEIRA_DE_TESTE"
npm run deploy:sepolia
Remove-Item Env:PRIVATE_KEY
```

O mesmo contrato é usado nas duas redes. O saldo de uma testnet não atravessa automaticamente para a outra.

## Pinning IPFS real

Crie um token de acesso com escopo mínimo no provedor de pinning escolhido. Armazene-o apenas em um arquivo local ignorado pelo Git, como `worker/.dev.vars`:

```text
PINATA_JWT=token-local-nao-versionado
```

Um CID só deve ser anunciado como permanente após o upload e a abertura independente pelo gateway.

## Rede principal

Rede principal exige uma decisão separada: contrato, taxas, curadoria e política de imutabilidade não podem ser revertidos de forma simples. Faça primeiro uma exposição de teste completa, com uma única obra, na Base Sepolia.
