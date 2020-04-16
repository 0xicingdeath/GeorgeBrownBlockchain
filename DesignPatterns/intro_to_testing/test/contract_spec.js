// /*global contract, config, it, assert*/
const SimpleStorage = require('Embark/contracts/SimpleStorage');

let accounts;

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config({
  contracts: {
    "SimpleStorage": {
      args: [100]
    }, 
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("SimpleStorage", function () {
  this.timeout(0);

  // before(), beforeEach()
  it("SimpleStorage was deployed", async function() {
    // SimpleStorage has an address
    let address = SimpleStorage.options.address;
    console.log(address);
    assert.ok(address); //has a value, and not null
  });

  //afterEach(), beforeEach()

  it("set storage value", async function () {
    await SimpleStorage.methods.setInteger(5).send({from: accounts[0]});
    
    let result = await SimpleStorage.methods.getInteger().call();

    assert.equal(result, 5);  
  });

  //afterEach(), after()

})
