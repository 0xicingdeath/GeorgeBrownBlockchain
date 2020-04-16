var Redis = require('ioredis');
var redis = new Redis();

// Set Value 
function setValue(key, value) {
  redis.set(key, value);
} 

//Get Value
async function getValue(key) { 
  let value = await redis.get(key);
  return value;
}

// Deleting values
async function deleteKey(key) {
  await redis.del(key);
} 

module.exports = {
  getValue,
  setValue
} 
