const ethers = require('ethers');
require('dotenv').config();

const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);

let signedMessage;
wallet.signMessage("something to sign").then(res =>  {
  signedMessage = res;
  let address = ethers.utils.verifyMessage("something to sign", signedMessage);
  console.log(address);
  } 
);
