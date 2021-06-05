# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

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

## Design Details

The project design details (diagrams) are available under ${root directory}/design

## Proof of Deployments (Rinkeby)

The Contracts are deployed in Rinkeby Etherum test network and the details are available below:
1) Rinkeby Transaction details:
https://rinkeby.etherscan.io/tx/0xeb88e22da0c137100b62cafcdbb45144a0a3a34889ea2e3c3d90cf94a3cdb8cc

2) Rinkeby Contract details:
https://rinkeby.etherscan.io/address/0x7936a9e92b67ea836a208fe0637021bab35943bd

3) Deployment details/log to Rinkeby network:
File name: {root directory}/reports/1_Rinkeby-Deployment-Details.txt

4) Front end Transaction details interacting with Rinkeby network:
File name: {root directory}/reports/2_DAPP-SupplyChain-Rinkeby.pdf

5) Truffle local machine UTC results:
File name: {root directory}/reports/3_DAPP-SupplyChain-Truffle_UTC_Results.txt

NOTE:
Assuptions made:
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

Note on Rinkeby Test Network:
1) The Product Price is set as 100,000,000 GWEI (0.1 ether)
2) The Distributor Product Price to Retailer is 120,000,000 GWEI (incremented by 20%)
3) The Retailer Product Price to Consumer is 132,000,000 GWEI (incremented by 10%).
You can see the product price as 132,000,000 GWEI (132,000,000,000,000,000 WEI or 0.132 ether) in DApp screenshot of Rinkeby output

### Installing

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

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.

### IPFS:

IPFS is not used because files that are added do not show up immediately

## Authors

Ananth Krishnan (ananth.krishnan@app-integrators.com)
 
## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* IPFS
