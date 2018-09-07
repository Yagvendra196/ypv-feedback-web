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
    $all_city = $this->db->query('select distinct city from user_profile WHERE city IS NOT NULL AND city != ""')->result();
    $cities = array();
    if($all_city){
      foreach ($all_city as $city) {
        $cities[] = $city->city;
      }
    }
    $this->data['all_city'] = $cities;
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

  public function summaryOnePage()
  {   
    $this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);
    $all_city = $this->db->query('select distinct city from user_profile WHERE city IS NOT NULL AND city != ""')->result();
    $cities = array();
    if($all_city){
      foreach ($all_city as $city) {
        $cities[] = $city->city;
      }
    }
    $this->data['all_city'] = $cities;
    
    $this->db->join('user_profile as up','users.user_id = up.user_id','left');
    $this->db->join('user_owners as uo','uo.user_id = users.user_id','left');
    if(!empty($_POST['city'])){
      $this->db->where('up.city',$_POST['city']);
      $this->data['cityPost']=$_POST['city'];
    }
    $this->data['allUsers'] = $allUsers = $this->Utility->getRowsByField('users',array('uo.owner_user_id'=>$this->session->userdata('user_id')));

    $usersIds=array();
    if(!empty($allUsers)){
      foreach ($allUsers as $user) {
        $usersIds[]=$user->user_id;;
      }
    }
    
      $this->db->distinct();
     $this->db->select('uf.user_id,uf.spiritual_buddie_user_id, u.first_name, u.last_name');
     $this->db->join('users as u','u.user_id = uf.user_id','left');
     if(!empty($usersIds)){
      $this->db->where_in('uf.spiritual_buddie_user_id', $usersIds);
    }
    $this->data['user_give_feedbacks_to'] = $this->db->get_where('user_feedbacks as uf')->result();



    //echo "<pre>";print_r($usersIds);die();
   /* $this->db->join('users as u','u.user_id = usb.user_id','left');
    if(!empty($usersIds)){
      $this->db->where_in('usb.spiritual_buddie_user_id', $usersIds);
    }
    $this->data['user_give_feedbacks_to'] = $this->Utility->getRowsByField('user_spiritual_buddies as usb');*/
 //echo "<pre>";print_r($this->data['user_give_feedbacks_to']);die();

    $this->db->distinct();
     $this->db->select('uf.user_id,uf.spiritual_buddie_user_id, u.first_name, u.last_name');
     $this->db->join('users as u','u.user_id = uf.spiritual_buddie_user_id','left');
     if(!empty($usersIds)){
      $this->db->where_in('uf.user_id', $usersIds);
    }
     $this->db->order_by('uf.created_at','DESC');
        $this->data['user_receive_feedbacks_to'] = $this->db->get_where('user_feedbacks as uf')->result();



   /* $this->db->join('users as u','u.user_id = usb.spiritual_buddie_user_id','left');
    if(!empty($usersIds)){
      $this->db->where_in('usb.user_id', $usersIds);
    }
    $this->data['user_receive_feedbacks_to'] = $this->Utility->getRowsByField('user_spiritual_buddies as usb');*/
    //echo "<pre>";print_r($this->data['user_receive_feedbacks_to']);die();


    $given_by_year_res  = $this->db->distinct()->select('YEAR(created_at) as year')
                          ->get('user_feedbacks')->result();
    $given_by_year = array();                               
    foreach ($given_by_year_res as $value) {
      $given_by_year[] = $value->year;
    }
    if(!empty($given_by_year)){
      $this->data['given_by_year_range'] = min($given_by_year).":". max($given_by_year);
    }else{
      $this->data['given_by_year_range'] = '';
    }

    $this->data['page'] = 'summaryOnePage';
    $this->data['title'] = $this->title;
    //$this->data['page_title'] = $this->data['row']->first_name;
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
                           $this->db->order_by('uf.created_at','DESC');
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
        

       	$given_by_month = $this->db->distinct()->select('MONTH(created_at) as month')
       											 ->where('user_id',$user_id)
                             ->order_by('month','DESC')
       											 ->get('user_feedbacks')
       											 ->result();

       	$this->data['given_by_month'] = array();
       	foreach ($given_by_month as $value) {
       		$this->data['given_by_month'][] = $value->month;
       	}

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

  public function trainerFeedback($user_id='')
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
        
    $given_by_month = $this->db->distinct()->select('MONTH(created_at) as month')
                             ->where('user_id',$user_id)
                             ->order_by('month','DESC')
                             ->get('user_feedbacks')
                             ->result();

    $this->data['given_by_month'] = array();
    foreach ($given_by_month as $value) {
      $this->data['given_by_month'][] = $value->month;
    }

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

    $this->data['page'] = 'trainerFeedback';
    $this->data['title'] = $this->title;
    $this->data['page_title'] = 'Feedback of '.ucfirst($this->data['row']->first_name);
    $this->layout = '/layouts/after_login';
    $this->load->add_package_path(ADMIN_PATH);
    $this->load->view($this->layout, $this->data);
  }

  public function summary_old($user_id='')
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
        $this->db->order_by('uf.created_at','DESC');
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
        

        $given_by_month = $this->db->distinct()->select('MONTH(created_at) as month')
                             ->where('user_id',$user_id)
                             ->order_by('month','DESC')
                             ->get('user_feedbacks')
                             ->result();

        $this->data['given_by_month'] = array();
        foreach ($given_by_month as $value) {
          $this->data['given_by_month'][] = $value->month;
        }

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


    $this->data['page'] = 'summary';
    $this->data['title'] = $this->title;
    $this->data['page_title'] = 'Feedback for '.$this->data['row']->first_name;
    $this->layout = '/layouts/after_login';
    $this->load->add_package_path(ADMIN_PATH);
    $this->load->view($this->layout, $this->data);
  } 

  public function summary($user_id=''){   
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
    $this->db->order_by('uf.created_at','DESC');
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
    

    $given_by_month = $this->db->distinct()->select('MONTH(created_at) as month')
                         ->where('user_id',$user_id)
                         ->order_by('month','DESC')
                         ->get('user_feedbacks')
                         ->result();

    $this->data['given_by_month'] = array();
    foreach ($given_by_month as $value) {
      $this->data['given_by_month'][] = $value->month;
    }

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

    $this->data['page'] = 'summary';
    $this->data['title'] = $this->title;
    $this->data['page_title'] = 'Feedback for '.$this->data['row']->first_name;
    $this->layout = '/layouts/after_login';
    $this->load->add_package_path(ADMIN_PATH);
    $this->load->view($this->layout, $this->data);
  }

  public function trainer_dashboard()
    {
      $this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);

    if ( $this->session->userdata('action_of')=='super_admin' || $this->session->userdata('action_of')=='examiner' ) 
      redirect(base_url());

    $this->data['page'] = 'trainer_dashboard';
    $this->data['title'] = $this->title;
    $this->data['page_title'] = "Dashboard";
    $this->layout = '/layouts/after_login';
    $this->load->add_package_path(ADMIN_PATH);  
    //echo $this->layout; die;
    // echo '<pre>'; print_r($this->data); die;
    $this->load->view($this->layout, $this->data);
  } 

  public function trainerFeedbackSummary(){
    $this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);
    $this->data['page'] = 'trainerFeedbackSummary-old';
    $this->data['title'] = $this->title;
    $this->data['page_title'] = 'YPV Trainer Report';

    /*$this->data['feedbackSummaryData'] = $this->db->query("SELECT u.user_id, u.first_name, u.last_name,
                                        IF(feedback.spiritual_buddie_user_id IS NOT NULL,1,0) as feedbackGiven)
                                        FROM user_owners uo
                                        LEFT JOIN users u On u.user_id = uo.user_id
                                        LEFT JOIN user_roles ur On ur.user_id = uo.user_id
                                        LEFT JOIN (
                                           SELECT spiritual_buddie_user_id FROM user_feedbacks
                                           WHERE feedback_type = 'for trainers'
                                           AND MONTH(created_at) = '09'
                                           AND YEAR(created_at) = '2018'
                                        ) as feedback ON u.user_id = feedback.spiritual_buddie_user_id
                                        WHERE ur.role_id = 5"
    );*/
    $monthAndYear = !empty($_POST['date']) ? " AND MONTH(created_at) = '09' AND YEAR(created_at) = '2018'" : '';

    $this->db->select("u.user_id, u.first_name, u.last_name, IF(feedback.spiritual_buddie_user_id IS NOT NULL,1,0) as feedbackGiven");
    $this->db->join('users u','u.user_id = uo.user_id','left');
    $this->db->join('user_roles ur','ur.user_id = uo.user_id','left');
    $this->db->join("(SELECT spiritual_buddie_user_id FROM user_feedbacks WHERE feedback_type = 'for trainers'".$monthAndYear.") as feedback","u.user_id = feedback.spiritual_buddie_user_id","left");

    $this->db->order_by('u.first_name','ASC');
    $this->data['feedbackSummaryData'] = $this->db->get_where('user_owners uo',array('ur.role_id'=>'5'))->result();
    /*echo "<pre>";
    print_r($this->data['feedbackSummaryData']);die;*/

    $this->load->add_package_path(ADMIN_PATH);
    $this->load->view($this->layout, $this->data);
  }


}
