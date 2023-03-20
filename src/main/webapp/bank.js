function deposit(){
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/Deposit", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("");
			}
			else{
				balance();
				document.getElementById("i").value="";
			}
		}
  }
   if(document.getElementById("i").value===""||Number(document.getElementById("i").value<0)){
	   document.getElementById("i").value=0;
   }
     xhr.send("amount="+document.getElementById("i").value);
     
}
function withdraw(){
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/Withdraw", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("");
			}
			else{
				balance();
				 document.getElementById("j").value="";
			}
		}
  }
   if(document.getElementById("j").value===""||Number(document.getElementById("j").value<0)){
	   document.getElementById("j").value=0;
   }
     xhr.send("amount="+document.getElementById("j").value);
    
}

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
				document.getElementById("rep").innerHTML="Your Balance : "+xhr.responseText;
			}
		}
  }
     xhr.send();
}
balance();
const numInputs = document.querySelectorAll('input[type=number]')
numInputs.forEach(function(input) {
  input.addEventListener('change', function(e) {
    if (e.target.value == '') {
      e.target.value = 0;
    }
  })
})