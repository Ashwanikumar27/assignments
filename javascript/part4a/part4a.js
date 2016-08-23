const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonData=[];
var tempData1 = {};
var tempData2 = {};
var tempData3 = {};
var tempData4 = {};
var tempData5 = {};
var isHeader=true;
var index_country;
var index_population2010;
var index_population2011;
var index_population2012;
var index_population2013;

/*header[0]="Asia";
header[1]="Europe";
header[2]="Africa";
header[3]="America";
header[4]="Australia";*/
var sum_Asia=0;
var sum_Europe=0;
var sum_Africa=0;
var sum_America=0;
var sum_Australia=0;
var flag=0;
const rl = readline.createInterface({
  input: fs.createReadStream('datafile (1).csv')
});
rl.on('line', function(line) {
 var lineRecords= line.trim().split(',');;
 // for(var i=0;i<lineRecords.length;i++){
     if(isHeader)
     { 
          index_country=lineRecords.indexOf("\"Country Name\""); 
           index_population2010=lineRecords.indexOf("\"Population (Millions) - 2010\"");
            index_population2011=lineRecords.indexOf("\"Population (Millions) - 2011\"");
             index_population2012=lineRecords.indexOf("\"Population (Millions) - 2012\"");
          index_population2013=lineRecords.indexOf("\"Population (Millions) - 2013\""); 
         }

    else /*if(i==index_population)*/  
     {
      if(lineRecords[index_country]==('"Japan"') || lineRecords[index_country]=="\"Saudi Arabia\"" || lineRecords[index_country]=="\"Republic of Korea\"" || lineRecords[index_country]=="\"India\"" || lineRecords[index_country]=="\"Russia\"" || lineRecords[index_country]=="\"Indonesia\"" || lineRecords[index_country]=="\"Turkey\"" || lineRecords[index_country]=="\"China\"")
         {
         sum_Asia = sum_Asia+parseFloat(lineRecords[index_population2013].split("\"")[1])+parseFloat(lineRecords[index_population2010].split("\"")[1])+parseFloat(lineRecords[index_population2011].split("\"")[1])+parseFloat(lineRecords[index_population2012].split("\"")[1]);
//          tempData[header[0]]=sum_Asia;
         }
      
       if(lineRecords[index_country]==("\"United Kingdom\"") || lineRecords[index_country]=="\"Italy\"" || lineRecords[index_country]=="\"Germany\"" || lineRecords[index_country]=="\"France\"" || lineRecords[index_country]=="\"European Union\"")
         {
         sum_Europe= sum_Europe+parseFloat(lineRecords[index_population2013].split("\"")[1])+parseFloat(lineRecords[index_population2010].split("\"")[1])+parseFloat(lineRecords[index_population2011].split("\"")[1])+parseFloat(lineRecords[index_population2012].split("\"")[1]);
//          tempData[header[1]]=sum_Europe;
                
         }

       if(lineRecords[index_country]==("\"South Africa\""))
       {
         sum_Africa= sum_Africa+parseFloat(lineRecords[index_population2013].split("\"")[1])+parseFloat(lineRecords[index_population2010].split("\"")[1])+parseFloat(lineRecords[index_population2011].split("\"")[1])+parseFloat(lineRecords[index_population2012].split("\"")[1]);
//          tempData[header[2]]=sum_Africa;     
         }


       if(lineRecords[index_country]==("\"Brazil\"") || lineRecords[index_country]=="\"Argentina\"" || lineRecords[index_country]=="\"Canada\"" || lineRecords[index_country]=="\"Mexico\"" || lineRecords[index_country]=="\"USA\"")
       {
         sum_America= sum_America+parseFloat(lineRecords[index_population2013].split("\"")[1])+parseFloat(lineRecords[index_population2010].split("\"")[1])+parseFloat(lineRecords[index_population2011].split("\"")[1])+parseFloat(lineRecords[index_population2012].split("\"")[1]);
//          tempData[header[2]]=sum_Africa;     
         }

         if(lineRecords[index_country]==("\"Australia\""))
       {
         sum_Australia= sum_Australia+parseFloat(lineRecords[index_population2013].split("\"")[1])+parseFloat(lineRecords[index_population2010].split("\"")[1])+parseFloat(lineRecords[index_population2011].split("\"")[1])+parseFloat(lineRecords[index_population2012].split("\"")[1]);
//          tempData[header[2]]=sum_Africa;     
         }



          flag=1;

        }        
        
/*
        tempData={};*/
 // }
 
 if(flag==1)
 {
   var result=[];
   tempData1["continent"]="Asia";
   tempData2["continent"]="Africa";
   tempData3["continent"]="America";
   tempData4["continent"]="Europe";
   tempData5["continent"]="Australia";
   tempData1["Population"]=sum_Asia;
   tempData2["Population"]=sum_Europe;
   tempData3["Population"]=sum_Africa;
   tempData4["Population"]=sum_America;
   tempData5["Population"]=sum_Australia;
   result.push(tempData1);
   result.push(tempData2);
   result.push(tempData3);
   result.push(tempData4);
   result.push(tempData5);
 }//end of flag

   jsonData=result;
    fs.writeFileSync("data4a.json",JSON.stringify(jsonData),encoding="utf8");

   tempData1={};
   tempData2={};
   tempData3={};
   tempData4={};
   tempData5={};
   isHeader=false;
   flag=0;
});
