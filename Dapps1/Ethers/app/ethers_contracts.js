const ethers = require('ethers');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const server = express();

//Get contract info 
let contractInfo = require('../build/contracts/SimpleStorage.json');
let bytecode = contractInfo.code;
//let ABI = require('ABI.json');
let ABI = contractInfo.abiDefinition;

let provider = ethers.getDefaultProvider('kovan');
let mainnetProvider = ethers.getDefaultProvider('homestead');

// view (function) || public variable 
let readOnly = new ethers.Wallet(process.env.pk);

// can be used for anything 
let readAndWrite = readOnly.connect(provider); //kovan
let readAndWriteMainnet = readOnly.connect(mainnetProvider);
let readAndWrite_2 = new ethers.Wallet(process.env.pk, provider);

// Deploy contract 
/**
let ContractFactory = new ethers.ContractFactory(ABI, bytecode, readAndWrite);
//let contract;
async function deployContract() {
  contract = await ContractFactory.deploy("2");
  await contract.deployed();
  console.log(contract);
}
deployContract();
//first addr: 0x70a7A0DAE0d6AA266bea01fD0ADFaeD0c2315308
*/

// Interacting with Contract

let contractAddress = "0xB9B7Ec4AEda356372dC6D214f02745E50c3B8FC2"
let readOnlyContract = new ethers.Contract(contractAddress, ABI, provider); //contract -> kovan

let readAndWriteContract = readOnlyContract.connect(readAndWrite);

// Call functions 
async function getValue() {
  let value = await readOnlyContract.getValue();
  return value;
} 

async function setValue(number) {
  console.log(number);
  let tx = await readAndWriteContract.setValue(number);
  return tx;
} 

// Server
server.set('port',process.env.PORT);
server.use(bodyParser.json());

// GET request, name: getValue
server.get('/getValue', async (request, response) => {
  let value = await getValue();
  response.send(value.toNumber().toString());
});

server.post('/setValue', async (request, response) => {
  let value = await setValue(request.body.integer);
  response.send(value);
});

//Event Listener
readAndWriteContract.on("ValueChanged", (author, oldVal, newVal) => {
  console.log("author: ", author);
  console.log("old, new ", oldVal.toNumber(), newVal.toNumber());
});
*/

server.listen(process.env.PORT);

