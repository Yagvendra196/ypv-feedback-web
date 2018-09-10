<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(ADMIN_PATH.'controllers/Users.php');
class Trainer extends Users {	
	function __construct()
	{ 
		parent::__construct();   		
	}

	public function add_edit()
	{ 
		$this->session->set_userdata('action_of','super_admin');
		redirect(base_url($this->config->item('modules_folders')['admin'].'/users/'.stristr(uri_string(),'add_edit'))); //redirect to users list page
	}
	
}
