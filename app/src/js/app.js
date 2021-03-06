require('./main.js');
require('./truffle.js');
var TruffleContract = require("@truffle/contract");
const HDWalletProvider = require('@truffle/hdwallet-provider');

Web3 = require('web3')

App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    rbacOwnerID: "0x0000000000000000000000000000000000000000",
    rbacFarmerID: "0x0000000000000000000000000000000000000000",
    rbacDistributorID: "0x0000000000000000000000000000000000000000",
    rbacRetailerID: "0x0000000000000000000000000000000000000000",
    rbacConsumerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        return App.bindEvents();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.rbacOwnerID=$("#rbac-ownerID").val();
        App.rbacFarmerID=$("#rbac-farmerID").val();
        App.rbacDistributorID=$("#rbac-distributorID").val();
        App.rbacRetailerID=$("#rbac-retailerID").val();
        App.rbacConsumerID=$("#rbac-customerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            
            // App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
                /*
                const privateKeys = [
                    "098108903cf93d2063e03e9117af35a269b48bc0289489a4c5e1ac7fc60d50cf",
                    "a5b1152cf52ee4df2fa428d5d1738109249a2c076c052b3bfd04666832dbd1f8",
                    '7a7323feab53899937a69c7586711d045cde0cbf0dc45327c67307d29a340a86',
                    'eac2e75e0916e77634bd0614e567f8c7a61f5c67a30b25c176ebd4eddb7d792c',
                    '05e191012c825790b143dcd979d9245a3784e3e350b1d5719f1e847694c9e2f7',
                    '37e8df003b4cfad253bede5b7511ec050b0a7a58ab641b88027d951cdaeef25f'
                  ];  
                */  
                App.readForm();
                console.log(`The owner ID from RBAC is: ${App.rbac-ownerID}`);
                const privateKeys = [
                    App.rbacOwnerID, App.rbacFarmerID, App.rbacDistributorID, App.rbacRetailerID, App.rbacConsumerID
                ]; 
                App.web3Provider = new HDWalletProvider( privateKeys, 'http://localhost:9545', 0);
                
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }

        App.getMetaskAccountID();

        // Get the element with id="defaultOpen" and click on it
        $("#defaultOpen").click();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            // console.log('getMetaskAccountID() response:',res);
            App.metamaskAccountID = res[0];

            App.ownerID = res[0];
            App.originFarmerID = res[1];
            App.distributorID = res[2];
            App.retailerID = res[3];
            App.consumerID = res[4];
        })
    },



    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='./SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('Contract meta data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.setupRBAC();
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

            $("#originFarmerID").val(App.originFarmerID);
            $("#ownerID").val(App.ownerID);
            $("#distributorID").val(App.distributorID);
            $("#retailerID").val(App.retailerID);
            $("#consumerID").val(App.consumerID);
        });

        // return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        // App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        // console.log('processId',processId);

        switch(processId) {
            case 11:
                return await App.initWeb3();
                break;
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
        }
    },

    setupRBAC: function() {
        App.contracts.SupplyChain.deployed().then(function(instance) {

            instance.addFarmers([App.originFarmerID], {from: App.ownerID});
            instance.addDistributors([App.distributorID], {from: App.ownerID});
            instance.addRetailers([App.retailerID], {from: App.ownerID});
            console.log(`Consumer ID is: ${App.consumerID}`);
            instance.addConsumers([App.consumerID], {from: App.ownerID});
        }).then(function(result) {
            console.log(`RBAC setup successfully!`);
            App.addToHistory("RBAC", "RBAC setup Success");
        }).catch(function(err) {
            console.log(`Error in setting up RBAC: ${err}`);
        });
    },

    harvestItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            App.sku = $("#sku").val();
            App.upc = $("#upc").val();
            App.productID = sku + upc
            return instance.harvestItem(
                App.upc, 
                App.originFarmerID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes, {from: App.originFarmerID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('harvestItem',result);
            if(result.receipt.name == 'RuntimeError') {
                App.addToHistory('harvestItem', result.receipt.stack);    
            }
            App.addToHistory(result.logs[0].event, result.logs[0].transactionHash);
        }).catch(function(err) {
            console.log(err.message);
            App.addToHistory('harvestItem', err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.processItem(App.upc, {from: App.originFarmerID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('processItem',result);
            if(result.receipt.name == 'RuntimeError') {
                App.addToHistory('processItem', result.receipt.stack);    
            }
            App.addToHistory(result.logs[0].event, result.logs[0].transactionHash);
        }).catch(function(err) {
            console.log(err.message);
            App.addToHistory('processItem', err.message);
        });
    },
    
    packItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packItem(App.upc, {from: App.originFarmerID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('packItem',result);
            if(result.receipt.name == 'RuntimeError') {
                App.addToHistory('packItem', result.receipt.stack);    
            }
            App.addToHistory(result.logs[0].event, result.logs[0].transactionHash);
            $('#transaction-history').click();
        }).catch(function(err) {
            console.log(err.message);
            App.addToHistory('packItem', err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            let salePrice = $("#productPrice").val();
            let productPrice = web3.utils.toWei(salePrice, "gwei");
            console.log(`Sell Price: ${productPrice}`);
            return instance.sellItem(App.upc, productPrice, {from: App.originFarmerID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('sellItem',result);
            if(result.receipt.name == 'RuntimeError') {
                App.addToHistory('sellItem', result.receipt.stack);    
            }
            App.addToHistory(result.logs[0].event, result.logs[0].transactionHash);
        }).catch(function(err) {
            console.log(err.message);
            App.addToHistory('sellItem', err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            let walletValue = $("#productPrice").val();
            let buyPrice = web3.utils.toWei(walletValue, "gwei");
            return instance.buyItem(App.upc, {from: App.distributorID, value: buyPrice});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyItem',result);
            if(result.receipt.name == 'RuntimeError') {
                App.addToHistory('buyItem', result.receipt.stack);    
            }
            App.addToHistory(result.logs[0].event, result.logs[0].transactionHash);
        }).catch(function(err) {
            console.log(err.message);
            App.addToHistory('buyItem', err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipItem(App.upc, {from: App.distributorID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('shipItem',result);
            if(result.receipt.name == 'RuntimeError') {
                App.addToHistory('shipItem', result.receipt.stack);    
            }
            App.addToHistory(result.logs[0].event, result.logs[0].transactionHash);
        }).catch(function(err) {
            console.log(err.message);
            App.addToHistory('shipItem', err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveItem(App.upc, {from: App.retailerID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('receiveItem',result);
            if(result.receipt.name == 'RuntimeError') {
                App.addToHistory('receiveItem', result.receipt.stack);    
            }
            App.addToHistory(result.logs[0].event, result.logs[0].transactionHash);
        }).catch(function(err) {
            console.log(err.message);
            App.addToHistory('receiveItem', err.message);
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            let prodPrice = $("#productPrice").val();
            console.log(`Purchase Item -- prod Price is:${prodPrice}`);
            return instance.purchaseItem(App.upc, {from: App.consumerID, value: web3.utils.toWei(prodPrice, "gwei")});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('purchaseItem',result);
            if(result.receipt.name == 'RuntimeError') {
                App.addToHistory('purchaseItem', result.receipt.stack);    
            }
            App.addToHistory(result.logs[0].event, result.logs[0].transactionHash);
        }).catch(function(err) {
            console.log(err.message);
            App.addToHistory('purchaseItem', err.message);
        });
    },

    fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        // console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
        //   $("#ftc-item").text(result);
        //   console.log('fetchItemBufferOne', result);
          $('#itemSKULabel').text(result.itemSKU.toNumber());
          $('#itemUPCLabel').text(result.itemUPC.toNumber());
          $('#ownerIDLabel').text(result.ownerID);
          $('#farmerIDLabel').text(result.originFarmerID);
          
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
        //   $("#ftc-item").text(result);
        //   console.log('fetchItemBufferTwo', result);
          $('#productIDLabel').text(result.productID.toNumber());
          $('#productPriceLabel').text(BigInt(result.productPrice) + " WEI");
          $('#itemStateLabel').text(result.itemState.toNumber());
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        }); 
    },

    addToHistory: function(message, txn_hash, descr) {
        descr == null ? '': descr;
        $("#ftc-events").append('<li>' + message + ' - ' + txn_hash  + '</li>');
        openTab(event, 'transaction-history');
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
