<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class User extends  CI_Model {
	
	/**
	 * Constructor
	 */	
	function __construct()
	{
		parent::__construct();
	}

	function user_login_rules()
	{
		return array(
					array(
						 'field'   => 'username',
						 'label'   => 'login',
						 'rules'   => 'trim|required|min_length[1]|max_length[255]|ascii_only'
					  ),
					array(
						 'field'   => 'password',
						 'label'   => 'password',
						 'rules'   => 'trim|required|min_length[5]|max_length[11]|ascii_only'
					  )
               );
	}
	
	function user_forgot_password_rules()
	{
		return array(
					array(
						 'field'   => 'email',
						 'label'   => 'Email',
						 'rules'   => 'trim|required|valid_email|min_length[1]|max_length[255]|ascii_only'
					  )
               );
	}
	public function send_forgot_password_email($token,$user)
	{
		if ( $token!='' && is_object($user) ) {
			$this->load->library('email');				
			$filename="email_template/user_forgot_password.html";
			$message = file_get_contents($filename); 	
			$subject='Forgot password request by someone on '.$this->config->item('site_name') ;
			$message = str_replace("[__PROJECT_TITLE__]",$this->config->item('site_name'),$message );
			$message = str_replace("[__DOMAIN__]",'&nbsp;'.$this->config->item('domain_name'),$message );
			$message = str_replace("[__ROOT__IMAGE_URL__]",base_url().'assets/common/custom/images/',$message );
			$message = str_replace("[__FNAME__]", ucfirst($user->first_name),$message );
			$message = str_replace("[__URL__]", base_url().'users/ucpffp/'.$token.'/'.$user->user_id ,$message );
			$this->email->from($this->config->item('from_email'),$this->config->item('from_name'));
			$this->email->to($user->email);
			$this->email->subject($subject);
			$this->email->message($message);
			$this->email->send();
		}
	}
	function user_change_password_for_forgot_password_rules()
	{  
		return array(
					array(
						 'field'   => 'user_id',
						 'label'   => 'user_id',
						 'rules'   => 'trim|required'
					  ),
					array(
						 'field'   => 'token',
						 'label'   => 'token',
						 'rules'   => 'trim|required'
					  ),
					array(
						 'field'   => 'new_password',
						 'label'   => 'New Password',
						 'rules'   => 'trim|required|min_length[5]|max_length[11]|ascii_only'
					  ),
					array(
						 'field'   => 'confirm_new_password',
						 'label'   => 'Confirm password',
						 'rules'   => 'trim|required|min_length[5]|max_length[11]|ascii_only|matches[new_password]'
					  )
               );
	}


	function getUser($user_id='',$role_id=3)
	{
		if ($user_id>0) {
			//For getting information of login user.
			if ( $user_id ) {
				$this->db->join('`timezones` as tz ',' tz.timezone_id = u.timezone_id  ','left');
				$this->db->join('`user_profile` as up ',' up.user_id = u.user_id  ','left');
			 	return $loginUserFullDetail = $this->db->get_where('users as u', array('u.user_id'=>$user_id))->row();
			} else {
				return null;
			}
		}
	}	

	function user_feedback_weekly_rules()
	{  				/*
					array(
                		'field' => 'feedback_field_1',
                		'label' => 'feedback field',
                		'rules' => 'trim|required|min_length[1]|max_length[255]|ascii_only'
            		),
            		*/
		return array(
					array(
                		'field' => 'feedback_field_1',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_2',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_3',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_4',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_5',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_6',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_7',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_8',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_9',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_10',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_11',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_12',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_13',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_14',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_15',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_16',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_17',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_18',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_19',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_20',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_21',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_22',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_23',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_24',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_25',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_26',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_27',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_28',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_29',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_30',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_31',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_32',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
            		array(
                		'field' => 'feedback_field_33',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
                    array(
                        'field' => 'feedback_field_34',
                        'label' => 'feedback field',
                        'rules' => 'trim|max_length[255]|ascii_only'
                    ),
                    array(
                        'field' => 'feedback_field_35',
                        'label' => 'feedback field',
                        'rules' => 'trim|ascii_only'
                    ),
       		);
	}

	function user_feedback_monthly_rules()
	{
		return array(
					array(
                		'field' => 'feedback_field_51',
                		'label' => 'feedback field',
                		'rules' => 'trim|max_length[255]|ascii_only'
            		),
                    array(
                        'field' => 'feedback_field_52',
                        'label' => 'feedback field',
                        'rules' => 'trim|max_length[255]|ascii_only'
                    ),
                    array(
                        'field' => 'feedback_field_53',
                        'label' => 'feedback field',
                        'rules' => 'trim|ascii_only'
                    ),
                    array(
                        'field' => 'feedback_field_54',
                        'label' => 'feedback field',
                        'rules' => 'trim|max_length[255]|ascii_only'
                    ),
                    array(
                        'field' => 'feedback_field_55',
                        'label' => 'feedback field',
                        'rules' => 'trim|max_length[255]|ascii_only'
                    ),
                    array(
                        'field' => 'feedback_field_56',
                        'label' => 'feedback field',
                        'rules' => 'trim|ascii_only'
                    ),
                    array(
                        'field' => 'feedback_field_57',
                        'label' => 'feedback field',
                        'rules' => 'trim|max_length[255]|ascii_only'
                    ),
                    array(
                        'field' => 'feedback_field_58',
                        'label' => 'feedback field',
                        'rules' => 'trim|max_length[255]|ascii_only'
                    ),
                    array(
                        'field' => 'feedback_field_59',
                        'label' => 'feedback field',
                        'rules' => 'trim|max_length[255]|ascii_only'
                    ),
                    array(
                        'field' => 'feedback_field_60',
                        'label' => 'feedback field',
                        'rules' => 'trim|max_length[255]|ascii_only'
                    ),
                    array(
                        'field' => 'feedback_field_61',
                        'label' => 'feedback field',
                        'rules' => 'trim|max_length[255]|ascii_only'
                    ),
       		);	
	}

	function getUserId($token = '') 
	{
        $this->db->select('user_id');
        $row = $this->db->get_where('user_access_tokens',array('access_token' => $token))->row();
        if( isset($row) && !empty($row) ) {
            return $row->user_id;
        } else {
            return false;
        }
    }
}
?>