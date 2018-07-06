<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * MY_Form_validation Class
 *
 * Extends Form_Validation library
 *
 * Adds one validation rule, "unique" and accepts a
 * parameter, the name of the table and column that
 * you are checking, specified in the forum table.column
 */
class MY_Form_validation  extends CI_Form_validation {

	function MY_Form_validation()
	{ 
	    parent::__construct();
		$this->set_error_delimiters('<div class="error-msg">','</div>');
	}

    public function error_array() {
        return $this->_error_array;
    }
		
	/**
	 * Unique
	 *
	 * @access    public
	 * @param    string
	 * @param    field
	 * @return    bool
	 */
	function duplicate_check_with_condition($str, $field)
	{
		$CI =& get_instance();
		list($table, $column, $key, $value, $fieldName,$field_id) = explode(".", $field, 6);

		//$CI->form_validation->set_message('duplicate_check_with_condition', 'The %s specified is unavailable. Please choose another one.');

		$CI->db->select("*");
		
		$CI->db->where($column,$str);
		$CI->db->where($fieldName,$field_id);
		if ($value!='')
		{
			$CI->db->where($key.' !=', $value);
		}
		$query = $CI->db->get($table);
		return ( $query->num_rows() > 0 ) ? FALSE : TRUE;
	}
	
	
	/**
	 * Unique
	 *
	 * @access    public
	 * @param    string
	 * @param    field
	 * @return    bool
	 */
	function duplicate_check_with_condition_on_language($str, $field)
	{
		$CI =& get_instance();
		list($table1,$table2, $column, $key, $value, $fieldName,$field_id,$langField,$language_id) = explode(".", $field, 9);

		//$CI->form_validation->set_message('duplicate_check_with_condition', 'The %s specified is unavailable. Please choose another one.');

		$CI->db->select("*");
		$CI->db->join($table2,"$table1.$key = $table2.$key");
		$CI->db->where($column,$str);
		$CI->db->where($fieldName,$field_id);
		$CI->db->where($langField,$language_id);
		if ($value!='')
		{
			$CI->db->where("$table1.$key".' !=', $value);
		}
		$query = $CI->db->get($table1);
		//echo $CI->db->last_query();die();
		return ( $query->num_rows() > 0 ) ? FALSE : TRUE;
	}

	/**
	 * Unique
	 *
	 * @access    public
	 * @param    string
	 * @param    field
	 * @return    bool
	 */
	function duplicate_check($str, $field)
	{
		$CI =& get_instance();
		list($table, $column, $key, $value) = explode(".", $field, 4);

		$CI->form_validation->set_message('duplicate_check', 'The %s specified is unavailable. <br/> Please choose another one.');

		$CI->db->select("*");
		
		$CI->db->where($column,$str);
		if ($value!='')
		{
			$CI->db->where($key.' !=', $value);
		}
		$query = $CI->db->get($table);

		return ( $query->num_rows() > 0 ) ? FALSE : TRUE;
	}
	// --------------------------------------------------------------------
	
	
	//----------Function to Check conditional Required when default value is set   ---------
	function conditional_required($str, $field)
	{
		list($field_name, $default_value) = explode(".", $field, 2);
		
		if ( ! is_array($field))
		{
			return (trim($_POST[$field_name]) == $default_value) ? FALSE : TRUE;
		}
		else
		{
			return ( ! empty($field));
		}
	}
	//----------Function to Check conditional Required when default value is set ---------
	
	
	/**
	 * Valid Time with 01.00 or 01:00
	 *
	 * @access	public
	 * @param	string
	 * @return	bool
	 */	
	function valid_time($str)
	{
		$CI =& get_instance();
		
		//$CI->form_validation->set_message('valid_time', 'The %s should have only valid time.');
		
		return ( ! preg_match("/^([0-9.:])+$/i", $str)) ? FALSE : TRUE;
	}

	
	/**
	 * Alpha-numeric with underscores, dot and dashes
	 *
	 * @access	public
	 * @param	string
	 * @return	bool
	 */	
	function alpha_dot_dash($str)
	{
		
		return ( ! preg_match("/^([+()-.a-z0-9_-])+$/i", $str)) ? FALSE : TRUE;
	}
	// --------------------------------------------------------------------
	
	/**
	 * Alpha-numeric with underscores, dot and dashes
	 *
	 * @access	public
	 * @param	string
	 * @return	bool
	 */	
	function alpha_numeric_space($str)
	{
		
		return ( ! preg_match("/^([a-zA-Z 0-9])+$/i", $str)) ? FALSE : TRUE;
	}
	// --------------------------------------------------------------------
	
	/**
	 * Check for valid image capture session
	 *
	 * @access	public
	 * @param	string
	 * @return	bool
	 */	
	function valid_txtCode($str)
	{
			@session_start();
			if ($_SESSION['txtCode']==$str)
			return true;
			else
			return false;
	}

/**
	 * Alpha-numeric with underscores, dot and dashes
	 *
	 * @access	public
	 * @param	string
	 * @return	bool
	 */	
	function alpha_numeric_dot_dash_underscore($str)
	{
		$CI =& get_instance();
	    $CI->form_validation->set_message('alpha_numeric_dot_dash_underscore', 'For %s Special Characters and space are not allowed except . dash, underscore.');
		return ( ! preg_match("/^[a-zA-Z0-9_.-]+$/", $str)) ? FALSE : TRUE;
	}
	
	/**
	 * Alpha-numeric with underscores, dot and dashes
	 *
	 * @access	public
	 * @param	string
	 * @return	bool
	 */	
	function alpha_numeric_space_dot_round_dash_underscore($str)
	{
		$CI =& get_instance();
	    $CI->form_validation->set_message('alpha_numeric_space_dot_round_dash_underscore', 'For %s Special Characters are not allowed except . dash, underscore, bracket.');
		return ( ! preg_match("/^[a-zA-Z 0-9)('_.-]+$/", $str)) ? FALSE : TRUE;
	}
	

	/**
	 * Alpha-numeric with underscores, dot and dashes
	 *
	 * @access	public
	 * @param	string
	 * @return	bool
	 */	
	function ascii_only($str)
	{ 
		$CI =& get_instance();
	    $CI->form_validation->set_message('ascii_only', 'For %s only ascii characters are allowed');
		return ( ! mb_detect_encoding($str, 'ASCII', true) ) ? FALSE : TRUE;
	}


	function checkDateFormat($date,$params) {
		$CI =& get_instance();
		$CI->form_validation->set_message('checkDateFormat', 'The %s has wrong date formate or string.');

		list($formate, $formate_value, $strict, $strict_value) = explode("=", $params, 4);
		if ($strict_value=='true') {
			//strictly check formate;
			/*
			if (preg_match("/[0-31]{2}\/[0-12]{2}\/[0-9]{4}/", $date)) {
			if(checkdate(substr($date, 3, 2), substr($date, 0, 2), substr($date, 6, 4)))
			return true;
			else
			return false;
			} else {
			return false;
			}
			*/
			die('need to implement this block');
		} else {
			if (strtotime($date)) {return true;} else {return false;}
		}
	} 
	// --------------------------------------------------------------------
}
?>
