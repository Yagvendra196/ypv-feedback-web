<div class="panel-body">
  <h1>Summary One Page</h1><hr>
  <?php //echo "<pre>";print_r($allUsers); 
    if(!empty($allUsers)){
      foreach ($allUsers as $key => $user) { ?>
        <div class="panel-group">
          <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                <a data-toggle="collapse" href="#collapse_<?php echo $key; ?>"><?php echo $user->first_name." ".$user->last_name; ?> | <?php echo $user->email; ?></a>
                </h4>
            </div>
            <div id="collapse_<?php echo $key; ?>" class="panel-collapse collapse">
                <div class="panel-body">
                  <form class="form-horizontal">
                    <div class="form-group">
                      <span class="col-sm-1">Month</span>
                        <div class="col-sm-2">
                          <input type="checkbox" id="use_date_filter"  name="use_date_filter" value="1" checked="checked" style="display:none;"/>
                          <input type="text" class="month-picker form-control" id="selected_date" value=""/>
                        </div>
                        <input type="hidden" id="user_id" value="<?php echo $user->user_id; ?>" />
                        <input type="hidden" id="selected_date_hidden"  name="selected_date"  value="" />
                        <input type="hidden" id="given_by_year_range" value="<?php echo $given_by_year_range; ?>" />
                    </div><br>
                    <div class="clearfix"></div>
                    <div class="dataTable_wrapper">
                      <table class="table table-striped table-bordered0 table-hover" id="summaryOnePageDataTable">
                        <thead>
                          <tr>
                              <th>User / Week</th>
                              <th>Week-1</th>
                              <th>Week-2</th>
                              <th>Week-3</th>
                              <th>Week-4</th>
                              <th>Week-5</th>
                          </tr>
                        </thead>
                          <tbody>
                            <tr>
                              <td>Navin</td><td>-</td><td>Yes</td><td>-</td><td>-</td><td>-</td>
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

<script type="text/javascript">
var given_by_year_range = $("#given_by_year_range").val();
var given_by_year_start = given_by_year_range.split(":");
    given_by_year_start = given_by_year_start[0];
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

</script>