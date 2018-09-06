<style type="text/css">
  
/*.panel-title>a, .panel-title>a:active{
  display:block;
  padding:15px;
  color:#555;
  font-size:16px;
  font-weight:bold;
  text-transform:uppercase;
  letter-spacing:1px;
  word-spacing:3px;
  text-decoration:none;
}*/
.left{
  display:block;
  color:#555;
  font-size:14px;
  font-weight:bold;
  letter-spacing:1px;
  word-spacing:3px;
  text-decoration:none;
}
.panel-heading  a:before {
   font-family: 'Glyphicons Halflings';
   content: "\e114";
   float: right;
   transition: all 0.5s;
}
.panel-heading.active a:before {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  transform: rotate(180deg);
} 
</style>
<div class="panel-body">
<form class="form-group" method="post">
  <h1>Feedback Report</h1><hr>
  <div class="form-group">
    <span class="col-sm-2 col-lg-1">Month</span>
      <div class="col-sm-4 col-lg-2">
        <input type="checkbox" id="use_date_filter"  name="use_date_filter" value="1" checked="checked" style="display:none;"/>
        <input type="text" class="month-picker form-control" id="selected_date" value=""/>
      </div>
  </div>
  <div class="col-lg-3 col-sm-3">
      <?php if($all_city) { ?>
        <select class="form-control" name="city">
          <option value="" >Select City</option>
          <?php foreach ($all_city as $city) { ?>
            <option value="<?php echo $city; ?>" <?php if(!empty($cityPost) && $cityPost==$city )echo 'selected';   ?> ><?php echo $city; ?></option>
          <?php } ?>
        </select>
      <?php } ?>
  </div>
  <input type="submit" class="btn btn-success" name="search" value="search">
  <br><br><hr>
  <div class="clearfix"></div>
  <ul class="nav nav-tabs">
        <li class="active"> 
            <a data-toggle="tab" href="#menu1" id="menu1_a">Given</a>
        </li>
        <li>
            <a data-toggle="tab" href="#menu2" id="menu2_a">Received</a>
        </li>
    </ul>
    <br>
    <div class="dataTable_wrapper">
    <table class="table table-striped table-bordered0 table-hover" id="summaryOnePageDataTable">
      <thead>
        <tr>
            <th>Arhatic Yogi</th>
            <th>Buddy</th>
            <th>Week-1</th>
            <th>Week-2</th>
            <th>Week-3</th>
            <th>Week-4</th>
            <th>Week-5</th>
            <th>Monthly</th>
        </tr>
      </thead>
        <tbody>
        <?php //echo "<pre>";print_r($allUsers); 
          if(!empty($allUsers)){
            foreach ($allUsers as $key => $user) { 
                foreach ($user_give_feedbacks_to as $key => $feedbackGiven) {
                  if($feedbackGiven->spiritual_buddie_user_id == $user->user_id){ ?>
                    <tr>
                      <td><?php echo $user->first_name." ".$user->last_name; ?></td><td><?php echo $feedbackGiven->first_name." ".$feedbackGiven->last_name; ?></td><td>-</td><td><a href="trainer/arhaticYogi/feedback/<?php echo $user->user_id; ?>"><i class="fa fa-check"></i></a></td><td>-</td><td>-</td><td>-</td><td>-</td>
                    </tr>

             <?php     }
                }

              ?>
                
          <?php } }?>
        </tbody>
    </table>
    </div>
    <div class="tab-content">
    <div class="tab-pane active" id="menu1">
    </div>
    <div class="tab-pane" id="menu2">
      <?php //echo "<pre>";print_r($allUsers); 
    if(!empty($allUsers)){
      foreach ($allUsers as $key => $user) { ?>
        <div class="panel-group" id="accordion2" role="tablist" aria-multiselectable="true">
          <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingM_<?php echo $key; ?>">
            <h4 class="panel-title">
                <div class="pull-left left"><?php echo $user->first_name." ".$user->last_name; ?></div>
                <div class="clearfix"></div>
              </h4>
            </div>
            <div class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingM_<?php echo $key; ?>" id="collapseM_<?php echo $key; ?>">
                <div class="panel-body">
                  <form class="form-horizontal">
                    <input type="hidden" id="user_id" value="<?php echo $user->user_id; ?>" />
                      <input type="hidden" id="selected_date_hidden"  name="selected_date"  value="" />
                      <input type="hidden" id="given_by_year_range" value="<?php echo $given_by_year_range; ?>" /> 
                    <div class="dataTable_wrapper">
                      <table class="table table-striped table-bordered0 table-hover" id="summaryOnePageDataTable">
                          <tbody>
                            <tr>
                              <td>Navin</td><td>-</td><td><a href="trainer/arhaticYogi/feedback/<?php echo $user->user_id; ?>"><i class="fa fa-check"></i></a></td><td>-</td><td>-</td><td>-</td><td>-</td>
                            </tr>
                          </tbody>
                      </table>
                    </div>
                  </form>
                </div>
            </div>
          </div>
        </div>
    <?php } }?>
    </div>
  </div>

</form>
</div>

<script type="text/javascript">
var given_by_year_range = $("#given_by_year_range").val();
var given_by_year_start = given_by_year_range.split(":");
    given_by_year_start = given_by_year_start[0];
    $("#selected_date").val('Jan '+given_by_year_start);
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
     $('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
  });

  $('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
  });
</script>