$(document).ready(function() {
  $('#submit').on('click',function(){$('#submit').hide()});
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
        email : 
        { 
          required  : [true,'Email'],
          email     : [true,'Email'],
          ascii_only: [true,'Email'],
          minlen    : [true,'Email','1'],
          maxlen    : [true,'Email','255']
        }
    },
    highlight: function(element, errorClass) {
        $(element).parent().removeClass('has-success');
        $(element).parent().addClass('has-error');
    },
    invalidHandler:function() {$('#submit').show()},
    unhighlight: function(element, errorClass, validClass) {
        $(element).parent().removeClass('has-error');
        $(element).parent().addClass('has-success');
    },
    submitHandler:function(){
        $('#submit').hide();   
        var postData = $("#form").serializeArray(); 
        var formURL = baseUrl+'api/userServices/forgot_password';
        $.ajax({   
            url : formURL,
            type: "POST",
            data : postData,
            success:function(apiResult, textStatus, jqXHR) {  
                if (apiResult.response=='S') //let submit form
                { $('#email').parent().append('We have sent a email to you. Please check your inbox');
                  $('#email').remove();   
                  $('#submit').remove();   
                }
                if (apiResult.response=='F') {
                    $('#submit').show();   
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
