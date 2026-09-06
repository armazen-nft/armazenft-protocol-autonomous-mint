// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
/**
 * ArmaZenNFT = ZenWeaponNFT - Soulbound atelier
 * Valor é artista e arte, não hype.
 * Campos para oferta direta e troca liberada pelo artista
 */
contract ArmaZENFT is ERC721, Ownable {
    struct Exhibit {
        bytes32 hashContent;
        string modelId;
        string provenanceURI;
        uint256 mintedAt;
        bool isOfferable;
        bool isExchangeable;
    }
    mapping(uint256=>Exhibit) public exhibits;
    uint256 public nextId;
    constructor() ERC721("ArmaZenNFT=ZenWeaponNFT","AZEN") Ownable(msg.sender){}
    function mintExhibit(address to, bytes32 hashContent, string calldata modelId, string calldata provenanceURI, bool isOfferable, bool isExchangeable) external onlyOwner returns(uint256){
        require(to!=address(0),"null to");
        require(hashContent!=bytes32(0),"null hash");
        require(bytes(provenanceURI).length>0,"empty uri");
        require(bytes(modelId).length>0,"empty model");
        uint256 id = ++nextId;
        _safeMint(to,id);
        exhibits[id]=Exhibit(hashContent,modelId,provenanceURI,block.timestamp,isOfferable,isExchangeable);
        return id;
    }
    // Soulbound: bloqueia transferencias entre carteiras - apenas visualizacao se artista quiser
    function _update(address to, uint256 tokenId, address auth) internal override returns(address){
        address from=_ownerOf(tokenId);
        if(from!=address(0) && to!=address(0)) revert("Soulbound: apenas visualizacao - use oferta direta se liberado");
        return super._update(to,tokenId,auth);
    }
}
