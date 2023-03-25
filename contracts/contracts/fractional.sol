// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FractionalNft is ERC20, Ownable {
    uint256 public s_price;
    address public immutable s_nftAddress;
    uint256 public s_tokenId;

    constructor(
        uint256 _initialSupply,
        address _token,
        uint256 _tokenId,
        uint256 _listPrice,
        string memory _name
    ) ERC20(_name, "NFA") Ownable() {
        s_price = _listPrice;
        s_nftAddress = _token;
        s_tokenId = _tokenId;
        mintTokens(_initialSupply);
    }

    error InsufficientBalance();
    error zeroValue();

    //functions
    function mintTokens(uint256 amount) public onlyOwner {
        if (amount == 0) {
            revert zeroValue();
        }
        _mint(msg.sender, amount);
    }

    function changePrice(uint256 newPrice) public onlyOwner {
        if (newPrice == 0) {
            revert zeroValue();
        }
        s_price = newPrice;
    }

    // function changeNftAddress(address newNftAddress) public onlyOwner {
    //     s_nftAddress = newNftAddress;
    // }

    function buyTokens(uint256 amount) public payable {
        if (msg.value < (amount * s_price)) {
            revert InsufficientBalance();
        }
        (bool callSuccess, ) = payable(owner()).call{value: (amount * s_price)}(
            ""
        );
        require(callSuccess, "Call failed");
        _transfer(owner(), msg.sender, amount);
    }

    //getter functions

    function getPrice() public view returns (uint256) {
        return s_price;
    }

    function getNftAddress() public view returns (address) {
        return s_nftAddress;
    }

    function getTokenId() public view returns (uint256) {
        return s_tokenId;
    }

    receive() external payable {}
    // fallback() external payable {}
}
