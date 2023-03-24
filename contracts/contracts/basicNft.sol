// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNft is ERC721 {
    uint256 private s_tokenCounter;
    mapping(uint256 => string) public tokenUris;
    mapping(uint256 => bool) public onSale;
    mapping(uint256 => uint256) public price;
    mapping(uint256 => address) public ownerOfToken;

    constructor() ERC721("NFTS", "NFA") {
        s_tokenCounter = 0;
    }

    error InvalidTokenOwner();
    error TokenNotOnSale();
    error InsufficientBalance();
    error TokenAlreadyOnSale();
    error URInonexistent();

    modifier onlyOwner(uint256 tokenId) {
        if (ownerOfToken[tokenId] != msg.sender) {
            revert InvalidTokenOwner();
        }
        _;
    }

    function mintNft(string memory tokenUri) public {
        s_tokenCounter = s_tokenCounter + 1;
        ownerOfToken[s_tokenCounter] = msg.sender;
        tokenUris[s_tokenCounter] = tokenUri;
        _safeMint(msg.sender, s_tokenCounter);
    }

    function setOnSale(
        uint256 tokenId,
        uint256 _price
    ) public onlyOwner(tokenId) {
        if (onSale[tokenId]) {
            revert TokenAlreadyOnSale();
        }
        price[tokenId] = _price;
        onSale[tokenId] = true;
    }

    function setOffSale(uint256 tokenId) public onlyOwner(tokenId) {
        if (!onSale[tokenId]) {
            revert TokenNotOnSale();
        }
        price[tokenId] = 0;
        onSale[tokenId] = false;
    }

    function buyTokens(uint256 tokenId) public payable {
        if (!onSale[tokenId]) {
            revert TokenNotOnSale();
        }

        if (msg.value < price[tokenId]) {
            revert InsufficientBalance();
        }
        (bool callSuccess, ) = payable(ownerOf(tokenId)).call{
            value: price[tokenId]
        }("");
        require(callSuccess, "Call failed");
        _transfer(ownerOf(tokenId), msg.sender, tokenId);
        ownerOfToken[tokenId] = msg.sender;
        setOffSale(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        if (bytes(tokenUris[tokenId]).length == 0) {
            revert URInonexistent();
        }
        return tokenUris[tokenId];
    }

    function getOwnerOfToken(uint256 tokenId) public view returns (address) {
        return ownerOfToken[tokenId];
    }

    function getPrice(uint256 tokenId) public view returns (uint256) {
        return price[tokenId];
    }

    function checkSale(uint256 tokenId) public view returns (bool) {
        return onSale[tokenId];
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
