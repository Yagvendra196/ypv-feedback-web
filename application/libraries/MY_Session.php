<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Session extends CI_Session 
{

/**
* Update an existing session
*
* @access    public
* @return    void
*/
    function sess_update()
    {
       // skip the session update if this is an AJAX call!
       if ( ! ( isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'  )  )
       {
           parent::sess_update();
       }
    } 

}

/* End of file MY_Session.php */
/* Location: ./application/libraries/MY_Session.php */  
?>