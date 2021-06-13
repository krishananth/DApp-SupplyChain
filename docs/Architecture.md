## Technical Architecture

The Architecture of Supply Chain Distributed Application consists of integration/interaction of components using multiple technologies.  Below is the Architecture diagram and the component details are described below/later.

## Architecture diagram
<img src='https://github.com/krishananth/DApp-SupplyChain/blob/main/design/Architecture.png'>

## Backend - SupplyChain (Smart Contracts)
The backend Supply Chain Contracts are developed using Solidity 0.8 version.
This uses SafeMath library for Math operations.  The Contracts are tested using Truffle Unit test cases.

## RBAC/Security:
Security for the Supply Chain Contract is provided using multiple contracts: Ownable.sol, Roles.sol, Farmers.sol, Distributor.sol, Retailer.sol and Customer.sol.  These are analogous to Truffle defined Contracts for providing Role based security

## Wallet Provider - Metamask
The DApp needs a wallet provider, like Metamask which connects to local or remote Ethereum network and provides Account/Wallet management.

## Frontend - Client
The front end client is a simple HTML using Javascript, CSS, JQuery and Web3 APIs.

## Frontend - Web3
Web3 JS libraries are used which uses Supply Chain and other RBAC Contracts' ABI, and uses HD Wallet Provider and Metamask to initialize the Supply Chain Contract in Ethereum.

- Contract Initialization: Contracts are initialized from front end by capturing the address for Owner, Farmer, Distributor, Retailer and Consumer.
- Contract Interaction: Using the front end, various steps are performed, which handles multiple events from Harvesting to Receiving Item by Consumer.

## Truffle framework
Truffle framework libraries are used to test and deploy Contracts in local machine and conform functionality using UTCs.  
Truffle generates ABI JSONs which is used by TruffleContract front end library to initialize Supply Chain Contract.

