/**
 * 
 */
$("[type='number']").keypress(function (evt) {
    evt.preventDefault();
});

let company= ["Apple","Alphabet","Saudi Aramco","Micro Soft","Amazon","American Express","Amgen","Boeing","Caterpillar","Chevron","Cisco Systems","Coca Cola","Dow Inc","Goldman Sachs","Home Depot","Honeywell international","Intel","IBM","Jpmorgan Chaase","McDonald's","3M","Merck","Nike","SalesForce","Travelers","Verizon","Visa","Walgreens Allience","Walmart","Walt Disney"
	];
let name;
let name1;
let arr1;
let arr2;
function init(){
document.getElementById("container").innerHTML="<div id='chartdiv'></div>";
am5.ready(function() {
var root = am5.Root.new("chartdiv");
var myTheme = am5.Theme.new(root);
myTheme.rule("Grid", ["base"]).setAll({
  strokeOpacity: 0.1
});
root.setThemes([
  am5themes_Animated.new(root),
  myTheme
]);
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panY",
  wheelY: "zoomY",
  layout: root.verticalLayout
}));
chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical"
}));
var data = [ {
  "Company": name1,
  "contribution": Number(arr2[0]),
  "volatility": Number(arr2[1]),
  "performance": Number(arr2[2]),
  "trend":Number(arr2[3])
},{
  "Company": name,
  "contribution": Number(arr1[0]),
  "volatility": Number(arr1[1]),
  "performance": Number(arr1[2]),
  "trend":Number(arr1[3])
}]
var yRenderer = am5xy.AxisRendererY.new(root, {});
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "Company",
  renderer: yRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

yRenderer.grid.template.setAll({
  location: 1
})

yAxis.data.setAll(data);

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  renderer: am5xy.AxisRendererX.new(root, {
    strokeOpacity: 0.1
  })
}));
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50
}));
function makeSeries(name, fieldName) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    stacked: true,
    xAxis: xAxis,
    yAxis: yAxis,
    baseAxis: yAxis,
    valueXField: fieldName,
    categoryYField: "Company"
  }));

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryY}: {valueX}",
    tooltipY: am5.percent(90)
  });
  series.data.setAll(data);
  series.appear();

  series.bullets.push(function() {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueX}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  legend.data.push(series);
}

makeSeries("contribution", "contribution");
makeSeries("volatility", "volatility");
makeSeries("performance", "performance");
makeSeries("trend", "trend");

root._logo.dispose();
chart.appear(1000, 100);

}); 
}




function start(){
	a=Number(document.getElementById("left-pan-input").value);
	b=Number(document.getElementById("right-pan-input").value);
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/Comparison", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("0");
			}
			let output=xhr.responseText.split("||");
			console.log(output);
			name=company[a-1];
			name1=company[b-1]
			arr1=output[0].replace("[","").replace("]","").split(", ");
			arr2=output[1].replace("[","").replace("]","").split(", ");
			console.log(arr1);
			init();
			}
			}
				xhr.send("i1="+a+"&i2="+b);
			
}
document.getElementById("left-pan-input").value=1;
document.getElementById("right-pan-input").value=2;
start();


function right(a){
	console.log(a);
	document.getElementById("hc").innerHTML=company[(Number(a)-1)];
}
function left(a){
	document.getElementById("ch").innerHTML=company[(Number(a)-1)];
}
right(1);left(2);