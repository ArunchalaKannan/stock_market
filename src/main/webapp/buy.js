let namee=[];
let price=[];
let balance1;
let ids=[];
let holds=[];
function balance(m){
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/balance", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("");
			}
			else{
				balance1=Number(xhr.responseText);
				document.getElementById("balance").innerHTML="Balance : "+balance1;
				if(m==0){
				 initView();
				 }
				 else{
					 holdings();
				 }
			}
		}
  }
     xhr.send();
}
function buy(a,b){
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/Buy", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("");
			}
			else{
				alert("succesfully buyed");
				balance(0);
			}
		}
  }
  if(b===""){ 
	  b=0;
  }
  a=(a*1)-1;
xhr.send("id="+a+"&count="+b);
}

function sell(a,b){
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/Sell", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("");
			}
			else{
				alert("succesfully selled");
				balance(1);
			}
		}
  }
  if(b===""){ 
	  b=0;
  }
  a=(a*1);
xhr.send("id="+a+"&count="+b);
}


$("[type='number']").keypress(function (evt) {
    evt.preventDefault();
});


function display(name,id,price,gt){
	
	let at=Math.floor(balance1/Number(price));
	document.getElementById("container").innerHTML+=`<div class='product-box'>
  <div class='product-image'>
    <img src='-shopping-cart_90604.png' alt='Product Image'>
  </div>
  <div class='product-details'><h2 class='product-name' style="color:black">${name} </h2>
    <p class='product-id'>Stock ID: ${id} &nbsp;|&nbsp;  Price: ${price}</p>
    <div class='product-quantity'>
      <label for='${gt}'>Quantity:</label>
      <input type='number' id='${gt}' value='' min='0' max='${at}'>
    </div>
    <button class='buy-button' onclick='data(${id})'>Buy Now</button>
  </div>
</div>`
}
function data(a){
	buy(a,(document.getElementById("a"+a).value));
	document.getElementById("a"+a).value="";
}
function initView(){
	document.getElementById("container").innerHTML="";
	for (let i = 1; i <= 30; i++) {
		display(namee[i-1],i,price[i-1],("a"+i));
	}
}
function loaddata(){
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
			balance(0);
		}
}
xhr.send();
}

function holdings(){
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/holdings", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("0");
			}
			else{
			output=xhr.responseText.split("||");
			ids=output[0].replace("[","").replace("]","").split(",").map(e=>e*1);
			holds=output[1].replace("[","").replace("]","").split(",").map(e=>e*1);
			console.log(ids);
			console.log(holds);
			document.getElementById("container").innerHTML="";
	 			for (let i = 0; i <ids.length ; i++) {
				holdDisplay(namee[ids[i]],ids[i],price[ids[i]],holds[i],holds[i]);
					}
			}
		}
}
xhr.send();
}

function holdDisplay(name,id,price,hold,gt){
	document.getElementById("container").innerHTML+=`<div class="product-box1">
  <div class="product-image1">
    <img src="https://media.istockphoto.com/id/1384646810/photo/golden-bull-and-bear-on-stock-data-chart-background-investing-stock-exchange-financial.jpg?b=1&s=170667a&w=0&k=20&c=8QhNSLCT2yTW5oVGtVoswFOyjsunTU_L3nsdXkXWeMg=" alt="Product Image">
  </div>
  <div class="product-info1">
    <h2 class="product-name1" Style="color:black">${name}</h2>
    <p class="product-id1">ID: ${id+1}</p>
    <p class="product-price1">current price: ${price}</p>
    <p class="product-stock1">Holdings: ${hold}</p>
  </div>
  <div class="quantity-input1">
    <label for="a${id}">Quantity to sell:</label>
    <div class="quantity-controls1">
      <input type="number" id="a${id}" name="a${id}" value="" min="0" max="${gt}">
    </div>
  </div>
  <button class="buy-button1" onclick="sd(${id},'a${id}')">Sell Now</button>
</div>`
}

function sd(m,n){
	sell(m,(document.getElementById(n).value));
	document.getElementById(n).value="";
}
loaddata();