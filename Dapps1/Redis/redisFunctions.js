var Redis = require('ioredis');
var redis = new Redis();

//Setting Values
// redis.set('hello', 'May the force be with you');

function setValue(key, value) {
    redis.set(key, value);
};
// setValue('hello', 'May the force be with you')
// redis.set("hi", "Hello World");

//Getting Values
async function getValue(key) {
    let value = await redis.get(key);
    return value;
}
// getValue('hello').then(console.log);
// redis.get('hello', console.log);

// redis.get('hello').then(msg => {
//     console.log(msg);
// });

//Deleting Keys
 async function deleteKey(key) {
     await redis.del(key);
 }
// deletes('hello');

// (async function () {
//     await redis.del("hello");
// })()

// redis.del('hello');
// getValue('hello').then(console.log);
// redis.get('hello').then(msg => {
//     console.log(msg);
// });

//Renaming Keys

// redis.rename("hello", "whatever");
// getValue('hello').then(console.log);
// getValue('whatever').then(console.log);

module.exports = {
    getValue,
    setValue,
    deleteKey
}
