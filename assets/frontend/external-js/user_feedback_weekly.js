function setFeedbackWeeklyValidations(obj) {
    $(document).ready(function () {

        var rules1 = { 
                required: [true, 'Feedback field'], 
                ascii_only: [true, 'Feedback field'],
                minlen: [true, 'feedback field', '1'],
                maxlen: [true, 'feedback field', '255'],
                digits: true,
        };

        var rules2 = {
                    required: [true, 'Feedback field'],
                    ascii_only: [true, 'Feedback field'],
                    minlen: [true, 'Feedback field', '1'],
                    maxlen: [true, 'Feedback field', '255']
        };

        var rules3 = {
                    required: [true, 'Feedback field'],
                    ascii_only: [true, 'Feedback field'],
                    minlen: [true, 'Feedback field', '1'],
                    maxlen: [true, 'Feedback field', '255']
        };

        //Start Validations
        $("#feedbackWeeklyForm").validate({
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
                'feedback_field_1': rules1,
                'feedback_field_2': rules1,
                'feedback_field_3': rules1,
                'feedback_field_4': rules1,
                'feedback_field_5': rules1,
                'feedback_field_6': rules2,
                'feedback_field_7': rules1,
                'feedback_field_8': rules1,
                'feedback_field_9': rules1,
                'feedback_field_10': rules1,
                'feedback_field_11': rules1,
                'feedback_field_12': rules1,
                'feedback_field_13': rules2,
                'feedback_field_14': rules2,
                'feedback_field_15': rules3,
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
                var postData = $("#feedbackWeeklyForm").serializeArray();
                var formURL = baseUrl + 'api/userServices/feedbackWeekly';
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
                                    $('#feedbackWeeklyForm #'+element).parent().addClass('has-error');
                                    $('#feedbackWeeklyForm #'+element).after('<p id='+element+'"-error" class="help-block">'+error+'</p>');
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