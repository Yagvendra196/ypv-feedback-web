<?php 
/* To take ionic help
http://ionicframework.com/
https://creator.ionic.io/app/login
*/
$data['ModuleUrl']   = $ModuleUrl  = base_url().'/';
$data['ContentUrl']  = $ContentUrl = base_url().'/assets/'.$moduleFolder.'/'; 
$data['isAjaxRequest'] = $isAjaxRequest = isset($isAjaxRequest)?$isAjaxRequest:"";
?><?php
//if (!$isAjaxRequest) {
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <meta name="description" content="">
    <meta name="author" content="">
    <base href="<?php echo base_url();?>">
    <title><?php echo $title;?></title>

<?php
if (isset($alreadySignIn) && $alreadySignIn == 'Yes' ) { 
        $redirectTo = 'dashboard';  ?>
        <script type="text/javascript"> isUserLogin = true </script>        
<?php } else { 
        $redirectTo = 'login'; ?>
        <script type="text/javascript"> isUserLogin = false </script>        
<?php } ?>

<script type="text/javascript">
    if (location.href.split('#').length <= 1) window.location.href=location.href+'#/<?php echo $redirectTo;?>';
</script>

    <script src="lib/ionic/js/ionic.bundle.js"></script>

    <!-- cordova script (this will be a 404 during development) -->
   <!-- <script src="<?php //echo $ContentUrl;?>cordova.js"></script> -->

    <!-- IF using Sass (run gulp sass first), then uncomment below and remove the CSS includes above
    <link href="css/ionic.app.css" rel="stylesheet">
    -->
    <link href="lib/ionic/css/ionic.css" rel="stylesheet">
<!--custom css-->
<link href="css/custom.css" rel="stylesheet">
<script src="js/jquery.min.js"></script>
    <script src="js/app.js"></script>
    <script src="js/controllers.js"></script>
    <script src="js/routes.js"></script>
    <script src="js/services.js"></script>
    <script src="js/directives.js"></script>

    <!-- Only required for Tab projects w/ pages in multiple tabs 
    <script src="<?php echo $ContentUrl;?>lib/ionicuirouter/ionicUIRouter.js"></script>
    -->
    
    <script type="text/javascript">baseUrl = '<?php echo base_url();?>';</script>

        <!-- jQuery -->
    <script src="<?php echo base_url();?>assets/common/jquery/dist/jquery.min.js"></script>
    <script src="<?php echo base_url();?>assets/common/jquery/dist/jquery.validate.min.js"></script>
    <script src="<?php echo base_url();?>assets/common/custom/js/jquery.custome-methods.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
</head>

<body ng-app="starter" animation="slide-left-right-ios7" ng-controller="AppCtrl" ng-init="init()">
<?php // } end !$isAjaxRequest  ?> 





<?php $this->load->view($page,$data); ?>    






<?php //if (!$isAjaxRequest) { ?>
</body>
        <script type="text/javascript">phpData = <?php echo json_encode(array_merge($this->data,$data));?>;</script>
        
        <script src="<?php echo $ContentUrl;?>external-js/user_add_usb.js"></script>
 		<script src="<?php echo $ContentUrl;?>external-js/user_feedback_weekly.js"></script>
        <script src="<?php echo $ContentUrl;?>external-js/user_feedback_monthly.js"></script>
        <script src="<?php echo $ContentUrl;?>external-js/user_login.js"></script>
        <script src="<?php echo $ContentUrl;?>external-js/user_signUp.js"></script>
</html>
<?php // } end !$isAjaxRequest  ?> 



