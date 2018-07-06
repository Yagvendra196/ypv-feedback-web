<?php
class Filter 
{

    function filter_tags($inputs=array(),$remove_tag=true)
    {
        if (empty($inputs))
        {
            if(isset($_POST))
            {
                $_POST=$this->remove_tags($_POST,$remove_tag);
            }
            
            if(isset($_GET))
            {
                $_GET=$this->remove_tags($_GET,$remove_tag);
            }
            
            if(isset($_COOKIE))
            {
                $_COOKIE=$this->remove_tags($_COOKIE,$remove_tag);
            }
            
            if(isset($_REQUEST))
            {
                $_REQUEST=$this->remove_tags($_REQUEST,$remove_tag);
            }
        }
        else
        {
            return $this->remove_tags($inputs,$remove_tag);
        }
    }


    function remove_tags($str='',$remove_tag=true)
    {
        if (is_array($str))
        {
            foreach ($str as $key => $value) {
               $str[$key] = $this->remove_tags($value,$remove_tag);
            }
        }
        else
        {
            $str = $this->remove_tags_str($str,$remove_tag);
        }

        return $str;
    }



    function remove_tags_str($str='',$remove_tag=true)
    {
        if (is_string($str) && $str!='')
        {
            if ($remove_tag===true)
            {
                $str=strip_tags($str);
            }
            if (is_array($remove_tag) && array_key_exists('custom',$remove_tag) && !empty($str))
            { 
                $str=strip_tags($str, $remove_tag['custom']);              
            }
            if ( is_string($remove_tag) )
            { 
                $str=strip_tags($str, $remove_tag);              
            }
        }
        return $str;
    }

    function escape_str($str,$remove_tag=true,$like = FALSE)
    {
        if (is_array($str))
        {
            foreach ($str as $key => $val)
            {
                $str[$key] = $this->escape_str($val, $remove_tag,$like);
            }

            return $str;
        }
        if(get_magic_quotes_gpc())
        {   
            $str = stripslashes($str);
        }

        $str = $this->remove_tags_str($str,$remove_tag);

        if (function_exists('mysql_escape_string'))
        {
            $str = mysql_escape_string($str);
        }
        else if (function_exists('mysql_real_escape_string')) 
        {   
            $str = mysql_real_escape_string($str);
        }
        else
        {
            $str = addslashes($str);          
        }

        // escape LIKE condition wildcards
        if ($like === TRUE)
        {
            $str = str_replace(array('%', '_'), array('\\%', '\\_'), $str);
        }

        return $str;
    }

}
