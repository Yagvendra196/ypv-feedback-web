<?php
class DataTableDataProvider 
{


static function simple ( $request, $conn, $table, $primaryKey, $columns, $json=true )
{
        $bindings = array();
        $limit = self::limit( $_POST, $columns );
        $order = self::order( $_POST, $columns );
        $where = self::filter( $_POST, $columns , $bindings );
        $data = $conn->createCommand("SELECT SQL_CALC_FOUND_ROWS `".implode("`, `", self::pluck($columns, 'db'))."` FROM `$table` $where $order $limit")->queryAll();
        $resFilterLength = $conn->createCommand("SELECT FOUND_ROWS()")->queryAll();
        $recordsFiltered = $resFilterLength[0]['FOUND_ROWS()'];
        $resTotalLength = $conn->createCommand("SELECT COUNT(`{$primaryKey}`) as _count FROM `$table`")->queryAll();
        $recordsTotal = $resTotalLength[0]['_count'];
        $r = array("draw" => intval( $_POST['draw'] ),"recordsTotal" => intval( $recordsTotal ),"recordsFiltered" => intval( $recordsFiltered ),"data" => self::data_output( $columns, $data ));
        if ($json)        
        return json_encode($r);
        else
        return $r;
}

  
  /**
  * Ordering
  *
  * Construct the ORDER BY clause for server-side processing SQL query
  *
  * @param array $request Data sent to server by DataTables
  * @param array $columns Column information array
  * @return string SQL order by clause
  */
  public static function order ( $request, $columns )
  {
    $order = '';
    if ( isset($request['order']) && count($request['order']) ) {
      $orderBy = array();
      $dtColumns = self::pluck( $columns, 'dt' );
      for ( $i=0, $ien=count($request['order']) ; $i<$ien ; $i++ ) {
        // Convert the column index into the column data property
        $columnIdx = intval($request['order'][$i]['column']);
        $requestColumn = $request['columns'][$columnIdx];
        $columnIdx = array_search( $requestColumn['data'], $dtColumns );
        $column = $columns[ $columnIdx ];
        if ( $requestColumn['orderable'] == 'true' ) {
          $dir = $request['order'][$i]['dir'] === 'asc' ?
          'ASC' :
          'DESC';
          $orderBy[] = '`'.$column['db'].'` '.$dir;
        }
      }
      //$order = implode(', ', $orderBy);
      $order = 'ORDER BY '.implode(', ', $orderBy);
    }
    return $order;
  }
  /**
  * Paging
  *
  * Construct the LIMIT clause for server-side processing SQL query
  *
  * @param array $request Data sent to server by DataTables
  * @param array $columns Column information array
  * @return string SQL limit clause
  */
  public static function limit ( $request, $columns )
  {
    $limit = '';
    if ( isset($request['start']) && $request['length'] != -1 ) {
      $limit = "LIMIT ".intval($request['start']).", ".intval($request['length']);
    }
    return $limit;
  }
  /**
  * Searching / Filtering
  *
  * Construct the WHERE clause for server-side processing SQL query.
  *
  * NOTE this does not match the built-in DataTables filtering which does it
  * word by word on any field. It's possible to do here performance on large
  * databases would be very poor
  *
  * @param array $request Data sent to server by DataTables
  * @param array $columns Column information array
  * @param array $bindings Array of values for PDO bindings, used in the
  * sql_exec() function
  * @return string SQL where clause
  */
  public static function filter ( $request, $columns, &$bindings )
  {
    $globalSearch = array();
    $columnSearch = array();
    $dtColumns = self::pluck( $columns, 'dt' );
    if ( isset($request['search']) && $request['search']['value'] != '' ) {
      $str = $request['search']['value'];
      for ( $i=0, $ien=count($request['columns']) ; $i<$ien ; $i++ ) {
        $requestColumn = $request['columns'][$i];
        $columnIdx = array_search( $requestColumn['data'], $dtColumns );
        $column = $columns[ $columnIdx ];
        if ( $requestColumn['searchable'] == 'true' ) {
        //$binding = self::bind( $bindings, '%'.$str.'%', PDO::PARAM_STR );
        //$globalSearch[] = "`".$column['db']."` LIKE ".$binding;
        $binding = '%'.$str.'%';
        $globalSearch[] = "`".$column['db']."` LIKE '".$binding."'";
        
        }
      }
    }
    // Individual column filtering
    for ( $i=0, $ien=count($request['columns']) ; $i<$ien ; $i++ ) {
      $requestColumn = $request['columns'][$i];
      $columnIdx = array_search( $requestColumn['data'], $dtColumns );
      $column = $columns[ $columnIdx ];
      $str = $requestColumn['search']['value'];
      if ( $requestColumn['searchable'] == 'true' &&
      $str != '' ) {
        //$binding = self::bind( $bindings, '%'.$str.'%', PDO::PARAM_STR );
        //$columnSearch[] = "`".$column['db']."` LIKE ".$binding;
        $binding = '%'.$str.'%';
        $columnSearch[] = "`".$column['db']."` LIKE '".$binding."'";
      }
    }
    // Combine the filters into a single string
    $where = '';
    if ( count( $globalSearch ) ) {
      $where = '('.implode(' OR ', $globalSearch).')';
    }
    if ( count( $columnSearch ) ) {
       $where = $where === '' ?
       implode(' AND ', $columnSearch) :
       $where .' AND '. implode(' AND ', $columnSearch);
    }
    if ( $where !== '' ) {
       $where = 'WHERE '.$where;
       //$where = $where;
    }
    return $where;
  }

  /**
  * Create the data output array for the DataTables rows
  *
  * @param array $columns Column information array
  * @param array $data Data from the SQL get
  * @return array Formatted data in a row based format
  */
  public static function data_output ( $columns, $data )
  {
     $out = array();
     for ( $i=0, $ien=count($data) ; $i<$ien ; $i++ ) {
        $row = array();
        for ( $j=0, $jen=count($columns) ; $j<$jen ; $j++ ) {
            $column = $columns[$j];
           // Is there a formatter?
           if ( isset( $column['formatter'] ) ) {
                  $row[ $column['dt'] ] = $column['formatter']( $data[$i][ $column['db'] ], $data[$i] );
           }
           else {
                   $row[ $column['dt'] ] = $data[$i][ $columns[$j]['db'] ];
           }
        }
        $out[] = $row;
     }
     return $out;
  }

  /**
  * Pull a particular property from each assoc. array in a numeric array,
  * returning and array of the property values from each item.
  *
  * @param array $a Array to get data from
  * @param string $prop Property to read
  * @return array Array of property values
  */
  public static function pluck ( $a, $prop )
  {
    $out = array();
    for ( $i=0, $len=count($a) ; $i<$len ; $i++ ) {
      $out[] = $a[$i][$prop];
    }
    return $out;
  }
  /**
  * Create a PDO binding key which can be used for escaping variables safely
  * when executing a query with sql_exec()
  *
  * @param array &$a Array of bindings
  * @param * $val Value to bind
  * @param int $type PDO field type
  * @return string Bound key to be used in the SQL where this parameter
  * would be used.
  */
  public static function bind ( &$a, $val, $type )
  {
    $key = ':binding_'.count( $a );
    $a[] = array(
    'key' => $key,
    'val' => $val,
    'type' => $type
    );
    return $key;
  }

}
