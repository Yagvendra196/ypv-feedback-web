function setFeedbackMonthlyValidations(obj) {
    $(document).ready(function () {

        var rules = { 
                required: [true, 'Feedback field'],
                min: 1,
                max: 255,
                float_numbers: [true, 'Feedback field'],
                postive_float: [true, 'Feedback field']
        };

        //Start Validations
        $("#feedbackMonthlyForm").validate({
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
                //Note if element is not required than minlenlen and maxlenlen rules should also not be apply and required should not be array it should be false only
                'feedback_field_16': rules,
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
                var postData = $("#feedbackMonthlyForm").serializeArray();
                var formURL = baseUrl + 'api/userServices/feedbackMonthly';
                $.ajax({
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (apiResult, textStatus, jqXHR) {
                        $(obj).removeClass('disabled');
                        if (apiResult.response == 'S') {
                            $('#toMyBuddies').trigger("click");
                        }
                        if (apiResult.response == 'F') {
                            if (apiResult.errors!=undefined) {
                                $.each(apiResult.errors, function( element, error ) {
                                    $('#feedbackMonthlyForm #'+element).parent().addClass('has-error');
                                    $('#feedbackMonthlyForm #'+element).after('<p id='+element+'"-error" class="help-block">'+error+'</p>');
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