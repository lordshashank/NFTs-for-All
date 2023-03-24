// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionNft is ERC721, Ownable {
    uint256 private s_subscriptionPrice;
    uint256 private s_subscriptionDuration;
    // uint256 subscriptionEnd;
    // address public s_creator;
    uint256 public s_nftId;
    uint256 public s_nftCount;
    string public TOKEN_URI;
    // "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm";
    mapping(address => uint256) public subscriptionExpiry;

    error InsufficientBalance();
    error SubscriptionNotActive();
    error SubscriptionAlreadyActive();
    error subscriptionNotAvailable();

    constructor(
        string memory _name,
        uint256 _subscriptionPrice,
        uint256 _subscriptionDuration,
        uint256 nftCount,
        string memory tokenUri
    ) ERC721(_name, "NFA") Ownable() {
        // s_creator = msg.sender;
        s_subscriptionPrice = _subscriptionPrice;
        s_subscriptionDuration = _subscriptionDuration;
        s_nftCount = nftCount;
        s_nftId = 0;
        TOKEN_URI = tokenUri;
    }

    function subscribe() public payable {
        if (msg.value < s_subscriptionPrice) {
            revert InsufficientBalance();
        }
        if (s_nftId >= s_nftCount) {
            revert subscriptionNotAvailable();
        }
        if (subscriptionExpiry[msg.sender] >= block.timestamp) {
            revert SubscriptionAlreadyActive();
        }

        subscriptionExpiry[msg.sender] =
            block.timestamp +
            s_subscriptionDuration;
        s_nftId += 1;
        _safeMint(msg.sender, s_nftId);
    }

    function transferSubscription(address _to) public {
        if (subscriptionExpiry[msg.sender] < block.timestamp) {
            revert SubscriptionNotActive();
        }
        if (subscriptionExpiry[_to] >= block.timestamp) {
            revert SubscriptionAlreadyActive();
        }

        subscriptionExpiry[_to] = subscriptionExpiry[msg.sender];
        subscriptionExpiry[msg.sender] = 0;
    }

    function changeSubscriptionPrice(uint256 _newPrice) public onlyOwner {
        if (_newPrice == 0) {
            revert InsufficientBalance();
        }
        s_subscriptionPrice = _newPrice;
    }

    // function _beforeTokenTransfer(
    //     address from,
    //     address,
    //     uint256 /* firstTokenId */,
    //     uint256
    // ) internal view override {
    //     require(isSubscribed(from), "your subscription is over");
    // }

    function withdraw() public onlyOwner {
        // require(msg.sender == s_creator, "Only the s_creator can withdraw funds");
        // s_creator.transfer(address(this).balance);
        (bool callSuccess, ) = payable(owner()).call{
            value: (address(this).balance)
        }("");
        require(callSuccess, "Call failed");
    }

    function tokenURI(uint256) public view override returns (string memory) {
        // require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return TOKEN_URI;
    }

    function isSubscribed(address _subscriber) public view returns (bool) {
        return subscriptionExpiry[_subscriber] >= block.timestamp;
    }

    function timeLeft(address _subscriber) public view returns (uint256) {
        return block.timestamp - subscriptionExpiry[_subscriber];
    }

    function subscriptionPrice() public view returns (uint256) {
        return s_subscriptionPrice;
    }
}
