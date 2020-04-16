// /*global contract, config, it, assert*/
const ethers = require('ethers');
const CoinFlip = require('Embark/contracts/CoinFlip');

let accounts;

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config({
  //deployment: {
  //  accounts: [
  //    // you can configure custom accounts with a custom balance
  //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
  //  ]
  //},
  contracts: {
    "CoinFlip": {}
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("SimpleStorage", function () {
  this.timeout(0);

  it("should deploy Coin flip Rules", async function () {
    let result = CoinFlip.options.address;
    assert.ok(result.length > 0);
  });

  it("should get signature values", async function () {
    const ethers = require('ethers');
    const CoinFlip = require('../build/contracts/CoinFlip.json');
    var pk = "0x1f9fa05416fd2176404e5e922520b481af1512e62a73996d858d1d255f8f74d3";
    let signingKey = new ethers.utils.SigningKey(pk);
    let provider = ethers.getDefaultProvider();

    let wallet = new ethers.Wallet(pk, provider);
    console.log("Wallet address: " + wallet.address);

    let contractAddress = CoinFlip['deployedAddress'];
    console.log("Contract Address: " + contractAddress);
    let contract = new ethers.Contract(contractAddress, CoinFlip['abiDefinition'], provider);

    let message = "Hello World";
    let messageBytes = ethers.utils.toUtf8Bytes(message);
    let messageDigest = ethers.utils.keccak256(messageBytes);
    console.log("Digest: " + messageDigest);

    let signature = signingKey.signDigest(messageDigest);
    console.log(signature);
    let recovered = ethers.utils.recoverAddress(messageDigest, signature);

    console.log("Recovered: " + recovered);

    let publicKey = signingKey.publicKey;

    console.log('Public Key: ' + publicKey);

    let address = ethers.utils.computeAddress(publicKey);

    console.log('Address: ' + address);
  });



});