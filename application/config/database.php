<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//http://ypvhealing.com/feedback/

$config['site_name']                 = 'ypvhealing';
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
elseif ($_SERVER['HTTP_HOST'] == 'dev.galaxyweblinks.com') {
	$__site__host ='test_host';
}
elseif ($_SERVER['HTTP_HOST'] == 'localhost') {
	$__site__host   ='local_host';
}
elseif ($_SERVER['HTTP_HOST'] == '192.168.0.60' || $_SERVER['HTTP_HOST'] == '192.168.0.58') {
	$__site__host   ='192.168.0.60';
}
elseif ($_SERVER['HTTP_HOST'] == '192.168.7.101') {
	$__site__host   ='192.168.7.101';
}

/*
| -------------------------------------------------------------------
| DATABASE CONNECTIVITY SETTINGS
| -------------------------------------------------------------------
| This file will contain the settings needed to access your database.
|
| For complete instructions please consult the 'Database Connection'
| page of the User Guide.
|
| -------------------------------------------------------------------
| EXPLANATION OF VARIABLES
| -------------------------------------------------------------------
|
|	['dsn']      The full DSN string describe a connection to the database.
|	['hostname'] The hostname of your database server.
|	['username'] The username used to connect to the database
|	['password'] The password used to connect to the database
|	['database'] The name of the database you want to connect to
|	['dbdriver'] The database driver. e.g.: mysqli.
|			Currently supported:
|				 cubrid, ibase, mssql, mysql, mysqli, oci8,
|				 odbc, pdo, postgre, sqlite, sqlite3, sqlsrv
|	['dbprefix'] You can add an optional prefix, which will be added
|				 to the table name when using the  Query Builder class
|	['pconnect'] TRUE/FALSE - Whether to use a persistent connection
|	['db_debug'] TRUE/FALSE - Whether database errors should be displayed.
|	['cache_on'] TRUE/FALSE - Enables/disables query caching
|	['cachedir'] The path to the folder where cache files should be stored
|	['char_set'] The character set used in communicating with the database
|	['dbcollat'] The character collation used in communicating with the database
|				 NOTE: For MySQL and MySQLi databases, this setting is only used
| 				 as a backup if your server is running PHP < 5.2.3 or MySQL < 5.0.7
|				 (and in table creation queries made with DB Forge).
| 				 There is an incompatibility in PHP with mysql_real_escape_string() which
| 				 can make your site vulnerable to SQL injection if you are using a
| 				 multi-byte character set and are running versions lower than these.
| 				 Sites using Latin-1 or UTF-8 database character set and collation are unaffected.
|	['swap_pre'] A default table prefix that should be swapped with the dbprefix
|	['encrypt']  Whether or not to use an encrypted connection.
|
|			'mysql' (deprecated), 'sqlsrv' and 'pdo/sqlsrv' drivers accept TRUE/FALSE
|			'mysqli' and 'pdo/mysql' drivers accept an array with the following options:
|
|				'ssl_key'    - Path to the private key file
|				'ssl_cert'   - Path to the public key certificate file
|				'ssl_ca'     - Path to the certificate authority file
|				'ssl_capath' - Path to a directory containing trusted CA certificats in PEM format
|				'ssl_cipher' - List of *allowed* ciphers to be used for the encryption, separated by colons (':')
|				'ssl_verify' - TRUE/FALSE; Whether verify the server certificate or not ('mysqli' only)
|
|	['compress'] Whether or not to use client compression (MySQL only)
|	['stricton'] TRUE/FALSE - forces 'Strict Mode' connections
|							- good for ensuring strict SQL while developing
|	['ssl_options']	Used to set various SSL options that can be used when making SSL connections.
|	['failover'] array - A array with 0 or more data for connections if the main should fail.
|	['save_queries'] TRUE/FALSE - Whether to "save" all executed queries.
| 				NOTE: Disabling this will also effectively disable both
| 				$this->db->last_query() and profiling of DB queries.
| 				When you run a query, with this setting set to TRUE (default),
| 				CodeIgniter will store the SQL statement for debugging purposes.
| 				However, this may cause high memory usage, especially if you run
| 				a lot of SQL queries ... disable this to avoid that problem.
|
| The $active_group variable lets you choose which connection group to
| make active.  By default there is only one group (the 'default' group).
|
| The $query_builder variables lets you determine whether or not to load
| the query builder class.
*/

$query_builder = TRUE;
$active_group = 'default';
$active_record = TRUE;

if ($__site__host=='live_host') {  // IT will be used when site will be on internet but for test 

	$db['default']['hostname'] = 'mariadb-163.wc2.phx1.stabletransit.com';
	$db['default']['username'] = '1016720_ypvheal';
	$db['default']['password'] = 'Heal391#25&gt56G';
	$db['default']['database'] = '1016720_ypvhealing';
	
} 
elseif ($__site__host=='live_host_testing') {  // IT will be used when site will be on internet but for test 
	
}
elseif ($__site__host=='test_host') { // IT will be used when site will be on internet but for test 

	$db['default']['hostname'] = 'localhost';
	$db['default']['username'] = 'ypvfeedback';
	$db['default']['password'] = 'Jcei*%DS9#04jd#ndMN';
	$db['default']['database'] = 'ypv_feedback';

}elseif ($__site__host=='192.168.0.60') {  // IT is for localhost	
	$db['default']['hostname'] = '192.168.0.60';
	$db['default']['username'] = 'root_gwl5';
	$db['default']['password'] = '';
	$db['default']['database'] = 'ypv_feedback';
}elseif ($__site__host=='192.168.7.101') {  // IT is for localhost	
	$db['default']['hostname'] = 'localhost';
	$db['default']['username'] = 'root';
	$db['default']['password'] = '';
	$db['default']['database'] = 'ypv_feedback';
}
elseif ($__site__host=='local_host') {  // IT is for localhost	
	$db['default']['hostname'] = '192.168.0.60';
	$db['default']['username'] = 'root_gwl5';
	$db['default']['password'] = '';
	$db['default']['database'] = 'ypv_feedback';
	/*$db['default']['hostname'] = 'localhost';
	$db['default']['username'] = 'root';
	$db['default']['password'] = '';
	$db['default']['database'] = 'ypv_feedback';*/
}

$db['default']['dsn'] = '';
$db['default']['dbdriver'] = 'mysqli';
$db['default']['dbprefix'] = '';
$db['default']['pconnect'] = FALSE;
$db['default']['db_debug'] = (ENVIRONMENT !== 'production');
$db['default']['cache_on'] = FALSE;
$db['default']['cachedir'] = '';
$db['default']['char_set'] = 'utf8';
$db['default']['dbcollat'] = 'utf8_general_ci';
$db['default']['swap_pre'] = '';
$db['default']['autoinit'] = TRUE;
$db['default']['stricton'] = FALSE;
$db['default']['encrypt'] = FALSE;
$db['default']['compress'] = FALSE;
$db['default']['save_queries'] = TRUE;