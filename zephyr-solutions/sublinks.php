<?php
    $link = $_SERVER['PHP_SELF'];
    $link_array = explode('/',$link);
    $page = end($link_array);
?>

<ul>
    <li><a href="<?php echo $config['base_url']; ?>services-discovery.php" class="<?php echo ($page == 'services-discovery.php') ? 'active' : ''; ?>">Discovery & Planning</a> </li> 
    
    <li><a href="<?php echo $config['base_url']; ?>services-ui-ux.php" class="<?php echo ($page == 'services-ui-ux.php') ? 'active' : ''; ?>">UX & UI Design</a> </li> 
    
    <li><a href="<?php echo $config['base_url']; ?>services-enterprise-solutions.php" class="<?php echo ($page == 'services-enterprise-solutions.php') ? 'active' : ''; ?>">Enterprise Solutions</a> </li> 
    
    <li><a href="<?php echo $config['base_url']; ?>services-web-mobile.php" class="<?php echo ($page == 'services-web-mobile.php') ? 'active' : ''; ?>">Web & Mobile</a> </li> 
    
    <li><a href="<?php echo $config['base_url']; ?>services-systems-integration.php" class="<?php echo ($page == 'services-systems-integration.php') ? 'active' : ''; ?>">System Integration</a> </li> 
    
    <li><a href="<?php echo $config['base_url']; ?>services-digital-marketing.php" class="<?php echo ($page == 'services-digital-marketing.php') ? 'active' : ''; ?>">Digital Marketing</a> </li>
    
    <li><a href="<?php echo $config['base_url']; ?>services-system-architecture.php" class="<?php echo ($page == 'services-system-architecture.php') ? 'active' : ''; ?>">System Architecture & Solution design</a> </li>

    <li><a href="<?php echo $config['base_url']; ?>services-quality-assurance.php" class="<?php echo ($page == 'services-quality-assurance.php') ? 'active' : ''; ?>">Quality Assurance</a> </li>
</ul>