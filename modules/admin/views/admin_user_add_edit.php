<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><?php echo $page_title;?></h1>
    </div>
    <!-- /.col-lg-12 -->
</div>
<!-- /.row -->

<script type="text/javascript">row = <?php echo json_encode($row);?>;</script>
<form id="form" class="" action="<?php echo $moduleFolder;?>/users/add_edit" method="post" enctype="multipart/form-data" >
<?php if (set_input('user_id','',$row)) { $add=0;$edit=1;} else {$add=1;$edit=0;}?>
<input type="hidden" id="user_id" class="form-control" name="user_id" value="<?php echo set_input('user_id','',$row);?>" />

<div class="row" >
    <?php 
        $data['lableColClass'][0] = 'col-sm-3';
        $data['elementGroupColClass'][0] = 'col-sm-9';
        $data['lableColClass'][1] = 'col-sm-3';
        $data['elementGroupColClass'][1] = 'col-sm-9';
        $data['add'] = $add;
        $data['edit'] = $edit;
    ?> 

    <?php if ($this->uri->segment('4')=='success'||$this->uri->segment('5')=='success') { ?>
    <div class="alert alert-success">Successfully saved</div>
    <?php } ?>

    <?php $this->load->view('admin_user_add_edit_part_one.php',$data); ?>
    <?php $this->load->view('admin_user_add_edit_part_two.php',$data); ?>
</div>
<div class="row" >
    <div class="col-lg-12" >
        <div class="panel-body" >
            <div class="button-group text-center">
                <button type="submit" tabindex="18" class="btn btn-lg btn-success" name="user-button" style="width:200px">Save</button>
            </div>
        </div>
    </div> 
    </div> 
</form>    
<!-- /.row -->      

<script src="<?php echo $ContentUrl;?>external-js/admin_user_add_edit.js"></script>
<?php if ($add && $this->session->userdata('action_of')=='examiner') { ?>
<script type="text/javascript">
    EXAMINER = "<?php echo $this->config->item('modules')['examiner']; ?>";
</script>
<script src="<?php echo $ContentUrl;?>external-js/admin_user_add_edit_addon.js"></script>
<?php }?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.4.5/jquery-ui-timepicker-addon.css">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.4.5/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.4.5/jquery-ui-sliderAccess.js"></script>
