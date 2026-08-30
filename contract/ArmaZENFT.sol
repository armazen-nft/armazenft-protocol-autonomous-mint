
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArmaZENFT is ERC721URIStorage, Ownable {
    uint256 public nextId;
    mapping(address => bool) public isAuthorizedAI;
    event AutonomousMint(uint256 indexed tokenId, address indexed ai, string uri, string creator_id, string prompt);

    constructor() ERC721("ArmaZENFT Autonomous", "AZNFT") Ownable(msg.sender) {
        isAuthorizedAI[msg.sender] = true;
    }

    function authorizeAI(address ai, bool status) external onlyOwner {
        isAuthorizedAI[ai] = status;
    }

    function autonomousMint(address to, string calldata uri, string calldata creator_id, string calldata prompt) external returns (uint256) {
        require(isAuthorizedAI[msg.sender] || msg.sender == owner(), "not authorized");
        uint256 tokenId = nextId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit AutonomousMint(tokenId, msg.sender, uri, creator_id, prompt);
        return tokenId;
    }
}
