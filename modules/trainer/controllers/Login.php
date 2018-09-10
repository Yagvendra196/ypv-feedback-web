<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(ADMIN_PATH.'controllers/Users.php');
class Login extends Users {	
	function __construct()
	{ 
		parent::__construct();   
		$this->title = $this->data['title'] = $this->config->item('modules_titles')['examiner'];
		$this->moduleName = $this->data['moduleName'] = $this->config->item('modules')['admin'];
		$this->moduleFolder = $this->data['moduleFolder'] = $this->config->item('modules_folders')['admin'];	
		$this->modulePlurals = $this->data['modulePlurals'] = $this->config->item('modules_plurals')['admin'];
		$this->thisModuleName = $this->data['thisModuleName'] = $this->config->item('modules')['examiner'];	
		$this->thisModuleFolder = $this->data['thisModuleFolder'] = $this->config->item('modules_folders')['examiner'];	
		$this->thisModulePlurals = $this->data['thisModulePlurals'] = $this->config->item('modules_plurals')['examiner'];	
		$this->studentModuleName = $this->data['studentModuleName'] = $this->config->item('modules')['student'];	
		$this->studentModuleFolder = $this->data['studentModuleFolder'] = $this->config->item('modules_folders')['student'];	
		$this->studentModulePlurals = $this->data['studentModulePlurals'] = $this->config->item('modules_plurals')['student'];	
	}


	public function index()
	{ 	
		$ValidUser = $this->Security->AllowedRoles('admin', ['UserTypes' => ['4'], 'Redirect' => false]);
		if ($ValidUser) redirect(base_url($this->config->item('modules_folders')['examiner'].'/'.$this->studentModuleFolder)); //redirect to users list page

		$this->data['page'] = 'admin_login';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = $this->thisModuleName.' Sign-In';
		$this->data['role_id'] = '4';
		$this->load->add_package_path(ADMIN_PATH);
		$this->load->view('layouts/before_login',$this->data);

	}
}
