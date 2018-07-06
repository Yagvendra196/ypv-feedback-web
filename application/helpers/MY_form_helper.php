<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/* made by Ayaz */
if ( ! function_exists('set_input'))
{
	function set_input($_field,$default_value,$data_object='',$user_htmlspecialchars=true)
	{
		if (isset($_POST['post_'.$_field]) && is_array($_POST['post_'.$_field]) ) {
			return $_POST['post_'.$_field];
		} else if (!empty($data_object) && isset($data_object->{$_field}) && is_array($data_object->{$_field})) {
			return $data_object->{$_field};
		} else if (isset($$_field) && is_array($$_field) ) {
			return $$_field;
		} else if (is_array($default_value) ) {
			return $default_value;
		} 

		if (isset($_POST[$_field])) return $_POST[$_field];

		if (!empty($data_object))
		{
			$value=(isset($data_object->{$_field}))?$data_object->{$_field}:(isset($_POST[$_field])?$_POST[$_field]:$default_value);
		}
		else
		{
			$value=(isset($$_field))?$$_field:(isset($_POST[$_field])?$_POST[$_field]:$default_value);
		}
		
		if ($user_htmlspecialchars==true) 
		{
			return htmlspecialchars($value);
		}
		else
		{
			return $value;
		}
	}
}


/* End of file form_helper.php */
/* Location: ./system/application/helpers/MY_form_helper.php */