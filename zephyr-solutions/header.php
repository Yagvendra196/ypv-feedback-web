<?php 
    if (stristr($_SERVER["SCRIPT_FILENAME"],'index.php')) {
        $show_meta = TRUE;
    } else {
        $show_meta = FALSE;
    }
    require("config/config.php");
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="<?php echo (isset($description) && !empty($description)) ? $description : 'Welcome to Zephyr Solutions'; ?>">
        <?php if (isset($show_meta) && !empty($show_meta)) { ?>
        <meta name="google-site-verification" content="S9taxim5TpqEKydVFtJtA0op-zd4N57DK8x2nix65tk" />
        <?php } ?>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <title><?php echo (isset($title) && !empty($title)) ? $title : 'Welcome to Zephyr Solutions'; ?> </title>
        <base href="<?php echo $config['base_url']; ?>">

        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N3NBXPK');</script>
        <!-- End Google Tag Manager -->

        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">

        <!-- Bootstrap -->
        <link rel="stylesheet" type="text/css" href="css/font-awesome.css"/>

        <!-- jQuery Library -->
        <script src="js/jquery-1.11.0.min.js"></script>

        <!-- Bootstrap JS -->
        <script src="js/bootstrap.min.js"></script>

        <script src="js/jquery.validate.min.1.14.0.js"></script>
        <script src="js/jquery.custome-methods.js"></script>

        <link rel="stylesheet" type="text/css" href="css/custom.css"/>
        <link rel="stylesheet" type="text/css" href="css/stroke-gap-icons-style.css"/>
        <link rel="stylesheet" type="text/css" href="css/blog.css"/>
        <link rel="stylesheet" type="text/css" href="css/font-awesome.css"/>
        <link rel="stylesheet" type="text/css" href="css/about-us.css"/>
        <link rel="stylesheet" type="text/css" href="css/custom-2.css"/>

        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet">
    </head>
    <body>
        <!-- header section starts -->
        <header> 
            <!-- Static navbar -->
            <nav class="navbar navbar-default navbar-fixed-top tnb">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> 
                            <span class="sr-only">Toggle navigation</span> 
                            <span class="icon-bar"></span> 
                            <span class="icon-bar"></span> 
                            <span class="icon-bar"></span> 
                        </button>
                        <a class="navbar-brand" href="<?php echo $config['base_url']; ?>"><img src="images/logo.png"/></a> 
                    </div>
                    <div id="navbar" class="navbar-collapse collapse">
                        <?php include 'navbar.php'; ?>
                    </div>
                    <!-- /.nav-collapse --> 
                </div>
            </nav>
        </header>
        <!-- header section ends -->