const ethers = require('ethers');
require('dotenv').config();

let wallet = ethers.Wallet.createRandom()
console.log(wallet);



wallet.getAddress()
wallet = new ethers.Wallet(process.env.SK);
wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);

