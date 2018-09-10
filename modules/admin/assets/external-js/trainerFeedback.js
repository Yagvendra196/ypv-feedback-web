var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
var startDate;
var endDate;
var given_by_year_range = $("#given_by_year_range").val();
var given_by_year_start = given_by_year_range.split(":");
    given_by_year_start = given_by_year_start[0];

var given_by_month = $("#given_by_month").val();
var week_id = 0;
$("#selected_date").val(month[given_by_month-1]+' '+given_by_year_start);

$(document).on('click','#nextButton', function(){
    var d1 = $("#selected_date_hidden").val();
    var d2 = new Date(d1);
    d2.setMonth(d2.getMonth()+1);
    
    $('.month-picker').datepicker('option','defaultDate',d2);
    $('.month-picker').datepicker('setDate',d2);
    $("#selected_date_hidden").val(d2);
    $("#selected_date").trigger('change');    
});


$(document).on('click','#previousButton', function(){
    var d1 = $("#selected_date_hidden").val();
    var d2 = new Date(d1);
    d2.setMonth(d2.getMonth()-1);
    
    $('.month-picker').datepicker('option','defaultDate',d2);
    $('.month-picker').datepicker('setDate',d2);
    $("#selected_date_hidden").val(d2);
    $("#selected_date").trigger('change');    
});




var selectCurrentWeek = function() {
        if($('#selected_date').hasClass("week-picker")){   
            window.setTimeout(function () {
                $('.ui-datepicker-current-day a').addClass('ui-state-active')
            }, 1000);
        }
    }

$(document).on('mousemove','.ui-datepicker-calendar tr', function() {  
        if($('#selected_date').hasClass("week-picker")){
            $(this).find('td a').addClass('ui-state-hover'); 
        }
});
$(document).on('mouseleave', '.ui-datepicker-calendar tr', function() { 
    if($('#selected_date').hasClass("week-picker")){
        $(this).find('td a').removeClass('ui-state-hover'); 
    }
});



$(document).on('change','#selected_date', function () {
    showFeedback();
});


function showFeedback(){ 
    if ($('input[type="radio"][name="feedback_type"]:checked').val() == 'for trainers'){
        monthPicker();
        ViewMonthly();
    }
}

function monthPicker(){

    $('.month-picker').datepicker({
        firstDay: 1,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'M yy',
        autoclose: true,
        orientation: "left",
        hideIfNoPrevNext: true,
        yearRange:given_by_year_range,
        onSelect: function(dateText, inst) {
            //showFeedback();
            //$('input[name="selected_date"]').val();
        },
        onClose: function(dateText, inst) { 
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
            $('input[name="selected_date"]').val(new Date(inst.selectedYear, inst.selectedMonth, 1));
            $("#selected_date").trigger('change');
        },
        beforeShow : function(input, inst) {
            var tmp = $(this).val();
            // if(tmp.length>0){
              tmp = tmp.split(' ');
              tmp = new Date(tmp[1]+' '+tmp[0]+'1');
              //console.log(tmp);
              $(this).datepicker('option','defaultDate',tmp);
              $(this).datepicker('setDate',tmp);
            /*}*/
            setTimeout(function () {
                inst.dpDiv.css({
                    top: $(".month-picker").offset().top + 35,
                    left: $(".month-picker").offset().left
                });
            }, 0);
            hideClaendar();
        },
        onChangeMonthYear: function(year, month, widget) {
            hideClaendar();
        }
    });

    function hideClaendar(){
        setTimeout(function() {
               $('.ui-datepicker-calendar').hide();
               $('.ui-datepicker-buttonpane.ui-widget-content .ui-datepicker-current').hide();
        });
    }

    var tmp = $('.month-picker').val();
    if(tmp.length>0){
      tmp = tmp.split(' ');
      tmp = new Date(tmp[1]+' '+tmp[0]+'1');
      //console.log(tmp);
      $('.month-picker').datepicker('option','defaultDate',tmp);
      $('.month-picker').datepicker('setDate',tmp);
    }
}

function ViewMonthly(){
    var selectedDate = $('#selected_date_hidden').val();
    var newSelectedDate = selectedDate.replace('(India Standard Time)','(IST)');
    console.log(newSelectedDate);
    var selectedDate = $('#selected_date_hidden').val(newSelectedDate);
    //var post_url = baseUrl + 'api/userServices/view_feedback_fields';
    var post_url = baseUrl + 'api/userServices/view_feedback_fields_for_admin';
    $.ajax({
        url: post_url,
        type: 'post',
        data: $('#form').serializeArray(),
        success: function (result)
        {
            if (result == '__WrongUser')
                window.top.location = baseUrl;
            if (result.response_month == 'F') {
                //$('#serviceFail').html(result.message);
                var row = $("<tr />");
                $("#feedbackDataTable tbody").html(row); 
                row.append($("<td colspan='3'>" + result.message_month + "</td>"));
            } else {
                $("#feedbackDataTable tbody").html('');
                drawTable(result.data_month);
            }
        }
    });
}

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function drawRow(rowData) {
    var row = $("<tr />")
    $("#feedbackDataTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.feedback_field_name + "</td>"));
    var user_feedback_field_value = rowData.user_feedback_field_value;
    if(!user_feedback_field_value){
        user_feedback_field_value = '-';
    }
    row.append($("<td>" + user_feedback_field_value + "</td>"));
    //row.append($("<td>" + rowData.created_at + "</td>"));
}

jQuery(document).ready(function () {
    $("#selected_date_hidden").val( new Date(month[given_by_month-1]+' '+given_by_year_start) );
    $("#use_date_filter").click(function(){
        $('#selected_date').toggle();
    });
    showFeedback();
});
