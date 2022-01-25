var firebaseConfig = {
	apiKey: "AIzaSyDvM1HstuvXxyI5wABCmsL_djIF_7xxrms",
	authDomain: "firestore-generator.firebaseapp.com",
	projectId: "firestore-generator",
	storageBucket: "firestore-generator.appspot.com",
	messagingSenderId: "721001636209",
	appId: "1:721001636209:web:1eb50466d7ca979f90d6d0",
	measurementId: "G-TGGVGHB8PG"
};

firebase.initializeApp(firebaseConfig);

$(document).keypress(function(event){

	var element = event.target;

	if(element.type == "number" || element.type == "tel"){
		
		var key = window.event.keyCode || event.which || event.charCode;
	
		return key <= 31 || (key >= 48 && key <= 57);
	}
});

$(document).on("input", function(event){
	
	var element = event.target;
	
	validateElement(element);
});

function validateElement(element){
	
	if($(element).val() == null || $(element).val().length == 0){
		
		if($(element).attr("required") != null 
			|| $(element).hasClass("required")){
			
			return setMessage(element, "Please enter " + $(element).attr("placeholder"));
		}
	
	}else{
		
		if($(element).hasClass("name")){
			
			if($(element).val().trim().split(" ").length <= 2){
				
				return setMessage(element, $(element).attr("placeholder") + " should contain three tokens");
			}
		}
		
		if($(element).hasClass("mobile")){
			
			if(!$(element).val().startsWith("3") && !$(element).val().startsWith("6")){
				
				return setMessage(element, $(element).attr("placeholder") + " should start with 6 or 3");
			}
			
			if($(element).val().length != 8){
				
				return setMessage(element, $(element).attr("placeholder") + " should contain 8 digits");
			}
		}
		
		if($(element).hasClass("cpr")){
			
			if($(element).val().length != 9){
				
				return setMessage(element, $(element).attr("placeholder") + " should contain 9 digits");
			}
		}
	}
	
	return setMessage(element, null);
}

function setMessage(element, message) {

	if($(element).closest(".mb-3").find(".invalid-feedback").length == 0){
		
		$(element).closest(".mb-3").append("<div class='invalid-feedback'></div>");
		
	}else{
		
		$(element).closest(".mb-3").find(".invalid-feedback").html(message);
	}
	
	if (message != null) {
		
		$(element).removeClass("is-valid");
		$(element).addClass("is-invalid");

	} else {
		
		$(element).removeClass("is-invalid");
		$(element).addClass("is-valid");
	}
	
	return message;
}

function isValidForm() {

	var result = null;
	
	$($(":input").get().reverse()).each(function(){
		
		var message = validateElement($(this));
		
		if(message != null){
			
			result = message;
			
			$(this).focus();
		}
	});
	
	return result;
}

isValidForm();

function getLastMonthDate(){
	
	var date = new Date();

	date.setDate(date.getDate() - 30);
	
	var day = String(date.getDate());
	var month = String(date.getMonth() + 1);
	var year = String(date.getFullYear());

	var startDate = "";
	startDate += year;
	startDate += "-";
	startDate += "00".substr(month.length) + month;
	startDate += "-";
	startDate += "00".substr(day.length) + day;
	
	return startDate;
}

function getTime(){
			
	var date = new Date();
	var day = String(date.getDate());
	var month = String(date.getMonth()	+ 1);
	var year = String(date.getFullYear());
	var second = String(date.getSeconds());
	var minute = String(date.getMinutes());
	var hour = String(date.getHours());
	
	var time = "";
	
	time += year + "-" + "00".substr(month.length) + month + "-" + "00".substr(day.length) + day;
	time += " ";
	time += "00".substr(hour.length) + hour + ":" + "00".substr(minute.length) + minute + ":" + "00".substr(second.length) + second;
	
	return time;
}

function getProperties(object, parent){
		
	var properties = new Object();
	
	for(let property in object){
		
		if(object[property] != null && object[property].constructor == Object){
			
			var nestedProperties = getProperties(object[property], property + ".");
			
			Object.assign(properties, nestedProperties);
			
		}else{
			properties[parent + property] = object[property];
		}
	}
	
	return properties;
}