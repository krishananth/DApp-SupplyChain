## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

### Libraries used:

For SmartContracts (refer to package.json in root directory):
1) Solidity version: 0.8.0
2) Babel - @babel/polyfill: 7.12.1
3) OpenZeppelin Contracts - @openzeppelin/contracts: 4.1.0
4) Ethereum JS - ethereumjs-tx: 2.1.2
5) Truffle HD Wallet provider - truffle-hdwallet-provider: 1.0.17
6) Web3 - web3: 1.3.6
7) Webpack - webpack-dev-server: 3.11.2

For front end client (refer to {root directory}/app/package.json):
1) Truffle Contract - @truffle/contract: 4.3.18
2) Truffle HD Wallet Provider - @truffle/hdwallet-provider: 1.4.0
3) Ethereum JS - ethjs-abi: 0.2.1
4) Web3 - web3: 1.2.4

### Installing and run using Truffle

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/krishananth/DApp-SupplyChain.git
```

Change directory to ```DApp-SupplyChain``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd DApp-SupplyChain
npm install
```

Launch Truffle with test accounts:

```
truffle develop
```

Your terminal should look something like this:
truffle(develop)>

Compile and migrate the smart contracts using:
```
truffle (develop)>migrate --reset
```

To run unit test cases, run the command:
```
truffle (develop)>test
```

Your terminal will display the unit test cases results.
All 11 tests should pass.

In a separate terminal window, build and launch the DApp:

```
cd ./app
npm install
npm run build
npm run dev
```

## Open Front End DApp:
1) Open http://localhost:8080 to open the front end DApp
2) Register 5 Accounts (Truffle accounts) for OwnerID, Farmer ID, Distributor ID, Retailer ID and CustomerID 
3) Ensure these accunts are visible  in Metamask and connected to Truffle/Rinkeby

## Assuptions made (functional assumptions):
1) Assume Farmer sets the Product Price is set as 1 ether
2) The Distributor adds 20% margin to Product Price and sells to Retailer = 1.2 ether (incremented by 20%)
3) The Retailer adds 10% margin to Product Price and sells to Consumer = 1.32 ether (incremented by 10%)

1) The 20% increase in Product Price by Distributor is done in the shipItem() method in the SupplyChain contract.
SafeMath library is used to increment the ProductPrice by 20%

2) The 10% increment further to the Product Price by Retailer to Consumer is done in the receiveItem() method in SupplyChain Contract.
SafeMath library is used to increment the ProductPrice by 10%

3) When a Consumer purchases the Item, the Product Price should be more than 1.32 ether.
Otherwise the purchaseItem() UTC will fail.  Please refer to assertions made in UTCs regarding this.

4) UTC 11 (last UTC) is to test/assert the transferOwnership() function defined in Ownable.sol


## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.

### IPFS:

IPFS is not used because files that are added do not show up immediately