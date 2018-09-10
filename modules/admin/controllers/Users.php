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
		$this->title = $this->data['title'] = $this->config->item('modules_titles')['admin'];
		$this->moduleName = $this->data['moduleName'] = $this->config->item('modules')['admin'];
		$this->moduleFolder = $this->data['moduleFolder'] = $this->config->item('modules_folders')['admin'];	
		//load library class 
		$this->load->library(array( 'encrypt'));  	
		// Load model 
		$this->load->model(array( $this->moduleFolder.'/Admin'));  

		//For getting information of login user.
		if ($this->session->userdata('user_id') ) {
		 	$this->data['loginUserData'] = $loginUserData = $this->User->getUser($this->session->userdata('user_id'),1);		 	
		 	if(isset($loginUserData) && !empty($loginUserData) && $loginUserData->user_profile_id=='' && $this->uri->segment(2) != 'updateProfile'){
		 			redirect('users/updateProfile');
		 	}
		}	

	}
	public function index()
	{ 	
		$this->Security->AllowedRoles('admin', ['UserTypes' => ['1'], 'Redirect' => true]);
		$this->data['page'] = 'admin_users';
		$this->data['title'] = $this->title;
		$all_city = $this->db->query('select distinct city from user_profile WHERE city IS NOT NULL AND city != ""')->result();
    	$cities = array();
	    if($all_city){
	      foreach ($all_city as $city) {
	        $cities[] = $city->city;
	      }
	    }
    	$this->data['all_city'] = $cities;
		$this->data['page_title'] = 'All Arhatic Yogi '.EXAMINER;
		$this->load->view($this->layout, $this->data);
	}

	public function login()
	{
		$ValidUser = $this->Security->AllowedRoles('admin', ['UserTypes' => ['1'], 'Redirect' => false]);
		if ($ValidUser) redirect(base_url($this->config->item('modules_folders')['admin'].'/users')); //redirect to users list page

		$this->data['page'] = 'admin_login';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = $this->moduleName.' Sign-In';
		$this->data['role_id'] = '1';
		$this->load->view('layouts/before_login',$this->data);
	}
	public function logout()
	{	/*
		//client login already for which uset the session
		$this->Security->admin_logout();	
		$this->data['title'] = $this->title;
		$this->data['page_title'] = $this->moduleName.' Sign-Out';
		redirect(base_url($this->config->item('modules_folders')['admin'].'/users/login')); //redirect to login page
		*/
	}
	public function changePassword()
	{
		$this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);
		$this->data['page'] = 'admin_change_password';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = $this->moduleName.' Change Password';
		$this->load->view($this->layout, $this->data);
	}

	public function changeUserPassword(){
		if(!$this->Security->doesUserHasCapability('super_admin')){
			redirect($this->config->item('modules_folders')['admin'].'/users');
		}
		if($_POST){
			/*echo "<pre>";
			print_r($this->Admin->admin_change_user_password_rules());
			print_r($_POST);
			die();*/
			$this->form_validation->set_rules($this->Admin->admin_change_user_password_rules());
			$this->form_validation->set_error_delimiters('', '<br/>');   //provide div to show message  
			// Continue authentication if form is valid
			if($this->form_validation->run())
			{	
				$email = $this->input->post('email');
				$this->db->where(array('email'=>$email));
		    $this->db->update('users', array( 'password'=>$this->encrypt->encode($this->input->post('new_password')), 'password_reset_token'=>"" ) );
		    $this->session->set_flashdata('changeUserPasswordSuccess','User password changed successfully.');
				redirect($this->config->item('modules_folders')['admin'].'/users/changeUserPassword');
			}
		}
		$this->Security->AllowedRoles('admin', ['UserTypes' => ['1'], 'Redirect' => true]);
		$this->data['page'] = 'admin_change_user_password';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = $this->moduleName.' Change User Password';
		$this->load->view($this->layout, $this->data);
	}

	function check_user_email($str)
    { 
        $query = $this->db->query("SELECT email FROM users WHERE email='$str' AND deleted = '0'");         
        $login_user_row = $query->row_array();                               
        if($query->num_rows()<1)
        {
            $this->form_validation->set_message('check_user_email', 'Email not found.');
            return FALSE;
        } 
        return TRUE;       
    }

    /**
     * Lists all Users models.
     * @return mixed
     */
    public function DataTableData()
    {
        include APPPATH . 'components/Filter.php';
        include APPPATH . 'components/DataTableDataProvider.php';
        include FCPATH  . 'modules/'.$this->config->item('modules_folders')['admin'].'/components/UserTableDataProvider.php';       

        //echo 'false';die();
        //This action can work only for role 1, use this for each ajax request
        $ValidUser = $this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => false]);
        if (!$ValidUser) {echo '__WrongUser';die();}

        $f = new Filter();
        $f->filter_tags();

       // echo '<pre>';
       // print_r($_POST);
       // die("H");
        
        $db = $this->db;
        $primaryKey='u.user_id';
        $table = 'users';
        $columns = array(
            array( 'db' => 'u.user_id',        'dt' => 'user_id' ),
            array( 'db' => 'u.first_name',     'dt' => 'first_name' ),
            array( 'db' => 'u.last_name',      'dt' => 'last_name' ),
            array( 'db' => 'u.email',          'dt' => 'email' ),
            array( 'db' => 'ur.role_id',       'dt' => 'role_id' ),
            array( 'db' => 'ur.status',        'dt' => 'status' ),
            array( 'db' => 'mr.role_name',     'dt' => 'role_name' ),
            array( 'db' => 'up.is_spritual_trainer', 'dt' => 'is_spritual_trainer' )
            
        );
        echo UserTableDataProvider::simple( $_POST, $db, $table, $primaryKey, $columns );
        die("");
    }

	public function add_edit()
	{  
		$this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);

		if ( $this->session->userdata('action_of')!='super_admin' && $this->session->userdata('action_of')!='examiner' ) redirect(base_url());

		$this->data['page'] = 'admin_user_add_edit';
		$this->data['title'] = $this->title;

		if ($this->session->userdata('action_of')=='examiner')
		$this->data['page_title'] = STUDENT.' add/edit';
			else
		$this->data['page_title'] = 'Arhatic Yogi '.EXAMINER.' add/edit';

		$primary_key = 'user_id';
		$insert_id = $this->Admin->admin_user_add_edit_post_for_web($primary_key); 
		if (!empty($insert_id) && is_numeric($insert_id))
		{
			//if ($this->input->post($primary_key)) redirect($this->config->item('modules_folders')['admin'].'/users/add_edit/'.$insert_id.'/success');	
			//else redirect($this->config->item('modules_folders')['admin'].'/users/add_edit/success');	
			redirect($this->config->item('modules_folders')['admin'].'/users/add_edit/success');	
		}

		$this->db->select('u.user_id,u.first_name,u.last_name');
        $this->db->order_by('u.first_name');
		$this->db->join('user_roles as ur','u.user_id = ur.user_id','left');
        $this->data['examiners'] = $this->db->get_where('users as u',array('u.status'=>1,'u.deleted'=>0,'ur.role_id'=>4,'ur.status'=>1))->result();
        $this->data['levels'] = $this->db->get_where('master_levels')->result();
		if ( ($this->uri->segment('4')!='' and $this->uri->segment('4')!='success') || $this->input->post('user_id'))
		{ 
			$user_id=($this->input->post('user_id'))?$this->input->post('user_id'):$this->uri->segment('4');
			$this->db->join('user_profile', 'user_profile.user_id = users.user_id', 'left');
			$this->data['row'] = $row = $this->Utility->getRowByField('users',array('users.user_id'=>$user_id));

			$this->data['user_examiners'] = $this->db->get_where('user_owners as uo',array('uo.user_id'=>$user_id,
																						  'uo.status'=>1,
																						  'end_date >'=>date('Y-m-d H:i:s')
																						  ))->result();

			$this->data['row']->phone1_1 = substr($row->phone, 0,3);
			$this->data['row']->phone1_2 = substr($row->phone, 3,3);
			$this->data['row']->phone1_3 = substr($row->phone, 6);

			$this->data['row']->examiner_id = array();
			if (!empty($this->data['user_examiners'])); 
			foreach ($this->data['user_examiners'] as $key => $examiner) {
				$this->data['row']->examiner_id[] = $examiner->owner_user_id;
			}
			
		} else {
			$this->data['row']=array();
		}
		$this->load->view($this->layout, $this->data);
	}

	public function view()
	{
		$this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);
		$this->layout = '/layouts/after_login_iframe';
		$this->data['page'] = 'admin_user_view';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = EXAMINER.' View';


       	// To avoid mysql injection
	    $this->Security->avoid_mysql_injection(false);

		if ($this->uri->segment('4') || $this->input->post('user_id'))
		{
			$user_id=($this->input->post('user_id'))?$this->input->post('user_id'):$this->uri->segment('4');
			$this->db->select('users.*,
				user_profile.*, 
				timezones.timezone,
				master_levels.level_name,
				countries.country_name');
			$this->db->join('user_profile', 'user_profile.user_id = users.user_id', 'left');
			$this->db->join('timezones', 'timezones.timezone_id = users.timezone_id', 'left');
			$this->db->join('countries', 'countries.country_id = user_profile.country_id', 'left');
			$this->db->join('master_levels', 'master_levels.level_id = user_profile.level_id', 'left');
			$this->data['row'] = $row = $this->Utility->getRowByField('users',array('users.user_id'=>$user_id));
		} else {
			$this->data['row']=array();
		}

		$this->load->view($this->layout, $this->data);
	}



    public function statusChange()
    {	
        $ValidUser = $this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => false]);
        if (!$ValidUser) {echo '__WrongUser';die();}
        
        //only if ajax post request
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_POST) ) {

		    // To avoid mysql injection
		    $this->Security->avoid_mysql_injection(false);

            $user_id = $this->input->post('user_id');
            $role_id = $this->input->post('role_id');
            $status = $this->input->post('status');
            if($status) {
                $status = 0;
            } else {
                $status = 1;
            }

			$this->db->where(array('user_id' => $user_id,'role_id' => $role_id));
			$this->db->update('user_roles', array('status' => $status));
            return $user_id."==".$role_id."==".$status;
        }
    }

    /* uncomment it for hard delete user, it is perfectly tested
    public function delete($user_id='') {
		$this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);
		if(!empty($user_id) && is_numeric($user_id) && $user_id!= 1 ){
			$tables = array();
			$this->db->select('user_feedback_id');
			$this->db->where('user_id',$user_id);
			$user_feedback_id = $this->db->get('user_feedbacks')->result();
			if($user_feedback_id){
				foreach ($user_feedback_id as $ids) {
					$user_feedback_ID[] = $ids->user_feedback_id;
				}
				$this->db->where_in('user_feedback_id', $user_feedback_ID);
				$this->db->delete('user_feedback_fields');
				$this->db->delete('user_feedbacks',array('spiritual_buddie_user_id' => $user_id));
			}
			$this->db->delete('user_spiritual_buddies', array('spiritual_buddie_user_id' => $user_id)); 
			$this->db->delete('user_spiritual_buddies_history', array('spiritual_buddie_user_id' => $user_id)); 

			$tables = array('users','user_access_tokens','user_login_details','user_media','user_owners','user_profile','user_roles','user_spiritual_buddies','user_feedbacks','user_spiritual_buddies_history');
						
			$this->db->where('user_id', $user_id);
			$this->db->delete($tables);
			
		} else {
			echo'__WrongUser';
		}
    }
	//*/
}
