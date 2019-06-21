/* eslint-disable */

const EmbarkJS = require("/Users/nat/Desktop/ethersclass-master/embarkArtifacts/modules/embarkjs").default;
export default EmbarkJS;
global.EmbarkJS = EmbarkJS

const Web3 = global.__Web3 || require('/Users/nat/Desktop/ethersclass-master/embarkArtifacts/modules/web3');
global.Web3 = Web3;/*global Web3*/
const embarkJSConnectorWeb3 = {};

embarkJSConnectorWeb3.init = function(config) {
  global.web3 = config.web3 || global.web3;
  // Check if the global web3 object uses the old web3 (0.x)
  if (global.web3 && typeof global.web3.version !== 'string') {
    // If so, use a new instance using 1.0, but use its provider
    this.web3 = new Web3(global.web3.currentProvider);
  } else {
    this.web3 = global.web3 || new Web3();
  }
  global.web3 = this.web3;
};

embarkJSConnectorWeb3.getInstance = function () {
  return this.web3;
};

embarkJSConnectorWeb3.getAccounts = function () {
  return this.web3.eth.getAccounts(...arguments);
};

embarkJSConnectorWeb3.getNewProvider = function (providerName, ...args) {
  return new Web3.providers[providerName](...args);
};

embarkJSConnectorWeb3.setProvider = function (provider) {
  return this.web3.setProvider(provider);
};

embarkJSConnectorWeb3.getCurrentProvider = function () {
  return this.web3.currentProvider;
};

embarkJSConnectorWeb3.getDefaultAccount = function () {
  return this.web3.eth.defaultAccount;
};

embarkJSConnectorWeb3.setDefaultAccount = function (account) {
  this.web3.eth.defaultAccount = account;
};

embarkJSConnectorWeb3.newContract = function (options) {
  return new this.web3.eth.Contract(options.abi, options.address);
};

embarkJSConnectorWeb3.send = function () {
  return this.web3.eth.sendTransaction(...arguments);
};

embarkJSConnectorWeb3.toWei = function () {
  return this.web3.toWei(...arguments);
};

embarkJSConnectorWeb3.getNetworkId = function () {
  return this.web3.eth.net.getId();
};

EmbarkJS.Blockchain.registerProvider('web3', embarkJSConnectorWeb3);
EmbarkJS.Blockchain.setProvider('web3', {});
if (!global.__Web3) {
  const web3ConnectionConfig = require('/Users/nat/Desktop/ethersclass-master/embarkArtifacts/config/blockchain.json');
  EmbarkJS.Blockchain.connect(web3ConnectionConfig, (err) => {if (err) { console.error(err); } });
}
var whenEnvIsLoaded = function(cb) {
  if (typeof document !== 'undefined' && document !== null && !/comp|inter|loaded/.test(document.readyState)) {
      document.addEventListener('DOMContentLoaded', cb);
  } else {
    cb();
  }
}

var whenEnvIsLoaded = function(cb) {
  if (typeof document !== 'undefined' && document !== null && !/comp|inter|loaded/.test(document.readyState)) {
      document.addEventListener('DOMContentLoaded', cb);
  } else {
    cb();
  }
}

var whenEnvIsLoaded = function(cb) {
  if (typeof document !== 'undefined' && document !== null && !/comp|inter|loaded/.test(document.readyState)) {
      document.addEventListener('DOMContentLoaded', cb);
  } else {
    cb();
  }
}
"use strict";

const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.hostname}:${location.port}`);
ws.addEventListener('message', evt => {
  if (evt.data === 'outputDone') {
    location.reload(true);
  }
});
//# sourceMappingURL=reload-on-change.js.map
/* eslint-enable */