<style type="text/css">
    .moveFiltersPosition{
        display:none;
        width:1125px;
        height:100px;
        background-color:#c3c3c3;
        position:relative;    
    }
    .ui-datepicker-calendar {display: none;}
</style>
<div class="panel-body">
    <h1><?php echo $page_title; ?></h1>
    <hr/>
    <h4><?php echo $page_title; ?></h4>
    <br/>
    <form class="form-horizontal">
        <div class="well">
            <div class="form-group result-show" >
                <span class="col-sm-1">Month</span>
                <div class="col-sm-2">
                    <input type="text" class="month-picker form-control" id="selected_date" value=""/>
                </div>
            </div>
        </div>  
        <div class="result-show-table " >
            <div class="row">
                <div class="col-sm-1 pull-left"><button type="button" id="previousButton" class="btn btn-sm btn-warning pull-left"> << Previous </button></div>
                <div class="col-sm-1 pull-right"><button type="button" id="nextButton" class="btn btn-sm btn-warning pull-right">Next >> </button></div>
                <div class="clearfix"></div>
                <div class="col-sm-12"><hr></div>
            </div>
            <div class="">
                <table class="table table-striped table-hover" id="listing">
                    <thead>
                        <tr>
                            <th>Trainer Name</th>
                            <th>Monthly Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $this->load->view('spritual_trainer_listing');?>
                    </tbody>
                </table>
            </div>
        </div>
    </form>
</div>
<script>
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
var given_by_year_start = "<?php echo !empty($given_by_year_start) ? $given_by_year_start : ''?>";
var given_by_year_end = "<?php echo !empty($given_by_year_end) ? $given_by_year_end : ''?>";
var given_by_month = "<?php echo !empty($given_by_month) ? $given_by_month : ''?>";
$("#selected_date").val(month[given_by_month-1]+' '+given_by_year_end);

$(document).ready(function () {
    $('.month-picker').datepicker({
        firstDay: 1,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'M yy',
        autoclose: true,
        orientation: "left",
        hideIfNoPrevNext: true,
        yearRange:given_by_year_start+":"+given_by_year_end,
        onClose: function(dateText, inst) { 
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
            $("#selected_date").trigger('change');
        },
        onNext: function(){
            console.log('res');
        }
    });
});

$(document).on('click','#nextButton', function(){
    changeDate('next');
});

$(document).on('click','#previousButton', function(){
    changeDate('pre'); 
});

$(document).on('change','#selected_date', function () {
    showTrainerFeedback();
});

/** Change Date as per Custom Next Prev Button click **/
function changeDate(state){
    var selectedDate = $("#selected_date").val();
    var dateStr = selectedDate.split(" ");
    var monthVal = new Date(Date.parse(dateStr[0] +" 1, "+dateStr[1])).getMonth()+1;
    var yearVal = dateStr[1];
    var d1 = monthVal + '/01/' + yearVal;
    
    var d2 = new Date(d1);
    if(state == 'next'){
        d2.setMonth(d2.getMonth()+1);
    } else {
        d2.setMonth(d2.getMonth()-1);
    }

    $('.month-picker').datepicker('option','defaultDate',d2);
    $('.month-picker').datepicker('setDate',d2);
    $("#selected_date").trigger('change');  
}
/** Change Date as per Custom Next Prev Button click **/

/** To show Trainer's list dynamically **/
function showTrainerFeedback(){
    var date = $('#selected_date').val();
    var dateStr = date.split(" ");
    var monthVal = new Date(Date.parse(dateStr[0] +" 1, "+dateStr[1])).getMonth()+1;
    var yearVal = dateStr[1];
    changeBtnStatus(monthVal,yearVal);
    $.ajax({
        url:'trainer/arhaticYogi/trainerFeedbackSummary',
        type:'post',
        data:{'month':monthVal,'year':yearVal},
        success:function(res){
            $('#listing tbody').html(res);
        }
    });
}
/** To show Trainer's list dynamically **/

/** To Enable/Disable Button **/
function changeBtnStatus(mon,year){
    if(mon == 1 && given_by_year_start == year){
        $('#previousButton').addClass('disabled');
    } else if (mon == 12 && given_by_year_end == year){
        $('#nextButton').addClass('disabled');
    } else {
        $('#previousButton').removeClass('disabled');
        $('#nextButton').removeClass('disabled');
    }
}
/** To Enable/Disable Button **/


</script>