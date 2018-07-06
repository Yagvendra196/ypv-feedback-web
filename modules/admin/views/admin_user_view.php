<?php 
    $firstColClass[0] = 'col-xs-3';
    $secondColClass[0] = 'col-xs-2';
    $thiredColClass[0] = 'col-xs-7';
?> 
<style type="text/css">
.lable-1{
color: gray;
}
.lable{
text-transform:capitalize;
font-weight: bold;     
color: black;
}
</style>
<div class="row">
    <div class="col-lg-12">
                <div class="row">
                    <div class="<?php echo $firstColClass[0];?> lable">
                        <strong>Key</strong>
                    </div>
                    <div class="<?php echo $secondColClass[0];?> lable">
                        <strong>Id</strong>
                    </div>
                    <div class="<?php echo $thiredColClass[0];?>">
                        <strong>Value</strong>
                    </div>
                </div>
        <?php foreach ($row as $field => $value) { ?>
            <?php if (!in_array($field,array('password','password_reset_token','verification_code','deleted','timezone','level_name','country_name'))) { ?> 
                <div class="row">
                    <div class="<?php echo $firstColClass[0];?> lable-1">
                        <?php echo (ucfirst(strtolower(str_replace('_',' ',$field))));?>
                    </div>
                    <div class="<?php echo $secondColClass[0];?> ">
                    <?php if (in_array($field,array('user_id','status','user_profile_id','level_id','timezone_id','country_id'))) { ?> 
                        <?php echo $value;?>
                    <?php } else {echo "";}?>
                    </div>
                    <div class="<?php echo $thiredColClass[0];?>">
                        <?php 
                             echo $field=='timezone_id'?$row->timezone:'';
                             echo $field=='level_id'?$row->level_name:'';
                             echo $field=='status'?$value=='1'?'Active':'Inactive':'';
                             echo $field=='married'?$value=='1'?'Yes':'No':'';
                             echo $field=='country_id'?$row->country_name:'';
                        ?>
                        <?php if (!in_array($field,array('level_id','timezone_id','status','married','country_id'))) { ?> 
                            <?php echo $value;?>
                        <?php } ?>
                    </div>
                </div>
            <?php } ?>
        <?php };?>
    </div>
    <!-- /.col-lg-12 -->
</div>