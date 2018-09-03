 
<div class="row" >
    <div class="panel-body">               
        <div class="col-lg-6">
            <div class="form-group">
                <label class="<?php echo $lableColClass[0];?> control-label" for="first_name">First Name<span class="text-danger">*</span></label>
                <div class="<?php echo $elementGroupColClass[0];?>">
                    <input type="text" id="first_name" class="form-control" name="first_name" tabindex="1"  placeholder="First Name" 
                        value="<?php echo set_input('first_name','',$row);?>" />
                    <div class="help-block"><?php echo form_error('first_name');?></div>
                </div>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="form-group">
                <label class="<?php echo $lableColClass[1];?> control-label" for="last_name">Last Name</label>
                <div class="<?php echo $elementGroupColClass[1];?>">
                    <input type="text" id="last_name" class="form-control" name="last_name" tabindex="2"  placeholder="Last Name" 
                        value="<?php echo set_input('last_name','',$row);?>" />
                    <div class="help-block"><?php echo form_error('last_name');?></div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="col-lg-6">
            <div class="form-group">
                <label class="<?php echo $lableColClass[0];?> control-label" for="email">Email<span class="text-danger">*</span></label>
                <div class="<?php echo $elementGroupColClass[0];?>">
                    <input type="text" id="email" class="form-control" name="email" tabindex="3" placeholder="example@example.com" 
                        value="<?php echo set_input('email','',$row);?>"/>
                    <div class="help-block"><?php echo form_error('email');?></div>
                </div>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="form-group">
                <label class="<?php echo $lableColClass[0];?> control-label"  for="level_id">Level<span class="text-danger">*</span></label>
                <div class="<?php echo $elementGroupColClass[0];?>">
                    <select id="level_id" class="form-control" name="level_id" tabindex="17" >
                    <option value="">Select Level</option>
                    <?php foreach ($levels as $key => $level) { ?>
                        <option value="<?php echo $level->level_id;?>" <?php echo (set_input('level_id','',$row)==$level->level_id)?'selected':'';?> ><?php echo $level->level_name;?></option>
                    <?php } ?>
                    </select>
                    <div class="help-block"><?php echo form_error('level_id');?></div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>

        <input type="hidden" name="teacher" value="0"> 
        <?php 
            if ($this->session->userdata('action_of')=='super_admin') {
                if ($add && $this->Security->doesUserHasCapability('super_admin')) {?>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="<?php echo $lableColClass[0];?> control-label" for="">&nbsp;</label>
                            <div class="<?php echo $elementGroupColClass[0];?>">
                                <input type="checkbox" id="teacher" name="teacher" tabindex="18" value="1" <?php echo (set_input('teacher','',$row))?"checked='checked'":'';?> checked="checked" disabled="disabled" /> 
                                <input type="hidden" name="teacher" value="1"> 
                                <label for="teacher"><?php echo EXAMINER;?></label>
                                <div id="teacher_jquery_custome_error" class="help-block"><?php echo form_error('teacher');?></div>
                            </div>
                        </div>
                    </div>
                <?php }
            }

            if ($this->session->userdata('action_of')=='examiner') { 

                if ( $this->Security->doesUserHasCapability('examiner') && $this->Security->doesUserHasCapability('super_admin')){ ?>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="<?php echo $lableColClass[0];?> control-label"  for="examiner_id"><?php echo EXAMINER;?><span class="text-danger">*</span></label>
                            <div class="<?php echo $elementGroupColClass[0];?>">
                                <select id="examiner_id" class="form-control" name="examiner_id[]" tabindex="19" multiple="multiple" size="8" <?php //if ($edit) { echo 'disabled';} ?> >
                                <?php foreach ($examiners as $key => $examiner) { ?>
                                    <option value="<?php echo $examiner->user_id;?>" <?php echo (in_array($examiner->user_id,set_input('examiner_id',array(),$row)))?'selected':'';?> ><?php echo $examiner->first_name;?></option>
                                <?php } ?>
                                </select>
                                <div class="text-info">*Note: Press <b>Ctrl</b> button to select multiple trainers</div>
                                <div class="help-block"><?php echo form_error('examiner_id');?></div>
                            </div>
                        </div>
                    </div>
                <?php } else if ( $this->Security->doesUserHasCapability('examiner') ) { ?>
                    <input type="hidden" id="examiner_id" name="examiner_id[]" value="<?php echo $this->session->userdata('user_id');?>" >
                    <?php 
                }
            }
        ?>  
        <?php /* ?>
            <div class="col-lg-6">
                <div class="form-group">
                    <label class="<?php echo $lableColClass[0];?> control-label" for="location">Location<span class="text-danger">*</span></label>
                    <div class="<?php echo $elementGroupColClass[0];?>">
                        <input type="text" id="location" class="form-control" name="location" tabindex="1"  placeholder="City name" 
                            value="<?php echo set_input('location','',$row);?>" />
                        <div class="help-block"><?php echo form_error('location');?></div>
                    </div>
                </div>
            </div>  
        <?php */ ?>
        <div class="col-lg-6"> 
            <div class="form-group">
                <label class="<?php echo $lableColClass[1];?> control-label" for="city">City<span class="text-danger">*</span></label>
                <div class="<?php echo $elementGroupColClass[1];?>">
                    <input type="text" id="city" class="form-control" tabindex="8" name="city" 
                        value="<?php echo set_input('city','',$row);?>" placeholder="City" />
                    <div class="help-block"><?php echo form_error('city');?></div>
                </div>
            </div>
        </div> 
        <div class="col-lg-6"> 
            <div class="form-group">
                <label class="<?php echo $lableColClass[1];?> control-label" for="participant">One Year Participant</label>
                <div class="<?php echo $elementGroupColClass[1];?>">
                    <input type="radio" id="" name="participant" tabindex="" value="1" /> 
                    <label for="participant"> Yes</label>
                    <input type="radio" id="" name="participant" tabindex="" value="0" checked/> 
                    <label for="participant">  No</label>
                </div>
            </div>
        </div>
        
        <?php if ($this->session->userdata('action_of')=='super_admin') { ?>
            <div class="clearfix"></div>
        <?php } ?>    
        
        <div class="col-lg-6 hide" id="yearField"> 
            <div class="form-group">
                <label class="<?php echo $lableColClass[1];?> control-label" for="city">Batch year</label>
                <div class="<?php echo $elementGroupColClass[0];?>">
                    <select id="batchYear" class="form-control" name="batchYear" tabindex="" >
                        <option value="">Select Batch Year</option>
                    </select>
                </div>
            </div>
        </div>&nbsp;
        <div class="col-lg-6"> 
            <div class="form-group">
                <label class="<?php echo $lableColClass[1];?> control-label" for="participant">Spritual Trainer</label>
                <div class="<?php echo $elementGroupColClass[1];?>">
                    <input type="radio" id="" name="spritual_trainer" tabindex="" value="1" /> 
                    <label for="spritual_trainer"> Yes</label>
                    <input type="radio" id="" name="spritual_trainer" tabindex="" value="0" checked/> 
                    <label for="spritual_trainer">  No</label>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>   
    </div>
</div> <!-- first column end -->

