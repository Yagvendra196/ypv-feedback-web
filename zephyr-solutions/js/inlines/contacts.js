$(document).ready(function ()
{
    var validator = $("#contactForm").validate({
        errorClass: "error_msg",
        validClass: "success",
        errorElement: "span",
        highlight: function (element, errorClass, validClass) {
            $(element).parents("div.form-group").addClass('has-error');

        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents("div.form-group").removeClass('has-error');
        },
        rules: {
            name: {
                required: [true, 'Name'],
                minlength: 1,
                maxlength: 100,
                alphaOnly: [true, 'Name'],
                ascii_only: [true, 'Name']
            },
            email: {
                required: [true, 'Email'],
                minlength: 1,
                maxlength: 100,
                email: true,
                ascii_only: [true, 'Email']
            },
            phone: {
                required: [true, 'Phone'],
                ascii_only: [true, 'Phone'],
                //minlen: [true, 'Phone', '10'],
                //maxlen: [true, 'Phone', '10'],
                phone: [true, 'Phone']
            },
            subject: {
                required: [true, 'Subject'],
                minlength: 1,
                maxlength: 100,
                ascii_only: [true, 'Subject']
            },
            message: {
                required: [true, 'message'],
                //minlength: 1,
                //maxlength: 100,
                ascii_only: [true, 'message']
            },
        },
        messages: {
            name: {
                    required: "Please enter name",
            },  
            email: {
                required: "Please enter email",
            },
            phone: {
                required: "Please enter phone",
            },
            subject: {
                required: "Please enter subject",
            },
            message: {
                required: "Please enter message",
            }
        }
    });
});