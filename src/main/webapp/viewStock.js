    let namee=[];
    let price=[];
   
   
    function initView(){
     document.body.innerHTML="<div id='container'></div>";
     let container=document.getElementById("container");
      for (let i = 1; i <= 30; i++) {
      container.innerHTML+= "<div class='card'>\
         <h2>Stock Id : "+i+"</h2>\
         <div class='product-info'>\
         <p>Stock Name: "+namee[i-1]+"</p>\
         <p class='price'>Price:"+ price[i-1]+"  </p>\
         </div>\
         </div>";
      }
      }
    function data(){
    let xhr=new XMLHttpRequest();
	xhr.open("get", "http://localhost:8080/Stock_Market/myapp/StockDetails", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("0");
			}
			output=xhr.responseText.split("||");
			namee=output[0].replace("[","").replace("]","").split(",");
			price=output[1].replace("[","").replace("]","").split(",");
			 initView();
		}
}
xhr.send();
}
 data();