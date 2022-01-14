var DappTokenSale = artifacts.require("./DappTokenSale.sol");

contract('DappTokenSale', function(accounts){
    var TokenSaleInstance;
    var buyer = accounts[1];
    var tokenPrice = 10000000000; 
    var numberOfTokens = 10;

    it('initializez contract',function(){
        return DappTokenSale.deployed().then(function(instance){
            TokenSaleInstance=instance;
            return TokenSaleInstance.address
        }).then(function(address){
            assert.notEqual(address,0x0,"has contract addres")
            return TokenSaleInstance.tokenContract();
        }).then(function(address){
            assert.notEqual(address,0x0,"has token contract addres")
            return TokenSaleInstance.tokenPrice();
        }).then(function(price){
            assert.equal(price,tokenPrice,"token price is correct")
        })
    })

    it("facilities token", function(){
        return DappTokenSale.deployed().then(function(instance){
            TokenSaleInstance = instance;
            return TokenSaleInstance.buyTokens(numberOfTokens,{from:buyer,value:numberOfTokens * tokenPrice})
        }).then(function(receipt){
            return TokenSaleInstance.tokenSold()
        }).then(function(amount){
            assert.equal(amount.toNumber(),numberOfTokens,'increments')
            return TokenSaleInstance.buyTokens(numberOfTokens,{from:buyer , value:1})
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,"mal")
        })
    })
})



