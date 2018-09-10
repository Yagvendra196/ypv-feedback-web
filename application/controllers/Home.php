<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {
	var $data = array();
	var $layout = '/layouts/before_login';
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

	public function index()
	{		
		$ValidUser = $this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => false]);
		if ($ValidUser) {$this->data['alreadySignIn']='Yes'; } else {$this->data['alreadySignIn']=''; } //redirect to users list page
		
    	$this->data['page'] = 'index';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Home Page';
		$this->layout = '/layouts/ionic';
		$this->load->view($this->layout, $this->data);
	}

}