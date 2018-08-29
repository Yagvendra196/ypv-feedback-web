<?php

class UserTableDataProvider extends DataTableDataProvider
{

	static function simple ( $request, $conn, $table, $primaryKey, $columns, $json=true )
	{
	        $bindings = array();
	        $limit = self::limit( $_POST, $columns );
	        $order = self::order( $_POST, $columns );
	        $order = str_replace('`','',$order);
	        $where = self::filter( $_POST, $columns , $bindings );

	        //start extra conditions
		    if(!empty($where)) $where = $where.' AND ';
		    else $where = ' WHERE ';
		    $where = $where."ur.role_id = $request[role_id] AND u.user_id != 1";
		    //end extra conditions

		    if(!empty($_POST['city'])){
		    	$searchKeyword=$_POST['city'];
		    	$searchJoin = "LEFT JOIN `user_profile` as up ON up.user_id = u.user_id ";
		    	$serachWhere=" AND up.city LIKE '%".$searchKeyword."%'";
		    }else{
		    	$searchKeyword="";
		    	$searchJoin = "";
		    	$serachWhere="";
		    }

		    $CI = & get_instance();
		    if ($CI->Security->doesUserHasCapability('super_admin')) {  

		        $data = $conn->Query("SELECT SQL_CALC_FOUND_ROWS ".implode(", ", self::pluck($columns, 'db'))." 
		        								FROM `$table` as u
											         LEFT JOIN `user_roles` as ur ON ur.user_id = u.user_id 
											         LEFT JOIN `master_roles` as mr ON mr.role_id = ur.role_id
											         $searchJoin 
		         							 $where $serachWhere $order $limit")->result_array();
		    }else{
		    	$owner_id = $CI->session->userdata('user_id');
		    	$where .= " AND uo.owner_user_id = $owner_id ";
		    	$data = $conn->Query("SELECT SQL_CALC_FOUND_ROWS ".implode(", ", self::pluck($columns, 'db'))." 
		        								FROM `$table` as u
											         LEFT JOIN `user_roles` as ur ON ur.user_id = u.user_id 
											         LEFT JOIN `master_roles` as mr ON mr.role_id = ur.role_id 
											         LEFT JOIN `user_owners` as uo ON uo.user_id = u.user_id 
											         $searchJoin
		         							 $where $serachWhere $order $limit")->result_array();
		    }

	        $resFilterLength = $conn->Query("SELECT FOUND_ROWS()")->result_array();
	        $recordsFiltered = $resFilterLength[0]['FOUND_ROWS()'];

	        $resTotalLength = $conn->Query("SELECT COUNT({$primaryKey}) as _count 
				        								FROM `$table` as u
													         LEFT JOIN `user_roles` as ur ON ur.user_id = u.user_id 
													         LEFT JOIN `master_roles` as mr ON mr.role_id = ur.role_id 
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
