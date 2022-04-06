
![ContractWallet](https://user-images.githubusercontent.com/78970916/162003299-d1e41190-a032-45a5-9525-0f3bf353892c.png)

This smart contract allows you to create wallets with contract accounts. You can receive and send your money and also you can check your wallet balance.

* The owner of the wallet can only check balance and send money from account.
* Every EOA can have only one contract wallet.
* <b>You can't make a money transfer from one contract wallet to another contract wallet</b>

## Usage

- You can create a wallet with createWallet function.
- After creating a wallet you can call the showMyContractAddress function to learn your conract wallet address.
- With this address, you can access and manage your wallet. If you're owner the wallet.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
