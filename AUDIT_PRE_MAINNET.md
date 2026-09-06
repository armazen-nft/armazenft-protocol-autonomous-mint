## ArmaZENFT - revisão de segurança pré-mainnet - 1 set 2026
Escopo: contract/contracts/ArmaZENFT.sol
Conclusão: Adequado para galeria não comercial Sepolia. Não autoriza mainnet antes de auditoria independente, update deps e governança owner.
Propriedades verificadas: apenas owner mint, rejeita null/empty, retém hash/model/uri/data, transferências bloqueadas, sem API preço/royalties.
Remix: warnings são de OpenZeppelin, não do ArmaZENFT.
npm audit: vulnerabilidades transitivas Hardhat/Solc - atualizar para Hardhat 3 em branch separada.
Antes mainnet: atualizar Hardhat, testes + auditoria externa, definir multisig owner, hospedar IPFS real (nunca CIDs simulados), reimplantar e verificar.
