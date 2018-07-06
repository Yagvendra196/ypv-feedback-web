$(document).ready(function() {
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
    rules: {
        current_password : { 
          required  : [true,'Current Password'],
          ascii_only: [true,'Current Password'],
          minlen    : [true,'Current Password','5'],
          maxlen    : [true,'Current Password','11']
        },
        new_password : { 
          required  : [true,'New Password'],
          ascii_only: [true,'New Password'],
          minlen    : [true,'New Password','5'],
          maxlen    : [true,'New Password','11']
        },
        confirm_new_password : { 
          required  : [true,'Confirm New Password'],
          ascii_only: [true,'Confirm New Password'],
          minlen    : [true,'Confirm New Password','5'],
          maxlen    : [true,'Confirm New Password','11'],
          equalTo: "#new_password"
        },
    },
    highlight: function(element, errorClass) {
        $(element).parent().removeClass('has-success');
        $(element).parent().addClass('has-error');
    },
    unhighlight: function(element, errorClass, validClass) {
        $(element).parent().removeClass('has-error');
        $(element).parent().addClass('has-success');
    },
    submitHandler:function(){
        var postData = $("#form").serializeArray(); 
        var formURL = baseUrl+'api/userServices/changePassword';
        $.ajax({   
            url : formURL,
            type: "POST",
            data : postData,
            success:function(apiResult, textStatus, jqXHR) {  
                if (apiResult.response=='S') { 
                	$('.alert-success').removeClass('hide');                  
                	$('.alert-success').addClass('show');                  
                	$('.alert-success').show();
                }
                if (apiResult.response=='F') {
                    if (apiResult.errors!=undefined) {
                    	$.each(apiResult.errors, function( element, error ) {
                            $('#form #'+element).parent().addClass('has-error');
                            $('#form #'+element).after('<p id='+element+'"-error" class="help-block">'+error+'</p>');
						});
                    }
                }
                console.log(apiResult);
            },
            error: function(jqXHR, textStatus, errorThrown) { },
        });
    }    
  });   
});