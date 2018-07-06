<?php

ini_set("memory_limit", "2000M");
ini_set("upload_max_filesize", "50M");
ini_set("post_max_size", "64M");
ini_set("max_execution_time", "300");
ini_set("max_input_time", "300");
date_default_timezone_set('UTC');
define('MYSQL_DATE', "Y-m-d H:i:s");

$config = array();

$config['site_name']   = 'zephyrsolutions';
$config['domain_name'] = $config['site_name'] . '.com.au';

$__site__host = '';

if ($_SERVER['HTTP_HOST'] == $config['domain_name'] || $_SERVER['HTTP_HOST'] == 'www.' . $config['domain_name']) {

    $__site__host = 'live_host';

} elseif ($_SERVER['HTTP_HOST'] == 'IP_ADDRESS') {

    $__site__host = 'live_test_host';

} elseif ($_SERVER['HTTP_HOST'] == 'dev.galaxyweblinks.com') {

    $__site__host = 'test_host';

} elseif ($_SERVER['HTTP_HOST'] == 'localhost') {

    $__site__host = 'local_host';

} elseif ($_SERVER['HTTP_HOST'] == '192.168.1.101') {

    $__site__host = '192.168.1.101';

}

$config['__site__host'] = $__site__host;

define('MAXLENGTH', 50);

if ($__site__host == "live_host") {

    $search_domain = substr($config['domain_name'], 0, strpos('/', $config['domain_name']));

    if (!stristr($_SERVER['HTTP_HOST'], 'www.' . $search_domain)) {
        $config['base_url'] = 'http://' . $config['domain_name'] . '/';
        $config['base_url_ssl'] = 'http://' . $config['domain_name'] . '/';
    } else {
        //header("Location:https://".$config['domain_name']."/".$_SERVER['REQUEST_URI']);	
        $config['base_url'] = 'http://www.' . $config['domain_name'] . '/';
        $config['base_url_ssl'] = 'http://www.' . $config['domain_name'] . '/';
    }

    $config['admin_email'] = 'info@zephyrsolutions.com.au';
    $config['admin_name'] = 'Zephyr Solutions';

} elseif ($__site__host == "live_test_host") {
    
} elseif ($__site__host == "test_host") {

    $config['base_url'] = 'http://dev.galaxyweblinks.com/ypv-feedback/zephyr-solutions/';
    $config['admin_email'] = 'gagankumar.pandya@galaxyweblinks.in';
    $config['admin_name'] = 'Gagan';

} elseif ($__site__host == "192.168.1.101") {

    $config['base_url'] = 'http://localhost/' . $config['site_name'] . '/';
    $config['admin_email'] = 'gagankumar.pandya@galaxyweblinks.in';
    $config['admin_name'] = 'Gagan';

} elseif ($__site__host == "local_host") {  // IT is for local_host

    $config['base_url'] = 'http://localhost/zephyr-solutions/';
    $config['admin_email'] = 'gagankumar.pandya@galaxyweblinks.in';
    $config['admin_name'] = 'Gagan';
}

?>