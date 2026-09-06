// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @notice Biographic NFT scaffold. Only the owner mints; transfers are disabled.
contract BiographicNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    error NonTransferable();

    constructor(address initialOwner) ERC721("ArmaZenNFT", "ZEN") Ownable(initialOwner) {}

    function mint(address recipient, string calldata biographyURI) external onlyOwner returns (uint256 id) {
        id = nextTokenId++;
        _safeMint(recipient, id);
        _setTokenURI(id, biographyURI);
    }

    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        if (_ownerOf(tokenId) != address(0) && to != address(0)) revert NonTransferable();
        return super._update(to, tokenId, auth);
    }

    function approve(address, uint256) public pure override(ERC721, IERC721) { revert NonTransferable(); }
    function setApprovalForAll(address, bool) public pure override(ERC721, IERC721) { revert NonTransferable(); }
}
