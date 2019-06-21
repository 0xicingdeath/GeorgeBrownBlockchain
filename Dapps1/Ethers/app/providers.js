const ethers = require("ethers");

//const provider = ethers.getDefaultProvider();

const provider = new ethers.providers.JsonRpcProvider();
console.log(provider);
