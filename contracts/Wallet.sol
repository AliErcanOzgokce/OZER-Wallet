// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract CreateWallet {
    Wallet[] private wallets;
    mapping(address => bool) private walletRight; // for everybody should only have 1 wallet

    // you can create a wallet with this function
    function createWallet() public {
        require(!walletRight[msg.sender]);
        Wallet wallet = new Wallet(msg.sender);
        wallets.push(wallet);
        walletRight[msg.sender] = true;
    }

    // this function show to your created contract address 
    function showMyContractAddress() public view returns(address) {
        address myAddress;
        for(uint i=0; i < wallets.length; i++) {
            Wallet _wallet = wallets[i];
            if(Wallet(_wallet).owner() == msg.sender){
                myAddress = address(_wallet);
            }
        }
        return myAddress;
    } 
}

contract Wallet  {
    address public owner;
    address public walletAddr;

    // this constructor is for clarify the owner of wallet
    constructor(address _owner) {
        owner = _owner;
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
        return (address(this).balance/1000000000000000000); // Converting wei to ether
    }

    // you can send money from your contract account to the EOA account
    // NOTE: YOU CAN'T SEND MONEY TO OTHER CONTRACT ACCOUNT
    function sendMoney(address payable receiver, uint amount) public payable ownerOnly {
        address(uint160(receiver)).transfer(amount); // You're sending amount of wei not ether
    }

}
