<?php
defined('BASEPATH') OR exit('No direct script access allowed');


ini_set("memory_limit","2000M");
ini_set("upload_max_filesize","50M"); 
ini_set("post_max_size","64M");
ini_set("max_execution_time","300");
ini_set("max_input_time","300");
date_default_timezone_set('UTC');
define('MYSQL_DATE', "Y-m-d H:i:s");

//http://ypvhealing.com/feedback/



$config['site_name']                 = 'ypvhealing';
$config['dev_site_name']             = 'ypv-feedback';
$config['domain_name']               = $config['site_name'].'.com';		
if ( stristr($_SERVER['HTTP_HOST'],'.in') ) {
	$config['domain_name']               = $config['site_name'].'.in';		
}
if ( stristr($_SERVER['HTTP_HOST'],'.com') ) {
	$config['domain_name']               = $config['site_name'].'.com';		
}

$__site__host ='';
if($_SERVER['HTTP_HOST'] == $config['domain_name'] || $_SERVER['HTTP_HOST'] == 'www.'.$config['domain_name'] ) {
	$__site__host ='live_host';
}
elseif ($_SERVER['HTTP_HOST'] == 'IP_ADDRESS') {
	$__site__host ='live_test_host';
}
elseif ($_SERVER['HTTP_HOST'] == 'ypv-feedback.galaxyweblinks.in') {
	$__site__host ='test_host';
}
elseif ($_SERVER['HTTP_HOST'] == 'localhost') {
	$__site__host   ='local_host';
}
elseif ($_SERVER['HTTP_HOST'] == '192.168.0.60') {
	$__site__host   ='192.168.0.60';
}
elseif ($_SERVER['HTTP_HOST'] == '192.168.0.58') {
	$__site__host   ='192.168.0.58';
}
elseif ($_SERVER['HTTP_HOST'] == '192.168.7.24') {
	$__site__host   ='192.168.7.24';
}

$config['__site__host']				 = $__site__host;	


define('MAXLENGTH', 50);
	

if ($__site__host == "live_host") {
	
	$search_domain = substr($config['domain_name'],0,strpos('/',$config['domain_name']));
	if ( !stristr($_SERVER['HTTP_HOST'],'www.'.$search_domain) ) {
		$config['base_url']	                 = 'http://'.$config['domain_name'] .'/feedback/';
		$config['base_url_ssl']	         	 = 'https://'.$config['domain_name'] .'/feedback/';
		//$config['base_url_http']	         = 'http://'.$config['domain_name'] .'/';
		//$config['base_url_https']	         = 'https://'.$config['domain_name'] .'/';
	} else {
		header("Location:https://".$config['domain_name']."/".$_SERVER['REQUEST_URI']);	
		//$config['base_url']	                 = 'https://www.'.$config['domain_name'] .'/';
		//$config['base_url_ssl']	         	 = 'https://www.'.$config['domain_name'] .'/';
	}
	$config['from_email']		         = 'vikram.jain@galaxyweblinks.co.in';  //use from databse super admin email
	$config['admin_email']		     	 = $config['from_email'];  //use from super admin email	
	$config['contact_email']	         = $config['from_email'];   //use from databse super admin email
	$config['cc_email']		         	 = $config['from_email'];  //use from super admin email	
	$config['bcc_email']		       	 = $config['from_email'];  //use from super admin email	

}
elseif ($__site__host == "live_test_host" ) {
	

}
elseif ($__site__host == "test_host") {

	
	$config['base_url']					 = 'http://ypv-feedback.galaxyweblinks.in/'.$config['dev_site_name'].'/';
	$config['base_url_ssl']				 = 'https://ypv-feedback.galaxyweblinks.in/'.$config['dev_site_name'].'/';
	$config['from_email']		         = 'ayazahmed.khan@galaxyweblinks.in';  //use from databse super admin email
	$config['admin_email']		     	 = $config['from_email'];  //use from super admin email	
	$config['contact_email']	         = $config['from_email'];   //use from databse super admin email
	$config['cc_email']		         	 = $config['from_email'];  //use from super admin email	
	$config['bcc_email']		       	 = $config['from_email'];  //use from super admin email	


}
elseif ($__site__host == "192.168.0.60" || $__site__host == "192.168.0.58") {
	$config['base_url']					 = 'http://'.$__site__host.'/'.$config['dev_site_name'].'/dev/';
	$config['base_url_ssl']				 = 'https://'.$__site__host.'/'.$config['dev_site_name'].'/dev/';
	$config['from_email']		         = 'ayazahmed.khan@galaxyweblinks.in';  //use from databse super admin email
	$config['admin_email']		     	 = $config['from_email'];  //use from super admin email	
	$config['contact_email']	         = $config['from_email'];   //use from databse super admin email
	$config['cc_email']		         	 = $config['from_email'];  //use from super admin email	
	$config['bcc_email']		       	 = $config['from_email'];  //use from super admin email	

}
elseif ($__site__host == "192.168.7.101") {
	$config['base_url']					 = 'http://192.168.7.101/'.$config['dev_site_name'].'/dev/';
	$config['base_url_ssl']				 = 'https://192.168.7.101/'.$config['dev_site_name'].'/dev/';
	$config['from_email']		         = 'gagankumar.pandya@galaxyweblinks.in';  //use from databse super admin email
	$config['admin_email']		     	 = $config['from_email'];  //use from super admin email	
	$config['contact_email']	         = $config['from_email'];   //use from databse super admin email
	$config['cc_email']		         	 = $config['from_email'];  //use from super admin email	
	$config['bcc_email']		       	 = $config['from_email'];  //use from super admin email	

}
elseif ($__site__host == "local_host")  // IT is for local_host
{	
	$config['base_url']					 = 'http://localhost/'.$config['dev_site_name'].'/dev/';
	$config['base_url_ssl']				 = 'https://localhost/'.$config['dev_site_name'].'/dev/';
	$config['from_email']		         = 'ayazahmed.khan@galaxyweblinks.in';  //use from databse super admin email
	$config['admin_email']		     	 = $config['from_email'];  //use from super admin email	
	$config['contact_email']	         = $config['from_email'];   //use from databse super admin email
	$config['cc_email']		         	 = $config['from_email'];  //use from super admin email	
	$config['bcc_email']		       	 = $config['from_email'];  //use from super admin email	
}



$config['emails_attachment_path']    = 'uploads/templates/';
$config['from_name']		         = $config['site_name'];
$config['no_reply']		       		 = 'no-reply@'.$config['domain_name'];  //use from super admin email

$config['email_footer']				 = '<b>Thanks</b><br><b>'.$config['site_name'].'</b>';	

$config['date_formate_1']            = 'm-d-Y';
$config['date_formate_2']            = 'd-m-y';
$config['date_formate_3']            = 'Y-m-d';

$config['time_formate_1']           = 'h:i A';

$config['admin_pagging_limit']  	 = '10';
$config['admin_pagging_num_links']   = '10';
$config['front_pagging_limit']  	 = '3';
$config['front_pagging_num_links']   = '3';

$config['cron_pagging_limit']   	 = '5';
$config['cron_num_links']   		 = '5';

/* Not in use but this may be used in fck editor for user images upload */
$directoriesOnRoot='/';
$config['directoriesOnRoot']		 = $directoriesOnRoot;
define("User_Files_Path", $config['base_url'].'userfiles/'); 
define("User_Files_Absolute_Path", 'D:/xampp/htdocs/'.$directoriesOnRoot.'userfiles/'); 	


if( empty( $_SERVER['HTTP_ACCESS_TOKEN'] )) { 
	foreach (getallheaders() as $name => $value) {

		if ($name==strtolower('ACCESS_TOKEN') && !isset($_SERVER['HTTP_ACCESS_TOKEN']))
		{ 
			$_SERVER['HTTP_ACCESS_TOKEN'] = $value;break;
		}
	}
}
$config['token'] = !empty($_SERVER['HTTP_ACCESS_TOKEN']) ? $_SERVER['HTTP_ACCESS_TOKEN'] : '';


$config['months'] = array(	'1' => 'January',
							'2' => 'February',
							'3' => 'March',
							'4' => 'April',
							'5' => 'May',
							'6' => 'June',
							'7' => 'July',
							'8' => 'August',
							'9' => 'September',
							'10' => 'October',
							'11' => 'November',	
							'12' => 'December'
						);

/* start module settings */
$config['modules'] = array('admin'=>'Adminisrator','api'=>'WS','frontend'=>'End User','examiner'=>'Trainer','student'=>'Arhatic Yogi');
$config['modules_plurals'] = array('admin'=>'Adminisrators','api'=>'WSies','frontend'=>'End Users','examiner'=>'Trainers','student'=>'Arhatic Yogies');

$config['modules_folders'] = array('admin'=>'admin','api'=>'api','frontend'=>'frontend','examiner'=>'trainer','student'=>'arhaticYogi');
$config['modules_titles'] = array('admin'=>'ypv-feedback admin system','api'=>'api','frontend'=>'ypv-feedback system','examiner'=>'trainer site','student'=>'arhaticYogi site');
$config['modules_locations'] = array(FCPATH.'modules/'=> '../../modules/' );

defined('ADMIN_PATH')  OR define('ADMIN_PATH', FCPATH.'modules/'.$config['modules_folders']['admin'].'/');
defined('EXAMINER_PATH')  OR define('EXAMINER_PATH', FCPATH.'modules/'.$config['modules_folders']['examiner'].'/');
defined('STUDENT_PATH')  OR define('STUDENT_PATH', FCPATH); 

defined('ADMINS')  OR define('ADMINS', $config['modules_plurals']['admin']);
defined('ADMIN')  OR define('ADMIN', $config['modules']['admin']);
defined('ADMIN_FOLDER')  OR define('ADMIN_FOLDER', $config['modules_folders']['admin']);

defined('EXAMINERS')  OR define('EXAMINERS', $config['modules_plurals']['examiner']);
defined('EXAMINER')  OR define('EXAMINER', $config['modules']['examiner']);
defined('EXAMINER_FOLDER')  OR define('EXAMINER_FOLDER', $config['modules_folders']['examiner']);

defined('STUDENTS')  OR define('STUDENTS', $config['modules_plurals']['student']);
defined('STUDENT')  OR define('STUDENT', $config['modules']['student']);
defined('STUDENT_FOLDER')  OR define('STUDENT_FOLDER', $config['modules_folders']['student']);

/* end module settings */

/* =================Default Valuse for Country, State, Cities=================== */

$config['default_langauge_id']= '2';
$config['default_country_id']= '223';
$config['default_state_id']= '12';
$config['default_city_id']= '58261';


/* =================Facebook Application settings =================== */
//
//
//                               
$config['permitted_uri_chars'] = 'a-z 0-9~%.,:_\-=';  //normal codeignitor settings
//$config['permitted_uri_chars'] = 'a-z 0-9?~%.:_\-';   //For Facebook 
//$config['enable_query_strings'] = TRUE;               //For Facebook 
$config['enable_query_strings'] = FALSE;   //normal codeignitor settings
											// foreach($_GET as $key => $value) $_REQUEST[$key] = $value;  //when uri_protocol is REQUEST_URI use this code in controller 
//$config['uri_protocol']    = "REQUEST_URI"; // AUTO     either  REQUEST_URI or QUERY_STRING
											// REQUEST_URI will give get parameer in only $_GET
											// QUERY_STRING will remove $_SERVER['QUERY_STRING']
											// DO NOT USE THIS ----- ORIG_PATH_INFO     PATH_INFO     will not use another controller always use default
											
$config['uri_protocol']    = "QUERY_STRING";  //normal codeignitor settings
//$config['uri_protocol']    = "REQUEST_URI"; // For Facebook

/* ============ FACEE BOOK ============================== */


/*
|--------------------------------------------------------------------------
| Base Site URL
|--------------------------------------------------------------------------
|
| URL to your CodeIgniter root. Typically this will be your base URL,
| WITH a trailing slash:
|
|	http://example.com/
|
| WARNING: You MUST set this value!
|
| If it is not set, then CodeIgniter will try guess the protocol and path
| your installation, but due to security concerns the hostname will be set
| to $_SERVER['SERVER_ADDR'] if available, or localhost otherwise.
| The auto-detection mechanism exists only for convenience during
| development and MUST NOT be used in production!
|
| If you need to allow multiple domains, remember that this file is still
| a PHP script and you can easily do that on your own.
|
*/

//$config['base_url'] = Above already defined 

/*
|--------------------------------------------------------------------------
| Index File
|--------------------------------------------------------------------------
|
| Typically this will be your index.php file, unless you've renamed it to
| something else. If you are using mod_rewrite to remove the page set this
| variable so that it is blank.
|
*/
$config['index_page'] = '';

/*
|--------------------------------------------------------------------------
| URI PROTOCOL
|--------------------------------------------------------------------------
|
| This item determines which server global should be used to retrieve the
| URI string.  The default setting of 'REQUEST_URI' works for most servers.
| If your links do not seem to work, try one of the other delicious flavors:
|
| 'REQUEST_URI'    Uses $_SERVER['REQUEST_URI']
| 'QUERY_STRING'   Uses $_SERVER['QUERY_STRING']
| 'PATH_INFO'      Uses $_SERVER['PATH_INFO']
|
| WARNING: If you set this to 'PATH_INFO', URIs will always be URL-decoded!
*/
$config['uri_protocol']	= 'REQUEST_URI';

/*
|--------------------------------------------------------------------------
| URL suffix
|--------------------------------------------------------------------------
|
| This option allows you to add a suffix to all URLs generated by CodeIgniter.
| For more information please see the user guide:
|
| https://codeigniter.com/user_guide/general/urls.html
|
| Note: This option is ignored for CLI requests.
*/
$config['url_suffix'] = '';

/*
|--------------------------------------------------------------------------
| Default Language
|--------------------------------------------------------------------------
|
| This determines which set of language files should be used. Make sure
| there is an available translation if you intend to use something other
| than english.
|
*/
$config['language']	= 'english';

/*
|--------------------------------------------------------------------------
| Default Character Set
|--------------------------------------------------------------------------
|
| This determines which character set is used by default in various methods
| that require a character set to be provided.
|
| See http://php.net/htmlspecialchars for a list of supported charsets.
|
*/
$config['charset'] = 'UTF-8';

/*
|--------------------------------------------------------------------------
| Enable/Disable System Hooks
|--------------------------------------------------------------------------
|
| If you would like to use the 'hooks' feature you must enable it by
| setting this variable to TRUE (boolean).  See the user guide for details.
|
*/
$config['enable_hooks'] = FALSE;

/*
|--------------------------------------------------------------------------
| Class Extension Prefix
|--------------------------------------------------------------------------
|
| This item allows you to set the filename/classname prefix when extending
| native libraries.  For more information please see the user guide:
|
| https://codeigniter.com/user_guide/general/core_classes.html
| https://codeigniter.com/user_guide/general/creating_libraries.html
|
*/
$config['subclass_prefix'] = 'MY_';

/*
|--------------------------------------------------------------------------
| Composer auto-loading
|--------------------------------------------------------------------------
|
| Enabling this setting will tell CodeIgniter to look for a Composer
| package auto-loader script in application/vendor/autoload.php.
|
|	$config['composer_autoload'] = TRUE;
|
| Or if you have your vendor/ directory located somewhere else, you
| can opt to set a specific path as well:
|
|	$config['composer_autoload'] = '/path/to/vendor/autoload.php';
|
| For more information about Composer, please visit http://getcomposer.org/
|
| Note: This will NOT disable or override the CodeIgniter-specific
|	autoloading (application/config/autoload.php)
*/
$config['composer_autoload'] = FALSE;

/*
|--------------------------------------------------------------------------
| Allowed URL Characters
|--------------------------------------------------------------------------
|
| This lets you specify which characters are permitted within your URLs.
| When someone tries to submit a URL with disallowed characters they will
| get a warning message.
|
| As a security measure you are STRONGLY encouraged to restrict URLs to
| as few characters as possible.  By default only these are allowed: a-z 0-9~%.:_-
|
| Leave blank to allow all characters -- but only if you are insane.
|
| The configured value is actually a regular expression character group
| and it will be executed as: ! preg_match('/^[<permitted_uri_chars>]+$/i
|
| DO NOT CHANGE THIS UNLESS YOU FULLY UNDERSTAND THE REPERCUSSIONS!!
|
| Note: This option is ignored for CLI requests.
|
*/
$config['permitted_uri_chars'] = 'a-z 0-9~%.:_\-';

/*
|--------------------------------------------------------------------------
| Enable Query Strings
|--------------------------------------------------------------------------
|
| By default CodeIgniter uses search-engine friendly segment based URLs:
| example.com/who/what/where/
|
| By default CodeIgniter enables access to the $_GET array.  If for some
| reason you would like to disable it, set 'allow_get_array' to FALSE.
|
| You can optionally enable standard query string based URLs:
| example.com?who=me&what=something&where=here
|
| Options are: TRUE or FALSE (boolean)
|
| The other items let you set the query string 'words' that will
| invoke your controllers and its functions:
| example.com/index.php?c=controller&m=function
|
| Please note that some of the helpers won't work as expected when
| this feature is enabled, since CodeIgniter is designed primarily to
| use segment based URLs.
|
*/
$config['allow_get_array'] = TRUE;
$config['enable_query_strings'] = FALSE;
$config['controller_trigger'] = 'c';
$config['function_trigger'] = 'm';
$config['directory_trigger'] = 'd';

/*
|--------------------------------------------------------------------------
| Error Logging Threshold
|--------------------------------------------------------------------------
|
| You can enable error logging by setting a threshold over zero. The
| threshold determines what gets logged. Threshold options are:
|
|	0 = Disables logging, Error logging TURNED OFF
|	1 = Error Messages (including PHP errors)
|	2 = Debug Messages
|	3 = Informational Messages
|	4 = All Messages
|
| You can also pass an array with threshold levels to show individual error types
|
| 	array(2) = Debug Messages, without Error Messages
|
| For a live site you'll usually only enable Errors (1) to be logged otherwise
| your log files will fill up very fast.
|
*/
$config['log_threshold'] = 0;

/*
|--------------------------------------------------------------------------
| Error Logging Directory Path
|--------------------------------------------------------------------------
|
| Leave this BLANK unless you would like to set something other than the default
| application/logs/ directory. Use a full server path with trailing slash.
|
*/
$config['log_path'] = '';

/*
|--------------------------------------------------------------------------
| Log File Extension
|--------------------------------------------------------------------------
|
| The default filename extension for log files. The default 'php' allows for
| protecting the log files via basic scripting, when they are to be stored
| under a publicly accessible directory.
|
| Note: Leaving it blank will default to 'php'.
|
*/
$config['log_file_extension'] = '';

/*
|--------------------------------------------------------------------------
| Log File Permissions
|--------------------------------------------------------------------------
|
| The file system permissions to be applied on newly created log files.
|
| IMPORTANT: This MUST be an integer (no quotes) and you MUST use octal
|            integer notation (i.e. 0700, 0644, etc.)
*/
$config['log_file_permissions'] = 0644;

/*
|--------------------------------------------------------------------------
| Date Format for Logs
|--------------------------------------------------------------------------
|
| Each item that is logged has an associated date. You can use PHP date
| codes to set your own date formatting
|
*/
$config['log_date_format'] = 'Y-m-d H:i:s';

/*
|--------------------------------------------------------------------------
| Error Views Directory Path
|--------------------------------------------------------------------------
|
| Leave this BLANK unless you would like to set something other than the default
| application/views/errors/ directory.  Use a full server path with trailing slash.
|
*/
$config['error_views_path'] = '';

/*
|--------------------------------------------------------------------------
| Cache Directory Path
|--------------------------------------------------------------------------
|
| Leave this BLANK unless you would like to set something other than the default
| application/cache/ directory.  Use a full server path with trailing slash.
|
*/
$config['cache_path'] = '';

/*
|--------------------------------------------------------------------------
| Cache Include Query String
|--------------------------------------------------------------------------
|
| Whether to take the URL query string into consideration when generating
| output cache files. Valid options are:
|
|	FALSE      = Disabled
|	TRUE       = Enabled, take all query parameters into account.
|	             Please be aware that this may result in numerous cache
|	             files generated for the same page over and over again.
|	array('q') = Enabled, but only take into account the specified list
|	             of query parameters.
|
*/
$config['cache_query_string'] = FALSE;

/*
|--------------------------------------------------------------------------
| Encryption Key
|--------------------------------------------------------------------------
|
| If you use the Encryption class, you must set an encryption key.
| See the user guide for more info.
|
| https://codeigniter.com/user_guide/libraries/encryption.html
|
*/
$config['encryption_key'] = '31SEOl1310C11abC03oR86rEPORtn4Qz';

/*
|--------------------------------------------------------------------------
| Session Variables
|--------------------------------------------------------------------------
|
| 'sess_driver'
|
|	The storage driver to use: files, database, redis, memcached
|
| 'sess_cookie_name'
|
|	The session cookie name, must contain only [0-9a-z_-] characters
|
| 'sess_expiration'
|
|	The number of SECONDS you want the session to last.
|	Setting to 0 (zero) means expire when the browser is closed.
|
| 'sess_save_path'
|
|	The location to save sessions to, driver dependent.
|
|	For the 'files' driver, it's a path to a writable directory.
|	WARNING: Only absolute paths are supported!
|
|	For the 'database' driver, it's a table name.
|	Please read up the manual for the format with other session drivers.
|
|	IMPORTANT: You are REQUIRED to set a valid save path!
|
| 'sess_match_ip'
|
|	Whether to match the user's IP address when reading the session data.
|
|	WARNING: If you're using the database driver, don't forget to update
|	         your session table's PRIMARY KEY when changing this setting.
|
| 'sess_time_to_update'
|
|	How many seconds between CI regenerating the session ID.
|
| 'sess_regenerate_destroy'
|
|	Whether to destroy session data associated with the old session ID
|	when auto-regenerating the session ID. When set to FALSE, the data
|	will be later deleted by the garbage collector.
|
| Other session cookie settings are shared with the rest of the application,
| except for 'cookie_prefix' and 'cookie_httponly', which are ignored here.
|
*/
$config['sess_driver'] = 'database';
$config['sess_cookie_name'] = 'ci_session';
$config['sess_expiration'] = 7200;
$config['sess_save_path'] = 'ci_sessions';
$config['sess_match_ip'] = FALSE;
$config['sess_time_to_update'] = 300;
$config['sess_regenerate_destroy'] = FALSE;

/*
|--------------------------------------------------------------------------
| Cookie Related Variables
|--------------------------------------------------------------------------
|
| 'cookie_prefix'   = Set a cookie name prefix if you need to avoid collisions
| 'cookie_domain'   = Set to .your-domain.com for site-wide cookies
| 'cookie_path'     = Typically will be a forward slash
| 'cookie_secure'   = Cookie will only be set if a secure HTTPS connection exists.
| 'cookie_httponly' = Cookie will only be accessible via HTTP(S) (no javascript)
|
| Note: These settings (with the exception of 'cookie_prefix' and
|       'cookie_httponly') will also affect sessions.
|
*/
$config['cookie_prefix']	= '';
$config['cookie_domain']	= '';
$config['cookie_path']		= '/';
$config['cookie_secure']	= FALSE;
$config['cookie_httponly'] 	= FALSE;

/*
|--------------------------------------------------------------------------
| Standardize newlines
|--------------------------------------------------------------------------
|
| Determines whether to standardize newline characters in input data,
| meaning to replace \r\n, \r, \n occurrences with the PHP_EOL value.
|
| This is particularly useful for portability between UNIX-based OSes,
| (usually \n) and Windows (\r\n).
|
*/
$config['standardize_newlines'] = FALSE;

/*
|--------------------------------------------------------------------------
| Global XSS Filtering
|--------------------------------------------------------------------------
|
| Determines whether the XSS filter is always active when GET, POST or
| COOKIE data is encountered
|
| WARNING: This feature is DEPRECATED and currently available only
|          for backwards compatibility purposes!
|
*/
$config['global_xss_filtering'] = FALSE;

/*
|--------------------------------------------------------------------------
| Cross Site Request Forgery
|--------------------------------------------------------------------------
| Enables a CSRF cookie token to be set. When set to TRUE, token will be
| checked on a submitted form. If you are accepting user data, it is strongly
| recommended CSRF protection be enabled.
|
| 'csrf_token_name' = The token name
| 'csrf_cookie_name' = The cookie name
| 'csrf_expire' = The number in seconds the token should expire.
| 'csrf_regenerate' = Regenerate token on every submission
| 'csrf_exclude_uris' = Array of URIs which ignore CSRF checks
*/
$config['csrf_protection'] = FALSE;
$config['csrf_token_name'] = 'csrf_test_name';
$config['csrf_cookie_name'] = 'csrf_cookie_name';
$config['csrf_expire'] = 7200;
$config['csrf_regenerate'] = TRUE;
$config['csrf_exclude_uris'] = array();

/*
|--------------------------------------------------------------------------
| Output Compression
|--------------------------------------------------------------------------
|
| Enables Gzip output compression for faster page loads.  When enabled,
| the output class will test whether your server supports Gzip.
| Even if it does, however, not all browsers support compression
| so enable only if you are reasonably sure your visitors can handle it.
|
| Only used if zlib.output_compression is turned off in your php.ini.
| Please do not use it together with httpd-level output compression.
|
| VERY IMPORTANT:  If you are getting a blank page when compression is enabled it
| means you are prematurely outputting something to your browser. It could
| even be a line of whitespace at the end of one of your scripts.  For
| compression to work, nothing can be sent before the output buffer is called
| by the output class.  Do not 'echo' any values with compression enabled.
|
*/
$config['compress_output'] = FALSE;

/*
|--------------------------------------------------------------------------
| Master Time Reference
|--------------------------------------------------------------------------
|
| Options are 'local' or any PHP supported timezone. This preference tells
| the system whether to use your server's local time as the master 'now'
| reference, or convert it to the configured one timezone. See the 'date
| helper' page of the user guide for information regarding date handling.
|
*/
$config['time_reference'] = 'local';

/*
|--------------------------------------------------------------------------
| Rewrite PHP Short Tags
|--------------------------------------------------------------------------
|
| If your PHP installation does not have short tag support enabled CI
| can rewrite the tags on-the-fly, enabling you to utilize that syntax
| in your view files.  Options are TRUE or FALSE (boolean)
|
| Note: You need to have eval() enabled for this to work.
|
*/
$config['rewrite_short_tags'] = FALSE;

/*
|--------------------------------------------------------------------------
| Reverse Proxy IPs
|--------------------------------------------------------------------------
|
| If your server is behind a reverse proxy, you must whitelist the proxy
| IP addresses from which CodeIgniter should trust headers such as
| HTTP_X_FORWARDED_FOR and HTTP_CLIENT_IP in order to properly identify
| the visitor's IP address.
|
| You can use both an array or a comma-separated list of proxy addresses,
| as well as specifying whole subnets. Here are a few examples:
|
| Comma-separated:	'10.0.1.200,192.168.5.0/24'
| Array:		array('10.0.1.200', '192.168.5.0/24')
*/
$config['proxy_ips'] = '';

