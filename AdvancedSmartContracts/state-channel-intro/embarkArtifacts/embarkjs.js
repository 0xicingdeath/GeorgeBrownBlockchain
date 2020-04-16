/* eslint-disable */

const EmbarkJS = require("/Users/nat/GitHub/state-channel-intro/embarkArtifacts/modules/embarkjs").default;
export default EmbarkJS;
global.EmbarkJS = EmbarkJS

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