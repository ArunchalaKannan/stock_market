/**
 * 
 */

function setActive(){
  for(let card of $('.education-card')){
    card.classList.remove('active');
  }
    $(this).addClass('active');
}


function hold(){
	for(let i =0;i<ids.length;i++){
		let iden=ids[i];
		let nm=namee[ids[i]];
		let tp=price[ids[i]];
		let th=holds[i];
		let tt=test(Number(price7[ids[i]]),Number(tp));
		if(i==0){
	document.getElementById("hold").innerHTML+=` <div class="education-card active">
      <div class="label">${iden+1}</div>
      <div class="icon">
        <lord-icon
    src="https://cdn.lordicon.com/bewubbww.json"
    trigger="hover"
    style="width:290px;height:250px">
</lord-icon>
      </div>
      <div class="info row justify-content-end">
        <div class="col-12 col-sm-6 col-lg-7 px-0">
          <h1>${nm}</h1>
          <h2>${"current price : ₹ "+tp} <br> Holdings : ${th}<br>Total value : ₹ ${tp*th}<br>
         <span class="price-change-label">Price Change:</span>${tt}</h2>
        </div>

      </div>
    </div>`;
    }
    else{
		document.getElementById("hold").innerHTML+=` <div id="one" class="education-card">
      <div class="label">${iden+1}</div>
      <div class="icon">
        <lord-icon
    src="https://cdn.lordicon.com/bewubbww.json"
    trigger="hover"
    style="width:290px;height:250px">
</lord-icon>
      </div>
      <div class="info row justify-content-end">
        <div class="col-12 col-sm-6 col-lg-7 px-0">
          <h1>${nm}</h1>
          <h2>${"current price : ₹ "+tp}<br>Holdings : ${th}<br>Total value : ₹ ${tp*th} <br>
         <span class="price-change-label">Price Change:</span>${tt}</h2>
        </div>

      </div>
    </div>`;
	}
    }
    $('.education-card').on('click', this.setActive)
}

let namee=[];
let price=[];
let balance1;
let ids=[];
let holds=[];
let price7=[];
function balance(){
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
				hold();
			}
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
			balance();
			}
		}
}
xhr.send();
}


function profile(){
    let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/profile", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("0");
			}
			output=xhr.responseText.split(",");
			let n =output[0];
			let un=output[1];
			let g = output[2];
			let a = output[3];
			document.getElementById("name").innerHTML=`${n}`;
			document.getElementById("username").innerHTML=`<i class="fas fa-user"></i> ${un}`;
			document.getElementById("gmail").innerHTML=`<i class="fas fa-envelope"></i> ${g}`;
			document.getElementById("amount").innerHTML=`<i class="fas fa-money-bill-wave"></i> ₹${a}`;
			loaddata();
		}
}
xhr.send();
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
		    price7=(output[2]).replace("[","").replace("]","").split(",");
			holdings();
		}
}
xhr.send();
}
profile();

















function test(a,b){
const currentPrice = b;
const previousPrice = a;

const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
if (priceChange > 0) {
 return `<span class="price-change-value" style="color:#40ff40">${priceChange.toFixed(2)}%</span>`
} else if (priceChange < 0) {
  return `<span class="price-change-value" style="color:red">${priceChange.toFixed(2)}%</span>`
}
}