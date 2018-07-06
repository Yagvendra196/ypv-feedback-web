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
    }
  });   
});