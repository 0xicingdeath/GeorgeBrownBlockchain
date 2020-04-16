let transfers = {
   eth_transfers: [ { date: '2000/10/30', value: 35 }, { date: '2001/01/01', value: 29 } ],
   dai_transfers: [ { date: '2018/12/31', value: 9 }, { date: '2019/01/02' , value: 25} ],
   usdc_transfers: [ { date: '2007/04/28', value: 3 }, { date: '2015/04/29', value: 19 } ],
} 

function sort(transfers) {
    
    value = [transfers.eth_transfers, transfers.dai_transfers, transfers.usdc_transfers]
    
    for(let i = 0; i<value.length; i++) {
        let obj = value[i]
    
        a = new Date(obj[0].date);
        b = new Date(obj[1].date);
        
        if(a>b) {
            console.log(obj[1])
            console.log(obj[0])
              
        }
        else{
            console.log(obj[0])
            console.log(obj[1])
             
        }
    }
        
    
}

sort(transfers);
