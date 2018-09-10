<style type="text/css">
    .moveFiltersPosition{
        display:none;
        width:1125px;
        height:100px;
        background-color:#c3c3c3;
        position:relative;    
    }
    
   /* a.tab {
        background-color: #449d44!important;
        color: #fff!important;
    }
    a.tab:hover {
        background-color: #449d44!important;
        color: #fff!important;
    }*/
    

</style>
<script type="text/javascript">
function mng_buddies(){
        $('#mng_buddies').attr({'href':"<?php echo base_url().$thisModuleFolder.'/'.STUDENT_FOLDER.'/mng_buddies/'.$user_id;?>"});
        $('#mng_buddies').colorbox({iframe:true, innerWidth:740, innerHeight:500});
}
</script>
<div class="panel-body">
    <h1>Buddies</h1>
    <div width="100%;" align="right">
    <a class="btn btn-success" id="mng_buddies" onclick="mng_buddies()" href="javascript:void(0);" >Manage <?php echo ucfirst($page_title); ?> Buddies </a>
    </div>
    <ul class="nav nav-tabs">
        <li class="active">
            <a class="tab"  ><strong><?php echo ucfirst($page_title); ?> gives feedback to</strong></a>
        </li>
    </ul>
    <div class="tab-content">
        <table class="table table-bordered0 ">
            <tbody>
                <?php if ($user_give_feedbacks_to)
                foreach ($user_give_feedbacks_to as $key => $user) { ?>
                    <tr>
                        <td width="50%"><?php echo $user->email;?></td>
                        <td><?php echo ucfirst($user->first_name.' '.$user->last_name);?></td>
                    </tr>
                <?php }; ?>

                <?php if (!$user_give_feedbacks_to) { ?>
                    <tr >
                        <td style="text-align:center"  >No buddy found</td>
                    </tr>
                <?php }; ?>
            </tbody>
        </table>
    </div>    

    <ul class="nav nav-tabs">
        <li class="active">
            <a class="tab"><strong><?php echo ucfirst($page_title); ?> receives feedback from</strong></a>
        </li>
    </ul>
    <div class="tab-content">
        <table class="table table-bordered0 ">
            <tbody>
                <?php 
                if ($user_recive_feedbacks_from)
                foreach ($user_recive_feedbacks_from as $key => $user) { ?>
                    <tr>
                        <td width="50%"><?php echo $user->email;?></td>
                        <td><?php echo ucfirst($user->first_name.' '.$user->last_name);?></td>
                    </tr>
                <?php }; ?>

                <?php if (!$user_recive_feedbacks_from) { ?>
                    <tr >
                        <td style="text-align:center"  >No buddy found</td>
                    </tr>
                <?php }; ?>
            </tbody>
        </table>
    </div>   
</div>