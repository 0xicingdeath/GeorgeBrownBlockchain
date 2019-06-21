require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const server = express();

const ethers = require('ethers');
const SimpleStorage = require("../build/contracts/SimpleStorage.json");

//Declare Providers
let provider = ethers.getDefaultProvider("kovan");

//Create a Wallet
let wallet= new ethers.Wallet(process.env.pk).connect(provider);

// Setting up Contract Variables 

let abi = SimpleStorage.abiDefinition;
let contractAddress = "0xB9B7Ec4AEda356372dC6D214f02745E50c3B8FC2";

//Deploying Contract
const deployedContract = new ethers.Contract(contractAddress, abi, provider).connect(wallet)

//Setting up Server Information
server.set('port', 3000);
server.use(bodyParser.json());

server.get('/', function (request, response, next) {
    response.send("hello world")
});

server.get('/getResult', function (request, response, next) {
    deployedContract.getValue().then(function (res) {
        response.send(res.toString());
    }).catch(function (err) {
        response.send("ERROR ", err);
    });
});

server.post('/setResult', function (request, response, next) {
    // console.log(request.body);
    const newValue = request.body['integer'];
    deployedContract.setValue(newValue).then(function (txHash) {
        response.send(txHash);
        //response -> /
    }).catch(function (err) {
        response.send("ERROR ", err);
    });
});

server.listen(3000, () => {
    console.log("Server started")
});

