/**
 * 
 */
let signupp =0;
let loginn=0;
function login(){
	if(loginn==1){
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/Login", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let id =document.getElementById("uname").value;
    let pass =document.getElementById("upass").value;
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			output=xhr.responseText;
			if(output!=="./frontPage.html"){
				console.log("hi");
	        window.location.href=String(output);
	        }
	        else{
				alert("invalid input")
			}
		}
	}
xhr.send("id="+id+"&password="+pass);
}
}
function signup(){
	if(signupp==1){
	let xhr=new XMLHttpRequest();
	xhr.open("post", "http://localhost:8080/Stock_Market/Signup", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	let id =document.getElementById("usname").value;
    let pass =document.getElementById("uspass").value;
    let name =document.getElementById("name").value;
    let gmail =document.getElementById("gmail").value;
    let amount =document.getElementById("amount").value;
	xhr.onreadystatechange=function(){
		if(this.readyState === 4&&this.status===200){
			output=xhr.responseText;
	       if(output!=="./frontPage.html"){
				console.log("hi");
	        window.location.href=String(output);
	        }
	        else{
				alert("invalid input");
			}
		}
	}
xhr.send("id="+id+"&password="+pass+"&name="+name+"&gmail="+gmail+"&amount="+amount);
}
}

function cambiar_login() {
	loginn=1;
	signupp=0;
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";  
document.querySelector('.cont_form_login').style.display = "block";
document.querySelector('.cont_form_sign_up').style.opacity = "0";               

setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);  
  
setTimeout(function(){    
document.querySelector('.cont_form_sign_up').style.display = "none";
},200);  
  }

function cambiar_sign_up(at) {
	loginn=0;
	signupp=1;
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector('.cont_form_sign_up').style.display = "block";
document.querySelector('.cont_form_login').style.opacity = "0";
  
setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
},100);  

setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
},400);  


}    



function ocultar_login_sign_up() {
    loginn=0;
	signupp=0;
document.querySelector('.cont_forms').className = "cont_forms";  
document.querySelector('.cont_form_sign_up').style.opacity = "0";               
document.querySelector('.cont_form_login').style.opacity = "0"; 

setTimeout(function(){
document.querySelector('.cont_form_sign_up').style.display = "none";
document.querySelector('.cont_form_login').style.display = "none";
},500);  
  
  }