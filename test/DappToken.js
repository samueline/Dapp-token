
var DappToken = artifacts.require("./DappToken.sol");

 contract('DappToken',function(accounts){
   var tokenInstance;

   it("inizialates", function(){
       return DappToken.deployed().then(function(instance){
           tokenInstance = instance;
           return tokenInstance.name();

       }).then(function(name){
           assert.equal(name,'Dapp ka', "has correct");
           return tokenInstance.symbol();
       }).then(function(symbol){
        assert.equal(symbol,'ka', "has correct");
        return tokenInstance.standard();
       }).then(function(standard){
           assert.equal(standard,"Dapp ka v1.0", "has correct")
       })

   })


    it('allocates sets the total supply', function(){
        return DappToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(),1000000,'sets the total 1000000')
            return tokenInstance.balanceOf(accounts[0]);

        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(),1000000,'sets the total 1000000')

        })
    }) 


    it("transfer token", function(){
        return DappToken.deployed().then(function(instance){
            tokenInstance = instance
            console.log(accounts[1])
            return tokenInstance.transfer.call(accounts[1],999999999);
        }).then(assert.fail).catch(function(error){
            // console.log(error.message.indexOf('revert'));
            // assert(error.message.indexOf('revert') >= 0,"errore sd")
            return tokenInstance.transfer(accounts[1],250000,{from:accounts[0]})
            }).then(function(success){
                // assert.equal(success,false,'it returns true')
                // return tokenInstance.transfer(accounts[1],250000,{from:accounts[0]})

            })
            .then(function(receipt){
                // assert.equal(receipt.logs.length,1,"triggers")
                // assert.equal(receipt.logs[0].args._value,250000,"transfeer")
// console.log(receipt)
                return tokenInstance.balanceOf(accounts[1]);
            }).then(function(balance){
                assert.equal(balance.toNumber(),250000,'adds')
                return tokenInstance.balanceOf(accounts[0])
            }).then(function(balance){
                assert.equal(balance.toNumber(), 750000,"no")
            })
    })


it("approves tokens", function(){
    return DappToken.deployed().then(function(instance){
        tokenInstance = instance;
        return tokenInstance.approve.call(accounts[1],100)
    }).then(function(success){
        assert.equal(success,true,"returns true jej")
        return tokenInstance.approve(accounts[1],100)
    }).then(function(receipt){
        assert.equal(receipt.logs[0].event, 'Approval', 'sakdajdkas')
    })
});

it("handles delegated", function(){
    return DappToken.deployed().then(function(instance){
        tokenInstance = instance;
        fromAccount = accounts[2]
        toAccount = accounts[3]
        spendingAccount = accounts[4]

        return tokenInstance.transfer(fromAccount,100,{from : accounts[0]})
    }).then(function(receipt){
        return tokenInstance.approve(spendingAccount,10,{from: fromAccount})

    }).then(function(receipt){
        return tokenInstance.transferFrom(fromAccount,toAccount, 9999,{from: spendingAccount} )
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert')>= 0,'no se puede')
        return tokenInstance.transferFrom(fromAccount,toAccount,20,{from: spendingAccount})
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert')>= 0,'noooo se puede')
        return tokenInstance.transferFrom.call(fromAccount,toAccount,10,{from: spendingAccount})
    }).then( function(success){
        assert.equal(success,true,"fallo")
        return tokenInstance.transferFrom(fromAccount,toAccount,10,{from: spendingAccount})
    }).then(function(receipt){
        assert.equal(receipt.logs[0].event,"Transfer","transfer is an event")
        return tokenInstance.balanceOf(fromAccount)
    }).then(function(balance){
        assert.equal(balance.toNumber(),90,"deduced")
        return tokenInstance.balanceOf(toAccount)
    }).then(function(balance){
        assert.equal(balance.toNumber(),10,"deduced")
         return tokenInstance.allowance(fromAccount,spendingAccount)
    }).then(function(allowance){
        assert.equal(allowance.toNumber(),0,"deducts")
    })
}) 



})