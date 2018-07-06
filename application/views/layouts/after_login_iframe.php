<?php 
$data['ModuleUrl']   = $ModuleUrl  = base_url().'/';
$data['ContentUrl']  = $ContentUrl = base_url().'/assets/'.$moduleFolder.'/';
?>
<!DOCTYPE html>
<html lang="en">
<base href="<?php echo base_url();?>">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title><?php echo $title;?></title>

    <!-- Bootstrap Core CSS -->
    <link href="<?php echo $ContentUrl;?>bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="<?php echo $ContentUrl;?>metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Timeline CSS -->
    <link href="<?php echo $ContentUrl;?>sb-admin-2/dist/css/timeline.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="<?php echo $ContentUrl;?>sb-admin-2/dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="<?php echo $ContentUrl;?>font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- Morris Charts CSS -->
    <link href="<?php echo $ContentUrl;?>morrisjs/morris.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<link href="<?php echo base_url();?>assets/common/jquery-ui/themes/smoothness/jquery-ui.css" rel="stylesheet">
<link href="<?php echo base_url();?>assets/common/datatables/media/css/jquery.dataTables.css" rel="stylesheet">
<link href="<?php echo base_url();?>assets/common/jquery-colorbox/example1/colorbox.css" rel="stylesheet">

<script type="text/javascript">baseUrl = '<?php echo base_url();?>';</script>
</head>

<body>


    <!-- jQuery -->
    <script src="<?php echo base_url();?>assets/common/jquery/dist/jquery.min.js"></script>
    <script src="<?php echo base_url();?>assets/common/jquery/dist/jquery.validate.min.js"></script>
    <script src="<?php echo base_url();?>assets/common/custom/js/jquery.custome-methods.js"></script>

<!--
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.4.5/jquery-ui-timepicker-addon.css">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.4.5/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.4.5/jquery-ui-sliderAccess.js"></script>
-->

<script src="<?php echo base_url();?>assets/common/jquery-ui/jquery-ui.js"></script>
<script src="<?php echo base_url();?>assets/common/datatables/media/js/jquery.dataTables.js"></script>


    <!-- Bootstrap Core JavaScript -->
    <script src="<?php echo $ContentUrl;?>/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="<?php echo $ContentUrl;?>/metisMenu/dist/metisMenu.min.js"></script>


    <!-- Custom Theme JavaScript -->
    <script src="<?php echo $ContentUrl;?>/sb-admin-2/dist/js/sb-admin-2.js"></script>

<script src="<?php echo base_url();?>assets/common/jquery-colorbox/jquery.colorbox-min.js"></script>


    <div id="wrapper">

        <div id="page-wrapper">
        	   <?php $this->load->view($page,$data); ?>
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
<script type="text/javascript">phpData = <?php echo json_encode(array_merge($this->data,$data));?>;</script>
</body>

</html>
