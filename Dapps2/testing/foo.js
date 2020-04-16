    // for transfer in currency, reorder 
    // for in/for each
    // implement 'sort' (swap/unchange dep value) 
var _ = require('lodash');
var moment = require('moment')

let transfers = {
   eth_transfers: [ { date: '2000/10/30', value: 35 }, { date: '2001/01/01', value: 29 } ],
   dai_transfers: [ { date: '2018/12/31', value: 9 }, { date: '2019/01/02' , value: 25} ],
   usdc_transfers: [ { date: '2007/04/28', value: 3 }, { date: '2015/04/29', value: 19 } ],
}

console.log(transfers);
console.log("\n\n");

let foo = _.mapValues(transfers, function(currency) {
  return _.orderBy(currency, ['date'], ['desc']);
});


console.log(foo);


