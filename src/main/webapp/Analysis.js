let output;
let id;
lender();
document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        change();
    }
});
function lender(){
	document.body.innerHTML="";
	document.body.innerHTML+="<center><div class='search-wrapper cf'><input type='number' id='updateId' placeholder='enter stock id 1-30' min='1' max='30'/>\
<button onclick='change()'>enter</button></div></center><div class='container'>\
        <div class='top-section'>\
        <div class='small-box'></div>\
        <div class='small-box'></div>\
        <div class='small-box'></div>\
        </div><div class='bottom-section'>\
        <center><h1 id='ADR'>Welcome to Analysis Stock</h1></center>\
        <div id='return' class='large-box'></div>"
        document.getElementById("updateId").value=1;
        change();
}
function change(){
	id =document.getElementById("updateId").value;
	ajaxVolality();
	ajaxRecommandation();
	ajaxPerformance();
	ajaxDailyReturn();
    if(id<=0||id>=31||id==""){
	lender();
	}
	else{
		 console.log(id);
		 console.log("first");
		 document.getElementById("updateId").value="";
		document.getElementById("ADR").innerHTML="Average Daily Return";
	}
}
function ajaxVolality(){
	
    let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/Volality", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if(id>0&&id<31){
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("0");
			}
			output=xhr.responseText;
	        (document.getElementsByClassName("small-box")[0]).innerHTML=String(output);
		}
	}
xhr.send("id="+id);
}
}
function ajaxRecommandation(){
	
    let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/Recommandation", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if(id>0&&id<31){
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("0");
			}
			output=xhr.responseText;  
	        (document.getElementsByClassName("small-box")[1]).innerHTML=String(output);
		}
	}
xhr.send("id="+id);
}
}
function ajaxPerformance(){
	
    let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/Performance", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if(id>0&&id<31){
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("0");
			}
			output=xhr.responseText;
	        (document.getElementsByClassName("small-box")[2]).innerHTML=String(output);
		}
	}
xhr.send("id="+id);
}
}
function ajaxDailyReturn(){
    let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/myapp/DailyReturn", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if(id>0&&id<31){
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			if(xhr.responseText==="./frontPage.html"){
				window.location.replace("0");
			}
			output=xhr.responseText;
	        (document.getElementsByClassName("large-box")[0]).innerHTML=String(output);
		}
	}
xhr.send("id="+id);
}
}