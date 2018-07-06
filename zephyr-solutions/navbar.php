<?php
    $link = $_SERVER['PHP_SELF'];
    $link_array = explode('/',$link);
    $page = end($link_array);
?>

<ul class="nav navbar-nav navbar-right">
    
    <li class="<?php echo ($page == 'index.php') ? 'active' : ''; ?>"><a href="<?php echo $config['base_url']; ?>">Home</a></li>
    
    <li class="<?php echo ($page == 'about-us.php') ? 'active' : ''; ?>"><a href="<?php echo $config['base_url']; ?>about-us.php">About Us</a></li>

    <?php $servicesArr = array('services.php',
     	'services-discovery.php',
     	'services-ui-ux.php',
     	'services-enterprise-solutions.php',
     	'services-web-mobile.php',
     	'services-systems-integration.php',
     	'services-digital-marketing.php',
        'services-quality-assurance.php',
        'services-system-architecture.php'
    ); ?>
    <li class="<?php echo (  in_array($page, $servicesArr) ) ? 'active' : ''; ?>"><a href="<?php echo $config['base_url']; ?>services.php">Services</a></li>
    
    <!-- <li><a href="javascript:void(0);">Testimonials</a></li> -->
    
    <!-- <li><a href="javascript:void(0);">Blog</a></li> -->
    
    <li class="<?php echo ($page == 'contacts.php' || $page == 'contacts-success.php') ? 'active' : ''; ?>"><a href="<?php echo $config['base_url']; ?>contacts.php">Contacts</a></li>

</ul>