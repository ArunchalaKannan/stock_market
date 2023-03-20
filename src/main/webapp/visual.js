let id;
let Pname;
let f_data=[];
let o_data=[];
let l_data=[];
let h_data=[];
let v_data=[];
let company= ["Apple","Alphabet","Saudi Aramco","Micro Soft","Amazon","American Express","Amgen","Boeing","Caterpillar","Chevron","Cisco Systems","Coca Cola","Dow Inc","Goldman Sachs","Home Depot","Honeywell international","Intel","IBM","Jpmorgan Chaase","McDonald's","3M","Merck","Nike","SalesForce","Travelers","Verizon","Visa","Walgreens Allience","Walmart","Walt Disney"
	];
function init(){
  document.body.innerHTML="<div id='ele' style='padding-top:10%;display:none;'><div class='search-wrapper cf' style='margin-left:55.5%;'><input type='number' id='updateId' placeholder='enter stock id 1-30' min='1' max='30'/>\
<button onclick='change()'>enter</button></div>";
  document.getElementById("updateId").value=1;
  change();
}

init();
function change(){
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/Visulization", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    id =document.getElementById("updateId").value;
    if(id>0&&id<31){
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("0");
			}
			Pname=company[id-1];
		    let	temp=xhr.responseText.split("||");
			let temp1=temp[0].replace("[","").replace("]","").split(",");
			let temp2=temp[1].replace("[","").replace("]","").split(",");
			let temp3=temp[2].replace("[","").replace("]","").split(",");
			let temp4=temp[3].replace("[","").replace("]","").split(",");
			let temp5=temp[4].replace("[","").replace("]","").split(",");
			for(let ind=0;ind<temp1.length;ind++){
				f_data.push(Number(temp1[ind]));
				o_data.push(Number(temp2[ind]));
				h_data.push(Number(temp3[ind]));
				l_data.push(Number(temp4[ind]));
				v_data.push(Number(temp5[ind]));	
			}
			datas();
		}
	}
xhr.send("id="+id);
}
else{
	init();
}
}
function datas(){
	document.body.innerHTML="<center><div class='search-wrapper cf'><input type='number' id='updateId' placeholder='enter stock id 1-30' min='1' max='30'/>\
<button onclick='change()'>enter</button></div></center><div id='chartcontrols'></div><div id='chartdiv'></div>😄Mysty"
am5.ready(function() {

//  root
var root = am5.Root.new("chartdiv");


//  themes
root.setThemes([
  am5themes_Animated.new(root)
]);


//  chart
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {
}));


//number format
root.numberFormatter.set("numberFormat", "#,###.00");


// init main
var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
}));


// value axis
var valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom"
  }),
  extraMin: 0.1, //  space adding
  tooltip: am5.Tooltip.new(root, {}),
  numberFormat: "#,###.00",
  extraTooltipPrecision: 2
}));

var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));


// series
var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
  name: company[id-1],
  clustered: false,
  valueXField: "Date",
  valueYField: "Close",
  highValueYField: "High",
  lowValueYField: "Low",
  openValueYField: "Open",
  calculateAggregates: true,
  xAxis: dateAxis,
  yAxis: valueAxis,
  legendValueText: "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
  legendRangeValueText: ""
}));


// main value
stockChart.set("stockSeries", valueSeries);


// stock legend
var valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));


// init volume 
var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
  inside: true
});

volumeAxisRenderer.labels.template.set("forceHidden", true);
volumeAxisRenderer.grid.template.set("forceHidden", true);

var volumeValueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  numberFormat: "#.#a",
  height: am5.percent(20),
  y: am5.percent(100),
  centerY: am5.percent(100),
  renderer: volumeAxisRenderer
}));

// Add series
var volumeSeries = mainPanel.series.push(am5xy.ColumnSeries.new(root, {
  name: "Volume",
  clustered: false,
  valueXField: "Date",
  valueYField: "Volume",
  xAxis: dateAxis,
  yAxis: volumeValueAxis,
  legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]"
}));

volumeSeries.columns.template.setAll({
  strokeOpacity: 0,
  fillOpacity: 0.5
});

// color columns
volumeSeries.columns.template.adapters.add("fill", function(fill, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    return stockChart.getVolumeColor(dataItem);
  }
  return fill;
})


// Set main series
stockChart.set("volumeSeries", volumeSeries);
valueLegend.data.setAll([valueSeries, volumeSeries]);


// Add cursor|s
mainPanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: valueAxis,
  xAxis: dateAxis,
  snapToSeries: [valueSeries],
  snapToSeriesBy: "y!"
}));


// Add scrollbar
var scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
}));
stockChart.toolsContainer.children.push(scrollbar);

var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

var sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
  valueYField: "Close",
  valueXField: "Date",
  xAxis: sbDateAxis,
  yAxis: sbValueAxis
}));

sbSeries.fills.template.setAll({
  visible: true,
  fillOpacity: 0.3
});

// add indicator
stockChart.indicators.push(am5stock.RelativeStrengthIndex.new(root, { stockChart: stockChart, stockSeries: valueSeries }));

// zoom to time period
var periodSelector = am5stock.PeriodSelector.new(root, {
  stockChart: stockChart
})

valueSeries.events.on("datavalidated", function() {
  periodSelector.selectPeriod({ timeUnit: "month", count: 3 })
})

// toolbar
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.IndicatorControl.new(root, {
      stockChart: stockChart,
      legend: valueLegend
    }),
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart
    }),
    periodSelector,
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.ResetControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  ]
})
// data
let data = [];
var today = new Date();
var pastdays = [];
for (var i = 0; i <f_data.length; i++) {
  var date = new Date(today);
  date.setDate(today.getDate() - i);
  pastdays.push(date);
}
console.log(pastdays[0].getTime());
let j=f_data.length-1;
for(let i=0;i<f_data.length;i++){
	data.push({ Date: (pastdays[j].getTime()), Open: o_data[i], High: h_data[i], Low: l_data[i], Close: f_data[i], Volume: v_data[i] });
	j--;
}
// set data
valueSeries.data.setAll(data);
volumeSeries.data.setAll(data);
sbSeries.data.setAll(data);
root._logo.dispose();
}); //
}
