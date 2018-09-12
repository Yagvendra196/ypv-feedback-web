<style type="text/css">
    .moveFiltersPosition{
        display:none;
        width:1125px;
        height:100px;
        background-color:#c3c3c3;
        position:relative;    
    }
</style>
<div class="panel-body">
    <h1>YPV Trainer Feedback(s)</h1>
    <hr/>
    <h4><?php echo $page_title; ?></h4>
    <br/>
    <form id="form" onsubmit="return false;" class="form-horizontal well">  
        <div class="form-group result-show" >
            <span class="col-sm-1">Month</span>
            <div class="col-sm-2">
                <input type="checkbox" id="use_date_filter"  name="use_date_filter" value="1" checked="checked" style="display:none;"/>
                <input type="text" class="month-picker form-control" id="selected_date" value=""/>
            </div>
        </div>
        <?php 
            if(!empty($year) && !empty($month)){
                $yearValue=$year.':'.($year+1);
                $monthValue=$month;
            }else{
                $yearValue=$given_by_year_range;
                if(!empty($given_by_month[0])){
                    $monthValue=$given_by_month[0];
                }else{
                    $monthValue='';
                }
            }
         ?>
        <input type="hidden" id="given_by_year_range" value="<?php echo $yearValue; ?>" />
        <input type="hidden" id="given_by_month" value="<?php echo $monthValue; ?>" />
        <input type="hidden" id="selected_date_hidden"  name="selected_date"  value="" />
        <input type="hidden" id="user_id"  name="user_id"  value="<?php echo $this->uri->segment('4'); ?>" />
        <input type="hidden" id="idWeek"  name="idWeek"  value="<?php echo $weekInfo->idWeek; ?>" />
        <input type="hidden" id="spiritual_buddie_user_id"  name="spiritual_buddie_user_id"  value="<?php echo $this->uri->segment('4'); ?>" />
        
        <span id="Weekly-Monthly" class="hide">
            <input type="radio" name="feedback_type" value="Weekly" > Weekly 
            <input type="radio" name="feedback_type" value="Monthly" > Monthly
            <input type="radio" name="feedback_type" value="for trainers" checked="checked" > For Trainers
        </span>
    </form>
    <div id="serviceFail"></div>
    <div class="result-show-table " >
        <div class="row">
            <div class="col-sm-1 pull-left"><button type="button" id="previousButton" class="btn btn-sm btn-warning pull-left"> << Previous </button></div>
            <div class="col-sm-1 pull-right"><button type="button" id="nextButton" class="btn btn-sm btn-warning pull-right">Next >> </button></div>
            <div class="clearfix"></div>
            <div class="col-sm-12"><hr></div>
        </div>
        <div class="dataTable_wrapper">
            <table class="table table-striped table-bordered0 table-hover" id="feedbackDataTable">
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Monthly</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>    
</div>
<script src="<?php echo $ContentUrl;?>external-js/trainerFeedback.js"></script>