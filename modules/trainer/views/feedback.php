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
    <h1>Feedback(s)</h1>
    <hr/>
    <ul class="nav nav-tabs">
        <li class="active ">
            <a data-toggle="tab" href="#menu1" id="menu1_a"><?php echo ucfirst($page_title); ?></a>
        </li>
        <li>
            <a data-toggle="tab" href="#menu2" id="menu2_a"><?php echo ucfirst(str_replace('for', 'from',$page_title)); ?></a>
        </li>
    </ul>

    <div class="tab-content">
        <div class="tab-pane fade in active">
        <br/>
        <form id="form" onsubmit="return false;" class="form-horizontal well">  
            <div class="form-group">
                <span id="given_by"><?php
                    if (count($feedback_given_by) > 0) { ?>
                  
                        <span class="col-sm-1">Given by</span>
                        <div class="col-sm-2"> 
                            <select id="spiritual_buddie_user_id" name="spiritual_buddie_user_id" class="form-control"  >
                                <?php foreach ($feedback_given_by as $key => $uf) { ?>
                                    <option value="<?php echo $uf->spiritual_buddie_user_id; ?>" ><?php echo $uf->first_name . ' ' . $uf->last_name; ?></option>
                                <?php } ?>
                            </select>
                        </div>
                   
                    <?php } 
                ?></span>
                <span id="given_to"><?php 
                    if (count($feedback_given_to) > 0) { ?>
                        <span class="col-sm-1" >Given to</span>
                        <div class="col-sm-2"> 
                            <select id="spiritual_buddie_user_id" name="spiritual_buddie_user_id" class="form-control">
                                <?php foreach ($feedback_given_to as $key => $uf) { ?>
                                    <option value="<?php echo $uf->user_id; ?>" ><?php echo $uf->first_name . ' ' . $uf->last_name; ?></option>
                                <?php } ?>
                            </select>
                        </div>
                    <?php } 
                ?></span>
                 
            </div>

            <div class="form-group result-show <?php if (count($feedback_given_by) <1) { echo "hide"; }?>" >
                <span class="col-sm-1">Month</span>
                <div class="col-sm-2">
                    <input type="checkbox" id="use_date_filter"  name="use_date_filter" value="1" checked="checked" style="display:none;"/>
                    <input type="text" class="month-picker form-control" id="selected_date" value=""/>
                </div>
            </div>

            <input type="hidden" id="given_by_year_range" value="<?php echo $given_by_year_range; ?>" />
            <input type="hidden" id="given_to_year_range" value="<?php echo $given_to_year_range; ?>" />

            <!-- <input type="hidden" id="selected_date_hidden"  name="selected_date"  value="<?php //echo $this->uri->segment('4'); ?>" /> -->

            <input type="hidden" id="selected_date_hidden"  name="selected_date"  value="" />
            <input type="hidden" id="user_id"  name="user_id"  value="<?php echo $this->uri->segment('4'); ?>" />
            <input type="hidden" id="idWeek"  name="idWeek"  value="<?php echo $weekInfo->idWeek; ?>" />
            <input type="hidden" id="filterType"  name="filterType"  value="received" />
            <span id="Weekly-Monthly" class="hide">
                <input type="radio" name="feedback_type" value="Weekly" > Weekly 
                <input type="radio" name="feedback_type" value="Monthly" checked="checked" > Monthly
            </span>
            <!-- <button onclick="showFeedback()" class="btn btn-sm btn-success result-show <?php //if (count($feedback_given_by) <1) { echo "hide"; }?>">Find</button> -->
            <button onclick="showFeedback()" class="btn btn-sm btn-success hide">Find</button>

            <div class="form-group result-show-message <?php if (count($feedback_given_by) > 0) { echo "hide"; }?> text-center" >
                <p><b>No Record Found.</b></p>
            </div>
        </form>
        
        <div id="serviceFail"></div>
        <div class="result-show-table <?php if (count($feedback_given_by) <1) { echo "hide"; }?>" >
            <div class="row">
                <div class="col-sm-1 pull-left"><button type="button" id="previousButton" class="btn btn-sm btn-warning pull-left"> << Previous </button></div>
                <div class="col-sm-1 pull-right"><button type="button" id="nextButton" class="btn btn-sm btn-warning pull-right">Next >> </button></div>
                <div class="clearfix"></div>
                <div class="col-sm-12"><hr></div>
            </div>
            <ul class="nav nav-tabs">
                <li class="active ">
                    <a data-toggle="tab" href="#sub-menu1">Month</a>
                </li>
                <li>
                    <a data-toggle="tab" href="#sub-menu2">Weeks</a>
                </li>
                <li>
                    <a data-toggle="tab" href="#sub-menu3">Histroy</a>
                </li>
            </ul>
            <div class="tab-content">
                <div id="sub-menu1" class="tab-pane fade in active">
                    <div class="dataTable_wrapper">
                        <table class="table table-striped table-bordered0 table-hover" id="feedbackDataTable">
                            <thead>
                                <tr>
                                    <th>Activity</th>
                                    <th>Count</th>
                                    <!-- <th>Date</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (count($feedback_given_by) < 1) { ?>
                                    <tr>
                                        <td colspan="2">No feedback founds.</td>
                                    </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="sub-menu2" class="tab-pane fade">
                    <div class="dataTable_wrapper">
                        <table class="table table-striped table-bordered0 table-hover" id="feedbackDataTable-week">
                            <thead>
                                <tr>
                                    <th>Activity</th>
                                    <!-- <th>Count</th> -->
                                    <!-- <th>Week Date</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (count($feedback_given_by) < 1) { ?>
                                    <tr>
                                        <td colspan="1">No feedback founds.</td>
                                    </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="sub-menu3" class="tab-pane fade">
                    <div class="dataTable_wrapper">
                        <table class="table table-striped table-bordered0 table-hover" id="feedbackDataTable-history">
                            <thead>
                                <tr>
                                    <th width="5%">S.No.</th>
                                    <th width="25%">Start Date</th> 
                                    <th width="">End Date</th> 
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (count($feedback_given_by) < 1) { ?>
                                    <tr>
                                        <td colspan="3">No feedback founds.</td>
                                    </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </div>    
</div>
<script src="<?php echo $ContentUrl;?>external-js/feedback.js"></script>