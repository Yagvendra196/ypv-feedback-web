function setSignUpValidations(obj) {
    $(document).ready(function () {
        //Start Validations
        $("#signUpForm").validate({
            //* 
            //errorContainer: container,                       //FOR THIS Option You will have to use jquery.metadata.js 
            //errorLabelContainer: $("ul", container),     //FOR THIS Option You will have to use jquery.metadata.js 
            //wrapper: 'li',                   //FOR THIS Option You will have to use jquery.metadata.js 
            meta: "validate", //FOR THIS Option You will have to use jquery.metadata.js 
            //*/
            //errorClass: "error-msg-single-line",
            errorClass: "help-block",
            validClass: "has-success",
            errorElement: "p",
            rules: {
                //Note if element is not required than minlen and maxlen rules should also not be apply and required should not be array it should be false only
                'first_name': {
                    required: [true, 'First name'],
                    ascii_only: [true, 'First name'],
                    minlen: [true, 'First name', '1'],
                    maxlen: [true, 'First name', '255']
                },
                'last_name': {
                    required: [true, 'Last name'],
                    ascii_only: [true, 'Last name'],
                    minlen: [true, 'Last name', '1'],
                    maxlen: [true, 'Last name', '255']
                },
                'email': {
                    required: [true, 'Email'],
                    email: [true,'Email'],
                    ascii_only: [true, 'Email'],
                    minlen: [true, 'Email', '1'],
                    maxlen: [true, 'Email', '255']
                },
                'password': {
                    required: [true, 'Password '],
                    ascii_only: [true, 'Password'],
                    minlen: [true, 'Password', '5'],
                    maxlen: [true, 'Password', '11']
                },
                'level_id': {
                    required: [true, 'Level'],
                    ascii_only: [true, 'Level'],
                    minlen: [true, 'Level', '1'],
                    maxlen: [true, 'Level', '255'],
                    digits: true,
                },
                'examiner_id': {
                    required: [true, 'Trainer Name'],
                    ascii_only: [true, 'Trainer Name'],
                    minlen: [true, 'Trainer Name', '1'],
                    maxlen: [true, 'Trainer Name', '255']
                },
                'gender': {
                    required: [true, 'Gender'],
                    ascii_only: [true, 'Gender'],
                    minlen: [true, 'Gender', '1'],
                    maxlen: [true, 'Gender', '255']
                },
                'mobile_1': {
                    required: [true, 'Contact number'],
                    ascii_only: [true, 'Contact number'],
                    minlen: [true, 'Contact number', '10'],
                    maxlen: [true, 'Contact number', '10'],
                    digits: true,
                    //number: true,
               },
            },
            highlight: function (element, errorClass) { 
                $(element).parent().find(".input-label").effect( "shake", { direction: "right", times: 20, distance: 4}, 1000 );
                $(element).parent().find(".input-label").removeClass('has-success');
                $(element).parent().find(".input-label").addClass('has-error');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).parent().find(".input-label").stop(true, true);
                $(element).parent().find(".input-label").removeClass('has-error');
                $(element).parent().find(".input-label").addClass('has-success');
            },
            errorPlacement: function(error, element) {
                return false;
            },
            submitHandler: function () {
                $(obj).addClass('disabled');
                var postData = $("#signUpForm").serializeArray();
                var formURL = baseUrl + 'api/userServices/signUp';
                $.ajax({
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (apiResult, textStatus, jqXHR) {
                        $(obj).removeClass('disabled');
                        if (apiResult.response == 'S') {
                            $('#toDashboard').trigger("click");
                        }
                        if (apiResult.response == 'F') {
                            if (apiResult.errors!=undefined) {
                                $.each(apiResult.errors, function( element, error ) {
                                    $('#signUpForm #'+element).parent().addClass('has-error');
                                    $('#signUpForm #'+element).after('<p id='+element+'"-error" class="help-block">'+error+'</p>');
                                });
                            }
                        }
                        console.log(apiResult);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    },
                });
            }
        });
        //End Validations
    });
}