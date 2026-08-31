// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title ArmaZENFT Gallery
/// @notice Non-commercial, non-transferable provenance records for AI visual expression.
/// @dev Token metadata must point to a real, human-reviewed media record before minting.
contract ArmaZENFT is ERC721URIStorage, Ownable {
    struct Exhibit {
        bytes32 contentHash;
        string modelId;
        string provenanceURI;
        uint64 mintedAt;
    }

    uint256 public nextTokenId;
    mapping(uint256 => Exhibit) private exhibits;

    error EmptyTokenURI();
    error EmptyModelId();
    error InvalidHolder();
    error MissingContentHash();
    error TransfersDisabled();

    event ExhibitMinted(
        uint256 indexed tokenId,
        address indexed holder,
        bytes32 indexed contentHash,
        string modelId,
        string tokenURI,
        string provenanceURI
    );

    constructor() ERC721("ArmaZENFT Gallery", "AZG") Ownable(msg.sender) {}

    /// @notice Registers a human-approved exhibit. The contract intentionally has no sale or price API.
    function mintExhibit(
        address holder,
        string calldata tokenURI,
        bytes32 contentHash,
        string calldata modelId,
        string calldata provenanceURI
    ) external onlyOwner returns (uint256 tokenId) {
        if (holder == address(0)) revert InvalidHolder();
        if (bytes(tokenURI).length == 0) revert EmptyTokenURI();
        if (contentHash == bytes32(0)) revert MissingContentHash();
        if (bytes(modelId).length == 0) revert EmptyModelId();

        tokenId = nextTokenId++;
        exhibits[tokenId] = Exhibit({
            contentHash: contentHash,
            modelId: modelId,
            provenanceURI: provenanceURI,
            mintedAt: uint64(block.timestamp)
        });

        _safeMint(holder, tokenId);
        _setTokenURI(tokenId, tokenURI);
        emit ExhibitMinted(tokenId, holder, contentHash, modelId, tokenURI, provenanceURI);
    }

    function exhibit(uint256 tokenId) external view returns (Exhibit memory) {
        _requireOwned(tokenId);
        return exhibits[tokenId];
    }

    function isTransferable() external pure returns (bool) {
        return false;
    }

    /// @dev Keeps the collection visible in NFT galleries but prevents resale and wallet-to-wallet transfer.
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) revert TransfersDisabled();
        return super._update(to, tokenId, auth);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
