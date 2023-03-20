/**
 * 

document.onvisibilitychange = () => {
  if (document.visibilityState === "hidden") {
      logout();
  }
};
 */
function comparision(){
	document.getElementById("get").src="./comparision.html";
}
function stockChart(){
	document.getElementById("get").src="./visual.html";
}
function Analysischart(){
	document.getElementById("get").src="./Analysis.html";
}
function allChart(){
	document.getElementById("get").src="./AllVisualize.html";
}
function Allstock(){
	document.getElementById("get").src="./viewStock.html";
}
function bank(){
	document.getElementById("get").src="./bank.html";
}
function cart(){
	document.getElementById("get").src="./buy.html";
}
function pro(){
	document.getElementById("get").src="./portfolio.html";
}
function logout(){
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/Logout", false);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			output=xhr.responseText;
	        window.location.href=String(output);
		}
	}
xhr.send();
}
function auto(){
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/home", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("./frontPage.html");
			}
		}
	}
xhr.send();
}
