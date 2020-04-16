let redisFx = require('./redisFunctions.js');

async function get(lookup) {
  console.log(await redisFx.getValue(lookup));
}
async function set() {
  await redisFx.setValue("newVal", 500);
}
async function del(lookup) {
  await redisFx.deleteKey(lookup);
} 
get("redisFx");
set();
del("redisFx");
get("redisFx");
get("newVal");
