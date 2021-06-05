// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')

contract('SupplyChain', function(accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 1
    var upc = 1
    const ownerID = accounts[0]
    const originFarmerID = accounts[1]
    const originFarmName = "John Doe"
    const originFarmInformation = "Yarray Valley"
    const originFarmLatitude = "-38.239770"
    const originFarmLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "Best beans for Espresso"
    const productPrice = web3.utils.toWei("1", "ether")
    var itemState = 0
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x00000000000000000000000000000000000000'

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        await supplyChain.addFarmers([originFarmerID]);
        await supplyChain.addDistributors([distributorID]);
        await supplyChain.addRetailers([retailerID]);
        await supplyChain.addConsumers([consumerID]);
        
        // Mark an item as Harvested by calling function harvestItem()
        let result = await supplyChain.harvestItem(upc, originFarmerID, originFarmName, originFarmInformation, 
            originFarmLatitude, originFarmLongitude, productNotes, {from: originFarmerID})
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        // List for Harvested event!! 
        await supplyChain.contract.events.Harvested({}, (error, event) => {
            eventEmitted = true;
        });    

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')        
    })    


    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Mark an item as Processed by calling function processtItem()
        await supplyChain.processItem(upc, {from: originFarmerID});

        // Watch the emitted event Processed()
        await supplyChain.contract.events.Processed({}, (error, event) => {
            eventEmitted = true;
        });          

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        let resultBufferOne = await supplyChain.fetchItemBufferOne(upc);
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 1, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')        
    })    


    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false

        // Mark an item as Packed by calling function packItem()
        await supplyChain.packItem(upc, {from: originFarmerID});

        // Watch the emitted event Packed()
        await supplyChain.contract.events.Packed({}, (error, event) => {
            eventEmitted = true;
        });          

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        let resultBufferOne = await supplyChain.fetchItemBufferOne(upc);
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 2, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')        
    })    

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Mark an item as ForSale by calling function sellItem()
        await supplyChain.sellItem(upc, productPrice, {from: originFarmerID});

        // Watch the emitted event ForSale()
        await supplyChain.contract.events.ForSale({}, (error, event) => {
            eventEmitted = true;
        });

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        let resultBufferOne = await supplyChain.fetchItemBufferOne(upc);
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid Product price')
        assert.equal(resultBufferTwo[5], 3, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')          
    })    

 
    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        let farmerAccountBalanceBefore = await web3.eth.getBalance(originFarmerID);

        // Mark an item as ForSale by calling function buyItem()
        await supplyChain.buyItem(upc, {from: distributorID, value: web3.utils.toWei("2", "ether")});

        // Watch the emitted event Sold()
        await supplyChain.contract.events.Sold({}, (error, event) => {
            eventEmitted = true;
        });

        let farmerAccountBalanceAfter = await web3.eth.getBalance(originFarmerID);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        let resultBufferOne = await supplyChain.fetchItemBufferOne(upc);
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], distributorID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid Product price')
        assert.equal(resultBufferTwo[5], 4, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted') 

        // Assert Farmer's account balance has increased by ProductPrice (=1 ether)
        // This also ensures that excess ether is returned to Distributor
        assert.equal(farmerAccountBalanceAfter - farmerAccountBalanceBefore, productPrice, 'Error: Invalid Transfer to Farmer');
    })    

    
    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Mark an item as Shipped by calling function buyItem()
        await supplyChain.shipItem(upc, {from: distributorID});

        // Watch the emitted event Shipped()
        await supplyChain.contract.events.Shipped({}, (error, event) => {
            eventEmitted = true;
        });

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        let resultBufferOne = await supplyChain.fetchItemBufferOne(upc);
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], distributorID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        
        // Assume Distributor has purchased from Farmer, adds 20% on product Price and ships to Retailer
        let contractValue = web3.utils.fromWei(new web3.utils.BN(resultBufferTwo[4]), "wei" );
        let expectedValue = (BigInt(productPrice) + BigInt(productPrice/5)).toString();
        assert.equal(contractValue, expectedValue, 'Error: Invalid Product price')
        assert.equal(resultBufferTwo[5], 5, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')                       
    })    

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Mark an item as Received by calling function receiveItem()
        await supplyChain.receiveItem(upc, {from: retailerID});

        // Watch the emitted event Shipped()
        await supplyChain.contract.events.Received({}, (error, event) => {
            eventEmitted = true;
        });

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        let resultBufferOne = await supplyChain.fetchItemBufferOne(upc);
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], retailerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 6, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')  
        
        // Assume Retailer has purchased from Distributor, adds 10% to DistributorPrice and ships to Consumer
        let retailerPriceInContract = web3.utils.fromWei(new web3.utils.BN(resultBufferTwo[4]), "wei" );
        let distributorPrice = BigInt(productPrice) + BigInt(productPrice/5);
        let expectedRetailerPrice = (distributorPrice + (distributorPrice/BigInt(10)) ).toString();
        assert.equal(retailerPriceInContract, expectedRetailerPrice, 'Error: Invalid Product price')
    })    


    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false

        // Get Consumer balance before purchase
        let retailerBalanceBeforePurchase = await web3.eth.getBalance(retailerID);

        // Mark an item as Purchased by calling function purchaseItem()
        await supplyChain.purchaseItem(upc, {from: consumerID, value: web3.utils.toWei("3", "ether")});

        // Watch the emitted event Purchased()
        await supplyChain.contract.events.Purchased({}, (error, event) => {
            eventEmitted = true;
        });

        // Get Consumer balance after purchase
        let retailerBalanceAfterPurchase = await web3.eth.getBalance(retailerID);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        let resultBufferOne = await supplyChain.fetchItemBufferOne(upc);
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], consumerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 7, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')

        // Assert that Consumer balance has reduced by retailerPrice
        let retailerPriceInContract = web3.utils.fromWei(new web3.utils.BN(resultBufferTwo[4]), "wei" );
        let moneyReceivedByRetailer = retailerBalanceAfterPurchase - retailerBalanceBeforePurchase;
        assert.equal(retailerPriceInContract, moneyReceivedByRetailer, 
            'Error: Invalid Consumer Price')
    })    

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        let resultBufferOne = await supplyChain.fetchItemBufferOne(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], consumerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo(upc);
        
        // Verify the result set:
        assert.equal(resultBufferTwo[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferTwo[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferTwo[2], productID, 'Error: Invalid productID')
        assert.equal(resultBufferTwo[3], productNotes, 'Error: Invalid Product Notes')
        assert.equal(resultBufferTwo[5], 7, 'Error: Invalid item State')
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid Distributor')
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid Retailer')
        assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid Consumer')

        // Assert Product price is incremented by 5% by Distributor and 10% by Retailer
        let retailerPriceInContract = web3.utils.fromWei(new web3.utils.BN(resultBufferTwo[4]), "wei" );
        let distributorPrice = BigInt(productPrice) + BigInt(productPrice/5);
        let expectedRetailerPrice = (distributorPrice + (distributorPrice/BigInt(10)) ).toString();
        assert.equal(retailerPriceInContract, expectedRetailerPrice, 'Error: Invalid Product price')       
    })

    it("Testing smart contract function transferOwnership() that changes contract Owner to FarmerID", async() => {
        const supplyChain = await SupplyChain.deployed()

        let ownerBeforeTransfer = await supplyChain.owner();
        await supplyChain.transferOwnership(originFarmerID);
        let ownerAfterTransfer = await supplyChain.owner();

        assert.equal(ownerBeforeTransfer, ownerID, "Error: Owner ID matching error!");
        assert.equal(ownerAfterTransfer, originFarmerID, "Error: Owner ID is not Farmer ID!");
    })    
});
