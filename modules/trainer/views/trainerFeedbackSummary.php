<style type="text/css">
.mt-10{margin-top: 10px;}
.customSorting::after {content: "\f0de";/*float: right;*/margin-left:10px;font-family: fontawesome;color: #fff;} 
.customSorting.desc::after {content: "\f0dd";}
.customSorting{cursor: pointer;}
</style>
<div class="panel-body">
    <h1><?php echo $page_title; ?></h1>
    <hr/>
    <h4><?php echo $page_title; ?></h4>
    <br/>
    <form class="form-horizontal">
        <div class="well">
            <div class="row">
                <div class="col-sm-1">Year</div>
                <div class="col-sm-5">
                    <input min="<?php echo !empty($given_by_year_start) ? $given_by_year_start : ''?>" max="<?php echo !empty($given_by_year_end) ? $given_by_year_end : ''?>" type="number" id="selected_date" value="<?php echo !empty($selected_year) ? $selected_year : '';?>"/></br>
                    <button type="button" id="previousButton" class="btn btn-sm btn-warning mt-10"> << Previous </button>
                    <button type="button" id="nextButton" class="btn btn-sm btn-warning mt-10">Next >> </button>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>  
        <div class="result-show-table " >
            <div class="row">
                <div class="col-sm-12"><hr></div>
            </div>
            <div class="">
                <table class="table table-striped table-hover" id="listing">
                    <thead>
                        <tr>
                            <th class="customSorting">Trainer Name</th>
                            <th>Jan</th>
                            <th>Feb</th>
                            <th>Mar</th>
                            <th>Apr</th>
                            <th>May</th>
                            <th>Jun</th>
                            <th>Jul</th>
                            <th>Aug</th>
                            <th>Sep</th>
                            <th>Oct</th>
                            <th>Nov</th>
                            <th>Dec</th>
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
var given_by_year_start = "<?php echo !empty($given_by_year_start) ? $given_by_year_start : ''?>";
var given_by_year_end = "<?php echo !empty($given_by_year_end) ? $given_by_year_end : ''?>";

$(document).ready(function () {
    var selectedDate = parseInt($("#selected_date").val());
    changeBtnStatus(selectedDate);
});

$(document).on('click','.customSorting', function(){
    if(!$(this).hasClass('desc')){
        $(this).addClass('desc');
    } else {
        $(this).removeClass('desc');
    }
    showTrainerFeedback();
});

$(document).on('click','#nextButton', function(){
    changeYear('next');
});

$(document).on('click','#previousButton', function(){
    changeYear('pre'); 
});

$(document).on('change','#selected_date', function () {
    showTrainerFeedback();
});

/** Change Date as per Custom Next Prev Button click **/
function changeYear(state){
    var selectedDate = parseInt($("#selected_date").val());
    if(state == 'next'){
        selectedDate = selectedDate+1;
    } else {
        selectedDate = selectedDate-1;
    }
    if(selectedDate >= given_by_year_start && selectedDate <= given_by_year_end){
        $("#selected_date").val(selectedDate);
        showTrainerFeedback();
    }
}
/** Change Date as per Custom Next Prev Button click **/

/** To show Trainer's list dynamically **/
function showTrainerFeedback(){
    var yearVal = $('#selected_date').val();
    var order = ($('.customSorting').hasClass('desc')) ? 'DESC' : 'ASC';
    $.ajax({
        url:'trainer/arhaticYogi/trainerFeedbackSummary',
        type:'post',
        data:{'year':yearVal,'order':order},
        success:function(res){
            changeBtnStatus(yearVal);
            $('#listing tbody').html(res);
        }
    });
}
/** To show Trainer's list dynamically **/

/** To Enable/Disable Button **/
function changeBtnStatus(year){
    if(given_by_year_start == year){
        $('#previousButton').addClass('disabled');
        $('#nextButton').removeClass('disabled');
    } else if (given_by_year_end == year){
        $('#nextButton').addClass('disabled');
        $('#previousButton').removeClass('disabled');
    } else {
        $('#previousButton').removeClass('disabled');
        $('#nextButton').removeClass('disabled');
    }
}
/** To Enable/Disable Button **/


</script>