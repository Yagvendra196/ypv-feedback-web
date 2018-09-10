<style>
.moveFiltersPosition{
        display:none;
        width:1125px;
        height:100px;
        background-color:#c3c3c3;
        position:relative;    
    }
</style>
<div class="panel-body">
                <h1><?php echo $page_title;?></h1>
                <div class="dataTable_wrapper">
                    <table class="table table-striped table-bordered0 table-hover" id="dataTables-example">
                        <thead>
                            <tr>
                                <th>User id</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($user_examiners as $key => $examiner) { ?>
                            <tr>
                                    <td><?php echo $examiner->user_id;?></td>
                                    <td><?php echo $examiner->email;?></td>
                                    <td><?php echo $examiner->first_name;?></td>
                                    <td><?php echo $examiner->last_name;?></td>
                            </tr>
                        <?php } ?>
                        </tbody>
                    </table>
                </div>
</div>