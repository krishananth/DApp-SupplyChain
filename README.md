# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

## Architecture:
Refer to the application Architecture available here: https://github.com/krishananth/DApp-SupplyChain/tree/main/docs/Architecture.md

## Detailed Design Details

The project design details (diagrams) are available at https://github.com/krishananth/DApp-SupplyChain/tree/main/design

## Proof of Deployments (Rinkeby)

The Contracts are deployed in Rinkeby Etherum test network and the details are available below:
1) Rinkeby Transaction details:
https://rinkeby.etherscan.io/tx/0xeb88e22da0c137100b62cafcdbb45144a0a3a34889ea2e3c3d90cf94a3cdb8cc

2) Rinkeby Contract details:
https://rinkeby.etherscan.io/address/0x7936a9e92b67ea836a208fe0637021bab35943bd

3) Deployment details/log to Rinkeby network: https://github.com/krishananth/DApp-SupplyChain/blob/main/reports/1_Rinkeby-Deployment-Details.txt

4) DAPP Front end Transaction details interacting with Rinkeby network: https://github.com/krishananth/DApp-SupplyChain/blob/main/reports/2_DAPP-SupplyChain-Rinkeby.pdf

5) Truffle local machine UTC results: https://github.com/krishananth/DApp-SupplyChain/blob/main/reports/3_DAPP-SupplyChain-Truffle_UTC_Results.txt

## Assuptions made:
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

## Authors

Ananth Krishnan (ananth.krishnan@app-integrators.com)
 
## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* IPFS
