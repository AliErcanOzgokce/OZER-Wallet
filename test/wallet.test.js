const Wallet = artifacts.require("./Wallet.sol");

contract("Wallet", (accounts) => {
  // Wallet owner declaration
  it("Wallet address declared", async () => {
    const walletInstance = await Wallet.deployed();

    const owner = await walletInstance.owner.call();

    // First account will create this contract
    assert.equal(owner, accounts[0], "Wallet owner is not a right person");
  });

  // Wallet addMoney function check
  it("Wallet can recieve money", async () => {
    const walletInstance = await Wallet.deployed();
    let value = 1000000000000000; // 0,001 ether

    await walletInstance.addMoney({ from: accounts[0], value: value });

    const balance = await walletInstance.checkBalance.call();

    assert.equal(balance, value, "Wallet can't receive money");
  });

  // Wallet sendMoney function check
  it("Wallet can send money", async () => {
    const walletInstance = await Wallet.deployed();
    let value = 1000000000000000; // 0,001 ether

    await walletInstance.addMoney({ from: accounts[0], value: value });

    await walletInstance.sendMoney(accounts[1], value, { from: accounts[0] });

    const balance = await walletInstance.checkBalance.call();

    assert.notEqual(balance, 0, "Wallet can't send money");
  });
});
