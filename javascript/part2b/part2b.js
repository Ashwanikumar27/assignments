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
var index_gdp;
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
			if(lineRecords[i]=="\"GDP Billions (US$) - 2013\"")
			{
				index_gdp = i;
				header[1]=lineRecords[i].split("\"")[1];
			}
		}    
		else if(!(lineRecords[header.indexOf('Country Name')].split("\"")[1]=="European Union"))
		{
			if(i==index_countryName)
			{
				tempData[header[0]]=lineRecords[i].split("\"")[1];

			}      

			if(i==index_gdp)
			{
				tempData[header[1]]=lineRecords[i].split("\"")[1];

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
 fs.writeFileSync("data2b.json",JSON.stringify(jsonData),encoding="utf8");
});