<?php if(!empty($feedbackSummaryData)) { ?>
    <?php foreach ($feedbackSummaryData as $k => $data) { ?>
        <tr>
            <td><?php echo !empty($data->trainer_name) ? ucwords($data->trainer_name) : '' ; ?></td>
            <td>
                <?php if($data->feedbackGiven && $data->feedbackGiven == 1) { ?> 
                    <a href="<?php echo base_url('trainer/arhaticYogi/trainerFeedback/'.$data->user_id.'/'.$selected_month.'/'.$selected_year);?>"><i class="fa fa-check"></i></a>
                <?php } else { echo '-';} ?>
            </td>
        </tr>
    <?php } ?>
<?php } ?>