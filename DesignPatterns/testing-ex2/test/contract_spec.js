// /*global contract, config, it, assert*/
const SimpleStorage = require('Embark/contracts/SimpleStorage');

function didRevertCorrectly(actualError, expectedError){
  return actualError.includes(expectedError);
}

let expectedErrorMessages = { 
  'owner': "msg.sender is not owner",
  'integer': "newinteger must be > 5"
} 

let accounts;

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config({
  contracts: {
    "SimpleStorage": {
      args: [100]
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("SimpleStorage", function () {
  this.timeout(0);

  beforeEach(async function(){
    console.log("before each test");
    await SimpleStorage.methods.setInteger(6).send({from: accounts[0]});
  });

  it("SimpleStorage was deployed", async function() {
    let address = SimpleStorage.options.address;
    assert.ok(address); //has a value, and not null
  });


  it("setInteger method from owner", async function () {
    await SimpleStorage.methods.setInteger(100).send({from: accounts[0]});
    
    let result = await SimpleStorage.methods.customInteger().call();
    assert.equal(result,100);
  });

  it("getInteger method from owner", async function () {
    let result = await SimpleStorage.methods.getInteger().call();
    assert.equal(result, 6);
  });

  it("setInteger from non-owner", async function() {
    try{
      await SimpleStorage.methods.setInteger(100).send({from: accounts[5]});
    } catch(error){
      // determining whether it's correct require statement 
      let actualError = error.message;

      assert.ok(didRevertCorrectly(actualError, expectedErrorMessages['owner']));

    }
  });


  it ("setInteger takes arg < 5", async function () { 
    try { 
      await SimpleStorage.methods.setInteger(0).send({from: accounts[0]});
    } catch (error) {

      assert.ok(didRevertCorrectly(error.message, expectedErrorMessages['integer'])); 
      
    }
  });


















/**


  it("should not let the caller who is not the user call", async function() {
    
    try {
      let txHash = await SimpleStorage.methods.setInteger(5).send({from: accounts[3]});
      console.log(txHash);
    } 
    catch(error) {
      let doesContain = isCorrectFail(error.message, "revert msg.sender is not owner");

      assert.ok(doesContain);

    }
  });
  */
})
