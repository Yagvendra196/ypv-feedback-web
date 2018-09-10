<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * @author	- Ankit Gautam
 * Class used to include all the utility functions which can be used any where.
 */
class Utility extends CI_Model
{
function get_thumbs()
{	
	return array(  array('80','40'),
	               array('100','80'),
		  array('60','60'),
		  array('40','40')
	);
}

function get_user_thumbs()
{	
	return array(  array('80','40'),
				   array('140','140'),
	               array('100','80'),
		  array('60','60'),
		  array('40','40')
	);
}
	
	// To replace '\n' with newline character
	// Useful when we take input from a textarea and also avoiding mysql injection
	function set_nl($str)
	{
		return str_replace("\\n",chr(10),$str);
	}
	
	// To limit the number of characters if they are exceeding the size of container
	function limit_char($str, $n = 500, $end_char = '&#8230;')
	{
		
		if (strlen($str) < $n)
		{
			return $str;
		}
		
		$str = preg_replace("/\s+/", ' ', str_replace(array("\r\n", "\r", "\n"), ' ', $str));
		/*
		if (strlen($str) <= $n)
		{
			$str = '<span onmouseover="tooltip.show(\''.$orig_str.'\');" onmouseout="tooltip.hide();">'.$str.'</span>';
			return $str;
		}*/

		$orig_str = addslashes(htmlentities($str));
		$out = "";
		foreach (explode(' ', trim($str)) as $val)
		{
			$out .= $val.' ';
			
			if (strlen($out) >= $n)
			{
				$out = trim($out);
				$out=(strlen($out) == strlen($str)) ? $out : $out.$end_char;
				//return '<span onmouseover="tooltip.show(\''.$orig_str.'\');" onmouseout="tooltip.hide();">'.$out.'</span>';
				return $out;
			}		
		}
	}

	function generate_md5_token()
	{
		// Generating token;
		$token = md5(date('YmdHis').$this->random_str(10));
		
		// Saving as flash data
		$this->session->set_flashdata('flash_token',$token);
		
		// Returning token
		return $token;
	}

	function generate_access_token()
	{
		mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid = //chr(123)// "{"
            substr($charid, 0, 8).$hyphen
            .substr($charid, 8, 4).$hyphen
            .substr($charid,12, 4).$hyphen
            .substr($charid,16, 4).$hyphen
            .substr($charid,20,12);
            //.chr(125);// "}"
        return $uuid;
	}
	function generate_username($length)
	{
   		$characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    	$name = "";
	    for($i = 0; $i < $length; $i++)
	    {
	        $name .= $characters[mt_rand(0,strlen($characters) - 1)];

	    }
        return $name;
    }

	// To generate random string of specified length
	function random_str($len)
	{
		$pool="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
		$lchr=strlen($pool)-1;
		$ranid="";
		for($i=0;$i<$len;$i++)	$ranid.=$pool[mt_rand(0,$lchr)];
		return $ranid;
	}


	
	//==================== common db function
	/**
	* This function return the single row from fetched result and result set is generated which is depended on input parameters.
	*/
	function getRowByField($table,$field='',$field_value='',$join=array())
	{	
		//SELECT name FROM user WHERE id = $id 
		
		if ( is_array($field) && !empty($field) )
		{	
			$this->db->where($field);
			$join = $field_value;
		}
		else
		{
			if ( $field != '' ) 
			{
				$this->db->where($field, $field_value);
			}
		}
		
		if ( is_array($join) && !empty($join) )
		{	
			foreach($join as $tbl => $join_str)
			$this->db->join($tbl, $join_str);
		} 
		//returns the query string
		$query=$this->db->get($table);
		foreach ($query->result() as $row)
		{	
			 return $row;
		}
		return '';
	}
	
	
	/**
	* This function return the multiple rows from fetched result and result set is generated which is depended on input parameters.
	*/
	function getRowsByField($table,$field='',$field_value='',$join=array())
	{	
		if ( $field != '' ) 
		{
			if ( is_array($field) && !empty($field) )
			{	
				$this->db->where($field);
				$join = $field_value;
			}
			else
			{
				$this->db->where($field, $field_value);
			}
			
		}
		if ( is_array($join) && !empty($join) )
		{	
			foreach($join as $tbl => $join_str)
			$this->db->join($tbl, $join_str);
		}
		
		//returns the query string
		$query=$this->db->get($table);
		if( $query->num_rows() >= 1 )
		{ 
			return  $query->result();
		}
		return false;	
	}
	 //==================== common db function
	//This is to find a string between two tag
	function get_string_between($string, $start, $end)
	{		
			$string = " ".$string;
			$ini = strpos($string,$start);
			if ($ini == 0) return "";
			$ini += strlen($start);   
			$len = strpos($string,$end,$ini) - $ini;
			return substr($string,$ini,$len);
	}

//==================file upload help functions
	/**
	* This function return the url of image. it take image name and make the applicable image url and return it.
	*/
	
	function showImage($image_path,$default_img_path='images/default.png',$image_for='user')
	{
			if ($image_path==true)
			{
				return $image_path;
			}
		 	else 
			{		
				if ($default_img_path!='images/default.png') 							return $default_img_path;
				if ($image_for=='user') 					 							return $default_img_path;
				if ($image_for=='faction' && $default_img_path=='images/default.png')	return 'images/factions_default.png';
			}
	}
	
	
	function get_thumb_name($temp_uploaded_file = '' , $width = '', $height = '',$lock=false)
	{

		if (  $temp_uploaded_file  !='' && $width != '' && $height != '' )
		{	
			$new_name_array1 = $new_name_array = explode('.', $temp_uploaded_file  );
			unset($new_name_array1[count($new_name_array)-1]); 
			$new_name = implode('.',$new_name_array1);
			$new_name_ext = $new_name_array[count($new_name_array)-1];
			if ($lock==true)
			{
				return $new_name.'_blur_'.$width.'_x_'.$height.'_.'.$new_name_ext;			
			}
			else
			{
				return $new_name.'_'.$width.'_x_'.$height.'_.'.$new_name_ext;
			}
		}
		return '';
	}
	function remove_images($file_field = '', $temp_uploaded_file = '', $images_dir = '', $thumbs = array() )
	{
		/*
		if ( $row->{$file_field}!='' ) sample cdoe of remove_images function which are in utility
		{	
			$new_name_array1 = $new_name_array = explode('.', $row->{$file_field});
			unset($new_name_array1[count($new_name_array)-1]); 
			$new_name = implode('.',$new_name_array1);
			$new_name_ext = $new_name_array[count($new_name_array)-1];
			//
			//
			@unlink( ${$file_field.'_upload_dir'}.$row->{$file_field} );
			@unlink( ${$file_field.'_upload_dir'}.'thumbs/'.$new_name.'_80_x_40_'.$new_name_ext);
		}
		*/
		if ( $file_field != '' && $temp_uploaded_file  !='' && $images_dir !='' )
		{	
			$new_name_array1 = $new_name_array = explode('.', $temp_uploaded_file  );
			unset($new_name_array1[count($new_name_array)-1]); 
			$new_name = implode('.',$new_name_array1);
			$new_name_ext = $new_name_array[count($new_name_array)-1];
			//
			//
			@unlink( $images_dir.$temp_uploaded_file );
			foreach($thumbs as $key => $thumb)								 
			{
				@unlink( $images_dir.'thumbs/'.$new_name.'_'.$thumb[0].'_x_'.$thumb[1].'_.'.$new_name_ext);
			}	
		}
	}
	
	function remove_document($field_doc_field = '', $temp_uploaded_file = '', $doc_dir = '' )
	{
		/*
		if ( $row->{$file_field}!='' ) sample cdoe of remove_images function which are in utility
		{	
			$new_name_array1 = $new_name_array = explode('.', $row->{$file_field});
			unset($new_name_array1[count($new_name_array)-1]); 
			$new_name = implode('.',$new_name_array1);
			$new_name_ext = $new_name_array[count($new_name_array)-1];
			//
			//
			@unlink( ${$file_field.'_upload_dir'}.$row->{$file_field} );
			@unlink( ${$file_field.'_upload_dir'}.'thumbs/'.$new_name.'_80_x_40_'.$new_name_ext);
		}
		*/
		if ( $field_doc_field != '' && $temp_uploaded_file  !='' && $doc_dir !='' )
		{	
			$new_name_array1 = $new_name_array = explode('.', $temp_uploaded_file  );
			unset($new_name_array1[count($new_name_array)-1]); 
			$new_name = implode('.',$new_name_array1);
			$new_name_ext = $new_name_array[count($new_name_array)-1];
			//
			//
			@unlink( $doc_dir.$temp_uploaded_file );
		}
	}
	
	function remove_video($field_video_field = '', $temp_uploaded_file = '', $vedio_dir = '' )
	{
		/*
		if ( $row->{$file_field}!='' ) sample cdoe of remove_images function which are in utility
		{	
			$new_name_array1 = $new_name_array = explode('.', $row->{$file_field});
			unset($new_name_array1[count($new_name_array)-1]); 
			$new_name = implode('.',$new_name_array1);
			$new_name_ext = $new_name_array[count($new_name_array)-1];
			//
			//
			@unlink( ${$file_field.'_upload_dir'}.$row->{$file_field} );
			@unlink( ${$file_field.'_upload_dir'}.'thumbs/'.$new_name.'_80_x_40_'.$new_name_ext);
		}
		*/
		if ( $field_video_field != '' && $temp_uploaded_file  !='' && $vedio_dir !='' )
		{	
			$new_name_array1 = $new_name_array = explode('.', $temp_uploaded_file  );
			unset($new_name_array1[count($new_name_array)-1]); 
			$new_name = implode('.',$new_name_array1);
			$new_name_ext = $new_name_array[count($new_name_array)-1];
			//
			//
			@unlink( $vedio_dir.$temp_uploaded_file );
		}
	}
	
	/* ---- old 
	function do_upload($field,$max_size='',$config)
	{		
		$upload_obj=$field.'_upload_obj';
		
		$this->load->library('upload', $config, $upload_obj);
		
		
		if ( ! $this->{$upload_obj}->do_upload($field))
		{	
			return $error = array('error' => $this->{$upload_obj}->error_msg[0]);
		}	
		else
		{
			$data = array('uploaded_file_info' => $this->{$upload_obj}->data());
			$data['uploaded_file_info']['file_size'];
			$file_size_in_byte=$data['uploaded_file_info']['file_size']*1024;
			$file_size_in_mb=$data['uploaded_file_info']['file_size']/1024;
			if ($max_size>0 && $file_size_in_mb>$max_size) 
			{	
				return $error = array('error' => 'Size can not be largner then '.$max_size.'MB.');
			}
			return $data;
		}
	}	
	*/
	/**
	* This function for upload image file. 
	*/
	function do_upload($field,$max_size='',$config)
	{	
		$upload_obj=$field.'_upload_obj'; 
		$this->load->library('upload', $config, $upload_obj);
		
		
		if ( ! $this->{$upload_obj}->do_upload($field))
		{	
			 $error = array('error' => $this->{$upload_obj}->error_msg[0]);
			 $data = array('uploaded_file_info' => $this->{$upload_obj}->data());
			 return array_merge($error,$data);
		}	
		else
		{
			$data = array('uploaded_file_info' => $this->{$upload_obj}->data());
			$data['uploaded_file_info']['file_size'];
			$file_size_in_byte=$data['uploaded_file_info']['file_size']*1024;
			$file_size_in_mb=$data['uploaded_file_info']['file_size']/1024;
			if ($max_size>0 && $file_size_in_mb>$max_size) 
			{	
				$error = array('error' => 'Size can not be larger then '.$max_size.'MB.');
			    return array_merge($error,$data);
			}
			return $data;
		}
	}	
	//make_thumb_image($_FILES[$_filed_fieldname]['name'],$file_name,'../images/products/','80','40')
	function make_thumb_image($image_name,$filename,$save_path,$THUMB_WIDTH,$THUMB_HEIGHT,$blur=true)
	{
		$thumb='';
		$extension = strtolower(array_pop(explode('.', $image_name)));
		
	
		$new_name_array1 = $new_name_array = explode('.', $filename);
		unset($new_name_array1[count($new_name_array)-1]); 
		$new_name = implode('.',$new_name_array1);
		$new_name_ext = $new_name_array[count($new_name_array)-1];

		
		if ($extension == 'jpg' || $extension == 'jpeg') 
		{	
			$thumb='yes';				
			$save_path.$filename;
			$src1 = imagecreatefromjpeg($save_path.$filename);

		}
		elseif ($extension == 'gif') 
		{					
			$thumb='yes';
			$src1 = imagecreatefromgif($save_path.$filename);
		}
		elseif ($extension == 'png') 
		{					
			$thumb='yes';
			$src1 = imagecreatefrompng($save_path.$filename);
		}					
		
		
		if ($thumb)
		{
		
			// ================= Make thum =================
			$TWidth=$THUMB_WIDTH;	
			$THeight=$THUMB_HEIGHT;
			// ======================First cutting ======================
			list($width1,$height1)=getimagesize($save_path.$filename);
			
			if ($width1<$TWidth && $height1<$THeight)
			{
				$TWidth=$width1;	
				$THeight=$height1;
			}
			
			$newwidth1=$TWidth;
			$newheight1=($height1/$width1)*$TWidth;
			$widthcroped=true;
			if ($newheight1>$THeight)
			{	$widthcroped=false;
				$newheight1=$THeight;
				$newwidth1=($width1/$height1)*$THeight;
			}
			$tmp1=imagecreatetruecolor($newwidth1,$newheight1);
			imagecopyresampled($tmp1,$src1,0,0,0,0,$newwidth1,$newheight1,$width1,$height1);
			$filename1 = $save_path."thumbs/".$new_name."_".$THUMB_WIDTH."_x_".$THUMB_HEIGHT."_.".$new_name_ext;
			imagejpeg($tmp1,$filename1,100);
															
			//imagedestroy($src1);
			//imagedestroy($tmp1);
			// ======================END First cutting ======================									
			
			if ($blur)
			{/*
				// ================= Make blur =================
				$filename1 = $save_path."thumbs/".$new_name."_blur_".$THUMB_WIDTH."_x_".$THUMB_HEIGHT."_.".$new_name_ext;
	
				// To change blur quality by changing array values
				//$gaussian = array(array(1.0, 2.0, 1.0), array(6.0, 6.0, 6.0), array(1.0, 2.0, 1.0));
				//original code without self changing array values
				$gaussian = array(array(1.0, 8.0, 1.0), array(2.0, 7.0, 2.0), array(1.0, 9.0, 1.0));
				imageconvolution($tmp1, $gaussian, 32, 0);	
				imagejpeg($tmp1,$filename1,100);	
			*/}
			
			imagedestroy($src1);
			imagedestroy($tmp1);
			
			
		}//if ($thumb)
	}
	//==================file upload help functions

	function image($image_name,$image_dir='admin_images',$lanauge='') //preapre for key
	{
		//============= need this code if in url there changed in lanaguage
		$new_lang = '';
		for ($i=3;$i<=$this->uri->total_segments();$i++)
		{
			$lang_segment = $this->uri->segment($i);
			if (strtolower(substr($lang_segment,0,5))=='lang:')
			{
				$new_lang = substr($lang_segment,5);
			}
		}
		if (  $new_lang != '' )
		{
			$lanauge = $new_lang;
		}
		else
		{
			$lanauge = ($lanauge!='')?$lanauge:$this->session->userdata('language');
			if(empty($lanauge))
			{
				$lanauge  = $this->get_default_language();
			}
		}
		//============= need this code if in url there changed in lanaguage
		
		return $image_dir.'/'.$lanauge.'/'.lang(pkey($image_name));
	}
	

   function backup_database($tables='*')
   {
	   $return = '';
		$i = 0;
		if($tables == '*')
		{
			$tables = array();
			$tables = $this->db->list_tables();
			
		}
		else
	  	{
			$tables = is_array($tables) ? $tables : explode(',',$tables);
	  	}
		
		foreach($tables as $table)
		{
			$table_select = $this->db->query('SELECT * FROM '.$table);
			$table_data = $table_select->result();
			$num_rows = $table_select->num_rows();
			$result_fields = $this->db->list_fields($table);
			
			//****************** get the create table syntax  ************************//
			$show = $this->db->query('show create table '.$table);
			$show_create = $show->row();
			foreach($show_create as $row)
			{
				$create = $row;
			}
			
			$return.= $create.";\n\n"; 
			
			
			//******************* get the values for the table  ***********************//
			
			if(!empty($table_data))
			{
				
				foreach ($table_data as $tdata)
				{
					if($i==0 || $i>200)
					{
						$return.= 'INSERT INTO '.$table.' (';
						foreach($result_fields as $fields)
						{
							$return.= '`'.$fields.'`,';
						}
						$return= substr($return,0,strlen($return)-1);
						$return.= ') VALUES';
						$i = 0;
					}
					
					$return.= '(';
					
					foreach($result_fields as $fields)
					{
						$value = $tdata->$fields;
						$value = addslashes($value);
						$value = str_replace("\n","\\n",$value);
						$return.= "'".$value."',";
					}
					$return= substr($return,0,strlen($return)-1);
					$return.="),\n";
					$i++;
					if($i>200)
						{
							$return= substr($return,0,strlen($return)-2);
							$return.= ';' ;
						}
					
				}
				$return= substr($return,0,strlen($return)-2);
				$return.= ";";
				$i = 0;
			}
			
			
		}
		
		
		//******************************** write the data in a file  ********************//

		/*$handle = fopen('db-backup-'.time().'-'.(md5(implode(',',$tables))).'.sql','w');
		fwrite($handle,$return);
		fclose($handle);*/
		$filename='db-backup-'.time().'-'.(md5(implode(',',$tables))).'.sql';
  		header("Content-type: application/octet-stream");
 		header("Content-disposition: attachment;filename=$filename");
		echo $return;
		readfile($filename);
		$this->session->set_flashdata('flash_backup',"Backup Taken Successfully");
		redirect("admin_home/configuration");
	}
	

	function days_between_dates($start_date='',$end_date='')
	{
			if(!empty($start_date) && !empty($end_date))
			{
				$days = (strtotime($end_date) - strtotime($start_date))/(60*60*24);
				return ceil($days);
			}
			return 0;
	}

	
	function stritr(&$string, $from, $to = NULL)
    {
        if(is_string($from))
            $string = preg_replace("'$from'i", $to, $string);

        else if(is_array($from))
        {
            foreach ($from as $key => $val)
                self::stritr($string, $key, $val);
        }
       
        return $string;
    }
	
	

	 function check_credit_card_type($cc, $extra_check = false){
	    $cards = array(
	        "visa" => "(4\d{12}(?:\d{3})?)",
	        "amex" => "(3[47]\d{13})",
	        "jcb" => "(35[2-8][89]\d\d\d{10})",
	        "maestro" => "((?:5020|5038|6304|6579|6761)\d{12}(?:\d\d)?)",
	        "solo" => "((?:6334|6767)\d{12}(?:\d\d)?\d?)",
	        "mastercard" => "(5[1-5]\d{14})",
	        "switch" => "(?:(?:(?:4903|4905|4911|4936|6333|6759)\d{12})|(?:(?:564182|633110)\d{10})(\d\d)?\d?)",
	    );
	    $names = array("Visa", "American Express", "JCB", "Maestro", "Solo", "Mastercard", "Switch");
	    $matches = array();
	    $pattern = "#^(?:".implode("|", $cards).")$#";
	    $result = preg_match($pattern, str_replace(" ", "", $cc), $matches);
	    if($extra_check && $result > 0){
	        //$result = (validatecard($cc))?1:0;
	        $result = 1;
	    }
	    return ($result>0)?$names[sizeof($matches)-2]:false;
	}



	function clear_cache()
	{

		header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
		header("Cache-Control: no-store, no-cache, must-revalidate");
		header("Cache-Control: post-check=0, pre-check=0", false);
		header("Pragma: no-cache");
		
		/*
		$this->output->set_header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
		$this->output->set_header("Cache-Control: no-store, no-cache, must-revalidate");
		$this->output->set_header("Cache-Control: post-check=0, pre-check=0", false);
		$this->output->set_header("Pragma: no-cache");  
		*/

	}

	function highlightWords($string, $words)
	{
		foreach ( $words as $word )
		{
			$string = str_ireplace($word, '<span class="green_text"><strong>'.$word.'</strong></span>', $string);
		}
		/*** return the highlighted string ***/
		return $string;
	}

	
	function UserDateTime($mysql_gmdate='',$timezoneStr, $provided_timestamp=false,$return_timestamp=false) {
		//$dt = new DateTime($utility->UserDateTime($result->row->dob,$timezoneStr));
		//$dt->format($this->config->date_formate_1);
        if ($mysql_gmdate!='') {
            if ($provided_timestamp===false) {
                $seconds = strtotime($mysql_gmdate);
            } else if ($provided_timestamp===true) {
                $seconds = $mysql_gmdate;
            } else {
                return '';
            }

			$dt = new DateTime();
			$tz = new DateTimeZone($timezoneStr); // or whatever zone you're after
			$Z = $tz->getOffset($dt);

            if ($return_timestamp===false) {
                return date(MYSQL_DATE,$seconds+$Z); //note date("Z") give user time zone offset, before calling it timezone must set according to user.            
            } else if ($return_timestamp===true) {
                return $seconds+$Z;
            } else {
                return '';
            }
        }
        return '';
    }
    function GmDateTime($mysql_userdate='',$timezoneStr,$provided_timestamp=false,$return_timestamp=false){
    	if ($mysql_userdate!=''){
            if ($provided_timestamp===false)
            {
                $seconds = strtotime($mysql_userdate);
            }
            else if ($provided_timestamp===true)
            {
                $seconds = $mysql_userdate;
            }

            $dt = new DateTime();
			$tz = new DateTimeZone($timezoneStr); // or whatever zone you're after
			$Z = $tz->getOffset($dt);

            if ($return_timestamp===false)
            {
                return date(MYSQL_DATE,$seconds-$Z); //note date("Z") give user time zone offset, before calling it timezone must set according to user.
            }
            else if ($return_timestamp===true)
            {
                return $seconds-$Z;
            }
        }
    }

	//to get array from an multi email conating in a string
	function make_array_using_seperator($email_string='')
	{
		$temp_address	=	explode(",",$email_string);
		$email_address	=	array();
		if($temp_address)
		{
			foreach($temp_address as $key => $value)
			{
				$email=str_replace(" ",'',$value);
				if (preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/", $email)) 
				{
					$email_address[]=$email;
				}
				elseif (stristr($email,'<') && stristr($email,'>'))
				{
					$email=str_replace("<","|",$email);
					$email=str_replace(">","|",$email);
					$email=substr($email,stripos($email,"|")+1);
					$email=substr($email,0,stripos($email,"|"));
					if (preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/", $email)) 
					{
						$email_address[]=$email;
					}
				}
			}
			return $email_address;
		}
		return false;
	}

	function _strip($res)
	{
		foreach($res as $rk=>$rv)
		foreach($res[$rk] as $k=>$v)
		{
			$res[$rk]->$k=stripslashes($v);
		}
		return $res;
	}
}
?>