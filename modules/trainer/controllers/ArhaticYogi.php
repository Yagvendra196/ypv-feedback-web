<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(ADMIN_PATH.'controllers/Users.php');
class ArhaticYogi extends Users {	
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
		$this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);
		$this->data['page'] = 'users';
		$this->data['title'] = $this->title;

    /* uncomment it for hard delete user  
    $role = $this->db->get_where('user_roles',array( 'user_id'=>$this->session->userdata('user_id'), 'role_id' => 1))->row();
    if (!empty($role)) {
      $this->data['is_super_admin'] = 'yes';
    } else {
      $this->data['is_super_admin'] = 'no';
    } 
    //*/
    
		$this->data['page_title'] = 'All '.STUDENT;
		$this->load->add_package_path(ADMIN_PATH);
		$this->load->view($this->layout, $this->data);
	}
	
	public function add_edit()
	{ 
		$this->session->set_userdata('action_of','examiner');
		redirect(base_url($this->config->item('modules_folders')['admin'].'/users/'.stristr(uri_string(),'add_edit'))); //redirect to users list page
	}



  public function buddies($user_id='')
  {   
    $this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);

    //parameter security
    if (empty($user_id) || !is_numeric($user_id) || stristr($user_id,'.') ) {
      redirect('error_404');
    }

    $this->data['user_id'] = $user_id;
    $this->data['row'] = $this->Utility->getRowByField('users',array('users.user_id'=>$user_id));

    $this->db->join('users as u','u.user_id = usb.user_id','left');
    $this->data['user_give_feedbacks_to'] = $this->Utility->getRowsByField('user_spiritual_buddies as usb',array('usb.spiritual_buddie_user_id'=>$user_id));

    $this->db->join('users as u','u.user_id = usb.spiritual_buddie_user_id','left');
    $this->data['user_recive_feedbacks_from'] = $this->Utility->getRowsByField('user_spiritual_buddies as usb',array('usb.user_id'=>$user_id));



    $this->data['page'] = 'buddies';
    $this->data['title'] = $this->title;
    $this->data['page_title'] = $this->data['row']->first_name;
    $this->layout = '/layouts/after_login';
    $this->load->add_package_path(ADMIN_PATH);
    $this->load->view($this->layout, $this->data);
  } 

	public function mng_buddies($user_id)
	{ 	
		$this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);

		$this->data['user_id'] = $user_id;
		$this->data['row'] = $this->Utility->getRowByField('users',array('users.user_id'=>$user_id));

		$this->data['page'] = 'mngbuddies';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Manage buddies for '.$this->data['row']->first_name;
		$this->layout = '/layouts/after_login_iframe';
		$this->load->add_package_path(ADMIN_PATH);
		$this->load->view($this->layout, $this->data);
	}

	public function trainers($user_id)
	{ 	
		$this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);

		$this->data['user_id'] = $user_id;
		$this->data['row'] = $this->Utility->getRowByField('users',array('users.user_id'=>$user_id));

									   $this->db->join('users as u','u.user_id = uo.owner_user_id','left');
		$this->data['user_examiners'] = $this->db->get_where('user_owners as uo',array('uo.user_id'=>$user_id,
																					  'uo.status'=>1,
																					  'end_date >'=>date('Y-m-d H:i:s')
																					  ))->result();

		$this->data['page'] = strtolower(EXAMINERS);
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'All '.EXAMINERS.' of '.$this->data['row']->first_name;
		$this->layout = '/layouts/after_login_iframe';
		$this->load->add_package_path(ADMIN_PATH);
		$this->load->view($this->layout, $this->data);
	}




    /**
     * Lists all Users models.
     * @return mixed
     */
    public function buddiesDataTableData($user_id)
    {

        include APPPATH . 'components/Filter.php';
        include APPPATH . 'components/DataTableDataProvider.php';
        include FCPATH  . 'modules/'.$this->config->item('modules_folders')['examiner'].'/components/BuddiesDataTableDataProvider.php';       

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
            array( 'db' => 'u.user_id',         'dt' => 'user_id' ),
            array( 'db' => 'u.email',          'dt' => 'email' ),
            array( 'db' => 'u.first_name',     'dt' => 'first_name' ),
            array( 'db' => 'u.last_name',      'dt' => 'last_name' ),
            array( 'db' => 'ur.role_id',       'dt' => 'role_id' ),
            array( 'db' => 'ur.status',       'dt' => 'status' ),
            array( 'db' => 'mr.role_name',     'dt' => 'role_name' ),
            array( 'db' => 'usb.spiritual_buddie_user_id',     'dt' => 'spiritual_buddie_user_id' )
        );
        $_POST['user_id'] = $user_id;
        echo BuddiesDataTableDataProvider::simple( $_POST, $db, $table, $primaryKey, $columns );
        die("");
    }
    /*
    public function usbStatusChange()
    {	
        $ValidUser = $this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => false]);
        if (!$ValidUser) {echo '__WrongUser';die();}
        
        //only if ajax post request
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_POST) ) {

		    // To avoid mysql injection
		    $this->Security->avoid_mysql_injection(false);

            $user_id = $this->input->post('user_id');
            $spiritual_buddie_user_id = $this->input->post('spiritual_buddie_user_id');
            $usbStatus = $this->input->post('usbStatus');
            if($usbStatus) {
                $usbStatus = 0;
            } else {
                $usbStatus = 1;
            }

			$this->db->where(array('user_id' => $user_id,'spiritual_buddie_user_id' => $spiritual_buddie_user_id));
			$this->db->update('user_spiritual_buddies', array('status' => $usbStatus,'updated'=>date('Y-m-d H:i:s'),'updatedBy'=>$this->session->userdata('user_id')));
            return $user_id."==".$spiritual_buddie_user_id."==".$usbStatus;
        }
    }
    */
    public function addUsb()
    {	
        $ValidUser = $this->Security->AllowedRoles('', ['UserTypes' => ['1','4','3'], 'Redirect' => false]);
        if (!$ValidUser) {echo '__WrongUser';die();}
        
        //only if ajax post request
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && !empty($_POST) ) {

		    // To avoid mysql injection
		    $this->Security->avoid_mysql_injection(false);

            $user_id = $this->input->post('user_id');
            $spiritual_buddie_user_id = $this->input->post('spiritual_buddie_user_id');

      			$this->db->insert('user_spiritual_buddies', array('user_id' => $user_id,
      															  'spiritual_buddie_user_id' => $spiritual_buddie_user_id
      															  ) );

            $this->db->insert('user_spiritual_buddies_history', array(
                'user_id'                  => $user_id, 
                'spiritual_buddie_user_id' => $spiritual_buddie_user_id,
                'start_date'               => date('Y-m-d H:i:s'),
                'end_date'                 => '',
                'updatedBy'                => $this->session->userdata('user_id')
            ));

            return $user_id."==".$spiritual_buddie_user_id;
        }
    }


	public function feedback($user_id='')
	{ 	
		$this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);

		//parameter security
		if (empty($user_id) || !is_numeric($user_id) || stristr($user_id,'.') ) {
			redirect('error_404');
		}

		$this->data['user_id'] = $user_id;
		$this->data['row'] = $this->Utility->getRowByField('users',array('users.user_id'=>$user_id));

        $this->db->select("w.idWeek, DATE_FORMAT(w.week_start_date, '%d/%m/%Y') AS week_start_date, DATE_FORMAT(w.week_end_date, '%d/%m/%Y') AS week_end_date");
        $this->db->where('w.week_start_date <=', date('Y-m-d'));
        $this->db->where('w.week_end_date >=', date('Y-m-d'));
        $this->data['weekInfo'] = $this->db->get('weeks AS w')->row();
      
      
        								   $this->db->distinct();
        								   $this->db->select('uf.user_id,uf.spiritual_buddie_user_id, u.first_name, u.last_name');
        								   $this->db->join('users as u','u.user_id = uf.spiritual_buddie_user_id','left');
        $this->data['feedback_given_by'] = $this->db->get_where('user_feedbacks as uf', array('uf.user_id'=>$user_id))->result();
       	
       	$given_by_year_res  = $this->db->distinct()->select('YEAR(created_at) as year')
                           										     ->where('user_id',$user_id)
                           										     ->get('user_feedbacks')
                           										     ->result();
        $given_by_year = array();       										    
       	foreach ($given_by_year_res as $value) {
       		$given_by_year[] = $value->year;
       	}

        if(!empty($given_by_year)){
          $this->data['given_by_year_range'] = min($given_by_year).":". max($given_by_year);
        }else{
          $this->data['given_by_year_range'] = '';
        }
        

       	/*$given_by_month = $this->db->distinct()->select('MONTH(created_at) as month')
       											 ->where('user_id',$user_id)
       											 ->get('user_feedbacks')
       											 ->result();

       	$this->data['given_by_month'] = array();
       	foreach ($given_by_month as $value) {
       		$this->data['given_by_month'][] = $value->month;
       	}*/

       	/* #-----------------------*/

        								   $this->db->distinct();
        								   $this->db->select('uf.user_id,uf.spiritual_buddie_user_id, u.first_name, u.last_name');
        								   $this->db->join('users as u','u.user_id = uf.user_id','left');
                           $this->db->where(array('uf.spiritual_buddie_user_id'=>$user_id));
        $this->data['feedback_given_to'] = $this->db->get_where('user_feedbacks as uf')->result();
        
        $given_to_year_res  = $this->db->distinct()->select('YEAR(created_at) as year')
       										     ->where('spiritual_buddie_user_id',$user_id)
       										     ->get('user_feedbacks')
       										     ->result();
       	$given_to_year = array();
       	foreach ($given_to_year_res as $value) {
       		$given_to_year[] = $value->year;
       	}

        if(!empty($given_to_year)){
          $this->data['given_to_year_range'] = min($given_to_year).":". max($given_to_year);
        }else{
          $this->data['given_to_year_range'] = '';
        }

        

       	/*$given_to_month = $this->db->distinct()->select('MONTH(created_at) as month')
       											 ->where('spiritual_buddie_user_id',$user_id)
       											 ->get('user_feedbacks')
       											 ->result();

       	$this->data['given_to_month'] = array();
       	foreach ($given_to_month as $value) {
       		$this->data['given_to_month'][] = $value->month;
       	}*/


		$this->data['page'] = 'feedback';
		$this->data['title'] = $this->title;
		$this->data['page_title'] = 'Feedback for '.$this->data['row']->first_name;
		$this->layout = '/layouts/after_login';
		$this->load->add_package_path(ADMIN_PATH);
		$this->load->view($this->layout, $this->data);
	}	
}
