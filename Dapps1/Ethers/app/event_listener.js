const ethers = require('ethers');
const express = require('express');
require('dotenv').config();

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


// Event Listener
readAndWriteContract.on("ValueChanged", (author, oldVal, newVal) => {
  console.log("author: ", author);
  console.log("old, new ", oldVal.toNumber(), newVal.toNumber());
});

















































/**
let Hashing = require('../build/contracts/Hashing.json');
let SimpleStorage = require('../build/contracts/SimpleStorage.json');

let hashingBytecode = Hashing.code;
let hashingABI= Hashing.abiDefinition;
let hashingAddr = Hashing.address;

let SimpleStorageBytecode = SimpleStorage.code;
let SimpleStorageABI= SimpleStorage.abiDefinition;
//let SimpleStorageAddr= SimpleStorage.address;
let SimpleStorageAddr="0x95baa1dbbDF1f09ce8C56Bb37C4E51e0bdE2A99B";

// Initialize Provider.

let provider = ethers.getDefaultProvider('kovan');
//let provider = new ethers.providers.JsonRpcProvider("localhost:8555");

// Initialize Wallet.

let wallet = new ethers.Wallet(process.env.pk, provider);

// Connect to an already deployed contract

let hashContract = new ethers.Contract(hashingAddr, hashingABI, wallet).connect(provider);

let simpleContract= new ethers.Contract(SimpleStorageAddr, SimpleStorageABI, wallet);
//let simpleContract= new ethers.Contract(SimpleStorageAddr, SimpleStorageABI, wallet).connect(provider);

// Create a contract factory and deploy using Ethers 

let SimpleFactory = new ethers.ContractFactory(SimpleStorageABI, SimpleStorageBytecode, wallet);

async function deployContract() {
  let simpleDeployed = await SimpleFactory.deploy();
  await simpleDeployed.deployed();
  console.log(simpleDeployed);
  let value = await simpleDeployed.getValue();
  console.log("value in deployed contract: ", value.toNumber());
}
deployContract();

// Interact with contract.
async function callGetValue() { 
  let value = await simpleContract.getValue();
  console.log("function call: " , value.toNumber());
} 
callGetValue();

async function callSetValue() { 
  let tx = await simpleContract.setValue(7);
  callGetValue();
} 
callSetValue();

// Call from another wallet

const wallet2 = new ethers.Wallet(process.env.wallet2).connect(provider);
const deployedContract  = new ethers.Contract(SimpleStorageAddr, SimpleStorageABI, provider).connect(wallet2);

async function callSet() {
  let value = await deployedContract.setValue(5);
  callGetValue();
}
callSet();
*/

//Event Listener 
/**
simpleContract.on("ValueChanged", (author, oldValue, newValue) => {
  console.log("address", author);
  console.log("old value ", oldValue.toNumber());
  console.log("new value ", newValue.toNumber());
});
*/
