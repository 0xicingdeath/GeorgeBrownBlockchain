var ethers = require('ethers');

async function sign() { 
var message = "Hello, the Blockchain";
var privateKey = "150807fad7b7947f35046ee4f555ac300d4d56e0580d45d7433201202b30c357";

let wallet = new ethers.Wallet(privateKey);

let hash = ethers.utils.solidityKeccak256(["string"],[message]); 
let arrayifyHash = ethers.utils.arrayify(hash);

let flatSig = await wallet.signMessage(arrayifyHash);
let sig = ethers.utils.splitSignature(flatSig);  
return sig;
}

sign().then(console.log);

