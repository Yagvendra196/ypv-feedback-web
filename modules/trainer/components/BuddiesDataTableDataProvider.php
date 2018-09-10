<?php

class BuddiesDataTableDataProvider extends DataTableDataProvider
{

	static function simple ( $request, $conn, $table, $primaryKey, $columns, $json=true)
	{

		
	        $bindings = array();
	        $limit = self::limit( $_POST, $columns );
	        $order = self::order( $_POST, $columns );
	        $order = str_replace('`','',$order);
	        $where = self::filter( $_POST, $columns , $bindings );


	        //start extra conditions
		    if(!empty($where)) $where = $where.' AND ';
		    else $where = ' WHERE ';
		    $where = $where." ur.role_id = $request[role_id] and u.user_id != '".$_POST['user_id']."' AND u.user_id != '1' AND ";
		    $where = $where." u.user_id in (SELECT DISTINCT user_id FROM `user_owners` WHERE `owner_user_id` in (SELECT `owner_user_id` FROM `user_owners` WHERE user_id = '".$_POST['user_id']."'))";
		    //end extra conditions

	        $data = $conn->Query("SELECT SQL_CALC_FOUND_ROWS ".implode(", ", self::pluck($columns, 'db'))." 
	        								FROM `$table` as u
										         LEFT JOIN `user_roles` as ur ON ur.user_id = u.user_id 
										         LEFT JOIN `master_roles` as mr ON mr.role_id = ur.role_id 
										         LEFT JOIN `user_spiritual_buddies` as usb ON usb.user_id = u.user_id and usb.spiritual_buddie_user_id = '".$_POST['user_id']."'
	         							 $where $order $limit")->result_array();

	        $resFilterLength = $conn->Query("SELECT FOUND_ROWS()")->result_array();
	        $recordsFiltered = $resFilterLength[0]['FOUND_ROWS()'];

	        $resTotalLength = $conn->Query("SELECT COUNT({$primaryKey}) as _count 
				        								FROM `$table` as u
													         LEFT JOIN `user_roles` as ur ON ur.user_id = u.user_id 
													         LEFT JOIN `master_roles` as mr ON mr.role_id = ur.role_id 
													         LEFT JOIN `user_spiritual_buddies` as usb ON usb.user_id = u.user_id and usb.spiritual_buddie_user_id = '".$_POST['user_id']."'
	        										")->result_array();
	        $recordsTotal = $resTotalLength[0]['_count'];

	        $map_columns = array();
	        foreach($columns as $key => $col)
	        {
	        	$c=explode('.', $col['db']);
	        	$map_columns[]=array('db'=>$c['1'],'dt'=>$col['dt']);
	        }
	        $r = array("draw" => intval( $_POST['draw'] ),"recordsTotal" => intval( $recordsTotal ),"recordsFiltered" => intval( $recordsFiltered ),"data" => self::data_output( $map_columns, $data ));
	        if ($json)        
	        return json_encode($r);
	        else
	        return $r;
	}


}
