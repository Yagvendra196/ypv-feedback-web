$(document).ready(function() {
  //Start Validations
  $("#form").validate({
    //* 
    //errorContainer: container,                       //FOR THIS Option You will have to use jquery.metadata.js 
    //errorLabelContainer: $("ul", container),     //FOR THIS Option You will have to use jquery.metadata.js 
    //wrapper: 'li',                   //FOR THIS Option You will have to use jquery.metadata.js 
    meta: "validate",                //FOR THIS Option You will have to use jquery.metadata.js 
    //*/
    //errorClass: "error-msg-single-line",
    errorClass: "help-block",
    validClass: "has-success",
    errorElement: "p",
    invalidHandler:function() {$('.alert-success').remove();},
    rules: {
            //Note if element is not required than minlen and maxlen rules should also not be apply and required should not be array it should be false only
            'first_name' : { 
              required  : [true,'First name'],
              ascii_only: [true,'First name'],
              minlen    : [true,'First name','1'],
              maxlen    : [true,'First name','255']
            },
            'last_name' : { 
                  //required  : [false,'Last name'],
                  ascii_only: [true,'Last name'],
                  //minlen    : [true,'Last name','1'],
                  maxlen    : [true,'Last name','255']
                },
            'email' : { 
                  required  : [true,'Email'],
                  ascii_only: [true,'Email'],
                  minlen    : [true,'Email','1'],
                  maxlen    : [true,'Email','255']
                },
            /*'location' : { 
              required  : [true,'Location'],
              ascii_only: [true,'Location'],
              minlen    : [true,'Location','3'],
              maxlen    : [true,'Location','100']
            },*/                
            'dob' : { 
                  //required  : [true,'Date of birth'],
                  ascii_only: [true,'Date of birth'],
                  //minlen    : [true,'Date of birth','1'],
                  maxlen    : [true,'Date of birth','255']
                },
            'married' : { 
                  //required  : [true,'Marital status'],
                  ascii_only: [true,'Marital status'],
                  //minlen    : [true,'Marital status','1'],
                  maxlen    : [true,'Marital status','255']
                },
            'gender' : { 
                  //required  : [true,'Gender'],
                  ascii_only: [true,'Gender'],
                  //minlen    : [true,'Gender','1'],
                  maxlen    : [true,'Gender','255']
                },    
            'address' : { 
                  //required  : [true,'Address'],
                  ascii_only: [true,'Address'],
                  //minlen    : [true,'Address','1'],
                  maxlen    : [true,'Address','255']
                },
            'city' : { 
                  required  : [true,'City'],
                  ascii_only: [true,'City'],
                  minlen    : [true,'City','3'],
                  maxlen    : [true,'City','255']
                },
            'state' : { 
                  //required  : [true,'State'],
                  ascii_only: [true,'State'],
                  //minlen    : [true,'State','1'],
                  maxlen    : [true,'State','255']
                },
            'country_id' : { 
                  //required  : [true,'Country'],
                  ascii_only: [true,'Country'],
                  //minlen    : [true,'Country','1'],
                  maxlen    : [true,'Country','255'],
                  digits: true,
                },
            'pin_code' : { 
                  //required  : [true,'Pin code'],
                  ascii_only: [true,'Pin code'],
                  //minlen    : [true,'Pin code','6'],
                  maxlen    : [true,'Pin code','9']
                },
            'mobile_1' : { 
                  //required  : [true,'Mobile number'],
                  ascii_only: [true,'Mobile number'],
                  //minlen    : [true,'Mobile number','10'],
                  maxlen    : [true,'Mobile number','10'],
                  digits: true,
                  //number: true,
                },
            'mobile_2' : { 
                  //required  : false,
                  ascii_only: [true,'Mobile number'],
                  //minlen    : [true,'Mobile number','10'],
                  maxlen    : [true,'Mobile number','10'],
                  digits: true,
                  //number: true,
                },
            'phone1_1' : { 
                  /*
                  required  :   {
                                depends: function(element) {
                                    return ($('#phone1_3').val() != '') ? true : false ;
                                  }
                                },
                  */
                  ascii_only: [true,'Phone'],
                  //minlen    : [true,'Phone','1'],
                  //maxlen    : [true,'Phone','255'],
                  digits: true,
                  //number: true,
                },
            'phone1_2' : { 
                  /*
                  required  :  {
                                depends: function(element) {
                                    return ($('#phone1_3').val() != '') ? true : false ;
                                  }
                                },
                  */
                  ascii_only: [true,'Phone'],
                  //minlen    : [true,'Phone','1'],
                  //maxlen    : [true,'Phone','255'],
                  digits: true,
                  //number: true,
                },
            'phone1_3' : { 
                  //required  : false,
                  ascii_only: [true,'Phone'],
                  //minlen    : [true,'Phone','1'],
                  //maxlen    : [true,'Phone','255'],
                  digits: true,
                  //number: true,
                },
            'level_id' : { 
                  required  : [true,'Level'],
                  ascii_only: [true,'Level'],
                  minlen    : [true,'Level','1'],
                  maxlen    : [true,'Level','255'],
                  digits: true,
                },
            'teacher' : { 
                  required  : false,
                  ascii_only: [true,'Teacher'],
                  //minlen    : [true,'Teacher','1'],
                  //maxlen    : [true,'Teacher','1']
                }
    },
    messages: {
                'phone1_1' : {
                    required : "Phone is required",
                },
                'phone1_2' : {
                    required : "Phone is required",
                },
    },
    highlight: function(element, errorClass) {
        $(element).parent().removeClass('has-success');
        $(element).parent().addClass('has-error');
    },
    unhighlight: function(element, errorClass, validClass) {
        $(element).parent().removeClass('has-error');
        //$(element).parent().addClass('has-success');
    },
    errorPlacement: function(error, element)
    {
      custom_error_placement = ['married','phone1_1','phone1_2','phone1_3']; 
      if (in_array(element.attr('name'),custom_error_placement)) {         
        if ( in_array(element.attr('name'),['phone1_1','phone1_2','phone1_3']) &&
             $('#phone_jquery_custome_error').html()==''
            ) {
            error.appendTo($('#phone_jquery_custome_error') );    
        } else {
            error.appendTo($('#'+( (element.attr('name')).replace(/[[]]/i,"\\[\\]") )+'_jquery_custome_error') );    
        }
        
      } else {
        error.appendTo(element.parent());
      }
      //-------support functions
      function in_array(val,array) {
        for (key in array)  {     
            if ( array[key]==val ) {
                return true;
            }
        }
        return false;
      }
    } 
  });   
  //End Validations

    //Start get All Countries
    $.ajax({   
        url : baseUrl+'api/dataServices/getAllCountries',
        type: "GET",
        data : {},
        success:function(apiResult, textStatus, jqXHR) {  
            if (apiResult.response=='S') {
              //----
              var option = $('<option>').text('India').attr('value', '99').css('font-weight','bold');
              if (row.country_id==undefined || row.country_id==99) {option.attr('selected', 'selected');}
              $('#country_id').append(option);
              //----
              contries = apiResult.data;
              $.each(contries, function(i, country) {
                  if (country.country_id!='99') {
                    var option = $('<option>').text(country.country_name);
                    option.attr('value', country.country_id);
                    if (row.country_id!=undefined && row.country_id==country.country_id) {option.attr('selected', 'selected');}
                    $('#country_id').append(option);
                  }
              });
              //----
            }
            if (apiResult.response=='F') {
                alert(apiResult.message);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) { },
    });
    //End get All Countries

    $('#dob').datetimepicker({"autoclose":true,"showButtonPanel": true,"changeMonth":true,"changeYear":true,"yearRange":'-100:+100',"timeFormat":"hh:mm:ss TT","dateFormat":"M dd, yy"});
});

