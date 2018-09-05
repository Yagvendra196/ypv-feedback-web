<style>
.moveFiltersPosition{
        display:none;
        width:1125px;
        height:100px;
        background-color:#c3c3c3;
        position:relative;    
    }
</style>
<div class="panel-body">
    <h1>
        <?php echo $page_title;?>
        <input class="btn btn-success" type="button" name="Add" Value="Add" onclick="window.top.location = '<?php echo base_url($moduleFolder.'/'.EXAMINER.'/add_edit');?>'" />
    </h1>
    <div class="dataTable_wrapper">
        <form id="ExtraFieldsOnSearch" method="post">
            <div class="row">
                <div class="col-lg-2 col-sm-6 m-bottom">
                    <?php if($all_city) { ?>
                      <select class="form-control" name="city" id="city">
                            <option value="" >Select City</option>
                      <?php foreach ($all_city as $city) { ?>
                          <option value="<?php echo $city; ?>" ><?php echo $city; ?></option>
                      <?php } ?>
                      </select>
                    <?php } ?>
                </div>
                <div class="col-lg-2 col-sm-6 m-bottom">
                    <select class="form-control" name="batch-year" id="batch">
                        <option value="">Select Batch Year</option>
                    </select>          
                </div>
                <div class="col-lg-2 col-sm-6 m-bottom">
                    <input class="form-control" type="text" name="search-keyword" id="search" placeholder="Keyword for search">
                </div>
                <div class="col-lg-2 col-sm-6 m-bottom">
                    <button class="form-control btn btn-success" id="btnSearch">Search</button>
                </div>
            </div>
        <div id="FiltersBox"  style="display:none;float:left;">
            
                <div class="form-group field-masterroles-role_id">
                    <label class="control-label" for="role_id">Id Role</label>
                    <select id="role_id" class="form-control" name="role_id" style="float:left;width:140px" readOnly="readOnly">
                    <option value="1">Super Admin</option>
                    <option value="3" ><?php echo STUDENT;?></option>
                    <option value="4" selected ><?php echo EXAMINER;?></option>
                    </select>
                <div class="help-block"></div>
                </div>        
                <!--
                <input type='checkbox' id='ayaz'  name='ayaz[a][]' value='1' checked='checked'  onchange='SearchSubmit()' />
                <input type='checkbox' id='ayaz'  name='ayaz[a][]' value='2'                    onchange='SearchSubmit()' />
                <input type='checkbox' id='ayaz'  name='ayaz[a][]' value='3' checked='checked'  onchange='SearchSubmit()' />
                -->
                    
        </div>
        <!-- End Filters-->

        <table class="table table-striped table-bordered0 table-hover" id="dataTables-example">
            <thead>
                <tr>
                    <th>user_id</th>
                    <th>role_id</th>
                    <th>Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role Name</th>
                    <th>Active</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        </form>
    </div>
</div>
<!-- <form id="ajax_test" action="<?php echo base_url().$moduleFolder;?>/users/data-table-data" method="post" /></form> -->


<script>

    $('#btnSearch').click(function(e){
        e.preventDefault();
        console.log($('#ExtraFieldsOnSearch').serializeArray());
        SearchSubmit();
    });

    function SearchSubmit()
    {
         $('#dataTables-example').dataTable().fnFilter();
    }
    /* ---------- DataTable Option Help ---------- */
    //http://www.datatables.net/reference/option/
    //http://legacy.datatables.net/usage/options
    //http://datatables.net/reference/option/paging
    /* ---------- DataTableInfoPositions Help ---------- */
    //http://www.datatables.net/forums/discussion/1622/pagination-position
    // 'l' - Length changing, 'f' - Filtering input, 't' - The table!, 
    // 'i' - Information, 'p' - Pagination, 'r' - pRocessing
    /* ---------- Ajax Help Urls ---------- */
    //   http://datatables.net/reference/option/data
    //   http://datatables.net/reference/option/ajax
    //   http://datatables.net/reference/option/ajax.data
    //   http://datatables.net/reference/option/ajax.dataSrc
    //   http://datatables.net/examples/ajax/simple.html  
    //      Using Array http://datatables.net/examples/ajax/data/arrays.txt
    //      { "data": [ [ ..... ] ] }, 
    //   http://datatables.net/examples/ajax/objects.html
    //      Using Object http://datatables.net/examples/ajax/data/arrays.txt  
    //      { "data": [ {...}] },
    //    
    //    https://datatables.net/examples/server_side/post.html
    //    https://datatables.net/manual/server-side  SERVER SIDE SCRIPT VARIARABLE AND USE.
    $(document).ready(function() {
        //$("#ExtraFieldsOnSearch").serializeArray()
       var table =   $('#dataTables-example').DataTable({
                "responsive": true,
                "paging":   true,
                "ordering": true,
                "order": [[ 3, "asc" ],[ 4, "asc" ],[ 5, "asc" ]],
                "pageLength" : 20,
                "info":     false,
                "sPaginationType": "full_numbers",
                "lengthChange": false,
                "searching": true,
                "dom": '<"top"flp>rt<"bottom"p>',
                //"sDom": '<"top"i>rt<"bottom"flp><"clear">',
                //*
                "ajax": { "url": "<?php echo $moduleFolder;?>"+"/users/dataTableData",
                          "data" : function ( d ) {
                            
                                //make object from extra fields for search 
                                var paramObj = {};
                                $.each($('#ExtraFieldsOnSearch').serializeArray(), function(_, kv) {
                                  if (paramObj.hasOwnProperty(kv.name)) {
                                    paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
                                    paramObj[kv.name].push(kv.value);
                                  }
                                  else {
                                    paramObj[kv.name] = kv.value;
                                  }
                                });    
                                //make object from extra fields for search 

                                d = $.extend( {}, d, paramObj );
                            return  $.extend( {}, d, {'_csrf':'<?php echo "";?>'} );
                             },
                          "type":"POST"
                         },
                //*/                         
                 
                 /* for debugging
                "ajax": function (d, callback, settings) 
                        {
                                //make object from extra fields for search 
                                var paramObj = {};
                                $.each($('#ExtraFieldsOnSearch').serializeArray(), function(_, kv) {
                                  if (paramObj.hasOwnProperty(kv.name)) {
                                    paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
                                    paramObj[kv.name].push(kv.value);
                                  }
                                  else {
                                    paramObj[kv.name] = kv.value;
                                  }
                                });    
                                //make object from extra fields for search 

                                d = $.extend( {}, d, paramObj );
                                d = $.extend( {}, d, {'_csrf':'<?php echo "";?>'} );

                                    var form = $('#ajax_test');

                                            $.each(d,function(i1, v1){ if (v1 != null && typeof v1 == 'object') { 
                                                $.each(v1,function(i2, v2){ if (v2 != null && typeof v2 == 'object') {   
                                                    $.each(v2,function(i3, v3) { if (v3 != null && typeof v3 == 'object') {     
                                                        $.each(v3,function(i4, v4){
                                            $("<input>").attr({'type':'hidden','name':i1+'['+i2+']'+'['+i3+']'+'['+i4+']'}).val(v4).appendTo(form); });
                                                                                 } else { $("<input>").attr({'type':'hidden','name':i1+'['+i2+']'+'['+i3+']'}).val(v3).appendTo(form);}  });
                                                        } else { $("<input>").attr({'type':'hidden','name':i1+'['+i2+']'}).val(v2).appendTo(form); } });
                                            } else { $("<input>").attr({'type':'hidden','name':i1}).val(v1).appendTo(form); }
                                                                    });

                                    $('#ajax_test').submit();

                         },
                 // */     

                "processing": true,
                "serverSide": true,
                "columns": [
                                { "name":"user_id","data": "user_id","visible": false },
                                { "name":"role_id","data": "role_id","visible": false },
                                { "name":"name","data": "name" ,"visible": false,
                                            render: function ( data, type, row ) {
                                                return row.first_name+" "+row.last_name;
                                            },
                                },
                                { "name":"first_name","data": "first_name"},
                                { "name":"last_name","data": "last_name"},
                                { "name":"email","data": "email" },
                                { "name":"role_name","data": "role_name"  },
                                {   "name":"status",
                                    "data":   "status",
                                    render: function ( data, type, row ) {
                                        if ( type === 'display' ) {
                                            return '<input type="checkbox" class="aStatus"> ';
                                        }
                                        return data;
                                    },
                                    "className": "dt-body-center0"
                                },
                                {   "name":"action",
                                    "className":      'details-control',
                                    "orderable":      false,
                                    "data":           null,
                                    "defaultContent": '<a class="aView" href="javascript:void(0)">View</a> | <a class="aEdit"  href="javascript:void(0)">Edit</a><button  class="aDelete hide">Delete</button>'
                                },
                          ],
                rowCallback: function ( row, data ) {
                                // Set the checked state of the checkbox in the table
                                $('input.aStatus', row).prop( 'checked', data.status == 1 );
                                $('input.allStatus', row).prop( 'checked', data.status == 1 );
                            }
        });

    //Ajax pagination login check
    $('#dataTables-example').on('xhr.dt', function ( e, settings, json ) {
            if(json==false) window.top.location = "<?php echo base_url();?>";
     });


    //Status Change 
    $('#dataTables-example tbody').on( 'change', 'input.aStatus', function () {
        var data = table.row( $(this).parents('tr') ).data();
        var post_url = "<?php echo base_url().$moduleFolder.'/users/statusChange';?>";
            $.ajax({
                    url: post_url,
                    type: 'post',
                    data: {"user_id":data.user_id,"role_id":data.role_id,"status":data.status},
                    success: function(result) 
                        {
                        	 if(result=='__WrongUser') window.top.location = "<?php echo base_url();?>";
                             table.draw( false );
                        }
                    });
    } );



    
    //View a record
    $('#dataTables-example tbody').on( 'click', 'a.aView', function () {
        var data = table.row( $(this).parents('tr') ).data();
        $(this).attr({'href':"<?php echo base_url().$moduleFolder.'/users/view/';?>"+data.user_id})
        $(this).colorbox({iframe:true, innerWidth:740, innerHeight:500});
    });

    //Edit a record
    $('#dataTables-example tbody').on( 'click', 'a.aEdit', function () {
        var data = table.row( $(this).parents('tr') ).data();
        window.top.location = "<?php echo base_url().$moduleFolder.'/'.EXAMINER.'/add_edit/';?>"+data.user_id;
    });


    //Delete a record
    $('#dataTables-example tbody').on( 'click', 'button.aDelete', function () {
        var data = table.row( $(this).parents('tr') ).data();
        if (confirm("Are you sure you want to delete to "+data.first_name+" !") == true) {     
        var post_url = "<?php echo base_url().$moduleFolder.'/users/delete';?>";
        $.ajax({
                url: post_url,
                type: 'post',
                data: {"user_id":data.user_id,"role_id":data.role_id},
                success: function(result) 
                    {
                         if(result=='__WrongUser') window.top.location = "<?php echo base_url();?>";

                         table.draw( false );
                    }
                });
        }    
    });




        
            // Require to move filters and toggle filter box 
            $('#dataTables-example_filter').append($('#FiltersBox').html());
            $('#FiltersBox').remove();
            $('#dataTables-example_filter').addClass('moveFiltersPosition');
            //$('#FiltersBox').slideToggle(); 
            //$('#dataTables-example_filter').slideToggle();
        
    });    

//table.context[0].jqXHR.responseText
</script>
<script type="text/javascript">
jQuery(document).ready(function () {
  //jQuery('#ExtraFieldsOnSearch').validate.................;
});
for(var year=2010; year<=2030; year++ ){
    $("#batch").append('<option value="'+year+'">'+year+'</option>');
}
</script>
<link href="<?php echo base_url();?>assets/common/datatables/media/css/jquery.dataTables.css" rel="stylesheet">
<script src="<?php echo base_url();?>assets/common/datatables/media/js/jquery.dataTables.js"></script>
<!-- <script src="<?php //echo base_url();?>assets/common/datatables/media/js/dataTables.responsive.js" type="text/javascript"></script>
<link rel="stylesheet" href="<?php //echo base_url();?>assets/common/datatables/media/css/dataTables.responsive.css">  -->