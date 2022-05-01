const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "flip reason worth risk attend swift absorb broken cup gym similar pet";


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
  rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/95cc48ecf93a4507aeafceafa4af9050")
      },
      network_id: 4
    }
  },
  compilers: {
   solc: {
    version: "0.7.0"
   }
  }
};
