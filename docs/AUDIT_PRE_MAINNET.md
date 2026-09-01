# ArmaZENFT — revisão de segurança pré-mainnet

Data: 1 de setembro de 2026  
Escopo: `contract/contracts/ArmaZENFT.sol` e o ambiente de testes Hardhat.

## Conclusão

O contrato é adequado para a galeria de proveniência não comercial em Sepolia. Esta revisão não autoriza uma implantação em rede principal: antes dela, é necessária auditoria independente, atualização das dependências de desenvolvimento e uma decisão explícita sobre governança da carteira proprietária.

## Propriedades verificadas

- Apenas `owner` pode executar `mintExhibit`.
- O mint rejeita titular nulo, URI vazia, hash nulo e identificador de modelo vazio.
- O token retém hash de conteúdo, modelo, URI de proveniência e data de mint.
- Transferências entre carteiras são bloqueadas em `_update`; uma aprovação ERC-721 não contorna esse bloqueio.
- Não há API de preço, venda, royalties, saque ou transferência administrativa de fundos.
- O uso de `block.timestamp` serve somente para registrar a data de proveniência, não para lógica econômica ou de acesso.

## Resultado do analisador Remix

O Remix reportou muitos avisos em dependências importadas do OpenZeppelin (`ERC721`, `Math`, interfaces e utilitários), não no código próprio do `ArmaZENFT`. Os itens de assembly, loops, retornos ausentes e divisões referem-se a essas bibliotecas e interfaces. O analisador também apresentou erros internos; portanto ele é um sinal auxiliar, não uma auditoria conclusiva.

## Ambiente de desenvolvimento

`npm audit --omit=dev` reportou vulnerabilidades transitivas no conjunto Hardhat/Solc, incluindo dependências de teste e empacotamento. Elas não alteram o bytecode já implantado, mas impedem a aprovação do ambiente atual para produção. A correção automática sugerida implica atualização maior para Hardhat 3; ela deve ocorrer em uma branch de atualização com recompilação, novos testes e revisão da equivalência do bytecode.

## Antes da mainnet

1. Atualizar Hardhat, plugins e dependências transitivas em branch separada; não usar `npm audit fix --force` diretamente.
2. Executar testes completos, análise estática independente e revisão humana externa do código e bytecode.
3. Definir governança do `owner`: idealmente carteira dedicada ou multisig, com procedimento de recuperação documentado.
4. Hospedar metadados e proveniência em armazenamento realmente persistente antes de mintar. Nunca registrar CIDs simulados como se fossem IPFS publicados.
5. Reimplantar uma versão revisada e verificar o código-fonte no explorador da rede antes de qualquer operação pública.

## Não coberto

Esta revisão não avalia o frontend, o Worker, a custódia da carteira, a autenticidade do conteúdo, licenças de mídia, nem riscos de marketplace. Ela não substitui auditoria profissional independente.
