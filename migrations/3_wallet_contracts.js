var CreateWallet = artifacts.require("./contracts/Wallet.sol");

module.exports = function(deployer) {
	deployer.deploy(CreateWallet);
};
