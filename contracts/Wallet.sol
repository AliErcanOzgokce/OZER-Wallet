// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Wallet  {
    address public owner;
    address public walletAddr;

    // this constructor is for clarify the owner of wallet
    constructor() {
        owner = msg.sender;
        walletAddr = address(this);
    }

    // this modifier is allows to only owner can manage the functions
    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    // this function allows you to add some money to your wallet
    function addMoney() public payable {
        require(msg.value >= 1 gwei); // Not to much limit
    }

    // you can check your balance with this function if you're the owner of the wallet
    function checkBalance() ownerOnly public view returns(uint) {
        return (address(this).balance); // Converting wei to ether
    }

    // you can send money from your contract account to the EOA account
    // NOTE: YOU CAN'T SEND MONEY TO OTHER CONTRACT ACCOUNT
    function sendMoney(address payable receiver, uint amount) public payable ownerOnly {
        address(uint160(receiver)).transfer(amount); // You're sending amount of wei not ether
    }

}
