function setLoginValidations(obj) {
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
        username : 
        { 
          required  : [true,'Email'],
          email     : [true,'Email'],
          ascii_only: [true,'Email'],
          minlen    : [true,'Email','1'],
          maxlen    : [true,'Email','255']
        },
        password :
        {
          required  : [true,'Password '],
          ascii_only: [true,'Password'],
          minlen    : [true,'Password','5'],
          maxlen    : [true,'Password','11']
        }
    },
    highlight: function(element, errorClass) {
        $(element).parent().find(".input-label").effect( "shake", { direction: "right", times: 20, distance: 4}, 1000 );
        $(element).parent().find(".input-label").removeClass('has-success');
        $(element).parent().find(".input-label").addClass('has-error');
    },
    unhighlight: function(element, errorClass, validClass) {
        $(element).parent().find(".input-label").stop(true, true);
        $(element).parent().find(".input-label").removeClass('has-error');
        $(element).parent().find(".input-label").addClass('has-success');
    },
    errorPlacement: function(error, element) {
        return false;
    },
    submitHandler:function(){
        $(obj).addClass('disabled');
        var postData = $("#form").serializeArray(); 
        var formURL = baseUrl+'api/userServices/login';
        $.ajax({   
            url : formURL,
            type: "POST",
            data : postData,
            success:function(apiResult, textStatus, jqXHR) {  
                $(obj).removeClass('disabled');
                if (apiResult.response=='S') { 
                    $('#toDashboard').trigger("click");
                   //window.location=baseUrl;
                   //location.reload();
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
}