<?php if(!empty($feedbackSummaryData)) { ?>
    <?php foreach ($feedbackSummaryData as $k => $data) { ?>
        <tr>
            <td><?php echo !empty($data->trainer_name) ? ucwords($data->trainer_name) : '' ; ?></td>
            <?php for($i=1;$i<=12;$i++) {?>
                <td>
                    <?php 
                    $monthArr = !empty($data->feedbackMonth) ? explode(',', $data->feedbackMonth) : array();
                    if(in_array(($i),$monthArr)) { ?> 
                        <a href="<?php echo base_url('trainer/arhaticYogi/trainerFeedback/'.$data->user_id.'/'.($i).'/'.$selected_year);?>"><i class="fa fa-check"></i></a>
                    <?php } else { echo '-';} ?>
                </td>
            <?php } ?>
        </tr>
    <?php } ?>
<?php } ?>