<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
|--------------------------------------------------------------------------
| smtp details
|--------------------------------------------------------------------------
|
*/


$config['site_name']                 = $this->config->item('site_name');
$config['domain_name']               = $this->config->item('domain_name');	

$__site__host ='';
if($_SERVER['HTTP_HOST'] == $config['domain_name'] || $_SERVER['HTTP_HOST'] == 'www.'.$config['domain_name'] ) {
	$__site__host ='live_host';
}
elseif ($_SERVER['HTTP_HOST'] == 'IP_ADDRESS') {
	$__site__host ='live_test_host';
}
elseif ($_SERVER['HTTP_HOST'] == 'dev.galaxyweblinks.com') {
	$__site__host ='test_host';
}
elseif ($_SERVER['HTTP_HOST'] == 'localhost') {
	$__site__host   ='local_host';
}
elseif ($_SERVER['HTTP_HOST'] == 'gwl5') {
	$__site__host   ='gwl5';
}


if ($__site__host=='live_host') { // IT will be used when site will be on internet but for test 
	/* For Live */
	//*
	$config=array(
					'protocol' => 'smtp',
					'smtp_host' => 'mail.examinationonline.com',
					'smtp_user' => 'xsmtp@examinationonline.com',
					'smtp_pass' => 'Goeudk8l569d',
					'mailtype' => 'html',
					'charset' => 'utf-8',
					'wordwrap' => TRUE,
					'smtp_timeout' => 10
				); 
	//*/
}
elseif ($__site__host=='live_host_testing') {  // IT will be used when site will be on internet but for test 
	/* For test host / live_host_testing */
	//*

	//*/
}
elseif ($__site__host=='test_host') {  // IT will be used when site will be on internet but for test 
	/* For test host / test_host */
	//*
	$config=array(
					'protocol' => 'smtp',
					'smtp_host' => 'smtp.sendgrid.net',
					'smtp_user' => 'pigmentworld',
					'smtp_pass' => 'Paran0rmal@12345',
					'mailtype' => 'html',
					'charset' => 'utf-8',
					'wordwrap' => TRUE,
					'smtp_timeout' => 10
				); 
	//*/
}
elseif ($__site__host=='local_host') { // IT is for localhost
	/* For test host / localhost */
	//*
	$config=array(
					'protocol' => 'smtp',
					'smtp_host' => 'mail.examinationonline.com',
					'smtp_user' => 'xsmtp@examinationonline.com',
					'smtp_pass' => 'Goeudk8l569d',
					'mailtype' => 'html',
					'charset' => 'utf-8',
					'wordwrap' => TRUE,
					'smtp_timeout' => 10
				); 
	//*/
}
elseif ($__site__host=='gwl5') { // IT is for gwl5
	/* For test host / gwl5 */
	//*
	$config=array(
					'protocol' => 'smtp',
					'smtp_host' => 'smtp.sendgrid.net',
					'smtp_user' => 'pigmentworld',
					'smtp_pass' => 'Paran0rmal@12345',
					'mailtype' => 'html',
					'charset' => 'utf-8',
					'wordwrap' => TRUE,
					'smtp_timeout' => 10
				); 
	//*/
}
?>