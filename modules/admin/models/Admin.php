<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Admin extends User {

    /**
     * Constructor
     */
    function __construct() {
        parent::__construct();
    }

    function admin_login_rules() {
        return array(
            array(
                'field' => 'username',
                'label' => 'login',
                'rules' => 'trim|required|min_length[1]|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'password',
                'label' => 'password',
                'rules' => 'trim|required|min_length[5]|max_length[11]|ascii_only'
            )
        );
    }

    function admin_change_user_password_rules() {
        return array(
            array(
                'field' => 'email',
                'label' => 'User Email',
                'rules' => 'trim|required|valid_email|callback_check_user_email'
            ),
            array(
                'field' => 'new_password',
                'label' => 'New Password',
                'rules' => 'trim|required|min_length[5]|max_length[11]|ascii_only'
            ),
            array(
                'field' => 'confirm_new_password',
                'label' => 'Confirm password',
                'rules' => 'trim|required|min_length[5]|max_length[11]|ascii_only|matches[new_password]'
            )
        );
    }

    function admin_change_password_rules() {
        $current_password_rule = '';
        if($this->input->post('current_password') && $this->input->post('current_password')!='IGNORE'){
            $current_password_rule = '|min_length[5]|max_length[11]|ascii_only|callback_check_current_password';
        }
        $rules = array(
                    array(
                        'field' => 'current_password',
                        'label' => 'Current Password',
                        'rules' => 'trim|required'.$current_password_rule
                    ),
                    array(
                        'field' => 'new_password',
                        'label' => 'New Password',
                        'rules' => 'trim|required|min_length[5]|max_length[11]|ascii_only'
                    ),
                    array(
                        'field' => 'confirm_new_password',
                        'label' => 'Confirm password',
                        'rules' => 'trim|required|min_length[5]|max_length[11]|ascii_only|matches[new_password]'
                    )
                );
        return $rules;
    }

    function admin_user_add_edit_rules($id = '') { 
        if ($id <= 0) {
            /*
              $add = array(
              array(
              'field'   => 'password',
              'label'   => 'password',
              'rules'   => 'trim|required|min_length[5]|max_length[11]|ascii_only'
              ),
              array(
              'field'   => 'confirm_password',
              'label'   => 'confirm password',
              'rules'   => 'trim|required|min_length[5]|max_length[11]|ascii_only|matches[password]'
              )
              );
             */
            $add = array();
        } else {
            $add = array();
        }

        $edit = array(
            array(
                'field' => 'first_name',
                'label' => 'First Name',
                'rules' => 'trim|required|min_length[1]|max_length[255]|ascii_only'
            ),
            array( //required|min_length[1]
                'field' => 'last_name',
                'label' => 'Last Name',
                'rules' => 'trim|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'email',
                'label' => 'email',
                'rules' => "trim|required|min_length[1]|max_length[255]|ascii_only|valid_email|duplicate_check[users.email.user_id." . $id . "]"
            ),
            array(
                'field' => 'dob',
                'label' => 'Date of birth',
                'rules' => 'trim|max_length[255]|ascii_only|checkDateFormat[formate=M d, Y h:i:s A=strict=false]'
            ),
            array(
                'field' => 'married',
                'label' => 'Marital status',
                'rules' => 'trim|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'gender',
                'label' => 'Gender',
                'rules' => 'trim|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'address',
                'label' => 'Address',
                'rules' => 'trim|ascii_only'
            ),
            array(
                'field' => 'city',
                'label' => 'City',
                'rules' => 'trim|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'state',
                'label' => 'State',
                'rules' => 'trim|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'country_id',
                'label' => 'Country',
                'rules' => 'trim|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'pin_code',
                'label' => 'Pin Code',
                'rules' => 'trim|min_length[6]|max_length[9]|ascii_only'
            ),
            array(
                'field' => 'phone1_1',
                'label' => 'Phone No.',
                'rules' => 'trim|min_length[3]|max_length[3]|ascii_only|integer'
            ),
            array(
                'field' => 'phone1_2',
                'label' => 'Phone No.',
                'rules' => 'trim|min_length[3]|max_length[3]|ascii_only|integer'
            ),
            array(
                'field' => 'phone1_3',
                'label' => 'Phone No.',
                'rules' => 'trim|min_length[4]|max_length[4]|ascii_only|integer'
            ),
            array(
                'field' => 'mobile_1',
                'label' => 'Mobile-1',
                'rules' => 'trim|min_length[10]|max_length[10]|ascii_only'
            ),
            array(
                'field' => 'mobile_2',
                'label' => 'Mobile-2',
                'rules' => 'trim|min_length[10]|max_length[10]|ascii_only'
            ),
            array(
                'field' => 'level_id',
                'label' => 'Level',
                'rules' => 'trim|required|min_length[1]|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'teacher',
                'label' => EXAMINER,
                'rules' => 'trim|min_length[1]|max_length[1]|ascii_only'
            ),
        );

        if ($this->session->userdata('action_of') == 'examiner' && $id <= 0) {
            $edit[] = array(
                'field' => 'examiner_id',
                'label' => EXAMINER,
                'rules' => 'trim|required|min_length[1]|max_length[255]|ascii_only'
            );
        }

        return array_merge($add, $edit);
    }

    function user_sign_up_rules($id = '') {
        $signUp = array(
            array(
                'field' => 'first_name',
                'label' => 'First name',
                'rules' => 'trim|required|min_length[1]|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'last_name',
                'label' => 'Last name',
                'rules' => 'trim|required|min_length[1]|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'email',
                'label' => 'email',
                'rules' => "trim|required|min_length[1]|max_length[255]|ascii_only|valid_email|is_unique[users.email]"
            ),
            array(
                'field' => 'password',
                'label' => 'password',
                'rules' => 'trim|required|min_length[5]|max_length[11]|ascii_only'
            ),
            array(
                'field' => 'level_id',
                'label' => 'Level',
                'rules' => 'trim|required|min_length[1]|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'examiner_id',
                'label' => 'Trainer Name',
                'rules' => 'trim|required|min_length[1]|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'gender',
                'label' => 'Gender',
                'rules' => 'trim|required|min_length[1]|max_length[255]|ascii_only'
            ),
            array(
                'field' => 'mobile_1',
                'label' => 'Contact number',
                'rules' => 'trim|required'
            )
        );

        return $signUp;
    }

    protected function admin_user_update($user_id, $user = array(), $user_profile = array(), $owner_id = array()) {
        if (!empty($user_id) && !empty($user)) {
            $this->db->where('user_id', $user_id);
            $this->db->update('users', $user);
        }

        if (!empty($user_id) && !empty($user_profile)) {
            $this->db->where('user_id', $user_id);
            $this->db->update('user_profile', $user_profile);
        }

        if(!empty($owner_id) && $this->Security->doesUserHasCapability('super_admin')){
          $oldOwner   = array();
          $insertOwner = array();
          $deleteOwner = array();
          if(!is_array($owner_id)){
              $owner_id = array($owner_id);
          }

          $oldOwnersList = $this->db->get_where('user_owners',array('user_id'=>$user_id, 'owners_role_id'=>'4'))->result_array();             
          if($oldOwnersList){
            $oldOwner = array_column($oldOwnersList, 'owner_user_id');
          }
          $deleteOwner = array_diff($oldOwner, $owner_id);
          $insertOwner = array_diff($owner_id, $oldOwner);
          if (!empty($deleteOwner)){
              $this->db->where('user_id', $user_id);
              $this->db->where('owners_role_id', '4');
              $this->db->where_in('owner_user_id', $deleteOwner);
              $this->db->delete('user_owners');
          }

          if (!empty($insertOwner)){

            $insert = array();
            foreach($insertOwner as $owner){
                $insert[] = array(
                        'user_id'        => $user_id, 
                        'owner_user_id'  => $owner, 
                        'owners_role_id' => 4,
                        'start_date'     => date('Y-m-d H:i:s'), 
                        'end_date'       => date('Y-m-d H:i:s', strtotime('+1 year')), 
                        'status'         => 1
                    );
            }

            if(!empty($insert)){
              $this->db->insert_batch('user_owners', $insert);
            }
          } 
        }


    }

    protected function admin_user_insert($user = array(), $user_profile = array(), $apply_extra_roles, $owner_id = array()) {

        if (!empty($user) && !empty($user_profile)) {
            $userInsertTimeOnly = array(
                'created_at' => date("Y-m-d G:i:s"),
                'verified' => 'Yes',
                'verified_at' => date("Y-m-d G:i:s")
            );

            $user['password'] = $this->encrypt->encode($user['password']);

            $user = array_merge($user, $userInsertTimeOnly);
            $this->db->insert('users', $user);
            $insert_id = $this->db->insert_id();

            $userProfileInsertTimeOnly = array(
                'user_id' => $insert_id
            );

            $user_profile = array_merge($user_profile, $userProfileInsertTimeOnly);
            $this->db->insert('user_profile', $user_profile);


            if (is_array($owner_id)) {
                foreach ($owner_id as $key => $owner) {
                    if ($owner > 0) {
                        $this->db->insert('user_owners', array(
                            'user_id' => $insert_id, 'owner_user_id' => $owner, 'owners_role_id' => 4,
                            'start_date' => date('Y-m-d H:i:s'), 'end_date' => date('Y-m-d H:i:s', strtotime('+1 year')), 'status' => 1
                        ));
                    }
                }
            } else {
                if ($owner_id > 0) {
                    $this->db->insert('user_owners', array(
                        'user_id' => $insert_id, 'owner_user_id' => $owner_id, 'owners_role_id' => 4,
                        'start_date' => date('Y-m-d H:i:s'), 'end_date' => date('Y-m-d H:i:s', strtotime('+1 year')), 'status' => 1
                    ));
                }
            }


            $role_info = array();
            $role_info[] = array(
                'user_id' => $insert_id,
                'role_id' => 3,
                'status' => 1
            );
            foreach ($apply_extra_roles as $role_id) {
                $role_info[] = array(
                    'user_id' => $insert_id,
                    'role_id' => $role_id,
                    'status' => 1
                );
            }

            $this->db->insert_batch('user_roles', $role_info);
            return $insert_id;
        }
    }

    public function admin_user_add_edit_post_for_web($primary_key, $signup = false) {
        // To avoid mysql injection
        $this->Security->avoid_mysql_injection(false);
        if (!empty($_POST)) {

            if ($signup) {
                $this->form_validation->set_rules($this->Admin->user_sign_up_rules($this->input->post($primary_key)));
                //$this->form_validation->set_message('duplicate_check', '%s already exist. Please change it.');
            }
            else
                $this->form_validation->set_rules($this->Admin->admin_user_add_edit_rules($this->input->post($primary_key)));

            if (isset($_POST['examiner_id']) && count($_POST['examiner_id']) >= 1 ) {
                $_POST['post_examiner_id'] = $_POST['examiner_id']; //it is required because CI run() fun. is removing array
                $_POST['examiner_id'] = '9999999999';
            }

            //$this->user_file_upload();
            if ($this->form_validation->run()) {
                $user = array(
                    'username' => $this->input->post('email'),
                    'email' => $this->input->post('email'),
                    'first_name' => $this->input->post('first_name'),
                    'last_name' => $this->input->post('last_name'),
                    'updated_at' => date("Y-m-d G:i:s"),
                    'status' => $this->input->post('status') ? $this->input->post('status') : 1
                );


                $user_profile = array(
                    'married' => $this->input->post('married') ? $this->input->post('married') : 0,
                    'gender' => $this->input->post('gender'),
                    'hobbies' => '',
                    'address' => $this->input->post('address'),
                    'city' => $this->input->post('city'),
                    'state' => $this->input->post('state'),
                    'country_id' => $this->input->post('country_id'),
                    'pin_code' => $this->input->post('pin_code'),
                    'phone' => $this->input->post('phone1_1') . $this->input->post('phone1_2') . $this->input->post('phone1_3'),
                    'mobile_1' => $this->input->post('mobile_1'),
                    'mobile_2' => $this->input->post('mobile_2'),
                    'level_id' => $this->input->post('level_id'),
                    'batch_year'=> $this->input->post('batchYear'),
                    'is_spritual_trainer'=>$this->input->post('spritual_trainer')
                );
                if(!empty($this->input->post('dob'))){
                    $user_profile['dob']=date('Y-m-d H:i:s', strtotime($this->input->post('dob')));
                }
                //echo "<pre>";print_r($user_profile);die;
                //$this->user_file_upload(); for make thumb
                if ($this->input->post('examiner_id') > 0) {
                    //$owner_id = $this->input->post('examiner_id');
                    $owner_id = $this->input->post('post_examiner_id');
                } else {
                    $owner_id = '1'; //if Examiner is added than Examiner's, Examiner will be super admin
                }
                if ($this->input->post($primary_key) > 0) {
                    $this->admin_user_update($this->input->post($primary_key), $user, $user_profile,$owner_id);
                    $insert_id = $this->input->post($primary_key);
                    $this->session->set_flashdata('flash_success', 'User has been updated successfully.');
                } else {
                    if ($signup) {
                        $user = array_merge($user, array('password' => $this->input->post('password')));
                    } else {
                        $user = array_merge($user, array('password' => $this->Utility->random_str(6)));
                    }
                    
                    $apply_extra_roles = array();
                    if(!empty($this->input->post('spritual_trainer'))){
                        $apply_extra_roles[] = '5';
                    }

                    if (!empty($this->input->post('teacher'))) {
                        $apply_extra_roles[] = '4';
                    }


                    /*if ($this->input->post('examiner_id') > 0) {
                        //$owner_id = $this->input->post('examiner_id');
                        $owner_id = $this->input->post('post_examiner_id');
                    } else {
                        $owner_id = '1'; //if Examiner is added than Examiner's, Examiner will be super admin
                    }*/

                    $insert_id = $this->admin_user_insert($user, $user_profile, $apply_extra_roles, $owner_id);

                    if ($signup) {
                        //$this->send_confirmation_mail($insert_id, $user);
                    } else {
                        $this->send_user_add_email($insert_id, $user); 
                    }

                    $this->session->set_flashdata('flash_success', 'User has been added successfully.');
                }

                return $insert_id;
            } //end if( $this->form_validation->run() )
            else {
                //print_r(validation_errors());
                //----------------- Start unlink file upload code if error in form validation Step - 4
                if (!empty($uploaded_file_info)) {
                    $field = 'profile_image';
                    $this->Utility->remove_files($field, $temp_uploaded_file = $uploaded_file_info[$field]['uploaded_file_info']['file_name'], $images_dir = ${$field . '_upload_dir'}
                            //Note here thumb images will not make becuase make thumb images  code are in form_valudation->run() and it is not running at error 
                    );
                }
                //----------------- End unlink file upload code if error in form validation Step - 4
            }
        }
    }

    private function send_user_add_email($insert_id, $user_array) {
        $user_array['user_id'] = $insert_id;
        $user = (object) $user_array;

        if ( $this->input->post('teacher') ){
            /*$trainer_login = '&nbsp;' . base_url() . 'trainer';*/
            $trainer_login = '';
            $click_here = 'Please '.'<a href="'.base_url().'trainer">click here</a>'.' to access portal.';
            $instruction_message = 'Please use following email and password to access portal as well “Spiritual buddy” App :';
        } else {
            $trainer_login = '&nbsp;';
            $click_here = '';
            $instruction_message = 'Please download and install “Spiritual Buddy” app from Play/App store, and use following email & password to login :';
        }

        $this->load->library('email');
        $filename = "modules/" . $this->config->item('modules_folders')['admin'] . "/email_template/admin_user_add.html";
        $message = file_get_contents($filename);
        $subject = 'Welcome to YPV Spiritual Buddy system';
        $message = str_replace("[__PROJECT_TITLE__]", $this->config->item('site_name'), $message);
        $message = str_replace("[__CLICK_HERE__]", $click_here, $message);
        $message = str_replace("[__INSTRUCTION_MESSAGE__]", $instruction_message, $message);
        //$message = str_replace("[__DOMAIN__]", '&nbsp;' . $this->config->item('domain_name'), $message);
        $message = str_replace("[__TRAINER_LOGIN__]", $trainer_login , $message);
        $message = str_replace("[__ROOT__IMAGE_URL__]", base_url() . 'assets/common/custom/images/', $message);
        $message = str_replace("[__FNAME__]", ucfirst($user->first_name), $message);
        $message = str_replace("[__EMAIL__]", $user->email, $message);
        $message = str_replace("[__PASSWORD__]", '&nbsp;' . $user->password, $message);
        $message = str_replace("[__URL__]", base_url(), $message);
        $this->email->from($this->config->item('from_email'), $this->config->item('from_name'));
        $this->email->to($user->email);
        $this->email->subject($subject);
        $this->email->message($message);
        $this->email->send();
    }

    private function send_confirmation_mail($insert_id, $user_array) {
        $email = "gagankumar.pandya@galaxyweblinks.in";
        $verification_code = $this->Utility->generate_md5_token();

        $this->load->library('email');
        $filename = "email_template/verify_account.html";
        $message = file_get_contents($filename);
        $subject = $this->config->item('site_name') . ' registration information';
        $c_url = base_url() . "users/verification/" . $verification_code . '/' . $insert_id;
        $first_name = "gagan";
        $message = str_replace("[__PROJECT_TITLE__]", $this->config->item('site_name'), $message);
        $message = str_replace("[__DOMAIN__]", '&nbsp;' . $this->config->item('domain_name'), $message);
        $message = str_replace("[__ROOT__IMAGE_URL__]", base_url() . 'assets/common/custom/images/', $message);
        $message = str_replace("[__FNAME__]", ucfirst($first_name), $message);
        $message = str_replace("[__URL__]", $c_url, $message);
        $this->email->from($this->config->item('from_email'), $this->config->item('from_name'));
        $this->email->to($email);
        $this->email->subject($subject);
        $this->email->message($message);
        $this->email->send();


        /*if ( $token!='' && is_object($user) ) {
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
        }*/
    }

    private function user_file_upload() {

        //----------------- Start File Upload  Step - 1
        $uploaded_file_info = '';
        if ($_FILES) {
            //this if for each file files if more than 1 file than this should be more than 1
            if (!empty($_FILES['profile_image']['name'])) {
                //-------file_field_configuration
                $field = 'profile_image';
                if ($this->input->post($primary_key) > 0) { //for edit
                    $file_rquired = false;
                } else {
                    $file_rquired = true;
                }
                $max_size = 2; //in MB
                //
					$dir_1 = 'uploads';
                if (!file_exists($dir_1)) {
                    mkdir($dir_1, 0777);
                }
                $dir_2 = 'profile_image';
                if (!file_exists($dir_1 . '/' . $dir_2)) {
                    mkdir($dir_1 . '/' . $dir_2, 0777);
                }
                ${$field . '_upload_dir'} = $dir_1 . '/' . $dir_2 . '/';
                $file_config['upload_path'] = ${$field . '_upload_dir'};
                $dir_thumb = 'thumbs';
                if (!file_exists($file_config['upload_path'] . $dir_thumb)) {
                    mkdir($file_config['upload_path'] . $dir_thumb, 0777);
                }
                $file_config['allowed_types'] = 'jpeg|jpg|png|gif';
                //-------file_field_configuration 

                $uploaded_file_info[$field] = $this->Utility->do_upload($field, $max_size, $file_config);
                if (is_array($uploaded_file_info[$field]) && array_key_exists('error', $uploaded_file_info[$field])) {
                    $skip = false;
                    if (stristr($uploaded_file_info[$field]['error'], 'did not select a file')) {
                        if ($this->input->post($primary_key) > 0) {
                            $skip = true;
                        }
                    }
                    if ($skip == false) {
                        $this->form_validation->set_rules($field, $field, 'callback_upload_set_message_image');
                        //$this->form_validation->set_message('upload_set_message_image', $uploaded_file_info[$field]['error']);
                        $this->form_validation->set_message('upload_set_message_image', 'Please upload image with the extensions .jpg, .png, .gif.');
                    }
                }
            }
        } //end if($_FILES)
        //----------------- END File Upload Step - 1
        //----------------- Start Make Thumb File upload Step - 2
        if (is_array($uploaded_file_info)) {
            //this if for each file files if more than 1 file than this should be more than 1
            $file_field = 'profile_image';
            if (!array_key_exists('error', $uploaded_file_info[$file_field])) {
                foreach ($this->user->get_thumbs() as $key => $thumb) {

                    $this->Utility->make_thumb_image(
                            $uploaded_file_info[$file_field]['uploaded_file_info']['orig_name'], $uploaded_file_info[$file_field]['uploaded_file_info']['file_name'], $uploaded_file_info[$file_field]['uploaded_file_info']['file_path'], $thumb[0], $thumb[1]
                    );
                }
                if (isset($uploaded_file_info[$file_field]['uploaded_file_info']['file_name'])) {
                    //new uploaded file
                    $info[$file_field] = $uploaded_file_info[$file_field]['uploaded_file_info']['file_name'];
                }

                //remove old file
                if ($this->input->post($primary_key) > 0) {
                    $row = $this->Utility->getRowByField('users', 'idUser', $this->input->post($primary_key));
                    $this->Utility->remove_files($file_field, $temp_uploaded_file = $row->{$file_field}, $images_dir = ${$file_field . '_upload_dir'}, $thumbs = $this->user->get_thumbs()
                    );
                }
            }
        }
        //----------------- END Make Thumb File upload Step - 2
    }

}

?>