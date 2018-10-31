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

class userServices extends REST_Controller
{
    var $errorMsg = 'Server is not responding, it may be due to slow internet connectivity.';
    var $message  = array();

	function __construct()
    {
        //for angularjs post fix
        if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
            if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
                $_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
        }

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

        $this->load->model(array( $this->config->item('modules_folders')['admin'].'/Admin','User')); 
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: PUT, GET, POST");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    }


   // user login
    function login_post() {
        if(!empty($this->post())) { 
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            //if ( $this->post('access_token')!='' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) ) ) {
            if ( !empty($this->post('device_id')) && !empty($this->post('device_type')) ) {
                $requestFrom='Device';
                $device_id    = $this->post('device_id');
                $device_type  = $this->post('device_type');
            } else {
                $requestFrom='Web';
            }

            // Setting validation rules
            $this->form_validation->set_rules($this->Admin->admin_login_rules());
            $this->form_validation->set_error_delimiters('', '<br/>');   //provide div to show message  
            // Continue authentication if form is valid

            if($this->form_validation->run())
            {       
                // make sessions and redirect to home page if admin is authenticated
                //$this->db->select("admin.*,timezones.timezone");
                if($info=$this->Security->authenticate_login($this->post('password'),'users',array('email'=>strtoupper($this->post('username')),'deleted'=>0),'password'))
                {      

                    $this->db->join('master_roles','master_roles.role_id = user_roles.role_id','left');
                    $r = $this->db->get_where('user_roles',array('user_id'=>$info->user_id,'user_roles.role_id'=>$this->post('role_id')))->row();
                    if( empty($r) ) {
                         $message = array('response'=>'F','message'=>'You are not right user to login here','errors'=>array('username'=>'You are not right user to login here'));
                         $this->response($message, 200); 
                        die();
                    } else if ($r->status!='1') {
                         $message = array('response'=>'F','message'=>'You are blocked by Administrator.','errors'=>array('username'=>'You are blocked by Administrator'));
                         $this->response($message, 200); 
                        die();
                    }

                    $user_other_info  = $info;

                    if ($requestFrom=='Web') {
                        $this->session->set_userdata('user_id', $info->user_id);                    
                        $this->session->set_userdata('capabilities', explode(',',$r->capabilities)); //allow to work as 
                        $message = array('response'=>'S','message'=>'Successfully Sign In');
                        $access_token = "";
                    } else {

                        $access_token = $this->Utility->generate_access_token();
                        $user_agent   = $_SERVER['HTTP_USER_AGENT'];

                        $ipaddress = '';

                        if (isset($_SERVER['HTTP_CLIENT_IP']))
                            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
                        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
                            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
                        else if(isset($_SERVER['HTTP_X_FORWARDED']))
                            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
                        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
                            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
                        else if(isset($_SERVER['HTTP_FORWARDED']))
                            $ipaddress = $_SERVER['HTTP_FORWARDED'];
                        else if(isset($_SERVER['REMOTE_ADDR']))
                            $ipaddress = $_SERVER['REMOTE_ADDR'];
                        else
                            $ipaddress = 'UNKNOWN';

                        $info_array   = array(
                                                'user_id'       => $user_other_info->user_id,
                                                'access_token'  => $access_token,
                                                'device_id'     => $this->post('device_id'),
                                                'device_type'   => $this->post('device_type'),
                                                'ipaddress'     => $ipaddress,
                                                'user_agent'    => $user_agent,
                                                'date'          => date('Y-m-d G:i:s')
                                            );
                        $this->db->insert('user_access_tokens',$info_array);
                    }

                    $user_info = array(
                        'user_id'       => $user_other_info->user_id ? $user_other_info->user_id : "",
                        'email'         => $user_other_info->user_id ? $user_other_info->email : "",
                        'first_name'    => $user_other_info->first_name ? $user_other_info->first_name : "",
                        'last_name'     => $user_other_info->last_name ? $user_other_info->last_name : "",
                        'access_token'  => $access_token ,
                    );
                    
                    $message['response'] = "S";
                    $message['message']  = "Logged in successfully";
                    $spritual_trainer = $this->db->get_where('user_profile',array('user_id'=>$user_other_info->user_id))->row();
                    $data = array('user_id' => $user_other_info->user_id?$user_other_info->user_id:"",'access_token'  => $access_token,'is_spritual_trainer'=>$spritual_trainer->is_spritual_trainer);
                    $message['data'] = $data;
                } else {
                    $message = array('response' => 'F', 'message' => 'Invalid Username or Password', 'errors' => array('username' => 'Invalid Username or Password'));                    
                }
            } else {
                    $errors = $this->form_validation->error_array();
                    $message['response']="F";
                    $message['message'] = "Error in validations";  
                    $message['errors'] = $errors;  
                    $message['data'] = array();  
            }
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array('username' => 'No values entered'));
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }
    //user logout
    function logout_post() {
        if (!empty($this->post())) {
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
                $access_token = $this->post('access_token')?$this->post('access_token'):$_SERVER['HTTP_ACCESS_TOKEN'];
            } else {
                $requestFrom = 'Web';
            }

            if( $requestFrom=='Device' ) {
                $this->db->delete('user_access_tokens',array('access_token'=>$access_token));
            } else {
                $this->Security->admin_logout();    
            }
            $message['response'] = "S";
            $message['message'] = "Logout Successfully"; 
            $message['data'] = array(); 
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }
    
    //user logout
    function logout_get() {
        if ( $this->Security->doesUserHasCapability('examiner') && $this->Security->doesUserHasCapability('super_admin')  ) {
                $this->Security->admin_logout();
                redirect(base_url($this->config->item('modules_folders')['admin'].'/'));
        } else if ( $this->Security->doesUserHasCapability('examiner') ) { 
                $this->Security->user_logout();
                redirect(base_url($this->config->item('modules_folders')['examiner'].'/'));
        } else if ( true) { 
                $this->Security->user_logout();
                redirect(base_url());
        }
    }

    // Check existence of old password
    function check_current_password($str)
    {
        if($this->post('current_password'))
        {   
            $user_id=$this->session->userdata('user_id');         
            //fetch user information 
            $query = $this->db->query("SELECT password FROM users where user_id='$user_id'");         
            $login_user_row = $query->row_array();          
            if(isset($login_user_row['password']))
                $exit_password=$this->encrypt->decode($login_user_row['password']);                        
            if($exit_password<>$this->post('current_password'))
            {
                $this->form_validation->set_message('check_current_password', 'Invalid current password.');
                return FALSE;
            }
        }
        else
        {
            return TRUE;
        }          
    }
    //user logout
    function changePassword_post() {
         if(!empty($this->post())) {

                $errormessage = "";
                $user_id = '';
                if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                    $access_token = (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN'])) ? $_SERVER['HTTP_ACCESS_TOKEN'] : $this->post('access_token');
                    $requestFrom='Device';
                    $user_access_tokens = $this->db->get_where('user_access_tokens',array('access_token'=>$access_token))->row();
                    $user_id = !empty($user_access_tokens->user_id) ? $user_access_tokens->user_id : '';
                } else {
                    $requestFrom='Web';
                    $user_id = $this->session->userdata('user_id');
                }

                if ($user_id!='' && $user_id > 0) {

                    // To avoid mysql injection
                    $this->Security->avoid_mysql_injection(false);
                    // Setting validation rules
                    $this->form_validation->set_rules($this->Admin->admin_change_password_rules());
                    $this->form_validation->set_error_delimiters('', '<br/>');   //provide div to show message  
                    // Continue authentication if form is valid
                    if($this->form_validation->run())
                    {      
                        $this->db->where(array('user_id'=>$user_id));
                        $this->db->update('users', array('password'=>$this->encrypt->encode($this->post('new_password'))) );
                        
                        $message['response']="S";
                        $message['message'] = "Successfully changed";  
                        $message['data'] = array();  
                    }
                    else
                    {
                        $errors = $this->form_validation->error_array();

                        $message['response']="F";
                        $message['message'] = "Wrong password";  
                        $message['errors'] = $errors;  
                        $message['data'] = array();  
                    }
                } else {
                    $message['response']="F";
                    $message['message'] = "Wrong user request";           
                }
        }else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }

        $this->response($message, 200); // 200 being the HTTP response code
    }


    function forgot_password_post() {
         
        if(!empty($this->post())) { 
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ( $this->post('access_token')!='' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) ) ) {
                $requestFrom='Device';
                $device_id    = $this->post('device_id');
                $device_type  = $this->post('device_type');
            } else {
                $requestFrom='Web';
            }

            if(!empty($this->post('email')) ) {

                // To avoid mysql injection
                $this->Security->avoid_mysql_injection(false);
                // Setting validation rules                     
                $this->form_validation->set_rules($this->User->user_forgot_password_rules());
                $this->form_validation->set_error_delimiters('', '<br/>');   //provide div to show message  
                // Continue authentication if form is valid

                if($this->form_validation->run())
                {       
                    $r = $this->db->get_where('users',array('email'=>$this->post('email')))->result();
                    if( empty($r) ) {
                         $message = array('response'=>'F','message'=>'You are not a user for this system','errors'=>array());
                    } else {
                            if (!empty($this->post('email'))) {
                                $user = $this->db->get_where('users',array('email'=>$this->post('email')))->row();
                                if (is_object($user)) {
                                    $token = $this->Utility->generate_md5_token();
                                    $this->db->where(array('user_id'=>$user->user_id,'email'=>$this->post('email')));
                                    $this->db->update('users',array('password_reset_token'=>$token));
                                    $this->User->send_forgot_password_email($token,$user);
                                }
                            } 
                        $message = array('response'=>'S','message'=>'The user '.$this->post('email').' is found');
                    }
                } else {
                        $errors = $this->form_validation->error_array();
                        $message['response']="F";
                        $message['message'] = "Invalid email address";  
                        $message['errors'] = $errors;  
                        $message['data'] = array();  
                }
            } else {
                $message = array('response'=>'F','message'=>'Invalid email address','errors'=>array());
            }
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }

    // user signup form data
    function signUpData_post() {
        $master_levels = $this->db->get_where('master_levels')->result();

        $this->db->select('u.user_id,u.first_name,u.last_name');
        $this->db->order_by('u.first_name');
        $this->db->join('user_roles as ur','u.user_id = ur.user_id','left');
        $examiners = $this->db->get_where('users as u',array('u.status'=>1,'u.deleted'=>0,'ur.role_id'=>4,'ur.status'=>1))->result();
        
        if (!empty($master_levels) && !empty($examiners)) {
            $message = array('response'=>'S','master_levels'=>$master_levels, 'examiners'=>$examiners);
        } else {
            $message = array('response' => 'F', 'message' => 'No record(s) found');
        }

        $this->response($message, 200); // 200 being the HTTP response code
    }

    // user signup
    function signUp_post() {
        if (!empty($this->post())) {
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ( !empty($this->post('device_id')) && !empty($this->post('device_type')) ) {
                $requestFrom='Device';
                $device_id    = $this->post('device_id');
                $device_type  = $this->post('device_type');
            } else {
                $requestFrom='Web';
            }

            $primary_key = 'user_id';

            $insert_id = $this->Admin->admin_user_add_edit_post_for_web($primary_key, true);
        
            if (!empty($insert_id) && is_numeric($insert_id)) {
                // make sessions and redirect to home page if admin is authenticated
                //$this->db->select("admin.*,timezones.timezone");
                if ($info = $this->User->getUser($insert_id, 3)) {
                    $this->db->join('master_roles', 'master_roles.role_id = user_roles.role_id', 'left');
                    $r = $this->db->get_where('user_roles', array('user_id' => $info->user_id, 'user_roles.role_id' => $this->post('role_id')))->row();

                    if (empty($r)) {
                        $message = array('response' => 'F', 'message' => 'You are not right user to login here', 'errors' => array('username' => 'You are not right user to login here'));
                        $this->response($message, 200);
                        die();
                    } else if ($r->status != '1') {
                        $message = array('response' => 'F', 'message' => 'You are blocked by Administrator.', 'errors' => array('username' => 'You are blocked by Administrator.'));
                        $this->response($message, 200);
                        die();
                    }

                    $user_other_info = $info;

                    if ($requestFrom == 'Web') {
                        $this->session->set_userdata('user_id', $info->user_id);
                        $this->session->set_userdata('capabilities', explode(',', $r->capabilities)); //allow to work as 
                        $message = array('response' => 'S', 'message' => 'Successfully Sign In');
                        $access_token = "";
                    } else {

                        $access_token = $this->Utility->generate_access_token();
                        $user_agent = $_SERVER['HTTP_USER_AGENT'];

                        $ipaddress = '';

                        if (isset($_SERVER['HTTP_CLIENT_IP']))
                            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
                        else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
                            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
                        else if (isset($_SERVER['HTTP_X_FORWARDED']))
                            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
                        else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
                            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
                        else if (isset($_SERVER['HTTP_FORWARDED']))
                            $ipaddress = $_SERVER['HTTP_FORWARDED'];
                        else if (isset($_SERVER['REMOTE_ADDR']))
                            $ipaddress = $_SERVER['REMOTE_ADDR'];
                        else
                            $ipaddress = 'UNKNOWN';

                        $info_array = array(
                            'user_id' => $user_other_info->user_id,
                            'access_token' => $access_token,
                            'device_id' => $this->post('device_id'),
                            'device_type' => $this->post('device_type'),
                            'ipaddress' => $ipaddress,
                            'user_agent' => $user_agent,
                            'date' => date('Y-m-d G:i:s')
                        );
                        $this->db->insert('user_access_tokens', $info_array);
                    }

                    $user_info = array(
                        'user_id' => $user_other_info->user_id ? $user_other_info->user_id : "",
                        'email' => $user_other_info->user_id ? $user_other_info->email : "",
                        'first_name' => $user_other_info->first_name ? $user_other_info->first_name : "",
                        'last_name' => $user_other_info->last_name ? $user_other_info->last_name : "",
                        'access_token' => $access_token,
                    );

                    $message['response'] = "S";
                    $message['message'] = "Logged in successfully";
                    $data = array('user_id' => $user_other_info->user_id ? $user_other_info->user_id : "", 'access_token' => $access_token);
                    $message['data'] = $data;
                } else {
                    $message = array('response' => 'F', 'message' => 'Invalid Username or Password', 'errors' => array('username' => 'Invalid Username or Password'));
                }
            } else {
                $errors = $this->form_validation->error_array();
                $message['response'] = "F";
                $message['message'] = "Error in validations";
                $message['errors'] = $errors;
                $message['data'] = array();
            }

            //$message = array('response'=>'S','message'=>'We have sent you an email, please check your mailbox and verify your account.');
        } else {
            $message = array('response' => 'F', 'message' => 'Post values not found');
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }

    // user feedback weekly
    function feedbackWeekly_post() { 
        if(!empty($this->post())) { 
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ( $this->post('access_token')!='' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) ) ) {
                $requestFrom='Device';
                $device_id    = $this->post('device_id');
                $device_type  = $this->post('device_type');
                $access_token  = $this->post('access_token');
            } else {
                $requestFrom='Web';
            }

            // Setting validation rules                     
            $this->form_validation->set_rules($this->User->user_feedback_weekly_rules());
            $this->form_validation->set_error_delimiters('', '<br/>');   //provide div to show message  
            // Continue authentication if form is valid

            if($this->form_validation->run())
            {       
                if ($requestFrom=='Web') {
                    $spiritualBuddieUserID = $this->session->userdata('user_id');
                } else {
                    $spiritualBuddieUserID = $this->User->getUserId($access_token);
                }

                if (isset($spiritualBuddieUserID) && !empty($spiritualBuddieUserID)) {
                    $userID = $this->post('user_id');
                    $weekID = $this->post('idWeek');
                    $feedbackType = $this->post('feedback_type');
                    $feedback_field_arr = array(
                            '1' => $this->post('feedback_field_1'), 
                            '2' => $this->post('feedback_field_2'), 
                            '3' => $this->post('feedback_field_3'),  
                            '4' => $this->post('feedback_field_4'),  
                            '5' => $this->post('feedback_field_5'),
                            '6' => $this->post('feedback_field_6'),
                            '7' => $this->post('feedback_field_7'),
                            '8' => $this->post('feedback_field_8'),
                            '9' => $this->post('feedback_field_9'),
                            '10' => $this->post('feedback_field_10'),
                            '11' => $this->post('feedback_field_11'),
                            '12' => $this->post('feedback_field_12'),
                            '13' => $this->post('feedback_field_13'),
                            '14' => $this->post('feedback_field_14'),
                            '15' => $this->post('feedback_field_15'),
                            '16' => $this->post('feedback_field_16'),
                            '17' => $this->post('feedback_field_17'),
                            '18' => $this->post('feedback_field_18'),
                            '19' => $this->post('feedback_field_19'),
                            '20' => $this->post('feedback_field_20'),
                            '21' => $this->post('feedback_field_21'),
                            '22' => $this->post('feedback_field_22'),
                            '23' => $this->post('feedback_field_23'),
                            '24' => $this->post('feedback_field_24'),
                            '25' => $this->post('feedback_field_25'),
                            '26' => $this->post('feedback_field_26'),
                            '27' => $this->post('feedback_field_27'),
                            '28' => $this->post('feedback_field_28'),
                            '29' => $this->post('feedback_field_29'),
                            '30' => $this->post('feedback_field_30'),
                            '31' => $this->post('feedback_field_31'),
                            '32' => $this->post('feedback_field_32'),
                            '33' => $this->post('feedback_field_33'),
                            '34' => $this->post('feedback_field_34'),
                            '35' => $this->post('feedback_field_35')
                    );
                    $uf = $this->db->get_where('user_feedbacks', array('user_id'=>$userID, 'spiritual_buddie_user_id'=>$spiritualBuddieUserID, 'week_id'=>$weekID, 'feedback_type'=>$feedbackType, 'status'=>"Running"))->row();

                    if (empty($uf)) {
                        $user_feedbacks_arr = array(
                                    'user_id'                  => $userID,
                                    'spiritual_buddie_user_id' => $spiritualBuddieUserID,
                                    'week_id'                  => $weekID,
                                    'feedback_type'            => $feedbackType,
                                    'status'                   => "Running",
                                    'created_at'               => date("Y-m-d G:i:s")
                        );
                        $this->db->insert('user_feedbacks', $user_feedbacks_arr);
                        $user_feedback_id = $this->db->insert_id();

                        foreach ($feedback_field_arr as $ff_id => $uff_val) {
                            $user_feedback_fields_arr = array(
                                        'user_feedback_id'                 => $user_feedback_id,
                                        'feedback_field_id'                => $ff_id,
                                        'user_feedback_field_value'        => $uff_val,
                                        'user_feedback_field_value_scan'   => "",
                                        'user_feedback_field_value_hrs'    => "",
                                        'user_feedback_field_value_count'  => "",
                                        'user_feedback_field_value_amount' => ""
                            );
                            $this->db->insert('user_feedback_fields', $user_feedback_fields_arr);
                        }

                        $message = array('response'=>'S','message'=>'Feedback weekly added successfully.');
                    } else {
                        foreach ($feedback_field_arr as $ff_id => $uff_val) {
                            $update_uff_arr = array(
                                        'feedback_field_id'                => $ff_id,
                                        'user_feedback_field_value'        => $uff_val,
                                        'user_feedback_field_value_scan'   => "",
                                        'user_feedback_field_value_hrs'    => "",
                                        'user_feedback_field_value_count'  => "",
                                        'user_feedback_field_value_amount' => ""
                            );
                            $this->db->where(array('user_feedback_id'=>$uf->user_feedback_id, 'feedback_field_id'=>$ff_id));
                            $this->db->update('user_feedback_fields', $update_uff_arr);
                        }
                        $message = array('response'=>'S','message'=>'Feedback weekly added successfully.');
                    }
                } else {
                    $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
                } 
            } else {
                    $errors = $this->form_validation->error_array();
                    $message['response']="F";
                    $message['message'] = "Invalid data";  
                    $message['errors'] = $errors;  
                    $message['data'] = array();  
            }
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }

    // user feedback weekly
    function feedbackMonthly_post() { 
        if(!empty($this->post())) { 
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ( $this->post('access_token')!='' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) ) ) {
                $requestFrom='Device';
                $device_id    = $this->post('device_id');
                $device_type  = $this->post('device_type');
                $access_token  = $this->post('access_token');
            } else {
                $requestFrom='Web';
            }

            // Setting validation rules                     
            $this->form_validation->set_rules($this->User->user_feedback_monthly_rules());
            $this->form_validation->set_error_delimiters('', '<br/>');   //provide div to show message  
            // Continue authentication if form is valid

            if($this->form_validation->run())
            {       
                if ($requestFrom=='Web') {
                    $spiritualBuddieUserID = $this->session->userdata('user_id');
                } else {
                    $spiritualBuddieUserID = $this->User->getUserId($access_token);
                }

                if (isset($spiritualBuddieUserID) && !empty($spiritualBuddieUserID)) {
                    $userID = $this->post('user_id');
                    $selected_date = str_replace('(India Standard Time)', '(IST)', $this->post('selected_date')); //monthly
                    $feedbackType = $this->post('feedback_type');
                    $feedback_field_arr = array(
                            '51' => $this->post('feedback_field_51'),
                            '52' => $this->post('feedback_field_52'),
                            '53' => $this->post('feedback_field_53'),
                            '54' => $this->post('feedback_field_54'),
                            '55' => $this->post('feedback_field_55'),
                            '56' => $this->post('feedback_field_56'),
                            '57' => $this->post('feedback_field_57'),
                            '58' => $this->post('feedback_field_58'),
                            '59' => $this->post('feedback_field_59'),
                            '60' => $this->post('feedback_field_60'),
                            '61' => $this->post('feedback_field_61')
                    );
                
                    $selectedStartDate =  date('Y-m-1 H:i:s', strtotime($selected_date) );  //monthly
                    $days =  date('t', strtotime($selected_date) );  //monthly
                    $selectedEndDate =  date('Y-m-1 H:i:s', strtotime($selectedStartDate)+($days*24*60*60) );  //monthly

                    $where = array('user_id'       => $userID, 
                        'spiritual_buddie_user_id' => $spiritualBuddieUserID, 
                        'feedback_type'            => $feedbackType,
                        'created_at >='            => $selectedStartDate,
                        'created_at <'             => $selectedEndDate,
                        'status'                   => "Running"
                    );
                    $uf = $this->db->get_where('user_feedbacks', $where)->row();

                    if (empty($uf)) {
                        $user_feedbacks_arr = array(
                                'user_id'                  => $userID,
                                'spiritual_buddie_user_id' => $spiritualBuddieUserID,
                                'week_id'                  => 0,
                                'feedback_type'            => $feedbackType,
                                'status'                   => "Running",
                                'created_at'               => date('Y-m-15 H:i:s', strtotime($selected_date) )
                        );
                        $this->db->insert('user_feedbacks', $user_feedbacks_arr);
                        $user_feedback_id = $this->db->insert_id();

                        foreach ($feedback_field_arr as $ff_id => $uff_val) {
                            $user_feedback_fields_arr = array(
                                        'user_feedback_id'                 => $user_feedback_id,
                                        'feedback_field_id'                => $ff_id,
                                        'user_feedback_field_value'        => $uff_val,
                                        'user_feedback_field_value_scan'   => "",
                                        'user_feedback_field_value_hrs'    => "",
                                        'user_feedback_field_value_count'  => "",
                                        'user_feedback_field_value_amount' => ""
                            );
                            $this->db->insert('user_feedback_fields', $user_feedback_fields_arr);
                        }

                        $message = array('response'=>'S','message'=>'Feedback monthly added successfully.');
                    } else {
                        foreach ($feedback_field_arr as $ff_id => $uff_val) {
                            $update_uff_arr = array(
                                        'feedback_field_id'                => $ff_id,
                                        'user_feedback_field_value'        => $uff_val,
                                        'user_feedback_field_value_scan'   => "",
                                        'user_feedback_field_value_hrs'    => "",
                                        'user_feedback_field_value_count'  => "",
                                        'user_feedback_field_value_amount' => ""
                            );
                            $this->db->where(array('user_feedback_id'=>$uf->user_feedback_id, 'feedback_field_id'=>$ff_id));
                            $this->db->update('user_feedback_fields', $update_uff_arr);
                        }
                        $message = array('response'=>'S','message'=>'Feedback monthly added successfully.');
                    }
                } else {
                    $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
                } 
            } else {
                    $errors = $this->form_validation->error_array();
                    $message['response']="F";
                    $message['message'] = "Invalid data";  
                    $message['errors'] = $errors;  
                    $message['data'] = array();  
            }
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function getMyBuddies_post() {
        if(!empty($this->post())) { 
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
                $access_token = $this->post('access_token');
            } else {
                $requestFrom = 'Web';
            }

            if ($requestFrom=='Web') {
                $userID = $this->session->userdata('user_id');
            } else {
                $userID = $this->User->getUserId($access_token);
            }
            
            if (isset($userID) && !empty($userID)) {
                $data = array();

                $this->db->join('user_profile', 'user_profile.user_id = usb.user_id', 'left');
                $this->db->join('users', 'usb.user_id = users.user_id', 'left');
                $user_buddies = $this->db->get_where('user_spiritual_buddies as usb',array('usb.spiritual_buddie_user_id'=>$userID))->result();
            
                if(isset($user_buddies) && !empty($user_buddies)) {
                    foreach ($user_buddies as $row) {
                        $data[] = array('user_id' => $row->user_id,
                                    'first_name'  => ucfirst($row->first_name), 
                                    'last_name'   => ucfirst($row->last_name),
                                    'city'        => strtoupper($row->city),
                                    'state'       => strtoupper($row->state),
                                    'gender'      => strtoupper($row->gender)
                                );
                    }
                }
                $message = array('response'=>'S','data'=>$data,'version_name'=>$this->config->item('version_name'));
            } else {
                $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
            } 

        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function getYearWeek_post() { 
        if (!empty($this->post())) {
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ( !empty($this->post('device_id')) && !empty($this->post('device_type')) ) {
                $requestFrom='Device';
                $device_id    = $this->post('device_id');
                $device_type  = $this->post('device_type');
            } else {
                $requestFrom='Web';
            }
            
            $year = $this->post('year');
            $yearWeeks = "";
            $week = "";

            $this->db->select("w.idWeek, DATE_FORMAT(w.week_start_date, '%d/%m/%Y') AS week_start_date, DATE_FORMAT(w.week_end_date, '%d/%m/%Y') AS week_end_date");
            $yearWeeks = $this->db->get_where('weeks AS w', array('YEAR(w.week_start_date)='=> $year))->result();
            
            $this->db->select("w.idWeek, DATE_FORMAT(w.week_start_date, '%d/%m/%Y') AS week_start_date, DATE_FORMAT(w.week_end_date, '%d/%m/%Y') AS week_end_date");
            $week = $this->db->get_where('weeks AS w', array('YEAR(w.week_start_date)=' => $year, 'w.week_start_date <=' => date('Y-m-d'), 'w.week_end_date >=' => date('Y-m-d')))->row();

            $message = array('response'=>'S', 'yearWeeks'=>$yearWeeks, 'week'=>$week);
            
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }    

    function getPreviousWeek_post() {
        if (!empty($this->post())) {
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
            } else {
                $requestFrom = 'Web';
            }

            if(!empty($this->post('idWeek'))) {
                $idWeek = $this->post('idWeek');
                $data = array();
                $this->db->select("w.idWeek, DATE_FORMAT(w.week_start_date, '%d/%m/%Y') AS week_start_date, DATE_FORMAT(w.week_end_date, '%d/%m/%Y') AS week_end_date");
                $this->db->where('w.idWeek <', $idWeek);
                $this->db->order_by("w.idWeek","DESC");
                $previousWeek = $this->db->get('weeks AS w')->row();

                $message = array('response'=>'S','data'=>$previousWeek);
            } else {
                $message = array('response'=>'F','message'=>'Wrong week id.','errors'=>array());
            }
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function getNextWeek_post() {
        if (!empty($this->post())) {
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
            } else {
                $requestFrom = 'Web';
            }

            if(!empty($this->post('idWeek'))) {
                $idWeek = $this->post('idWeek');
                $data = array();
                $this->db->select("w.idWeek, DATE_FORMAT(w.week_start_date, '%d/%m/%Y') AS week_start_date, DATE_FORMAT(w.week_end_date, '%d/%m/%Y') AS week_end_date");
                $this->db->where('w.idWeek >', $idWeek);
                $this->db->order_by("w.idWeek","ASC");
                $nextWeek = $this->db->get('weeks AS w')->row();

                $message = array('response'=>'S','data'=>$nextWeek);
            } else {
                $message = array('response'=>'F','message'=>'Wrong week id.','errors'=>array());
            }
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function getFeedbackBuddies_post() {
        // To avoid mysql injection
        $this->Security->avoid_mysql_injection(false);
        $errormessage = "";
        if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
            $requestFrom = 'Device';
            $device_id = $this->post('device_id');
            $device_type = $this->post('device_type');
            $access_token = $this->post('access_token');
        } else {
            $requestFrom = 'Web';
        }

        if ($requestFrom=='Web') {
            $userID = $this->session->userdata('user_id');
        } else {
            $userID = $this->User->getUserId($access_token);
        }
        
        if (isset($userID) && !empty($userID)) {
            $data = array();

            $this->db->join('user_profile', 'ufb.spiritual_buddie_user_id = user_profile.user_id', 'left');
            $this->db->join('users', 'ufb.spiritual_buddie_user_id = users.user_id', 'left');
            $ufdb = $this->db->get_where('user_feedbacks as ufb', array('ufb.user_id'=>$userID, 'ufb.status'=>'Running'))->result();
            if(isset($ufdb) && !empty($ufdb)) {
                foreach ($ufdb as $row) {
                    $data[$row->spiritual_buddie_user_id] = array('user_id' => $row->user_id,
                                'spiritual_buddie_user_id' => $row->spiritual_buddie_user_id,
                                'first_name'               => ucfirst($row->first_name), 
                                'last_name'                => ucfirst($row->last_name),
                                'city'                     => strtoupper($row->city),
                                'state'                    => strtoupper($row->state),
                                'gender'                   => strtoupper($row->gender)
                            );
                }
            }

            $message = array('response'=>'S','data'=>$data,'version_name'=>$this->config->item('version_name'));
        } else {
            $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
        } 
        
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function removeBuddy_post() {

        if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
            $requestFrom = 'Device';
            $device_id = $this->post('device_id');
            $device_type = $this->post('device_type');
            $access_token = $this->post('access_token');
        } else {
            $requestFrom = 'Web';
        }

        if ($requestFrom=='Web') {
            $userID = $this->session->userdata('user_id');
        } else {
            $userID = $this->User->getUserId($access_token);
        }

        if (isset($userID) && !empty($userID)) {

            $updatedBy = $userID;
            
            if ( $this->post('user_id') && $this->post('spiritual_buddie_user_id') ) {
                $userID = $this->post('spiritual_buddie_user_id');
                $buddy_user_id = $this->post('user_id');
            } else {
                $buddy_user_id = $this->post('buddy_user_id');
            }

            /*
            $rows = $this->db->get_where( 'user_feedbacks', array('user_id'=> $buddy_user_id ,  'spiritual_buddie_user_id' => $userID ) )->result();
            $user_feedback_ids = array();
            if ( count($rows) > 0 ) {
                foreach ($rows as $key => $row) {
                    $user_feedback_ids[] = $row->user_feedback_id;
                }
                 //$this->db->query("DELETE from user_feedback_fields where user_feedback_id in (".implode(',', $user_feedback_ids).") ");
                 //$this->db->query("DELETE from user_feedbacks where user_feedback_id in (".implode(',', $user_feedback_ids).") ");
            }
            */  
                    $this->db->order_by('user_spiritual_buddie_history_id','DESC');
            $row = $this->db->get_where( 'user_spiritual_buddies_history', array('user_id' => $buddy_user_id, 'spiritual_buddie_user_id' => $userID) , "1")->row();

            $this->db->where(array('user_spiritual_buddie_history_id' => $row->user_spiritual_buddie_history_id));
            $this->db->update('user_spiritual_buddies_history', array('end_date' => date('Y-m-d H:i:s'), 'updatedBy'=> $updatedBy));

            $this->db->query("delete from user_spiritual_buddies where spiritual_buddie_user_id = '".$userID."' and  user_id = '".$buddy_user_id."'");

            $message = array('response'=>'S','data'=>'removed');
        } else {
            $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
        } 

         $message = array('response'=>'S','data'=>'removed');
         $this->response($message, 200); // 200 being the HTTP response code
    }
    

    function getAddBuddies_post() {
        // To avoid mysql injection
        $this->Security->avoid_mysql_injection(false);
        $errormessage = "";
        if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
            $requestFrom = 'Device';
            $device_id = $this->post('device_id');
            $device_type = $this->post('device_type');
            $access_token = $this->post('access_token');
        } else {
            $requestFrom = 'Web';
        }

        if ($requestFrom=='Web') {
            $userID = $this->session->userdata('user_id');
        } else {
            $userID = $this->User->getUserId($access_token);
        }
        
        if (isset($userID) && !empty($userID)) {
            $data = array();
            
            
            $user_buddies_not = $this->db->query("SELECT u.user_id, u.email, u.first_name, u.last_name, ur.role_id, ur.status, mr.role_name, usb.spiritual_buddie_user_id, up.* 
                FROM `users` as u
                    LEFT JOIN `user_profile` as up ON up.user_id = u.user_id 
                    LEFT JOIN `user_roles` as ur ON ur.user_id = u.user_id 
                    LEFT JOIN `master_roles` as mr ON mr.role_id = ur.role_id 
                    LEFT JOIN `user_spiritual_buddies` as usb ON usb.user_id = u.user_id and usb.spiritual_buddie_user_id = '".$userID."'
                WHERE  ur.role_id = 3 and ur.status  = 1 and u.user_id != '".$userID."' AND u.user_id != '1' AND usb.user_id IS NULL AND 
                u.user_id in  (SELECT DISTINCT user_id FROM `user_owners` WHERE 
                    `owner_user_id` in (SELECT `owner_user_id` FROM `user_owners` WHERE user_id = '".$userID."')) 
                                            ORDER BY u.user_id ASC")->result();
           

            /* any trainer
            $user_buddies_not = $this->db->query("SELECT u.user_id, u.email, u.first_name, u.last_name, ur.role_id, ur.status, mr.role_name, usb.spiritual_buddie_user_id, up.* 
                FROM `users` as u
                    LEFT JOIN `user_profile` as up ON up.user_id = u.user_id 
                    LEFT JOIN `user_roles` as ur ON ur.user_id = u.user_id 
                    LEFT JOIN `master_roles` as mr ON mr.role_id = ur.role_id 
                    LEFT JOIN `user_spiritual_buddies` as usb ON usb.user_id = u.user_id and usb.spiritual_buddie_user_id = '".$userID."'
                WHERE  ur.role_id = 3 and u.user_id != '".$userID."' AND u.user_id != '1' AND usb.user_id IS NULL ORDER BY u.user_id ASC limit 0,10")->result();
            */

            if(isset($user_buddies_not) && !empty($user_buddies_not)) {
                foreach ($user_buddies_not as $row) {
                    $data[] = array('user_id' => $row->user_id,
                                'first_name'  => ucfirst($row->first_name), 
                                'last_name'   => ucfirst($row->last_name),
                                'city'        => strtoupper($row->city),
                                'state'       => strtoupper($row->state),
                                'gender'      => strtoupper($row->gender)
                            );
                }
            }


            $message = array('response'=>'S','data'=>$data);
        } else {
            $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
        } 
        
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function searchBuddy_post() {
        // To avoid mysql injection
        $this->Security->avoid_mysql_injection(false);
        $errormessage = "";
        if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
            $requestFrom = 'Device';
            $device_id = $this->post('device_id');
            $device_type = $this->post('device_type');
            $access_token = $this->post('access_token');
        } else {
            $requestFrom = 'Web';
        }

        if ($requestFrom=='Web') {
            $userID = $this->session->userdata('user_id');
        } else {
            $userID = $this->User->getUserId($access_token);
        }
        
        if (isset($userID) && !empty($userID)) {
            $data = array();

            $name = explode(' ',$this->post('keywords'));

            $search = "";

            if( count($name) <= 1 ) {
                $search = " and u.first_name like '".$name[0]."%' ";
            } else if ( count($name) == 2 )   {
                $search = " and ( u.first_name like '%".$name[0]."%' and u.last_name like '%".$name[1]."%') ";
            } else {
                $search = " and ( u.first_name like '%".$name[0]."%' and u.last_name like '%".$name[2]."%') ";
            }

            $user_buddies_not = $this->db->query("SELECT u.user_id, u.email, u.first_name, u.last_name, ur.role_id, ur.status, mr.role_name, usb.spiritual_buddie_user_id, up.* 
                FROM `users` as u
                    LEFT JOIN `user_profile` as up ON up.user_id = u.user_id 
                    LEFT JOIN `user_roles` as ur ON ur.user_id = u.user_id 
                    LEFT JOIN `master_roles` as mr ON mr.role_id = ur.role_id 
                    LEFT JOIN `user_spiritual_buddies` as usb ON usb.user_id = u.user_id and usb.spiritual_buddie_user_id = '".$userID."'
                WHERE  ur.role_id = 3 and ur.status  = 1 and u.user_id != '".$userID."' AND u.user_id != '1' AND usb.user_id IS NULL 
                 ".$search." ORDER BY u.user_id ASC")->result();

            if(isset($user_buddies_not) && !empty($user_buddies_not)) {
                foreach ($user_buddies_not as $row) {
                    $data[] = array('user_id' => $row->user_id,
                                'first_name'  => ucfirst($row->first_name), 
                                'last_name'   => ucfirst($row->last_name),
                                'city'        => strtoupper($row->city),
                                'state'       => strtoupper($row->state),
                                'gender'      => strtoupper($row->gender)
                            );
                }
            }


            $message = array('response'=>'S','data'=>$data);
        } else {
            $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
        } 
        
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function setAddBuddies_post() {
        if (!empty($this->post())) {
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
                $access_token = $this->post('access_token');
            } else {
                $requestFrom = 'Web';
            }

            if ($requestFrom=='Web') {
                $spiritual_buddie_user_id = $this->session->userdata('user_id');
            } else {
                $spiritual_buddie_user_id = $this->User->getUserId($access_token);
            }
            
            if (isset($spiritual_buddie_user_id) && !empty($spiritual_buddie_user_id)) {
                $userID = $this->post('user_id');

                $this->db->insert('user_spiritual_buddies', array(
                    'user_id'                  => $userID, 
                    'spiritual_buddie_user_id' => $spiritual_buddie_user_id
                ));

                $this->db->insert('user_spiritual_buddies_history', array(
                    'user_id'                  => $userID, 
                    'spiritual_buddie_user_id' => $spiritual_buddie_user_id,
                    'start_date'               => date('Y-m-d H:i:s'),
                    'end_date'                 => '',
                    'updatedBy'                => $spiritual_buddie_user_id
                ));

                $message = array('response'=>'S','message'=>'Buddy added successfully.');
            } else {
                $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
            } 
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function feedback_fields_post() {
        if (!empty($this->post())) {
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
                $access_token = $this->post('access_token');
            } else {
                $requestFrom = 'Web';
            }

            if ($requestFrom=='Web') {
                $userID = $this->session->userdata('user_id');
            } else {
                $userID = $this->User->getUserId($access_token);
            }
            
            if (isset($userID) && !empty($userID)) {
                $data = array();
                $info = array();

                $this->db->join('feedback_field_types AS fft', 'ff.feedback_field_id = fft.feedback_field_id', 'left');
                $feedback_fields = $this->db->get_where('feedback_fields AS ff', array('ff.feedback_id'=>$this->post('feedback_type'), 'ff.feedback_field_status'=>1))->result();
                if(isset($feedback_fields) && !empty($feedback_fields)) {
                    $data = $feedback_fields;
                }

                $user_details = $this->db->get_where('users', array('user_id'=>$this->post('user_id'), 'status'=>1))->row();
                $user_details = array('first_name' => ucfirst($user_details->first_name), 'last_name' => ucfirst($user_details->last_name));
                if(isset($user_details) && !empty($user_details)) {
                    $info = $user_details;
                }
                $message = array('response'=>'S','data'=>$data,'info'=>$info);
            } else {
                $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
            } 
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function spritual_trainer_feedback_fields_post() {
        if (!empty($this->post())) {
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
                $access_token = $this->post('access_token');
            } else {
                $requestFrom = 'Web';
            }

            if ($requestFrom=='Web') {
                $userID = $this->session->userdata('user_id');
            } else {
                $userID = $this->User->getUserId($access_token);
            }
            
            if (isset($userID) && !empty($userID)) {
                $data = array();
                $info = array();
                $spiritualBuddieUserID = $userID;
                $feedback_field_arr = array(
                            '62' => $this->post('feedback_field_62'),
                            '63' => $this->post('feedback_field_63'),
                            '64' => $this->post('feedback_field_64'),
                            '65' => $this->post('feedback_field_65'),
                            '66' => $this->post('feedback_field_66'),
                            '67' => $this->post('feedback_field_67'),
                            '68' => $this->post('feedback_field_68'),
                            '69' => $this->post('feedback_field_69')
                );
                $selected_date=$this->post('selected_date');
                $selectedStartDate =  date('Y-m-1 H:i:s', strtotime($selected_date) );
                $days =  date('t', strtotime($selected_date) );  //monthly
                $selectedEndDate =  date('Y-m-1 H:i:s', strtotime($selectedStartDate)+($days*24*60*60) );
                $feedbackType="for trainers";
                $where = array('user_id'       => $userID, 
                    'spiritual_buddie_user_id' => $spiritualBuddieUserID, 
                    'feedback_type'            => $feedbackType,
                    'created_at >='            => $selectedStartDate,
                    'created_at <'             => $selectedEndDate,
                    'status'                   => "Running"
                );
                $uf = $this->db->get_where('user_feedbacks', $where)->row();
                    
                if (empty($uf)) {
                    $user_feedbacks_arr = array(
                            'user_id'                  => $userID,
                            'spiritual_buddie_user_id' => $spiritualBuddieUserID,
                            'week_id'                  => 0,
                            'feedback_type'            => $feedbackType,
                            'status'                   => "Running",
                            'created_at'               => date('Y-m-d H:i:s', strtotime($selected_date) )
                    );
                    $this->db->insert('user_feedbacks', $user_feedbacks_arr);
                    $user_feedback_id = $this->db->insert_id();

                    foreach ($feedback_field_arr as $ff_id => $uff_val) {
                        $user_feedback_fields_arr = array(
                                    'user_feedback_id'                 => $user_feedback_id,
                                    'feedback_field_id'                => $ff_id,
                                    'user_feedback_field_value'        => $uff_val,
                                    'user_feedback_field_value_scan'   => "",
                                    'user_feedback_field_value_hrs'    => "",
                                    'user_feedback_field_value_count'  => "",
                                    'user_feedback_field_value_amount' => ""
                        );
                        $this->db->insert('user_feedback_fields', $user_feedback_fields_arr);
                    }

                    $message = array('response'=>'S','message'=>'Feedback for trainers added successfully.');
                }else {
                        foreach ($feedback_field_arr as $ff_id => $uff_val) {
                            $update_uff_arr = array(
                                        'feedback_field_id'                => $ff_id,
                                        'user_feedback_field_value'        => $uff_val,
                                        'user_feedback_field_value_scan'   => "",
                                        'user_feedback_field_value_hrs'    => "",
                                        'user_feedback_field_value_count'  => "",
                                        'user_feedback_field_value_amount' => ""
                            );
                            $this->db->where(array('user_feedback_id'=>$uf->user_feedback_id, 'feedback_field_id'=>$ff_id));
                            $this->db->update('user_feedback_fields', $update_uff_arr);
                        }
                        $message = array('response'=>'S','message'=>'Feedback for trainers added successfully.');
                }
            } else {
                $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
            } 
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function spritual_trainer_view_feedback_fields_post() {
        if (!empty($this->post())) {
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
                $access_token = $this->post('access_token');
            } else {
                $requestFrom = 'Web';
            }

            if ($requestFrom=='Web') {
                $userID = $this->session->userdata('user_id');
            } else {
                $userID = $this->User->getUserId($access_token);
            }

            if (isset($userID) && !empty($userID)) {
                $data = array();
                $info = array();
                $spiritualBuddieUserID = $userID;

                $selected_date=$this->post('selected_date');
                $selectedStartDate =  date('Y-m-1 H:i:s', strtotime($selected_date) );
                $days =  date('t', strtotime($selected_date) );  
                $selectedEndDate =  date('Y-m-1 H:i:s', strtotime($selectedStartDate)+($days*24*60*60) );
                $feedbackType=$this->post('feedback_type');

                $this->db->select('ufbf.feedback_field_id,ff.feedback_field_name,ufbf.user_feedback_field_value');
                $this->db->join('user_feedbacks ufb','ufbf.user_feedback_id=ufb.user_feedback_id','left');
                $this->db->join('feedback_fields ff','ff.feedback_field_id=ufbf.feedback_field_id','left');
                $where = array('ufb.user_id'       => $userID, 
                    'ufb.spiritual_buddie_user_id' => $spiritualBuddieUserID, 
                    'ufb.feedback_type'            => $feedbackType,
                    'ufb.created_at >='            => $selectedStartDate,
                    'ufb.created_at <'             => $selectedEndDate,
                    'ufb.status'                   => "Running",
                    'ff.feedback_id' => 3
                );
                $uf = $this->db->get_where('user_feedback_fields ufbf', $where)->result();
                if (!empty($uf)) {
                    $user_feedback_data=$uf;
                    $message = array('response'=>'S','data'=>$user_feedback_data,'version_name'=>$this->config->item('version_name'));
                }else{
                    $message = array('response'=>'F','version_name'=>$this->config->item('version_name'),'message'=>'No record(s) found','errors'=>array());
                }
            }else{
                $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
            }
        }else{
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200);
    }

    function view_feedback_fields_post() {
        if (!empty($this->post())) {
            // To avoid mysql injection
            $filterType = "received";
            if(!empty($this->post('filterType'))){
                $filterType = $this->post('filterType');
            }
                

            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
                $access_token = $this->post('access_token');
            } else {
                $requestFrom = 'Web';
            }

            if ($requestFrom=='Web') {
                $userID = $this->post('user_id')?$this->post('user_id'):$this->session->userdata('user_id');
            } else {
                $userID = $this->post('user_id')?$this->post('user_id'):$this->User->getUserId($access_token);
            }
            



            if (isset($userID) && !empty($userID)) {
                $data = array();
                $feedback_type            = $this->post('feedback_type');
                $idWeek                   = $this->post('idWeek'); //weekly
                $selectedDate             = str_replace('(India Standard Time)', '(IST)', $this->post('selected_date')); //monthly
                $spiritual_buddie_user_id = $this->post('spiritual_buddie_user_id');
            
                $selectedDate =  date('Y-m-d H:i:s', strtotime($selectedDate));  //monthly
                $selectedStartDate =  date('Y-m-1 H:i:s', strtotime($selectedDate) );  //monthly
                $days =  date('t', strtotime($selectedDate) );  //monthly
                $selectedEndDate =  date('Y-m-1 H:i:s', strtotime($selectedStartDate)+($days*24*60*60) );  //monthly
                //print_r($days . ' ' . $selectedDate . ' '. $selectedStartDate . '  ' . $selectedEndDate);
    
                $msg = "";
                if ($feedback_type=='Monthly') {

                    //////////////////   

                        if ($this->post('purpose') == 'edit') {
                            $where = array('ufb.feedback_type'=>$feedback_type,'user_id'=>$spiritual_buddie_user_id,'spiritual_buddie_user_id'=>$userID);
                        } else { //$this->post('purpose') == 'view'
                            
                            $where = array('ufb.feedback_type'=>$feedback_type);                    

                            if($filterType=='received'){
                                $userCondition = array('ufb.user_id'=>$userID,'spiritual_buddie_user_id'=>$spiritual_buddie_user_id);                    
                            }else{
                                $userCondition = array('ufb.spiritual_buddie_user_id'=>$userID,'user_id'=>$spiritual_buddie_user_id);                    
                            }
                            $where  = array_merge($where, $userCondition);
                        }
                                

                    ////////////////////////////////   


                        if ($this->post('use_date_filter')=='1') {
                            $date_filter = array('ufb.created_at >='=>$selectedStartDate,'ufb.created_at <'=>$selectedEndDate);
                        } else {
                            $date_filter = array();
                        }

                        $where = array_merge($where, $date_filter);

                    $msg = "No record(s) found for selected month.";
                } else {

                   
                    //////////////////////////////////

                        if ($this->post('purpose') == 'edit') {
                            $where = array('ufb.feedback_type'=>$feedback_type,'user_id'=>$spiritual_buddie_user_id,'spiritual_buddie_user_id'=>$userID);
                        } else { //$this->post('purpose') == 'view'
                           
                            $where = array('ufb.feedback_type'=>$feedback_type);
                            if($filterType=='received'){
                                $userCondition = array('ufb.user_id'=>$userID,'spiritual_buddie_user_id'=>$spiritual_buddie_user_id);
                            }else{
                                $userCondition = array('ufb.spiritual_buddie_user_id'=>$userID,'user_id'=>$spiritual_buddie_user_id);
                            }
                            $where  = array_merge($where, $userCondition);
                            
                        }

                    ////////////////////////////////////


                        if ($this->post('use_date_filter')=='1') {
                            $date_filter = array('ufb.week_id'=>$idWeek);
                        } else {
                            $date_filter = array();
                        }

                    $where = array_merge($where, $date_filter);

                    $msg = "No record(s) found for selected week.";
                }

                $ufb = $this->db->get_where('user_feedbacks as ufb',$where )->result(); 
                if (isset($ufb) && !empty($ufb)) {
                    
                    $this->db->join('user_feedbacks AS ufb', 'ufbf.user_feedback_id = ufb.user_feedback_id', 'left');
                    $this->db->join('feedback_field_types AS fft', 'ufbf.feedback_field_id = fft.feedback_field_id', 'left');
                    $this->db->join('feedback_fields AS ff', 'ufbf.feedback_field_id = ff.feedback_field_id', 'left');
                    $ufbf = $this->db->get_where('user_feedback_fields as ufbf', array('ufbf.user_feedback_id'=>$ufb[0]->user_feedback_id))->result();

                    if(isset($ufbf) && !empty($ufbf)) {
                        $data = $ufbf;
                    }
                    $message = array('response'=>'S','data'=>$data);
                }  else {
                    $message = array('response'=>'F','message'=>$msg,'errors'=>array());
                }
            } else {
                $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
            } 
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }


    function view_feedback_fields_for_admin_post() {
        if (!empty($this->post())) {
            // To avoid mysql injection
            $filterType = "received";
            if(!empty($this->post('filterType'))){
                $filterType = $this->post('filterType');
            }
                

            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
                $access_token = $this->post('access_token');
            } else {
                $requestFrom = 'Web';
            }

            if ($requestFrom=='Web') {
                $userID = $this->post('user_id')?$this->post('user_id'):$this->session->userdata('user_id');
            } else {
                $userID = $this->post('user_id')?$this->post('user_id'):$this->User->getUserId($access_token);
            }
            

            if (isset($userID) && !empty($userID)) {
                $data = array();
                $message = array();
                $feedback_type            = $this->post('feedback_type');
                $idWeek                   = $this->post('idWeek'); //weekly
                $selectedDate             = str_replace('(India Standard Time)', '(IST)', $this->post('selected_date')); //monthly
                $spiritual_buddie_user_id = $this->post('spiritual_buddie_user_id');
                ///////////////////////////////////////
                $temp =  explode('GMT', $selectedDate);
                /*if(count($temp)>1){
                    $temp2 = 'GMT'.$temp[1];

                }else{
                   $selectedDate = $temp[0];
                }*/
                $selectedDate = $temp[0];
                //GMT


                ///////////////////////////////////////
                $selectedDate =  date('Y-m-d H:i:s', strtotime($selectedDate));  //monthly
                $selectedStartDate =  date('Y-m-1 H:i:s', strtotime($selectedDate) );  //monthly
                $days =  date('t', strtotime($selectedDate) );  //monthly
                $selectedEndDate =  date('Y-m-1 H:i:s', strtotime($selectedStartDate)+($days*24*60*60) );  //monthly
                //print_r($days.' '.$selectedDate.' '.$selectedStartDate.' '.$selectedEndDate);
    
                $msg = "";
                $historyWhere = array();
                //if ($feedback_type=='Monthly') { //always monthly condition will be posted

                    if ($this->post('purpose') == 'edit') {
                        $where = array('ufb.feedback_type'=>$feedback_type,'user_id'=>$spiritual_buddie_user_id,'spiritual_buddie_user_id'=>$userID);
                    } else { //$this->post('purpose') == 'view'
                        
                        $where = array('ufb.feedback_type'=>$feedback_type);                    

                        if($filterType=='received'){
                            $userCondition = array('ufb.user_id'=>$userID,'spiritual_buddie_user_id'=>$spiritual_buddie_user_id); 
                            $historyWhere =  array('bh.user_id'=>$userID,'bh.spiritual_buddie_user_id'=>$spiritual_buddie_user_id);
                        }else{
                            $userCondition = array('ufb.spiritual_buddie_user_id'=>$userID,'user_id'=>$spiritual_buddie_user_id);                    
                            $historyWhere =  array('bh.spiritual_buddie_user_id'=>$userID,'bh.user_id'=>$spiritual_buddie_user_id);
                        }
                        $where  = array_merge($where, $userCondition);
                    }
                                
                    if ($this->post('use_date_filter')=='1') {
                        $date_filter = array('ufb.created_at >='=>$selectedStartDate,'ufb.created_at <'=>$selectedEndDate);
                    } else {
                        $date_filter = array();
                    }

                    $where = array_merge($where, $date_filter);

                    $msg = "No record(s) found.";
                //} 



                //get monthly data
                $ufb = $this->db->get_where('user_feedbacks as ufb',$where )->result(); 

                if (isset($ufb) && !empty($ufb)) {
                    
                    $this->db->join('user_feedbacks AS ufb', 'ufbf.user_feedback_id = ufb.user_feedback_id', 'left');
                    $this->db->join('feedback_field_types AS fft', 'ufbf.feedback_field_id = fft.feedback_field_id', 'left');
                    $this->db->join('feedback_fields AS ff', 'ufbf.feedback_field_id = ff.feedback_field_id', 'left');
                    $ufbf = $this->db->get_where('user_feedback_fields as ufbf', array('ufbf.user_feedback_id'=>$ufb[0]->user_feedback_id))->result();

                    if(isset($ufbf) && !empty($ufbf)) {
                        $data = $ufbf;
                    }
                    $message = array('response_month'=>'S','data_month'=>$data);
                }  else {
                    $message = array('response_month'=>'F','message_month'=>$msg,'errors_month'=>array());
                }


                $weeks_data = array();

                //if ($feedback_type=='Monthly') {  //get weeks data

                    $query = "(SELECT user_feedback_id FROM user_feedbacks WHERE week_id IN ( select idWeek from weeks where ( week_start_date  BETWEEN '$selectedStartDate' AND '$selectedEndDate' ) || ( week_end_date  BETWEEN '$selectedStartDate' AND '$selectedEndDate') ) )";
                        
                    $this->db->join('user_feedbacks AS ufb', 'ufbf.user_feedback_id = ufb.user_feedback_id', 'left');
                    $this->db->join('weeks AS w', 'w.idWeek = ufb.week_id', 'left');
                    $this->db->join('feedback_field_types AS fft', 'ufbf.feedback_field_id = fft.feedback_field_id', 'left');
                    $this->db->join('feedback_fields AS ff', 'ufbf.feedback_field_id = ff.feedback_field_id', 'left');
                    $this->db->where("ufbf.user_feedback_id IN $query");
                    $this->db->order_by('ufb.week_id');
                    $this->db->group_by('ufbf.user_feedback_field_id');
                    $this->db->where($userCondition);//'ufb.user_id'=>$userID,'spiritual_buddie_user_id'
                    $ufbf = $this->db->get('user_feedback_fields as ufbf')->result();


                    if(isset($ufbf) && !empty($ufbf)) {
                        $weeks_data = $ufbf;
                        $message['response_week']= 'S';
                        //$message['data_week']    = $weeks_data;
                        $byWeeks = array();
                        $i=0;
                        $tempWeek = 0;
                        foreach ($weeks_data as $key => $wdata) {
                            if($tempWeek == '0'){ $tempWeek = $wdata->idWeek; }

                            if ($tempWeek != $wdata->idWeek) {
                                $tempWeek = $wdata->idWeek;
                                $i++;
                            }
                            $byWeeks[$i][] = $wdata; 
                        }

                        $message['data_week']  = $byWeeks;
                        $message['week_count'] = $i+1;

                    }else{
                        $message['response_week']= 'F';
                        $message['message_week'] = "No record(s) found.";;
                        $message['errors_week'] = array();
                    }
                    // 1. get all weeks ids of the selected month
                    // 2. get all feedback of above week ids for selected user
                    // 3. week data $weeks_data
                //}

                $this->db->select('DATE(start_date) as start_date, DATE(end_date) as end_date');
                $this->db->where($historyWhere); //'bh.spiritual_buddie_user_id'=>$userID,'bh.user_id'
                $this->db->order_by('bh.start_date', 'DESC');
                $bh = $this->db->get('user_spiritual_buddies_history as bh')->result();
            
                if(isset($bh) && !empty($bh)){
                    $message['data_history'] = $bh;
                    $message['response_history']= 'S';
                }else{
                    $message['response_history']= 'F';
                    $message['message_history'] = "No record(s) found.";;
                    $message['errors_history'] = array();
                }

            } else {
                $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
            } 
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function view_feedback_summary_post() {
        if (!empty($this->post())) {
            // To avoid mysql injection
            $filterType = "received";
            if(!empty($this->post('filterType'))){
                $filterType = $this->post('filterType');
            }

            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
                $access_token = $this->post('access_token');
            } else {
                $requestFrom = 'Web';
            }

            if ($requestFrom=='Web') {
                $userID = $this->post('user_id')?$this->post('user_id'):$this->session->userdata('user_id');
            } else {
                $userID = $this->post('user_id')?$this->post('user_id'):$this->User->getUserId($access_token);
            }
  
            if (isset($userID) && !empty($userID)) {
                $data = array();
                $feedback_type            = 'Weekly';
                $selectedYear             = str_replace('(India Standard Time)', '(IST)', $this->post('selected_date')); 
                $selectedYear = date('Y', strtotime($selectedYear));
                $spiritual_buddie_user_id = $this->post('spiritual_buddie_user_id');

                $this->db->select('week_id');
                $this->db->from('user_feedbacks');
                $this->db->where(array('YEAR(created_at)'=>$selectedYear,'user_id'=>$userID,'feedback_type'=>$feedback_type,'spiritual_buddie_user_id'=>$spiritual_buddie_user_id));
                $this->db->order_by('week_id');
                $res=$this->db->get()->result();
                $weekIds=array();
                foreach ($res as $value) {
                    $weekIds[]=$value->week_id;
                }
                if(!empty($weekIds)){
                    $this->db->select('MONTH(weeks.week_start_date) as month,FLOOR((DAYOFMONTH(weeks.week_start_date) - 1) / 7) + 1 AS week_of_month');
                    $this->db->from('weeks');
                    $this->db->where_in('idWeek',$weekIds);
                    $result=$this->db->get()->result();
                    $message = array('response'=>'S','data'=>$result);
                }else{
                    $message = array('response'=>'F','message'=>'No data available','errors'=>array());
                }   
            } else {
                $message = array('response'=>'F','message'=>'Please login.','errors'=>array());
            } 
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }
        $this->response($message, 200); // 200 being the HTTP response code
    }

    function get_week_info_by_date_post() {

        if (!empty($this->post())) {
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            $errormessage = "";
            if ($this->post('access_token') != '' || (isset($_SERVER['HTTP_ACCESS_TOKEN']) && !empty($_SERVER['HTTP_ACCESS_TOKEN']) )) {
                $requestFrom = 'Device';
                $device_id = $this->post('device_id');
                $device_type = $this->post('device_type');
            } else {
                $requestFrom = 'Web';
            }

            $data = array();
            $inputSelectedDate=str_replace('(India Standard Time)', '(IST)', $this->post('selected_date'));
            $dayNumber = date('N', strtotime($inputSelectedDate));  //format Aug 05, 2016
            $dayNumber = $dayNumber - 1; //because our week day start from monday to sunday
            $selectedDate =  date('Y-m-d H:i:s', strtotime($inputSelectedDate) ); 
            $weekStartDate =  date('Y-m-d H:i:s', strtotime($inputSelectedDate) - $dayNumber * 24 * 60 * 60 ); 
            $weekEndDate =  date('Y-m-d H:i:s', strtotime($inputSelectedDate) + (7 - $dayNumber) * 24 * 60 * 60 ); 
            //print_r($dayNumber . ' ' . $selectedDate . ' '. $weekStartDate . '  ' . $weekEndDate);
            $weekInfo = $this->db->get_where('weeks',array('week_start_date >=' => $weekStartDate, 'week_end_date =' => $weekEndDate ) )->result();      

            if (isset($weekInfo) && !empty($weekInfo)) {
                $message = array('response'=>'S','data'=>$weekInfo[0]);
            }  else {
                $message = array('response'=>'F','message'=>'No record(s) found','errors'=>array());
            }
        } else {
            $message = array('response'=>'F','message'=>'Post values not found','errors'=>array());
        }

        $this->response($message, 200); // 200 being the HTTP response code
    }
}