<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {
	var $data = array();
	var $layout = '/layouts/after_login';
	var $title = '';
	var $moduleName = '';
	var $moduleFolder = '';
	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	
	function __construct()
	{ 
		parent::__construct();   
		$this->title = $this->data['title'] = $this->config->item('modules_titles')['frontend'];
		$this->moduleName = $this->data['moduleName'] = $this->config->item('modules')['frontend'];
		$this->moduleFolder = $this->data['moduleFolder'] = $this->config->item('modules_folders')['frontend'];


		//load library class 
		$this->load->library(array( 'encrypt'));  	

		//for angularjs post fix
		if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
			if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
				$_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
		}

       if ( (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' ) || 
       	 	(isset($_SERVER['HTTP_ACCEPT']) && stristr($_SERVER['HTTP_ACCEPT'],'application/json')) ) {
       		$this->data['isAjaxRequest']='Yes';
       } else { $this->data['isAjaxRequest']=''; }


		//For getting information of login user.
		if ($this->session->userdata('user_id') ) {
		 	$this->data['loginUserData'] = $loginUserData = $this->User->getUser($this->session->userdata('user_id'),3);		 	
		 	if(isset($loginUserData) && !empty($loginUserData) && $loginUserData->user_profile_id=='' && $this->uri->segment(2) != 'updateProfile'){
		 			redirect('users/updateProfile');
		 	}
		}	

	}


	/* START IONIC Developmented methods */
	/*
	public function login()
	{	
		if ($this->data['isAjaxRequest']=='')	{
			$ValidUser = $this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => false]);
			if ($ValidUser) {$this->data['alreadySignIn']='Yes'; } else {$this->data['alreadySignIn']=''; } //redirect to users list page
		}

		$this->data['page'] = 'templates/login.html';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Sign-In';
		$this->load->view('layouts/ionic',$this->data);

	}
	public function dashboard()
	{
		if ($this->data['isAjaxRequest']=='')	{
			$this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => true]);
		}

		$this->data['page'] = 'templates/dashboard.html';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Dashboard';
		$this->load->view('layouts/ionic',$this->data);	
	}

	public function menu()
	{
		if ($this->data['isAjaxRequest']=='')	{
			$this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => true]);
		}

		$this->data['page'] = 'templates/menu.html';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Menu';
		$this->load->view('layouts/ionic',$this->data);	
	}

	public function myBuddies()
	{
		if ($this->data['isAjaxRequest']=='')	{
			$this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => true]);
		}
		$user_id = $this->session->userdata('user_id');
		

		$this->db->join('user_profile', 'user_profile.user_id = usb.user_id', 'left');
		$this->db->join('users', 'usb.user_id = users.user_id', 'left');
		$this->data['user_buddies'] = $this->db->get_where('user_spiritual_buddies as usb',array('usb.spiritual_buddie_user_id'=>$user_id))->result();

		$this->data['page'] = 'templates/my-buddies.html';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'My Buddies';
		$this->load->view('layouts/ionic',$this->data);	
	}

	public function addBuddies()
	{
		if ($this->data['isAjaxRequest']=='')	{
			$this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => true]);
		}
		$user_id = $this->session->userdata('user_id');
		



		$this->data['user_buddies_not'] = $this->db->query("SELECT u.user_id, u.email, u.first_name, u.last_name, ur.role_id, ur.status, mr.role_name, usb.spiritual_buddie_user_id, usb.status ,up.*
FROM `users` as u
	 LEFT JOIN `user_profile` as up ON up.user_id = u.user_id 
     LEFT JOIN `user_roles` as ur ON ur.user_id = u.user_id 
     LEFT JOIN `master_roles` as mr ON mr.role_id = ur.role_id 
     LEFT JOIN `user_spiritual_buddies` as usb ON usb.user_id = u.user_id and usb.spiritual_buddie_user_id = '".$user_id."'
  WHERE  ur.role_id = 3 and u.user_id != '".$user_id."' AND u.user_id != '1' AND  
  usb.user_id IS NULL AND 
  u.user_id in  (SELECT DISTINCT user_id FROM `user_owners` WHERE `owner_user_id` in (SELECT `owner_user_id` FROM `user_owners` WHERE user_id = '".$user_id."')) 
  ORDER BY u.user_id ASC")->result();
		
		$this->data['page'] = 'templates/add-buddies.html';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Add Buddies';
		$this->load->view('layouts/ionic',$this->data);	
	}

	public function feedbackWeekly()
	{
		if ($this->data['isAjaxRequest']=='')	{
			$this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => true]);
		}

		$this->data['feedback_fields'] = $this->db->get_where('feedback_fields', array('feedback_id'=>1, 'feedback_field_status'=>1))->result();

		$this->data['page'] = 'templates/feedback-weekly.html';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Feedback Weekly';
		$this->load->view('layouts/ionic',$this->data);	
	}

	public function feedbackMonthly()
	{
		if ($this->data['isAjaxRequest']=='')	{
			$this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => true]);
		}

		$this->data['feedback_fields'] = $this->db->get_where('feedback_fields', array('feedback_id'=>2, 'feedback_field_status'=>1))->result();

		$this->data['page'] = 'templates/feedback-monthly.html';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Feedback Monthly';
		$this->load->view('layouts/ionic',$this->data);	
	}

	public function signUp()
	{
		if ($this->data['isAjaxRequest']=='')	{
			$ValidUser = $this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => false]);
			if ($ValidUser) {$this->data['alreadySignIn']='Yes'; } else {$this->data['alreadySignIn']=''; } //redirect to users list page
		}

        $this->data['master_levels'] = $this->db->get_where('master_levels')->result();

		$this->db->select('u.user_id,u.first_name,u.last_name');
        $this->db->order_by('u.first_name');
		$this->db->join('user_roles as ur','u.user_id = ur.user_id','left');
        $this->data['examiners'] = $examiners = $this->db->get_where('users as u',array('u.status'=>1,'u.deleted'=>0,'ur.role_id'=>4,'ur.status'=>1))->result();

		$this->data['page'] = 'templates/signup.html';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Sign-Up';
		$this->load->view('layouts/ionic',$this->data);	
	}
	*/
	/* END IONIC Developmented methods */




	/* START UN-IONIC Developmented methods */
	public function logout()
	{
		//client login already for which uset the session
		$this->Security->user_logout();	
		redirect(base_url('')); //redirect to login page
	}


	public function old_login()
	{
		
		$ValidUser = $this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => false]);
		if ($ValidUser) redirect(base_url('users')); //redirect to users list page

		$this->data['page'] = 'user_login';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Sign-In';
		$this->load->view('layouts/before_login',$this->data);
		
	}

	public function index()
	{ 
		$this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => true]);
		$this->data['page'] = 'user_dashboard';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Dashbaord';
		$this->load->view('layouts/after_login',$this->data);
	}

	public function changePassword()
	{
		$this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => true]);
		$this->data['page'] = 'user_change_password';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'User Change Password';
		$this->load->view($this->layout, $this->data);
	}


	public function profile($idUser = '')
	{		
		$this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => true]);

		if(is_numeric($idUser)){
	    	$this->data['page'] = 'user_profile';
			$this->data['title'] = $this->title;
			$this->data['page_title'] = 'Profile';
			$this->layout = '/layouts/before_login';
			$this->load->view($this->layout, $this->data);
		}	
	}

    public function forgotPassword()
    {
    	$this->data['page'] = 'user_forgot_password';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Forgot Password';
		$this->layout = '/layouts/before_login';
		$this->load->view($this->layout, $this->data);
    }
    public function ucpffp() //user change password for forgot password
    { 
    	if (!empty($_POST)) {	
            // To avoid mysql injection
            $this->Security->avoid_mysql_injection(false);
            // Setting validation rules
            $this->form_validation->set_rules($this->User->user_change_password_for_forgot_password_rules());
            $this->form_validation->set_error_delimiters('', '<br/>');   //provide div to show message  
            // Continue authentication if form is valid
            if($this->form_validation->run())
            {      
	    		$token = $this->input->post('token');
	    		$user_id = $this->input->post('user_id');
	    		$change = false;
	    		if ( $token == 'cp' ) { 
		    		$this->db->select('user_id');
		    		$u = $this->db->get_where('users', array('email'=>urldecode($_POST['user_id'])))->row();
		    		if (!empty($u)) {
			    		$user_id = $u->user_id;
			    		$change = true;
		    		}
	    		} else if (  $token != '' && strlen($token)==32 && !empty($user_id) && is_numeric($user_id) ) {
			    		$this->db->select('password_reset_token');
			    		$u = $this->db->get_where('users', array('user_id'=>$user_id))->row();
			    		if ( !empty($u) && $token == $u->password_reset_token ) {
		                    $change = true;
			    		}
	    		}
	    		if ($change==true) { 
					$this->db->where(array('user_id'=>$user_id));
                    $this->db->update('users', array( 'password'=>$this->encrypt->encode($this->input->post('new_password')), 'password_reset_token'=>"" ) );
					redirect('users/ucpffp/success');
	    		} else {
	    			die('User not in database.');
	    		}
            }
    	} else {
    		$token = $this->uri->segment('3');
    		if ( $token != 'cp' ) {
    			if ($token != 'success' ) {
	    		$user_id = $this->uri->segment('4');
	    		if ( ! ( $token != '' && strlen($token)==32 && !empty($user_id) && is_numeric($user_id)) ) {redirect('error_404');}
	    		$this->db->select('password_reset_token');
	    		$u = $this->db->get_where('users', array('user_id'=>$user_id))->row();
	    		if (empty($u) || $token != $u->password_reset_token) {redirect('error_404');}
    			}
    		}
    	}
    	$this->data['page'] = 'user_change_password_for_fogot_password';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Set your new password';
		$this->layout = '/layouts/before_login';
    	$this->load->view($this->layout, $this->data);
    }

    public function verification($verification_code = '', $user_id = '') 
    {
    	if ($verification_code != '' && $user_id != '') {
            $userInfo = $this->utility->getRowByfield('users', array('email' => $email));
        }
    }

    /* END UN-IONIC Developmented methods */
 	function test()
 	{
 		die("testing");
 	}   
}
