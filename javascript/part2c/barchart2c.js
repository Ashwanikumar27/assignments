
         // margin setting

var margin = {top:20,right:10,bottom:100,left:40},
	width =700-margin.right-margin.left,
	height=500-margin.top-margin.bottom;

// svg element

var svg=d3.select('body')
	.append('svg')
	.attr({"width": width+margin.right+margin.left,
			"height": height+margin.top+margin.bottom})

	.append('g')
		.attr("transform","translate("+margin.left+','+margin.right+')');


///define x axis and y axis scale

var xScale = d3.scale.ordinal()
	.rangeRoundBands([0,width],0.2,0.2);

var yScale = d3.scale.linear()
	.range([height,0]);		//so that bar grows up

	//define xaxis

	var xAxis=d3.svg.axis()
		.scale(xScale)
		.orient("bottom");

			//define yaxis

	var yAxis=d3.svg.axis()
		.scale(yScale)
		.orient("left");




//import json data
d3.json('data2c.json',function(error,data)
	{
		if(error)
		console.log("Error found");
		data.forEach(function(d)
		{
			d["Purchasing Power in Billions ( Current International Dollar) - 2013"]= +d["Purchasing Power in Billions ( Current International Dollar) - 2013"];
			d["Country Name"]= d["Country Name"];
			console.log(d["Country Name"]+'::'+d["GDP Billions (US$) - 2013"]);
		});

		data.sort(function(a,b)
		{
			return b["Purchasing Power in Billions ( Current International Dollar) - 2013"]-a["Purchasing Power in Billions ( Current International Dollar) - 2013"];
		});


		xScale.domain(data.map(function(d){return d["Country Name"]}));
		yScale.domain([0,data[0]["Purchasing Power in Billions ( Current International Dollar) - 2013"]]);

		//draw bars
			svg.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr("height",0)
			.attr("y",height)
			.transition().duration(2000)
			.delay(function(d,i){
				return i*200;
			})

			.attr({
				'x': function(d){return xScale(d["Country Name"]);},
				'y': function(d){return yScale(d["Purchasing Power in Billions ( Current International Dollar) - 2013"]);},
				'width' : xScale.rangeBand(),
				'height' : function(d) {return height-yScale(d["Purchasing Power in Billions ( Current International Dollar) - 2013"]);}
			})
				.style("fill",function(d,i){
            	return 'rgb(20, 20, ' + ((i*30)+ 100)+ ')'});
        

           svg.selectAll('text')
            	.data(data)
            	.enter()
            	.append('text')
            	.text(function(d){
            		return (d["Purchasing Power in Billions ( Current International Dollar) - 2013"]); 
            	})
            	.attr('x',function(d){
            		return xScale(d["Country Name"])+xScale.rangeBand()/2;
            	})
            .attr('y',function(d){
            return	yScale(d["Purchasing Power in Billions ( Current International Dollar) - 2013"]) +12;
            })
            .style("fill","white")
            .style("text-anchor","middle");


				//draw the X axis
				svg.append('g')
				.attr("class","x axis")
				.attr("transform","translate(0,"+height+")")
				.call(xAxis)
				.selectAll('text')
				.attr("transform","rotate(-60)")
				.attr("dx","-.8em")
				.attr("dy","-.25em")
				.style("text-anchor","end")
				.style("font-size","14px");
			
				// //label rhe bars
				// svg.selectAll('text')
				// 	.data(data)
				// 	.enter()
				// 	.append('text')
				// 	.text(funct)

				//draw the y Axis
				svg.append('g')
				.attr("class","y axis")
				.call(yAxis)
				.selectAll('text')
				.style("font-size","14px");				

	});			            
