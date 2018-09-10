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
    <link href="admin/assets/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="<?php echo $ContentUrl;?>metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Timeline CSS -->
    <link href="<?php echo $ContentUrl;?>sb-admin-2/dist/css/timeline.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="<?php echo $ContentUrl;?>sb-admin-2/dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="<?php echo $ContentUrl;?>font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    
<script type="text/javascript">baseUrl = '<?php echo base_url();?>';</script>
</head>

<body>


    <!-- jQuery -->
    <script src="<?php echo base_url();?>assets/common/jquery/dist/jquery.min.js"></script>
    <script src="<?php echo base_url();?>assets/common/jquery/dist/jquery.validate.min.js"></script>
    <script src="<?php echo base_url();?>assets/common/custom/js/jquery.custome-methods.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="<?php echo $ContentUrl;?>bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="<?php echo $ContentUrl;?>metisMenu/dist/metisMenu.min.js"></script>

    <!-- Morris Charts JavaScript -->
    <script src="<?php echo $ContentUrl;?>raphael/raphael-min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="<?php echo $ContentUrl;?>sb-admin-2/dist/js/sb-admin-2.js"></script>

    <?php 
        $ValidUser = $this->Security->AllowedRoles('admin', ['UserTypes' => ['3'], 'Redirect' => false]);
        if ($ValidUser) { 
           // $this->load->view('includes/after_login_navigations',$data); 
        }else{
          //  $this->load->view('includes/before_login_navigations',$data); 
        } 
    ?>

    <?php $this->load->view($page,$data); ?>
    
<script type="text/javascript">phpData = <?php echo json_encode(array_merge($this->data,$data));?>;</script>
</body>

</html>
