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
    <h2><?php echo $page_title;?></h2>
    <div class="dataTable_wrapper">
        <!-- Filters we will implement latet, but need code here to have correct listing -->
        <input type="button" class="hide" name="Filters" Value="Filters" onclick="$('#FiltersBox').slideToggle(); $('#dataTables-example_filter').slideToggle();" />
        <div id="FiltersBox"  style="display:block;float:left;">
            <form id="ExtraFieldsOnSearch"  method="post">
                <div class="form-group field-masterroles-role_id">
                    <label class="control-label" for="role_id">Id Role</label>
                    <select id="role_id" class="form-control" name="role_id" onchange="SearchSubmit()" style="float:left;width:140px">
                    <option value="1">Super Admin</option>
                    <option value="2">Sub Admin</option>
                    <option value="3" selected>User</option>
                    <option value="4">Teacher</option>
                    </select>
                    <div class="help-block"></div>
                </div>        
                <!--
                <input type='checkbox' id='ayaz'  name='ayaz[a][]' value='1' checked='checked'  onchange='SearchSubmit()' />
                <input type='checkbox' id='ayaz'  name='ayaz[a][]' value='2'                    onchange='SearchSubmit()' />
                <input type='checkbox' id='ayaz'  name='ayaz[a][]' value='3' checked='checked'  onchange='SearchSubmit()' />
                -->
             </form>         
        </div>
        <!-- End Filters-->

        <table class="table table-striped table-bordered0 table-hover" id="dataTables-example">
            <thead>
                <tr>
                    <th>user_id</th>
                    <th>role_id</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Role Name</th>
                     <th>Status</th>
                    <th>Spiritual Buddy</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>
<form id="ajax_test" action="<?php echo base_url().$thisModuleFolder;?>/users/buddiesDataTableData" method="post" /></form>


<script>
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
                //"order": [[ 3, "desc" ]],
                "pageLength" : 10,
                "info":     false,
                "sPaginationType": "full_numbers",
                "lengthChange": false,
                "searching": true,
                "dom": '<"top"flp>rt<"bottom"p>',
                //"sDom": '<"top"i>rt<"bottom"flp><"clear">',
                //*
                "ajax": { "url": "<?php echo $thisModuleFolder;?>"+"/"+"<?php echo STUDENT_FOLDER;?>"+"/buddiesDataTableData/"+"<?php echo $user_id;?>",
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
                                { "name":"email","data": "email" },
                                { "name":"first_name","data": "first_name", 
                                    render: function ( data, type, row ) {
                                        return row.first_name+' '+row.last_name;
                                    },
                                 },
                                { "name":"last_name","data": "last_name","visible": false },
                                { "name":"role_name","data": "role_name" ,"visible": false },
                                { "name":"status","data": "status" ,"visible": false },
                                {   "name":"spiritual_buddie_user_id",
                                    "data":   "spiritual_buddie_user_id",
                                    render: function ( data, type, row ) {
                                        if ( type === 'display' ) {
                                            return '<input type="checkbox" class="aSpiritual_buddie_user_id"> ';
                                        }
                                        return data;
                                    },
                                    "className": "dt-body-center"
                                }/*,
                                {   "name":"usbStatus",
                                    "data":"usbStatus",
                                    render: function ( data, type, row ) {
                                        if ( type === 'display' ) {
                                            return '<input type="checkbox" class="usbStatus"> ';
                                        }
                                        return data;
                                    },
                                    "className": "dt-body-center"
                                }*/,
                                {   "name":"action",
                                    "className":      'details-control',
                                    "orderable":      false,
                                    "data":           null,
                                    "defaultContent": '<a class="aDelete" href="javascript:void(0)">Delete</a>',
                                },
                          ],
                rowCallback: function ( row, data ) {
                                // Set the checked state of the checkbox in the table
                                if (data.spiritual_buddie_user_id>0) {
                                    $('input.aSpiritual_buddie_user_id', row).parent().append('Yes');    
                                    $('input.aSpiritual_buddie_user_id', row).remove();    
                                } else {
                                    $('a.aDelete', row).hide(); 
                                }
                            }
        });

    //Ajax pagination login check
    $('#dataTables-example').on('xhr.dt', function ( e, settings, json ) {
            if(json==false) window.top.location = "<?php echo base_url();?>";
     });


    //Delete  
    $('#dataTables-example tbody').on( 'click', 'a.aDelete', function () {
        var data = table.row( $(this).parents('tr') ).data(); 
        var post_url = "<?php echo base_url().'/api/userServices/removeBuddy';?>";
            $.ajax({
                    url: post_url,
                    type: 'post',
                    data: {"user_id":data.user_id," spiritual_buddie_user_id":data.spiritual_buddie_user_id},
                    success: function(result) 
                        {
                             if(result=='__WrongUser') window.top.location = "<?php echo base_url();?>";
                             table.draw( false );
                        }
                    });
    } );

    /*
    //Status Change 
    $('#dataTables-example tbody').on( 'change', 'input.usbStatus', function () {
        var data = table.row( $(this).parents('tr') ).data();
        var post_url = "<?php echo base_url().'/'.$thisModuleFolder.'/'.STUDENT_FOLDER.'/usbStatusChange';?>";
            $.ajax({
                    url: post_url,
                    type: 'post',
                    data: {"user_id":data.user_id," spiritual_buddie_user_id":data.spiritual_buddie_user_id,"usbStatus":data.usbStatus},
                    success: function(result) 
                        {
                             if(result=='__WrongUser') window.top.location = "<?php echo base_url();?>";
                             table.draw( false );
                        }
                    });
    } );
    */

    //Add USB
    $('#dataTables-example tbody').on( 'change', 'input.aSpiritual_buddie_user_id', function () {
        var data = table.row( $(this).parents('tr') ).data();
        var post_url = "<?php echo base_url().'/'.$thisModuleFolder.'/'.STUDENT_FOLDER.'/addUsb';?>";
            $.ajax({
                    url: post_url,
                    type: 'post',
                    data: {"user_id":data.user_id," spiritual_buddie_user_id":"<?php echo $user_id;?>"},
                    success: function(result) 
                        {
                             if(result=='__WrongUser') window.top.location = "<?php echo base_url();?>";
                             table.draw( false );
                        }
                    });
    } );


    // Require to move filters and toggle filter box 
    $('#dataTables-example_filter').append($('#FiltersBox').html());
    $('#FiltersBox').remove();
    $('#dataTables-example_filter').addClass('moveFiltersPosition');

    });    

//table.context[0].jqXHR.responseText
</script>
<script type="text/javascript">
jQuery(document).ready(function () {
  //jQuery('#ExtraFieldsOnSearch').validate.................;
});
</script>
<link href="<?php echo base_url();?>assets/common/datatables/media/css/jquery.dataTables.css" rel="stylesheet">
<script src="<?php echo base_url();?>assets/common/datatables/media/js/jquery.dataTables.js"></script>