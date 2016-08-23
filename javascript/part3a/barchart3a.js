var margin = {top: 20, right: 40, bottom: 150, left: 90},
   width = 1500 - margin.left - margin.right,
   height = 800 - margin.top - margin.bottom;
var x = d3.scale.ordinal()
   .rangeRoundBands([0, width], .1);
var y = d3.scale.linear()
   .range([height, 0]);
var color = d3.scale.ordinal()
       .range(["#33CA7F ", "#7DCFB6 ","FAC9B8","#BB9BB0 "]);
var xAxis = d3.svg.axis()
   .scale(x)
   .orient("bottom");
var yAxis = d3.svg.axis()
   .scale(y)
   .orient("left");
var svg = d3.select("body").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
 .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
d3.json("data3a.json", function(error, data) {
 var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Country Name" && key !== "Total"; });
 data.forEach(function(d) {
   var y0 = 0;
   d.ages = ageNames.map(function(name) {
     return {
       name: name,
       y0: y0,
       y1: y0 += +d[name]
     };
   });
 d.total = d.ages[d.ages.length - 1].y1;
          
       });
       data.sort(function(a, b) {
           return b.total - a.total;
       });
 x.domain(data.map(function(d) { return d["Country Name"]; }));
 y.domain([0, d3.max(data, function(d) { return d.ages[d.ages.length - 1].y1; })]);
   svg.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + height + ")")
           .call(xAxis)
           .selectAll("text")
           .style("text-anchor", "end")
           .attr("dx", "-.8em")
           .attr("dy", ".15em")
           .attr("transform", function(d) {
               return "rotate(-70)"
           });

      svg.append("g")
           .attr("class", "y axis")
           .call(yAxis)
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("x", -height/2)
           .attr("dy", "-3.71em")
           .style("text-anchor", "middle")
           .text("In Millions");

 var country = svg.selectAll(".country")
     .data(data)
   .enter().append("g")
     .attr("class", "g")
     .attr("transform", function(d) { return "translate(" + x(d["Country Name"]) + ",0)"; });
 country.selectAll("rect")
     .data(function(d) { return d.ages; })
   .enter().append("rect")
     .attr("width", x.rangeBand())
     .attr("y", function(d) { return y(d.y1); })
     .attr("height", function(d) { return y(d.y0) - y(d.y1); })
     .style("fill", function(d) { return color(d.name); });
});