/*
Example code 
$().ready(function($) {
	var container = $('div.error-container');
	// validate signup form on keyup and submit
	$("#form1").validate({
		//*	
		errorContainer: container,                       //FOR THIS Option You will have to use jquery.metadata.js 
		errorLabelContainer: $("ul", container),		 //FOR THIS Option You will have to use jquery.metadata.js 
		wrapper: 'li',									 //FOR THIS Option You will have to use jquery.metadata.js 
		meta: "validate",								 //FOR THIS Option You will have to use jquery.metadata.js 
		//*--/
		errorClass: "error-msg",
		validClass: "valid-msg",
		errorElement: "div",
		highlight:false,
		unhighlight:false,
		rules: {
				category : {	required		: [true,'Category'],
								alphaCharSpace  : [true,'Category'] 
							}
		},
		errorPlacement: function(error, element)
		{		
			error.appendTo(element.parent());
		}
	});

});


	errorPlacement: function(error, element)
	{		
		custom_error_placement = ['dob','category_id','workshop_id','special_courses_id[]','super_speciality_certificate_course_id'];
		if (in_array(element.attr('name'),custom_error_placement))
		{	
			error.appendTo($('#'+( (element.attr('name')).replace(/[[]]/i,"\\[\\]") )+'_jquery_error') );
		}
		else
		{
			error.appendTo(element.parent());
		}
		//-------support functions
		function in_array(val,array)
		{
			for (key in array) 
			{     if ( array[key]==val )
								  {
									return true;
								  }
			}
			return false;
		}
	}

$().ready(function($) {
	// validate signup form on keyup and submit
	$("#form1").validate({
		errorClass: "error-msg",
		validClass: "valid-msg",
		errorElement: "div",
		highlight:false,
		unhighlight:false,
		rules:{
			products_actual_cost:
			{
				required: [true,'Actual Cost'],
				number:true
			},
			products_price:
			{
				required: [true,'Deals Cost'],
				number:true
			},
			reserved_cost_percentage:
			{
				required: [true,'Reserve cost percent'],
				number:true
			},
			products_quantity:
			{
				number:true
			},
			products_home_page_hours:
			{
				number:true
			},
			zip:
			{
				postalcode:true
			},
			products_date_available:
			{
				required: [true,'Available Date'],
				Date_Should_be_Lower_Then : [true,'Available Date','<?=date("Y m d");?>','Expired Date'],
			},
			products_date_expired:
			{
				required: [true,'Expired Date'],
			},
			logo:
			{
				<?php if (!isset($_GET['pID'])) { ?> required: [true,'Logo file'], <?php } ?>
													 accept:"png|jpe?g|gif"	
			},
			image_1:
			{
				<?php if (!isset($_GET['pID'])) { ?> required: [true,'Image 1'], <?php } ?>
													 accept:"png|jpe?g|gif"	
			},
			image_2:
			{
				<?php if (!isset($_GET['pID'])) { ?> required: [true,'Image 2'],  <?php } ?>
													 accept:"png|jpe?g|gif"	
			},
			image_3:
			{
				<?php if (!isset($_GET['pID'])) { ?> required: [true,'Image 3'],  <?php } ?>
													 accept:"png|jpe?g|gif"	
			},
			image_4:
			{
				<?php if (!isset($_GET['pID'])) { ?> required: [true,'Image 4'],  <?php } ?>
													 accept:"png|jpe?g|gif"	
			},
		},
		messages:
		{
			logo:
			{
				accept: "Only png, jpg and gif type images are alllowed."			
			},	
			image_1:
			{
				accept: "Only png, jpg and gif type images are alllowed."			
			},	
			image_2:
			{
				accept: "Only png, jpg and gif type images are alllowed."			
			},	
			image_3:
			{
				accept: "Only png, jpg and gif type images are alllowed."			
			},
			image_4:
			{
				accept: "Only png, jpg and gif type images are alllowed."			
			},
			debug:true
		},
		errorPlacement: function(error, element)
		{		
			error.appendTo(element.parent());
		}
	});
	
});
*/

$().ready(function($) {

$.extend($.validator.messages, {
								//required: "This field is rrrrrrrrrrequired.",
								required: $.validator.format("{1} is required."),
								//
								remote: "Please fix this field.",
								email: "Please enter a valid email address.",
								url: "Please enter a valid URL.",
								date: "Please enter a valid date.",
								dateISO: "Please enter a valid date (ISO).",
								number: "Please enter a valid number.",
								digits: "Please enter only digits.",
								creditcard: "Please enter a valid credit card number.",
								equalTo: "Please enter the same value again.",
								accept: "Please enter a value with a valid extension.",
								//
								maxlength: $.validator.format("Please enter not more than {0} characters."),
								minlength: $.validator.format("Please enter at least {0} characters."),
								rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
								range: $.validator.format("Please enter a value between {0} and {1}."),
								max: $.validator.format("Please enter a value less than or equal to {0}."),
								min: $.validator.format("Please enter a value greater than or equal to {0}.")
								
						});
	
			 
											 
/* ========================================================================================================================= */			   
/* ========================================================================================================================= */


$.validator.addMethod("minlen", function( value, element,param ) {
//start minlength should not be required if element is not required
rules = $(element).rules();
for (var method in rules ) {
	var rule = { method: method, parameters: rules[method] };
	if (method=='required') {				
		if (rule.parameters==false) {
				 return true;
		}
	}
}
if (param[0]===false) return true;
if (value.length >= parseInt(param[2])) { return this.optional(element) || true; }
return this.optional(element) || false;
}, $.validator.format("For {1}, Please enter at least {2} characters.") );

$.validator.addMethod("maxlen", function( value, element ,param ) {
//start maxlength should not be required if element is not required
rules = $(element).rules();
for (var method in rules ) {
	var rule = { method: method, parameters: rules[method] };
	if (method=='required') {	
		if (rule.parameters==false) {
				 return true;
		}
	}
}
if (param[0]===false) return true;
if (value.length <= parseInt(param[2])) {
	return this.optional(element) || true;
}
return this.optional(element) || false;
}, $.validator.format("For {1}, Please enter not more than {2} characters.") );

$.validator.addMethod("ascii_only", function( value, element,param) {
		if (param[0]===false) return true;
		return this.optional(element) || /^[\x00-\x7F]*$/.test(value);
}, $.validator.format("For {1}, Only ASCII Characters are allowed.") );





$.validator.addMethod("float_numbers", function( value, element ) {
	return this.optional(element) || /^[0-9.-]+$/.test(value);
}, $.validator.format("For {1}, Please enter only floating point & numbers." )
);

$.validator.addMethod("valid_time", function( value, element ) {
	return this.optional(element) || /^[0-9.:]+$/.test(value);
}, $.validator.format("For {1}, Please enter only valid time." )
);


$.validator.addMethod("phone", function( value, element ) {
	return this.optional(element) || /^[ 0-9)(+,-]+$/.test(value);
}, "{1} can have only 0-9 (-,+) characters.");


$.validator.addMethod("not_more_then_95", function(value, element) {
    if (parseFloat(value)>95) 
	{
			return false;
	}
	return true;
},   $.validator.format("{1} can not be more then 95%." )  );

$.validator.addMethod("postive_float", function(value, element) {				
    if ( parseFloat(value)<0 ) 
	{
			
			return false;
	}
	return true;
},   $.validator.format("{1} can not be negative numbers." )  );


$.validator.addMethod("postive_integer", function( value, element ) {
	return this.optional(element) || /^[0-9]+$/.test(value);
}, $.validator.format("{1} can be only non negative integer values." )  
);


$.validator.addMethod("not_to_zero", function(value, element) {
    if (parseFloat(value)==0) 
	{
			return false;
	}
	return true;
},   $.validator.format("{1} can not be zero value." )  );





$.validator.addMethod("Not_equalTo", function(value, element) {
//	alert($.validator.defaults.rules);
	rules = $(element).rules();
	
	for (var method in rules ) {
		
				var rule = { method: method, parameters: rules[method] };
				if (method=='Not_equalTo')
				{	
					if (rule.parameters[2]!='')
					{	
					 if(value=='')
					 {
						 return true;
					 }
						v = $('#'+rule.parameters[2]).val();
						//
						if (value==v)
						{
							//alert('yes');	
							return false; 
						}
						else
						{
							//alert('no');	
							return true; 
						}
					}
					else
					{	
						return true; 
					}	
				}
	}
},  $.validator.format("{1} should not be equal to {3}." )  );







$.validator.addMethod("any_one_required", function(value, element) {
    rules = $(element).rules();	

	for (var method in rules ) { 
				var rule = { method: method, parameters: rules[method] };
				
				
				if (method=='any_one_required')
				{	
						for(var i=2;i<rule.parameters.length;i++)
						{	
							if ( document.getElementById(rule.parameters[i]).value!='')
							return true;
						}
				}
				
	}

	return false;
},   $.validator.format("Any one is required in {1}." )  );



$.validator.addMethod("Date_Should_be_Lower_Then", function(value, element) {
//	alert($.validator.defaults.rules);
	rules = $(element).rules();
	
	for (var method in rules ) {
		
				var rule = { method: method, parameters: rules[method] };
				if (method=='Date_Should_be_Lower_Then')
				{	
					if (rule.parameters[2]!='')
					{	
						date1 = new Date(rule.parameters[2]); 
						if (date1=='Invalid Date')
						{
							v=$('#'+rule.parameters[2]).val();
							if (v!='')
							{
								date1 = new Date(v);
							}
							else
							{
								return true;
							}
						}
						//
						date2 = new Date(value);
						if (date2<date1)
						{
							//alert('yes');	
							return true; 
						}
						else
						{
							//alert('no');	
							return false; 
						}
					}
					else
					{	
						return true; 
					}	
				}
	}
},  $.validator.format("{1} should be lower then {3}." )  );






$.validator.addMethod("Date_Should_be_Greater_Then", function(value, element) {
//	alert($.validator.defaults.rules);
	rules = $(element).rules();
	
	for (var method in rules ) {
		
				var rule = { method: method, parameters: rules[method] };
				if (method=='Date_Should_be_Greater_Then')
				{	
					if (rule.parameters[2]!='')
					{	
						date1 = new Date(rule.parameters[2]); 
						if (date1=='Invalid Date')
						{
							v=$('#'+rule.parameters[2]).val();
							if (v!='')
							{
								date1 = new Date(v);
							}
							else
							{
								return true;
							}
						}
						//
						date2 = new Date(value);
						if (date2>date1)
						{
							//alert('yes');	
							return true; 
						}
						else
						{
							//alert('no');	
							return false; 
						}
					}
					else
					{	
						return true; 
					}	
				}
	}
},  $.validator.format("{1} should be greater then {3}." )  );


$.validator.addMethod("multiemail", function(value, element) {
	var emails = value.split( new RegExp( "\\s*,\\s*", "gi" ) ); 
	valid = true; 
	for(var i in emails) 
	{
		value = emails[i]; 
		if (value.length>0)
		valid=valid && $.validator.methods.email.call(this, value, element);
	}
	return valid; 
}, 'One or more email addresses are invalid.');



$.validator.addMethod("alpha_numeric_space_dot_round_dash_underscore", function( value, element ) {
	return this.optional(element) || /^[a-zA-Z 0-9)(_.-]+$/.test(value);
}, $.validator.format("For {1}, Special Characters are not allowed except dash, underscore, bracket." )  
);

$.validator.addMethod("alpha_numeric_dot_dash_underscore", function( value, element ) {
	return this.optional(element) || /^[a-zA-Z0-9_.-]+$/.test(value);
}, $.validator.format("For {1}, Special Characters and space are not allowed except dash, underscore." )  
);

$.validator.addMethod("alpha_numeric", function( value, element ) {
	return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, $.validator.format("For {1}, Special Characters and space are not allowed." )  
);


$.validator.addMethod("alphaOnly", function( value, element ) {
	return this.optional(element) || /^[a-zA-Z ]+$/.test(value);
}, $.validator.format("For {1}, Please enter only alpha character." ) 
);


$.validator.addMethod("numeric", function( value, element ) {
	return this.optional(element) || /^[0-9]+$/.test(value);
}, $.validator.format("For {1}, Please enter only numeric value only." )
);

$.validator.addMethod("alphaNumericUnderScoreDotDash", function( value, element ) {
	return this.optional(element) || /^[a-zA-Z0-9_.-]+$/.test(value);
}, $.validator.format("For {1}, Please enter numeric value or underscore or dot or dash only." ));

$.validator.addMethod("alphaChar", function( value, element ) {
	return this.optional(element) || /^[a-zA-Z]+$/.test(value);
}, $.validator.format("For {1}, Please enter a to z only." ) );

$.validator.addMethod("alphaCharUnderScoreDotDash", function( value, element ) {
	return this.optional(element) || /^[a-zA-Z_.-]+$/.test(value);
}, $.validator.format("For {1}, Please enter a to z or underscore dot or dash only.") );

$.validator.addMethod("alphaCharSpace", function( value, element ) {
	return this.optional(element) || /^[a-zA-Z ]+$/.test(value);
}, $.validator.format("For {1}, Please enter a to z or space only.") );

$.validator.addMethod("postalcode", function(postalcode, element) {
return this.optional(element) || postalcode.match(/(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXYabceghjklmnpstvxy]{1}\d{1}[A-Za-z]{1} ?\d{1}[A-Za-z]{1}\d{1})$/);
}, "Please specify a valid zip code.");

$.validator.addMethod("valid_zip_length", function( value, element ) {
	if (value.length=='5' || value.length=='9' )
	return true;
	else
	return false;
}, "Please give a valid zip code.");


$.validator.addMethod("valid_cc_month", function( value, element ) {
	if (($("#cc_expYear").val())<=(new Date()).getFullYear())
	{
		if (((new Date()).getMonth()+1)>value) return false;
		else return true;
	}
	else return true;
}, "Please select valid credit card expiration month.");

$.validator.addMethod("valid_cc_year", function( value, element ) {
	if (value < (new Date()).getFullYear() || (value === (new Date()).getFullYear())) { return false; }
	else { return true; }
}, "Please select valid credit card expiration year.");

$.validator.addMethod(
  "ValidCreditCard",
  function(value, element) 
  {		 
			var ccErrors = new Array ();
			var ccErrorNo = 0;
			ccErrors [0] = "Unknown card type.";
			ccErrors [1] = "Please enter your credit card number.";
			ccErrors [2] = "Credit card number is in invalid format.";
			ccErrors [3] = "Credit card number is invalid.";
			ccErrors [4] = "Credit card number has an inappropriate number of digits.";
			function checkCreditCard (cardnumber, cardname) {
				 
			  // Array to hold the permitted card characteristics
			  var cards = new Array();
			
			  // Define the cards we support. You may add addtional card types.
			  
			  //  Name:      As in the selection box of the form - must be same as user's
			  //  Length:    List of possible valid lengths of the card number for the card
			  //  prefixes:  List of possible prefixes for the card
			  //  checkdigit Boolean to say whether there is a check digit
			  
			  cards [0] = { name: "Visa", 
						   length: "13,16", 
						   prefixes: "4",
						   checkdigit: true};
			  cards [1] = {name: "MasterCard", 
						   length: "16", 
						   prefixes: "51,52,53,54,55",
						   checkdigit: true};
			  cards [2] = {name: "DinersClub", 
						   length: "14,16", 
						   prefixes: "300,301,302,303,304,305,36,38,55",
						   checkdigit: true};
			  cards [3] = {name: "CarteBlanche", 
						   length: "14", 
						   prefixes: "300,301,302,303,304,305,36,38",
						   checkdigit: true};
			  cards [4] = {name: "American Express", 
						   length: "15", 
						   prefixes: "34,37",
						   checkdigit: true};
			  cards [5] = {name: "Discover", 
						   length: "16", 
						   prefixes: "6011,650",
						   checkdigit: true};
			  cards [6] = {name: "JCB", 
						   length: "15,16", 
						   prefixes: "3,1800,2131",
						   checkdigit: true};
			  cards [7] = {name: "enRoute", 
						   length: "15", 
						   prefixes: "2014,2149",
						   checkdigit: true};
			  cards [8] = {name: "Solo", 
						   length: "16,18,19", 
						   prefixes: "6334, 6767",
						   checkdigit: true};
			  cards [9] = {name: "Switch", 
						   length: "16,18,19", 
						   prefixes: "4903,4905,4911,4936,564182,633110,6333,6759",
						   checkdigit: true};
			  cards [10] = {name: "Maestro", 
						   length: "16,18", 
						   prefixes: "5020,6",
						   checkdigit: true};
			  cards [11] = {name: "VisaElectron", 
						   length: "16", 
						   prefixes: "417500,4917,4913",
						   checkdigit: true};
						   
			  // Establish card type
			  var cardType = -1;
			  for (var i=0; i<cards.length; i++) {
			
				// See if it is this card (ignoring the case of the string)
				if (cardname.toLowerCase () == cards[i].name.toLowerCase()) {
				  cardType = i;
				  break;
				}
			  }
			  
			  // If card type not found, report an error
			  if (cardType == -1) {
				 ccErrorNo = 0;
				 return false; 
			  }
			   
			  // Ensure that the user has provided a credit card number
			  if (cardnumber.length == 0)  {
				 ccErrorNo = 1;
				 return false; 
			  }
				
			  // Now remove any spaces from the credit card number
			  cardnumber = cardnumber.replace (/\s/g, "");
			  
			  // Check that the number is numeric
			  var cardNo = cardnumber
			  var cardexp = /^[0-9]{13,19}$/;
			  if (!cardexp.exec(cardNo))  {
				 ccErrorNo = 2;
				 return false; 
			  }
				   
			  // Now check the modulus 10 check digit - if required
			  if (cards[cardType].checkdigit) {
				var checksum = 0;                                  // running checksum total
				var mychar = "";                                   // next char to process
				var j = 1;                                         // takes value of 1 or 2
			  
				// Process each digit one by one starting at the right
				var calc;
				for (i = cardNo.length - 1; i >= 0; i--) {
				
				  // Extract the next digit and multiply by 1 or 2 on alternative digits.
				  calc = Number(cardNo.charAt(i)) * j;
				
				  // If the result is in two digits add 1 to the checksum total
				  if (calc > 9) {
					checksum = checksum + 1;
					calc = calc - 10;
				  }
				
				  // Add the units element to the checksum total
				  checksum = checksum + calc;
				
				  // Switch the value of j
				  if (j ==1) {j = 2} else {j = 1};
				} 
			  
				// All done - if checksum is divisible by 10, it is a valid modulus 10.
				// If not, report an error.
				if (checksum % 10 != 0)  {
				 ccErrorNo = 3;
				 return false; 
				}
			  }  
			
			  // The following are the card-specific checks we undertake.
			  var LengthValid = false;
			  var PrefixValid = false; 
			  var undefined; 
			
			  // We use these for holding the valid lengths and prefixes of a card type
			  var prefix = new Array ();
			  var lengths = new Array ();
				
			  // Load an array with the valid prefixes for this card
			  prefix = cards[cardType].prefixes.split(",");
				  
			  // Now see if any of them match what we have in the card number
			  for (i=0; i<prefix.length; i++) {
				var exp = new RegExp ("^" + prefix[i]);
				if (exp.test (cardNo)) PrefixValid = true;
			  }
				  
			  // If it isn't a valid prefix there's no point at looking at the length
			  if (!PrefixValid) {
				 ccErrorNo = 3;
				 return false; 
			  }
				
			  // See if the length is valid for this card
			  lengths = cards[cardType].length.split(",");
			  for (j=0; j<lengths.length; j++) {
				if (cardNo.length == lengths[j]) LengthValid = true;
			  }
			  
			  // See if all is OK by seeing if the length was valid. We only check the 
			  // length if all else was hunky dory.
			  if (!LengthValid) {
				 ccErrorNo = 4;
				 return false; 
			  };   
			  

			  // The credit card is in the required format.
			  return true;
			}
			  
			  
			cardnumber=value;
			cardname=$("#cc_type").val(); 
			if(!checkCreditCard(cardnumber, cardname))
			{	
				$('#cc_number_err').html(ccErrors[ccErrorNo]);
				return false;
			}	
			else
			{	
				$('#cc_number_err').html('');
				return true;
			}
  },"");


/* ========================================================================================================================= */			   
/* ========================================================================================================================= */
});



function formsubmit(formname)
{	

	if(typeof formname.submit=="function") 
     {
        formname.submit();
     }
     else if(typeof formname.submit.click=="function") 
     {
         formname.submit.click();
     } 
     else 
     {
         formname.submit();
     }
}

function formsubmitById(formId)
{	
	if(typeof document.getElementById(formId).submit=="function") 
     {
        document.getElementById(formId).submit();
     }
     else if(typeof document.getElementById(formId).submit.click=="function") 
     {
         document.getElementById(formId).submit.click();
     } 
     else 
     {	
         document.getElementById(formId).submit();
     }
}


function GetCardType(number)
{
    // Visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // MasterCard
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null)
        return "MasterCard";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";

    // Amex
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "Amex";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";

    // Maestro
    re = new RegExp('^6[7-9][0-9]{0,17}$');
    if (number.match(re) != null)
        return "Maestro";

    // American Express
    re = new RegExp("^(34|37)");
    if (number.match(re) != null)
        return "American Express";

    // Diners Club
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners Club";

    // Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Carte Blanche";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";

    return "";
}