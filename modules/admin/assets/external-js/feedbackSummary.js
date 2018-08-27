var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
var startDate;
var endDate;
var given_by;
var given_to;
var given_by_year_range = $("#given_by_year_range").val();
var given_by_year_start = given_by_year_range.split(":");
    given_by_year_start = given_by_year_start[0];

var given_to_year_range = $("#given_to_year_range").val();
var given_to_year_start = given_to_year_range.split(":");
    given_to_year_start = given_to_year_start[0];

var given_by_month = $("#given_by_month").val();
var week_id = 0;
$("#selected_date").val(month[given_by_month-1]+' '+given_by_year_start);


var currentDate = new Date(given_by_year_start);
var currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);


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
    getRecords();
});

function getRecords(){
    var post_url = baseUrl + 'api/userServices/get_week_info_by_date';
    $.ajax({
        url: post_url,
        type: 'post',
        data: {'selected_date': $('#selected_date_hidden').val()},
        success: function (result)
        {
            if (result == '__WrongUser')
                window.top.location = baseUrl;
            if (result.response == 'S'){
                $('#idWeek').val(result.data.idWeek);
            }
            showFeedback();
                
        }
    });
}
function ViewMonthly()
{
    if($("#menu2_a").parent().hasClass('active')){
        $('#filterType').val("given");
    }else{
        $('#filterType').val("received");
    }

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

            if (result.response_week == 'F') {
                var row2 = $("<tr />");
                $("#feedbackDataTable-week tbody").html(row2); 
                $("#feedbackDataTable-week thead tr").html('<th>Activity</th>');
                row2.append($("<td colspan='1'>" + result.message_week + "</td>"));
            } else {
                week_id = 0;
                $("#feedbackDataTable-week tbody").html('');
                $("#feedbackDataTable-week thead tr").html('<th>Activity</th>');
                drawTableWeek(result.data_week, result.week_count);
            }
            //response_history
            if (result.response_history == 'F') {
                //$('#serviceFail').html(result.message);
                var row = $("<tr />");
                $("#feedbackDataTable-history tbody").html(row); 
                row.append($("<td colspan='3'>" + result.message_history + "</td>"));
            } else {
                $("#feedbackDataTable-history tbody").html('');
                drawTableHistory(result.data_history);
            }
        }
    });
}

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}


function drawTableWeek(data,week_count) {
    //$("#feedbackDataTable-week thead tr").html('<th>Activity</th>');
    for (var j =0; j < week_count; j++) {
        var week_name = data[j][0].week_name;

        week_name = week_name.replace("(", "<br>");
        week_name = week_name.replace(")", "");
        var thead = '<th>'+week_name+'</th>';
        $("#feedbackDataTable-week thead tr").append(thead);
    };
    for (var i = 0; i < data[0].length; i++) {
        drawRowWeek(data,i,week_count);
    }
}

function drawTableHistory(data) {
    for (var i = 0; i < data.length; i++) {
        drawRowHistory(data[i],i);
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

function drawRowHistory(rowData,i) {
    var row = $("<tr />")
    $("#feedbackDataTable-history").append(row);
    row.append($("<td>"+eval(i+1)+".</td>"));
    var start = '-';
    var end   = '-';
    
    if(rowData.start_date != "0000-00-00" && rowData.start_date){
        start = rowData.start_date;
    }
    if(rowData.end_date != "0000-00-00" && rowData.end_date){
        end = rowData.end_date;
    }
    row.append($("<td>" + start + "</td>"));
    row.append($("<td>" + end + "</td>"));
    //row.append($("<td>" + rowData.created_at + "</td>"));
}

function drawRowWeek(rowData,i,week_count) {
    
    var row = $("<tr />")
    $("#feedbackDataTable-week").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it

    for (var j =0; j < week_count; j++) {
        var tempRowData = rowData[j][i];
        if(j==0)
        row.append($("<td>" + tempRowData.feedback_field_name + "</td>"));

        var user_feedback_field_value = tempRowData.user_feedback_field_value;
        if(!user_feedback_field_value){
            user_feedback_field_value = '-';
        }
        row.append($("<td>" + user_feedback_field_value + "</td>"));
        //row.append($("<td>" + tempRowData.created_at + "</td>"));
    }
}

function ViewWeekly()
{
    if($("#menu2_a").parent().hasClass('active')){
        $('#filterType').val("given");
    }else{
        $('#filterType').val("received");
    }

    var post_url = baseUrl + 'api/userServices/view_feedback_fields';
    $.ajax({
        url: post_url,
        type: 'post',
        data: $('#form').serializeArray(),
        success: function (result)
        {
            if (result == '__WrongUser')
                window.top.location = baseUrl;
            if (result.response == 'F') {
                //$('#serviceFail').html(result.message);
                var row = $("<tr />")
                $("#feedbackDataTable tbody").html(row); 
                row.append($("<td colspan='3'>" + result.message + "</td>"));
            } else {
               drawTable(result.data);
            }
        }
    });
}

function showFeedback()
{ 
    if ($('input[type="radio"][name="feedback_type"]:checked').val() == 'Weekly'){
        weekPicker();
        ViewWeekly();
    }else{ 
        monthPicker();
        ViewMonthly();
    }
}

function weekPicker(){

    $('.week-picker').datepicker( {
        firstDay: 1,
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: 'M dd, yy',
        onSelect: function(dateText, inst) { 
            var date = $(this).datepicker('getDate');
            startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay()+1);
            endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $(".week-picker").val($.datepicker.formatDate( dateFormat, startDate, inst.settings) +' - '+$.datepicker.formatDate( dateFormat, endDate, inst.settings));
            $('input[name="selected_date"]').val($.datepicker.formatDate( dateFormat, startDate, inst.settings));
            $("#selected_date").trigger('change');
            selectCurrentWeek();
        },
        beforeShowDay: function(date) {
            console.log()
            var cssClass = '';
            if(date >= startDate && date <= endDate)
                cssClass = 'ui-datepicker-current-day';
            return [true, cssClass];
        },
        onChangeMonthYear: function(year, month, inst) {
            selectCurrentWeek();
        }
    });
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

jQuery(document).ready(function () {

    given_by = $("#given_by").html();
    given_to = $("#given_to").html();

    $("#given_to").html('');
    //$("#selected_date_hidden").val(currentDate);
    $("#selected_date_hidden").val( new Date(month[given_by_month-1]+' '+given_by_year_start) );

    $("#menu1_a").click(function(){
        $(".result-show-message, .result-show-table, .result-show").removeClass('hide');
        $("#given_to").html('');
        $("#given_by").html(given_by);
        if(given_by.length<10){
            $(".result-show, .result-show-table").hide();
            $(".result-show-message").show();
        }else{
            $(".result-show, .result-show-table").show();
            $(".result-show-message").hide();
        }
        currentDate = new Date(given_by_year_start);
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); 
        $("#selected_date").val('Jan '+given_by_year_start);
        $("#selected_date_hidden").val(currentDate);
        $('.month-picker').datepicker('option','yearRange',given_by_year_range);

        $('.month-picker').datepicker('option','defaultDate',currentDate);
        $('.month-picker').datepicker('setDate',currentDate);

        window.setTimeout(function () { showFeedback(); }, 500);
    });


    $("#menu2_a").click(function(){
        $(".result-show-message, .result-show-table, .result-show").removeClass('hide');
        $("#given_by").html('');
        if(given_to.length<10){
            $(".result-show, .result-show-table").hide();
            $(".result-show-message").show();
        }else{            
            $(".result-show, .result-show-table").show();
            $(".result-show-message").hide();
        }
        $("#given_to").html(given_to);
        /*alert(given_to_year_range);*/
        currentDate = new Date(given_to_year_start);
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); 
        $("#selected_date").val('Jan '+given_to_year_start);
        $("#selected_date_hidden").val(currentDate);
        $('.month-picker').datepicker('option','yearRange',given_to_year_range);
        
        $('.month-picker').datepicker('option','defaultDate',currentDate);
        $('.month-picker').datepicker('setDate',currentDate);
        
        window.setTimeout(function () { showFeedback(); }, 500);
    });

    showFeedback();
    $("#use_date_filter").click(function(){
        $('#selected_date').toggle();
        // #Weekly-Monthly
    });

    $('input[type="radio"][name="feedback_type"]').click(function(){
        var type = $(this).val();
        $("#selected_date").val('');
        $('input[name="selected_date"]').val('');
        if(type=='Weekly'){
            $(".month-picker").datepicker("destroy");
            $("#selected_date").addClass('week-picker');
            $("#selected_date").removeClass('month-picker');
            weekPicker();
        }else{
            $(".week-picker").datepicker("destroy");
            $("#selected_date").addClass('month-picker');
            $("#selected_date").removeClass('week-picker');
            monthPicker();
        }

    });

    getRecords();
});



   /* $('.selected_date').datepicker({
                    "autoclose": true, 
                    "showButtonPanel": true, 
                    "changeMonth": true, 
                    "changeYear": true, 
                    "yearRange": '-100:+100', 
                    "timeFormat": "hh:mm:ss TT", 
                    "dateFormat": "M dd, yy",
                    "selectWeek":true
                });
    */
