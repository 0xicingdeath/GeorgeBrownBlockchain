const ethers = require('ethers');
require('dotenv').config();

const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);

let signedMessage;
wallet.signMessage("something to sign").then(res => signedMessage = res);


wallet.signMessage("string").then(res => {
  signedMessage = res;
  let verify = ethers.utils.verifyMessage("something to sign", signedMessage);
  console.log(verify);
});

const hexDigest = ethers.utils.hexlify(ethers.utils.toUtf8Bytes("something to sign"));

signedMessage = ethers.utils.joinSignature(wallet.signingKey.signDigest(hexDigest));

let x = ethers.utils.recoverAddress(hexDigest, signedMessage);
