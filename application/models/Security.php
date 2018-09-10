<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Security extends CI_Model {
	

	/**
	 * Constructor
	 */	
	function __construct()
	{	
		parent::__construct();

	}
	
	
	function authenticate_login($password='',$table='',$where='',$field='')
	{
		
		$this->db->select('*');
		$this->db->from($table);
		$this->db->where($where);
		$this->db->limit(1);
		$query = $this->db->get();
		
		if($query->num_rows() == 1)
		{
			foreach($query->result() as $val)
			{
				$userInfo = array();
				
				if($password)
				{	
					$DbPassword = $this->encrypt->decode($val->$field);
					if($DbPassword!=$password)
					{	
						return false;
					}
				}
				
				$userInfo = $val;
			}

			return $userInfo ? $userInfo : FALSE;
		}
		else
		{ 
			return FALSE;
		}
	}

	
	// To avoid mysql injection
	function avoid_mysql_injection($addslashes=true)
	{
		if(isset($_POST))
		{
			$_POST=$this->sanitize($_POST,$addslashes);
		}
		
		if(isset($_GET))
		{
			$_GET=$this->sanitize($_GET,$addslashes);
		}
		
		if(isset($_COOKIE))
		{
			$_COOKIE=$this->sanitize($_COOKIE,$addslashes);
		}
		
		if(isset($_REQUEST))
		{
			$_REQUEST=$this->sanitize($_REQUEST,$addslashes);
		}
		
	}

      /**
    * Works like PHP function strip_tags, but it only removes selected tags.
    * Example:
    *     strip_selected_tags('<b>Person:</b> <strong>Salavert</strong>', 'strong') => <b>Person:</b> Salavert
    */

      function strip_selected_tags($text, $tags = array())
      {
      	$args = func_get_args();
      	$text = array_shift($args);
      	$tags = func_num_args() > 2 ? array_diff($args,array($text))  : (array)$tags;
      	foreach ($tags as $tag){
      		if(preg_match_all('/<'.$tag.'[^>]*>(.*)<\/'.$tag.'>/iU', $text, $found)){
      			$text = str_replace($found[0],$found[1],$text);
      		}
      	}

      	return $text;
      }
      

      
	// Internal function to use within avoid_mysql_injection
	function sanitize($input,$addslashes=true)  // Internal function to use within avoid_mysql_injection
	{
		$output="";
		if(is_array($input))
		{
			foreach($input as $k=>$i)
			{
				$output[$k]=$this->sanitize($i,$addslashes);
			}
		}
		else
		{
			
			if(get_magic_quotes_gpc())
			{	
				$input=stripslashes($input);
			}       
			//$output=strip_tags($input, '<a><b><br><font><strong><span><i><h1><h2><h3><h4><h5><h6><img><p><u><em><sub><sup><ol><li><ul><hr><big><center><div><label><object><param><embed>');

			$output=$this->strip_selected_tags($input, array('script','iframe'));			

			if ($addslashes==true) 
			{	
				if (function_exists('mysql_real_escape_string')) 
				{	
					$output = mysql_real_escape_string($output);
				}
				else
				{
					$output = addslashes($output);			
				}
			}
			$output = trim($output);
		}
		return $output;
		
	}

	public function doesUserHasCapability($capabilitie='')
	{
		if ($capabilitie=='') return false;
		if (in_array($capabilitie,$this->session->userdata('capabilities'))) 
			return true;
		else 
			return false;
	}
	
	public function AllowedRoles($moduleName='',$options=[])
	{   
		if ($moduleName!='')
		$moduleFolder = $this->config->item('modules_folders')[$moduleName];
		else
		$moduleFolder = '';



		//$this->Security->AllowedRoles('', ['UserTypes' => ['3'], 'Redirect' => true]);
		//$this->Security->AllowedRoles('admin', ['UserTypes' => ['1'], 'Redirect' => true]);
		//$ValidUser = $this->Security->AllowedRoles('frontend', ['UserTypes' => ['3'], 'Redirect' => false]);
        //if (!$ValidUser) { if($this->input->is_ajax_request()){ die('sessionExpire'); }else{ redirect("login"); } }

       // skip the request url session update if this is an AJAX call!
		if ( ! ( isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
			strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'  ) )
		{
			if ( isset($_SERVER['HTTP_ACCEPT']) && stristr($_SERVER['HTTP_ACCEPT'],'application/json') )
			{
				
			}
			else
			{
				(!empty($this->session->userdata('requestedURL'))) ? $this->session->unset_userdata('requestedURL') : $this->session->set_userdata('requestedURL', uri_string());
			}
		}else{
			
		}

		$defaults_options = ['UserTypes'=>['guest','1'],
		'Redirect'=>true,
		'RedirectUrl'=>base_url().$moduleFolder
		];
		$options = array_merge($defaults_options,$options);
		$allowedRoles = array();
		if (is_array($options['UserTypes'])) 
		{
			$allowedRoles = $options['UserTypes'];
		} 
		else 
		{
			$allowedRoles[] = $options['UserTypes'];
			$options['UserTypes'] = $allowedRoles;
		}

		$guest = false;
		$valideRole = false;
		$roles = array();
		$isGuest = true; 
		$user_id = 0;

		if($moduleName == "admin")
		{
			//due to multiple role we are using user_id instead of admin_user_id
			if ($this->session->userdata('user_id') && ($this->doesUserHasCapability('admin') || $this->doesUserHasCapability('examiner')) )   
			{
				$isGuest = false;
				$user_id = $this->session->userdata('user_id');
			}
		}
		else
		{
			if ($this->session->userdata('user_id'))  
			{
				$isGuest = false;
				$user_id = $this->session->userdata('user_id');
			}
		}    
		if(!$isGuest)
		{
			$this->db->where('user_id',$user_id);
			$query=$this->db->get('user_roles');
			foreach ($query->result() as $row)
			{	
				$roles[]=$row;
			}
		}

        //check if correct role is login
		if (is_array($allowedRoles))
		{
			foreach($allowedRoles as $key => $UserType)
			{
				if (strtolower($UserType)=='guest')
				{
					$guest = true;
				} 
				else if (is_numeric($UserType)) 
				{
					if (!$isGuest)
					{	
						foreach($roles as $role) 
						{ 
							if ($role->role_id==$UserType) {$valideRole=true;break;}
						}
					}
				}
			}
		}
		
		if ( (!stristr($options['RedirectUrl'],'http')) && (!stristr($options['RedirectUrl'],'https')) )
		{
			$RedirectUrl = base_url().$options['RedirectUrl'].$moduleFolder.'/';

			if ( $isGuest )
				$RedirectUrl = $RedirectUrl = base_url().$$moduleFolder.'/home/login';
		}
		else
		{ 
			$RedirectUrl = $options['RedirectUrl']; 
		}
		
		if ($isGuest && $guest==false)
		{ 
			if ($options['Redirect'])
			{ 
				redirect($RedirectUrl);
			} 
			else 
			{
				return false;
			}
		}

		if ($isGuest && $guest==true)
		{ 
			return true;
		}

		if ($valideRole)
		{
            //find role status for allowed roles of current login user
			$status = 0;
			if (is_array($allowedRoles))
			{
				foreach($roles as $role) 
				{	
					if (in_array($role->role_id, $options['UserTypes']))
					{ 
						if ($role->status==1)
							$status = 1;
					}
				}
			}

			if($status)
			{	
				return true;
			}
			else
			{ 
				if ($options['Redirect'])
				{  
					//redirect('logout');
					redirect($RedirectUrl);
				} 
				else 
				{
					return false;
				}
			}
		} 
		else 
		{  
			$RoleFoundInDB=false;

			if (is_array($allowedRoles))
			{
				foreach($roles as $role) 
				{
					if ( in_array($role->role_id, $options['UserTypes']))
					{
						$RoleFoundInDB=true;
					}
				}
			}
			
			if (!$RoleFoundInDB)
			{    
            	//logout user if role is deleted of current login user
				$this->logoutExcept($moduleName);
                //$RedirectUrl = base_url().$moduleFolder.'/home/login';
				$RedirectUrl = base_url().$moduleFolder;
				if ($options['Redirect'])
				{  
					redirect($RedirectUrl);
					return false;
				} 
				else 
				{
					return false;
				}
			}
		}
	}


	function logoutExcept($moduleName)
	{
		if ($moduleName=='admin')
		{
			$this->admin_logout();
		}
		else
		{
			$this->user_logout();
		}
	}

	function user_logout()
	{
		$this->session->unset_userdata('user_id');	
		$this->session->unset_userdata('capabilities');
		$this->session->unset_userdata('action_of');
	}

	function examiner_logout()
	{

	}
	
	function admin_logout()
	{
		$this->user_logout();
	}
	
	function student_logout()
	{
		
	}
	
	// ================== Student login checks

	
	
	
	function date_formate( $mysql_date,$formate='' )
	{
		if ($formate=='')
		{                
			return date($this->config->item('date_formate_1')." ".$this->config->item('time_formate_1'),strtotime($mysql_date));
		}
		else
		{
			return date($formate,strtotime($mysql_date));
		}
	}

}
?>