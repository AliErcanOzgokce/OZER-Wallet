var Wallet = artifacts.require("./contracts/Wallet.sol");

module.exports = function(deployer) {
	deployer.deploy(Wallet);
};
