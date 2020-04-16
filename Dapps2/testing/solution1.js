var _ = require('lodash');
var moment = require('moment')

let transfers = {
   eth_transfers: [ { date: '2000/10/30', value: 35 }, { date: '2001/01/01', value: 29 } ],
   dai_transfers: [ { date: '2018/12/31', value: 9 }, { date: '2019/01/02' , value: 25} ],
   usdc_transfers: [ { date: '2007/04/28', value: 3 }, { date: '2015/04/29', value: 19 } ],
} 

let x = _.sortBy(transfers.eth_transfers, function(o) { return new moment(o.date); }).reverse();
let y = _.sortBy(transfers.dai_transfers, function(o) { return new moment(o.date); }).reverse();
let z = _.sortBy(transfers.usdc_transfers, function(o) { return new moment(o.date); }).reverse();


console.log(x)
console.log('====')
console.log(y)
console.log('====')
console.log(z)
