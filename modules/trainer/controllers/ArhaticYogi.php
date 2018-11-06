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
		$this->load->add_package_path(ADMIN_PATH); //echo '<pre>'; print_r($this->data); die;
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
    $this->db->order_by('users.first_name');
    $this->data['allUsers'] = $allUsers = $this->Utility->getRowsByField('users',array('uo.owner_user_id'=>$this->session->userdata('user_id')));

    $usersIds=array();
    if(!empty($allUsers)){
      foreach ($allUsers as $user) {
        $usersIds[]=$user->user_id;;
      }
    }

    $month=date('m');
    $year=date('Y');
    if(!empty($_POST['selected_date'])){
      $month=date("m",strtotime($_POST['selected_date']));
      $year=date("Y",strtotime($_POST['selected_date']));
      $this->data['selected_date']=$_POST['selected_date'];
    }

     if(!empty($usersIds)){
      $userIDs=implode(',',$usersIds);
      //echo $userIDs;die();
    }

    /*$this->db->distinct();
    $this->db->select('uf.user_id,uf.spiritual_buddie_user_id, u.first_name, u.last_name,w.week_start_date,WEEK(w.week_start_date,5) - WEEK(DATE_SUB(w.week_start_date, INTERVAL DAYOFMONTH(w.week_start_date)-1 DAY),5)+1 as weekNum, MONTH(w.week_start_date) as Month, YEAR(w.week_start_date) as Year,GROUP_CONCAT(w.week_start_date) as weeks');
    $this->db->join('users as u','u.user_id = uf.user_id','left');
    $this->db->join('weeks as w','w.idWeek = uf.week_id','left');
    if(!empty($usersIds)){
      $this->db->where_in('uf.spiritual_buddie_user_id', $usersIds);
    }
    if(!empty($month) && !empty($year)){
      $this->db->where(array('month(w.week_start_date)'=>$month,'year(w.week_start_date)'=>$year));
    }
    $this->db->where('w.week_start_date is NOT NULL', NULL, FALSE);
    $this->db->group_by('u.first_name, u.last_name');
    $this->data['user_give_feedbacks_to'] = $user_give_feedbacks_to =  $this->db->get_where('user_feedbacks as uf')->result();*/

  $query="SELECT n.user_id, n.spiritual_buddie_user_id, `u`.`first_name`,`u`.`last_name`,
SUM(n.week1) w1,SUM(n.week2) w2,SUM(n.week3) w3,SUM(n.week4) w4,SUM(n.week5) w5
FROM (
  SELECT `uf`.`user_id`, `uf`.`spiritual_buddie_user_id`,
  IF(WEEK(w.week_start_date, 5) - WEEK(DATE_SUB(w.week_start_date, INTERVAL DAYOFMONTH(w.week_start_date)-1 DAY), 5) = 1,1,0) week1,
  IF(WEEK(w.week_start_date, 5) - WEEK(DATE_SUB(w.week_start_date, INTERVAL DAYOFMONTH(w.week_start_date)-1 DAY), 5) = 2,1,0) week2,
  IF(WEEK(w.week_start_date, 5) - WEEK(DATE_SUB(w.week_start_date, INTERVAL DAYOFMONTH(w.week_start_date)-1 DAY), 5) = 3,1,0) week3,
  IF(WEEK(w.week_start_date, 5) - WEEK(DATE_SUB(w.week_start_date, INTERVAL DAYOFMONTH(w.week_start_date)-1 DAY), 5) = 4,1,0) week4,
  IF(WEEK(w.week_start_date, 5) - WEEK(DATE_SUB(w.week_start_date, INTERVAL DAYOFMONTH(w.week_start_date)-1 DAY), 5) = 5,1,0) week5
  FROM user_feedbacks as uf
  LEFT JOIN `weeks` as `w` ON `w`.`idWeek` = `uf`.`week_id`
  WHERE uf.spiritual_buddie_user_id IN (".$userIDs.") AND
  MONTH(w.week_start_date) = '".$month."' AND YEAR(w.week_start_date) = '".$year."'
) n
LEFT JOIN `users` as `u` ON `u`.`user_id` = n.user_id
GROUP BY n.user_id,n.spiritual_buddie_user_id";
  $this->data['user_give_feedbacks_to'] = $user_give_feedbacks_to = $this->db->query($query)->result();


    // echo $this->db->last_query();die;
  //echo "<pre>";print_r($user_give_feedbacks_to);die();

    /*$this->db->distinct();
    $this->db->select('uf.user_id,uf.spiritual_buddie_user_id, u.first_name, u.last_name,w.week_start_date,w.week_no');
    $this->db->join('users as u','u.user_id = uf.user_id','left');
    $this->db->join('weeks as w','w.idWeek = uf.week_id','left');
    if(!empty($usersIds)){
      $this->db->where_in('uf.spiritual_buddie_user_id', $usersIds);
    }
    $this->db->where('w.week_start_date is NOT NULL', NULL, FALSE);
    $this->db->group_by('first_name,last_name');
    $this->data['user_give_feedbacks_to_groupBy'] = $this->db->get_where('user_feedbacks as uf')->result();*/


//echo $this->db->last_query();die();

    //echo "<pre>";print_r($usersIds);die();
   /* $this->db->join('users as u','u.user_id = usb.user_id','left');
    if(!empty($usersIds)){
      $this->db->where_in('usb.spiritual_buddie_user_id', $usersIds);
    }
    $this->data['user_give_feedbacks_to'] = $this->Utility->getRowsByField('user_spiritual_buddies as usb');*/
 //echo "<pre>";print_r($this->data['user_give_feedbacks_to']);die();

    /*$this->db->distinct();
     $this->db->select('uf.user_id,uf.spiritual_buddie_user_id, u.first_name, u.last_name,w.week_start_date');
     $this->db->join('users as u','u.user_id = uf.spiritual_buddie_user_id','left');
     $this->db->join('weeks as w','w.idWeek = uf.week_id','left');
     if(!empty($usersIds)){
      $this->db->where_in('uf.user_id', $usersIds);
    }
    if(!empty($month) && !empty($year)){
      $this->db->where(array('month(w.week_start_date)'=>$month,'year(w.week_start_date)'=>$year));
    }
    $this->db->where('w.week_start_date is NOT NULL', NULL, FALSE);
     $this->db->order_by('uf.created_at','DESC');
        $this->data['user_receive_feedbacks_to'] = $this->db->get_where('user_feedbacks as uf')->result();*/


        $query="SELECT n.user_id, n.spiritual_buddie_user_id, `u`.`first_name`,`u`.`last_name`,
SUM(n.week1) w1,SUM(n.week2) w2,SUM(n.week3) w3,SUM(n.week4) w4,SUM(n.week5) w5
FROM (
  SELECT `uf`.`user_id`, `uf`.`spiritual_buddie_user_id`,
  IF(WEEK(w.week_start_date, 5) - WEEK(DATE_SUB(w.week_start_date, INTERVAL DAYOFMONTH(w.week_start_date)-1 DAY), 5) = 1,1,0) week1,
  IF(WEEK(w.week_start_date, 5) - WEEK(DATE_SUB(w.week_start_date, INTERVAL DAYOFMONTH(w.week_start_date)-1 DAY), 5) = 2,1,0) week2,
  IF(WEEK(w.week_start_date, 5) - WEEK(DATE_SUB(w.week_start_date, INTERVAL DAYOFMONTH(w.week_start_date)-1 DAY), 5) = 3,1,0) week3,
  IF(WEEK(w.week_start_date, 5) - WEEK(DATE_SUB(w.week_start_date, INTERVAL DAYOFMONTH(w.week_start_date)-1 DAY), 5) = 4,1,0) week4,
  IF(WEEK(w.week_start_date, 5) - WEEK(DATE_SUB(w.week_start_date, INTERVAL DAYOFMONTH(w.week_start_date)-1 DAY), 5) = 5,1,0) week5
  FROM user_feedbacks as uf
  LEFT JOIN `weeks` as `w` ON `w`.`idWeek` = `uf`.`week_id`
  WHERE uf.spiritual_buddie_user_id IN (".$userIDs.") AND
  MONTH(w.week_start_date) = '".$month."' AND YEAR(w.week_start_date) = '".$year."'
) n
LEFT JOIN `users` as `u` ON `u`.`user_id` = n.spiritual_buddie_user_id
GROUP BY n.user_id,n.spiritual_buddie_user_id";
  $this->data['user_receive_feedbacks_to'] = $user_receive_feedbacks_to = $this->db->query($query)->result();



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


    if(!empty($this->uri->segment(5)) && !empty($this->uri->segment(6)) && is_numeric($this->uri->segment(5)) && is_numeric($this->uri->segment(6))){
      $this->data['month'] = $this->uri->segment(5);
      $this->data['year'] = $this->uri->segment(6);
    }

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

    /*if ( $this->session->userdata('action_of')=='super_admin' || $this->session->userdata('action_of')=='examiner' ) 
      redirect(base_url());*/

    $this->data['page'] = 'trainer_dashboard';
    $this->data['title'] = $this->title;
    $this->data['page_title'] = "Dashboard";
    $this->layout = '/layouts/after_login';

    $this->data['total_arhatic_yogi']         = 0;
    $this->data['total_arhatic_yogi_trainer'] = 0;
    $this->data['total_ypv_yogi_trainer']     = 0;
    $this->data['total_feedback']             = 0;
    $this->data['current_month_weekly_feedback_given'] = 0;
    

    $this->load->add_package_path(ADMIN_PATH);
    $this->data['user_id'] = $user_id = $this->session->userdata('user_id');

    $this->db->select('COUNT(*) AS total_arhatic_yogi');
    $this->db->join('user_roles as ur', 'ur.user_id = u.user_id ', 'LEFT');
    $this->db->join('master_roles as mr', 'mr.role_id = ur.role_id', 'LEFT');
    $this->db->join('user_owners as uo', 'uo.user_id = u.user_id', 'LEFT');
    $this->db->join('user_profile as up', 'up.user_id = u.user_id', 'LEFT');
    $total_arhatic_yogi = $this->Utility->getRowByField('users as u', array('ur.role_id' => 3,
                                                                            'u.user_id !=' => 1,
                                                                            'uo.owner_user_id' => $user_id
                                                                          ));
    // echo $this->db->last_query(); die;
    $this->db->select('COUNT(*) AS total_arhatic_yogi_trainer');
    $this->db->join('user_roles as ur', 'ur.user_id = u.user_id', 'LEFT');
    $this->db->join('master_roles as mr', 'mr.role_id = ur.role_id', 'LEFT');
    $total_arhatic_yogi_trainer = $this->Utility->getRowByField('users as u', array('ur.role_id' => 4,
                                                                                    'u.user_id !='  => 1));    
    // echo $this->db->last_query(); die;
    $this->db->select('COUNT(*) AS total_ypv_yogi_trainer');
    $this->db->join('user_owners as uo', 'uo.user_id = up.user_id', 'LEFT');
    $total_ypv_yogi_trainer = $this->Utility->getRowByField('user_profile as up', array('up.user_id'  => $user_id, 
                                                                                        'up.is_spritual_trainer' => 1));
    //echo $this->db->last_query(); die;
    /*$this->db->select('COUNT(*) AS current_month_weekly_feedback_given');
    $current_month_weekly_feedback_given = $this->Utility->getRowByField('user_feedbacks', array('feedback_type' => 'Weekly',
                                                                                    'month(created_at)'  => 'month(curdate())','user_id'=>$user_id));*/
   $current_month_weekly_feedback_given= $this->db->query('SELECT count(*) as current_month_weekly_feedback_given FROM user_feedbacks WHERE feedback_type="Weekly" AND month(created_at) = month(curdate()) AND user_id='.$user_id.'')->result();

     //echo $this->db->last_query(); die;
    /*$this->db->select('COUNT(*) AS total_feedback');
    $total_feedback = $this->Utility->getRowByField('user_owners',array('owner_user_id'  => $user_id, 
                                                                                    'owners_role_id' => 4));*/
    
    if(count($total_arhatic_yogi) > 0) {
      $this->data['total_arhatic_yogi'] = $total_arhatic_yogi->total_arhatic_yogi;
    }    

    if(count($total_arhatic_yogi_trainer) > 0) {
      $this->data['total_arhatic_yogi_trainer'] = $total_arhatic_yogi_trainer->total_arhatic_yogi_trainer;
    }

    if(count($total_ypv_yogi_trainer) > 0) {
      $this->data['total_ypv_yogi_trainer'] = $total_ypv_yogi_trainer->total_ypv_yogi_trainer;
    }

    if(count($current_month_weekly_feedback_given) > 0) {
      $this->data['current_month_weekly_feedback_given'] = $current_month_weekly_feedback_given[0]->current_month_weekly_feedback_given;
    }

    /*if(count($total_feedback) > 0) {
      $this->data['total_feedback'] = $total_feedback->total_feedback;
    }*/

    // echo '<pre>'; print_r($this->data); die;
    $this->load->view($this->layout, $this->data);
  } 

  public function trainerFeedbackSummary(){
    $this->Security->AllowedRoles('admin', ['UserTypes' => ['1','4'], 'Redirect' => true]);
    
    $givenYearMonth  = $this->db->distinct()->select('YEAR(created_at) as year')->get('user_feedbacks')->result_array();
    $given_by_year = array_column($givenYearMonth, 'year');
    $this->data['given_by_year_start'] = !empty($given_by_year) ? min($given_by_year) : date('Y');
    $this->data['given_by_year_end'] = !empty($given_by_year) ? max($given_by_year) : date('Y');
    
    $this->data['selected_year'] = !empty($_POST['year']) ? $_POST['year'] : date('Y');
    $order = !empty($_POST['order']) ? $_POST['order'] : 'ASC';
    
    $this->db->distinct();
    $this->db->select("u.user_id, LOWER(CONCAT(u.first_name, ' ', u.last_name)) as trainer_name,feedback.*");
    $this->db->join('users u','u.user_id = uo.user_id','left');
    $this->db->join('user_roles ur','ur.user_id = uo.user_id','left');
    $this->db->join("(SELECT spiritual_buddie_user_id,group_concat(DISTINCT MONTH(created_at)) feedbackMonth FROM user_feedbacks WHERE feedback_type = 'for trainers' AND YEAR(created_at) = ".$this->data['selected_year']." GROUP BY spiritual_buddie_user_id) as feedback","u.user_id = feedback.spiritual_buddie_user_id","left");
    $this->db->order_by('trainer_name',$order);
    $this->data['feedbackSummaryData'] = $this->db->get_where('user_owners uo',array('ur.role_id'=>'5'))->result();

    if(!empty($_POST)){
      $this->load->view('spritual_trainer_listing',$this->data);
    } else {
      $this->data['page_title'] = 'YPV Trainer Report';
      $this->data['title'] = $this->title;
      $this->data['page'] = 'trainerFeedbackSummary';
      $this->load->add_package_path(ADMIN_PATH);
      $this->load->view($this->layout, $this->data);
    }
    
  }


}
