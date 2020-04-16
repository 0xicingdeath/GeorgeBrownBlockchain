// /*global contract, config, it, assert*/
const SimpleStorage = require('Embark/contracts/SimpleStorage');

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

  afterEach(function() {
  });

  beforeEach(function() {
  });

  it("SimpleStorage was deployed", async function() {
    // SimpleStorage has an address
    let address = SimpleStorage.options.address;
    assert.ok(address); //has a value, and not null
  });

  it("set storage value", async function () {
    await SimpleStorage.methods.setInteger(5).send({from: accounts[0]});
    
    let result = await SimpleStorage.methods.getInteger().call();

    assert.equal(result, 5);  
       
  });

  // Purpose of asserts 
  it ("assert", async function () {
    let foo = [1, 2, 3];
 
    assert(foo.includes(3));   
  });

})
