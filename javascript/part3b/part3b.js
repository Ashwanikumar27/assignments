const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonData=[];
var tempData={};
var isHeader=true;
const rl = readline.createInterface({
  input: fs.createReadStream('datafile (1).csv')
});

var index_countryName;
var index_population2010;
var index_population2011;
var index_population2012;
var index_population2013;
rl.on('line', function(line) {
  var lineRecords= line.trim().split(',');
  for(var i=0;i<lineRecords.length;i++){
    if(isHeader)
    { 
      if(lineRecords[i] == "\"Country Name\"")
      {   
        index_countryName = i;

        header[0]=lineRecords[i].split("\"")[1];

      }
      if(lineRecords[i]=="\"Purchasing Power in Billions ( Current International Dollar) - 2010\"")
      {
        index_population2010 = i;
        header[1]=lineRecords[i].split("\"")[1];
      }
      if(lineRecords[i]=="\"Purchasing Power in Billions ( Current International Dollar) - 2011\"")
      {
        index_population2011 = i;
        header[2]=lineRecords[i].split("\"")[1];
      }
      if(lineRecords[i]=="\"Purchasing Power in Billions ( Current International Dollar) - 2012\"")
      {
        index_population2012 = i;
        header[3]=lineRecords[i].split("\"")[1];
      }
      if(lineRecords[i]=="\"Purchasing Power in Billions ( Current International Dollar) - 2013\"")
      {
        index_population2013 = i;
        header[4]=lineRecords[i].split("\"")[1];
      }
    }    
    else if(!(lineRecords[header.indexOf('Country Name')].split("\"")[1]=="European Union"))
    {
      if(i==index_countryName)
      {
        tempData[header[0]]=lineRecords[i].split("\"")[1];

      }      

      if(i==index_population2010)
      {
        tempData[header[1]]=lineRecords[i].split("\"")[1];

      } 
  if(i==index_population2011)
      {
        tempData[header[2]]=lineRecords[i].split("\"")[1];

      } 
        if(i==index_population2012)
      {
        tempData[header[3]]=lineRecords[i].split("\"")[1];

      } 
        if(i==index_population2013)
      {
        tempData[header[4]]=lineRecords[i].split("\"")[1];

      } 
    }   

  }
 // console.log(index_countryName);
  if(!(Object.getOwnPropertyNames(tempData).length === 0))
 {
 jsonData.push(tempData);
}

 tempData={};

 isHeader=false;
 fs.writeFileSync("data3b.json",JSON.stringify(jsonData),encoding="utf8");
});