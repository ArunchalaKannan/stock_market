let company= ["Apple","Alphabet","Saudi Aramco","Micro Soft","Amazon","American Express","Amgen","Boeing","Caterpillar","Chevron","Cisco Systems","Coca Cola","Dow Inc","Goldman Sachs","Home Depot","Honeywell international","Intel","IBM","Jpmorgan Chaase","McDonald's","3M","Merck","Nike","SalesForce","Travelers","Verizon","Visa","Walgreens Allience","Walmart","Walt Disney"
];
let servelet=[];
 function init(){
	 let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/Allstock", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("");
			}
			servelet=xhr.responseText.replace("[","").replace("]","").split(",");
			 data();
		}
  }
xhr.send();
 }
 
 
 function data(){
	am5.ready(function() {
var root = am5.Root.new("chartdiv");
root.setThemes([am5themes_Animated.new(root)]);

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.p100,
    height: am5.p100,
    layout: root.horizontalLayout
  })
);
var chart = container.children.push(
  am5percent.PieChart.new(root, {
    tooltip: am5.Tooltip.new(root, {})
  })
);
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    alignLabels: true
  })
);

series.labels.template.setAll({
  textType: "circular",
  radius: 4
});
series.ticks.template.set("visible", false);
series.slices.template.set("toggleKey", "none");

// add events
series.slices.template.events.on("click", function(e) {
  selectSlice(e.target);
});
var subChart = container.children.push(
  am5percent.PieChart.new(root, {
    radius: am5.percent(50),
    tooltip: am5.Tooltip.new(root, {})
  })
);

var subSeries = subChart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category"
  })
);

subSeries.data.setAll([
  { category: "A", value: 0 },
  { category: "B", value: 0 },
  { category: "C", value: 0 },
  { category: "D", value: 0 },
  { category: "E", value: 0 },
  { category: "F", value: 0 },
  { category: "G", value: 0 }
]);
subSeries.slices.template.set("toggleKey", "none");

var selectedSlice;

series.on("startAngle", function() {
  updateLines();
});

container.events.on("boundschanged", function() {
  root.events.on("frameended", function(){
    updateLines();
   })
})

function updateLines() {
  if (selectedSlice) {
    var startAngle = selectedSlice.get("startAngle");
    var arc = selectedSlice.get("arc");
    var radius = selectedSlice.get("radius");

    var x00 = radius * am5.math.cos(startAngle);
    var y00 = radius * am5.math.sin(startAngle);

    var x10 = radius * am5.math.cos(startAngle + arc);
    var y10 = radius * am5.math.sin(startAngle + arc);

    var subRadius = subSeries.slices.getIndex(0).get("radius");
    var x01 = 0;
    var y01 = -subRadius;

    var x11 = 0;
    var y11 = subRadius;

    var point00 = series.toGlobal({ x: x00, y: y00 });
    var point10 = series.toGlobal({ x: x10, y: y10 });

    var point01 = subSeries.toGlobal({ x: x01, y: y01 });
    var point11 = subSeries.toGlobal({ x: x11, y: y11 });

    line0.set("points", [point00, point01]);
    line1.set("points", [point10, point11]);
  }
}

// lines
var line0 = container.children.push(
  am5.Line.new(root, {
    position: "absolute",
    stroke: root.interfaceColors.get("text"),
    strokeDasharray: [2, 2]
  })
);
var line1 = container.children.push(
  am5.Line.new(root, {
    position: "absolute",
    stroke: root.interfaceColors.get("text"),
    strokeDasharray: [2, 2]
  })
);

// Set data
series.data.setAll([
  {
    category: "Technology",
    value: (Number(servelet[0])+Number(servelet[1])+Number(servelet[3])+Number(servelet[10])+Number(servelet[24])+Number(servelet[17])+Number(servelet[16])),
    subData: [
      { category: "Apple", value: Number(servelet[0]) },
      { category: "Alphabet", value: Number(servelet[1]) },
      { category: "Microsoft", value: Number(servelet[3]) },
      { category: "Cisco Systems", value: Number(servelet[10]) },
      { category: "Salesforce", value: Number(servelet[24]) },
      { category: "IBM", value: Number(servelet[17]) },
      { category: "INTEL", value: Number(servelet[16]) }
    ]
  },
  {
    category: "Energy",
    value: (Number(servelet[2])+Number(servelet[9])),
    subData: [
      { category: "Saudi Aramco", value: Number(servelet[2]) },
       { category: "Chevron", value: Number(servelet[9]) }
    ]
  },
  {
    category: "consumerGoods",
    value: (Number(servelet[11])+Number(servelet[22])+Number(servelet[19])+Number(servelet[27])+Number(servelet[28])+Number(servelet[29])+Number(servelet[4])),
    subData: [
      { category: "Coca Cola", value: Number(servelet[11]) },
      { category: "Nike", value: Number(servelet[22]) },
      { category: "McDonald's", value: Number(servelet[19]) },
      { category: "Walgreens Allience", value: Number(servelet[27]) },
      { category: "Walmart", value: Number(servelet[28]) },
      { category:  "Walt Disney", value: Number(servelet[29]) },
      { category:  "Amazon", value: Number(servelet[4]) }
    ]
  },
  {
    category: "health",
    value: (Number(servelet[6])+Number(servelet[21])),
    subData: [
      { category: "Amgen", value: Number(servelet[6]) },
      { category: "Merck", value: Number(servelet[21]) }
    ]
  },
  {
    category: "financial",
    value: (Number(servelet[5])+Number(servelet[13])+Number(servelet[18])+Number(servelet[27])),
    subData: [
      { category: "American Express", value: Number(servelet[5]) },
      { category: "Goldman Sachs", value: Number(servelet[13]) },
      { category: "Jpmorgan Chaase", value: Number(servelet[18]) },
      { category: "Visa", value: Number(servelet[27]) }
    ]
  },
  {
    category: "industrial",
    value: (Number(servelet[7])+Number(servelet[8])+Number(servelet[12])+Number(servelet[15])+Number(servelet[20])),
    subData: [
      { category: "Boeing", value: Number(servelet[7]) },
      { category: "Caterpillar", value: Number(servelet[8]) },
      { category:  "Dow Inc", value: Number(servelet[12]) },
      { category: "Honeywell international", value: Number(servelet[15]) },
      { category: "3M", value: Number(servelet[20]) }
    ]
  },
   {
    category: "Telecommunication",
    value: Number(servelet[25]),
    subData: [
      { category: "Verizon", value: Number(servelet[25]) },
    ]
  },
  {
    category: "Insurance",
    value: Number(servelet[24]),
    subData: [
      { category: "Travelers", value: Number(servelet[24]) },
    ]
  }
]);

function selectSlice(slice) {
  selectedSlice = slice;
  var dataItem = slice.dataItem;
  var dataContext = dataItem.dataContext;

  if (dataContext) {
    var i = 0;
    subSeries.data.each(function(dataObject) {
      var dataObj = dataContext.subData[i];
      if(dataObj){
          subSeries.data.setIndex(i, dataObj);
          if(!subSeries.dataItems[i].get("visible")){
              subSeries.dataItems[i].show();
          }
      }
      else{
          subSeries.dataItems[i].hide();
      }
      
      i++;
    });
  }

  var middleAngle = slice.get("startAngle") + slice.get("arc") / 2;
  var firstAngle = series.dataItems[0].get("slice").get("startAngle");

  series.animate({
    key: "startAngle",
    to: firstAngle - middleAngle,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });
  series.animate({
    key: "endAngle",
    to: firstAngle - middleAngle + 360,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });
}

container.appear(1000, 10);

series.events.on("datavalidated", function() {
  selectSlice(series.slices.getIndex(0));
  
});
root._logo.dispose();
}); 
}
