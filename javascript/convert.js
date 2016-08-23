const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonData=[];
var tempData={};
var isHeader=true;
const rl = readline.createInterface({
  input: fs.createReadStream('datafile (1).csv')
});
rl.on('line', function(line) {
 var lineRecords= line.trim().split(',');;
 for(var i=0;i<lineRecords.length;i++){
     if(isHeader)
     {       
         header[i]=lineRecords[i].split("\"")[1];
     }
     else
     {
         tempData[header[i]]=lineRecords[i].split("\"")[1];
        }        
        
 }
      jsonData.push(tempData);
  
        tempData={};
    
 isHeader=false;
    fs.writeFileSync("data.json",JSON.stringify(jsonData),encoding="utf8");
});