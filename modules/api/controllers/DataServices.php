<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Example
 *
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array.
 *
 * @package		CodeIgniter
 * @subpackage	Rest Server
 * @category	Controller
 * @author		Phil Sturgeon
 * @link		http://philsturgeon.co.uk/code/
*/

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH.'/libraries/REST_Controller.php';

class dataServices extends REST_Controller
{
    var $errorMsg = 'Server is not responding, it may be due to slow internet connectivity.';
    var $message  = array();

	function __construct()
    {
     
        // Construct our parent class
        parent::__construct();
        
        // Configure limits on our controller methods. Ensure
        // you have created the 'limits' table and enabled 'limits'
        // within application/config/rest.php
        $this->methods['user_get']['limit'] = 500; //500 requests per hour per user/key
        $this->methods['user_post']['limit'] = 100; //100 requests per hour per user/key
        $this->methods['user_delete']['limit'] = 50; //50 requests per hour per user/key

        //$this->data['basePath']=$this->config->item('base_url');
        $this->data['basePath']=$this->config->item('base_url_ssl');
        $this->data['basePathSSL']=$this->config->item('base_url_ssl');

    }

    function getAllCountries_get() {

        $errormessage = "";
        //$user_id = '';
        if ( $this->post('access_token')!='' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) ) ) {
            $requestFrom='Device';
            $user_access_tokens = $this->db->get_where('user_access_tokens',array('access_token'=>$_SERVER['HTTP_ACCESS_TOKEN']))->row();
            //$user_id = $user_access_tokens->user_id;
        } else {
            $requestFrom='Web';
            //$user_id = $this->session->userdata('user_id');
        }

        //if ($user_id!='' && $user_id > 0) {

            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);

            $message['response']="S";
            $message['message'] = "Successfully retrived";  
            $this->db->order_by('country_name');
            $message['data'] = $this->db->get('countries')->result();  
        
        //} else {
        //    $message['response']="F";
        //    $message['message'] = "Wrong user request";           
        //}
        $this->response($message, 200); // 200 being the HTTP response code
    }
}

