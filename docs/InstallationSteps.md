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
git clone https://github.com/udacity/nd1309/tree/master/course-5/project-6
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

Note:
When you run the DApp front end, ensure that you use Product Price which is higher than the selling price of the Farmer.  Refer to the assumptions made in README.md file.

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.

### IPFS:

IPFS is not used because files that are added do not show up immediately