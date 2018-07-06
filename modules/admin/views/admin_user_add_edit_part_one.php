 
<div class="col-lg-5" >
    <div class="panel-body" >               
        <div class="form-group row ">
            <label class="<?php echo $lableColClass[0];?> control-label" for="first_name">First Name</label>
            <div class="<?php echo $elementGroupColClass[0];?>">
                <input type="text" id="first_name" class="form-control" name="first_name" tabindex="1"  placeholder="First Name" 
                    value="<?php echo set_input('first_name','',$row);?>" />
                <div class="help-block"><?php echo form_error('first_name');?></div>
            </div>
        </div>


        <div class="form-group row ">
            <label class="<?php echo $lableColClass[0];?> control-label" for="email">Email</label>
            <div class="<?php echo $elementGroupColClass[0];?>">
                <input type="text" id="email" class="form-control" name="email" tabindex="3" placeholder="example@example.com" 
                    value="<?php echo set_input('email','',$row);?>"/>
                <div class="help-block"><?php echo form_error('email');?></div>
            </div>
        </div>


        <div class="form-group row ">
            <label class="<?php echo $lableColClass[0];?> control-label"  for="married-0">Married </label>
            <div class="<?php echo $elementGroupColClass[0];?>">
                <input type="hidden" name="married" value=""> 
                
                <?php 
                $marriedArr = array('1' => 'yes', '0' => 'no');
                $tabindex = "5";
                foreach ($marriedArr as $marriedArr_id => $marriedArr_val) { 
                    $marriedCheck = "";
                    if( isset($_POST['married']) ) {
                        if($_POST['married'] ==  $marriedArr_id)
                            $marriedCheck = "checked='checked'";
                    } else {
                        if( isset($row->married) ) {
                            if($row->married == $marriedArr_id)
                                $marriedCheck = "checked='checked'";
                        } else {
                            if ($marriedArr_id == 0)
                                $marriedCheck = "checked='checked'";
                        }
                    }
                ?>
                    <input type="radio" id="married-<?php echo $marriedArr_id; ?>" name="married" tabindex="<?php echo $tabindex; ?>" value="<?php echo $marriedArr_id; ?>" <?php echo $marriedCheck; ?> /> 
                    <label for="married-<?php echo $marriedArr_id; ?>"> <?php echo ucfirst($marriedArr_val); ?></label>
                <?php 
                $tabindex++;
                } ?>
                
                <div id="married_jquery_custome_error" class="help-block"><?php echo form_error('married');?></div>
            </div>
        </div>

        <div class="form-group row ">
            <label class="<?php echo $lableColClass[0];?> control-label"  for="gender-m">Gender <?php echo set_value('gender'); ?></label>
            <div class="<?php echo $elementGroupColClass[0];?>">
                <input type="hidden" name="gender" value="">  

                <?php 
                $genderArr = array('m' => 'male', 'f' => 'female');
                $tabindex = "7";
                foreach ($genderArr as $genderArr_id => $genderArr_val) { 
                    $genderCheck = "";
                    if( isset($_POST['gender']) ) {
                        if(strtolower($_POST['gender']) ==  $genderArr_id)
                            $genderCheck = "checked='checked'";
                    }
                    else {
                        if( isset($row->gender) ) {
                            if(strtolower($row->gender) == $genderArr_id)
                                $genderCheck = "checked='checked'";
                        }
                        else {
                            if ($genderArr_id == "m")
                                $genderCheck = "checked='checked'";
                        }
                    }
                ?>
                    <input type="radio" id="gender-<?php echo $genderArr_id; ?>" name="gender" tabindex="<?php echo $tabindex; ?>" value="<?php echo strtoupper($genderArr_id); ?>" <?php echo $genderCheck; ?> /> 
                    <label for="gender-<?php echo $genderArr_id; ?>"> <?php echo ucfirst($genderArr_val); ?></label>
                <?php 
                $tabindex++;
                } ?>

                <div id="gender_jquery_custome_error" class="help-block"><?php echo form_error('gender');?></div>
            </div>
        </div>

        <div class="form-group row ">
            <label class="<?php echo $lableColClass[0];?> control-label" for="phone1_1">Phone</label>
            <div class="<?php echo $elementGroupColClass[0];?>">
                <div class="field-phone1_1">
                    <span style='font-size:24px;float:left;'>(</span>
                        <input type="text" id="phone1_1" class="form-control" name="phone1_1" tabindex="12"  maxlength="3"
                            value="<?php echo set_input('phone1_1','',$row);?>"  placeholder="888" style="width:50px;float:left;"/>
                    <span style='font-size:24px;float:left'>)</span>
                </div>
                <div class="field-phone1_2">
                    <input type="text" id="phone1_2" class="form-control" name="phone1_2" tabindex="13"  maxlength="3"
                        value="<?php echo set_input('phone1_2','',$row);?>"  placeholder="888" style="width:50px;float:left"/><span style='font-size:24px;float:left'>-</span>
                </div>  
                <div class="field-phone1_3" >
                    <input type="text" id="phone1_3" class="form-control" name="phone1_3" tabindex="14"  maxlength="4"
                        value="<?php echo set_input('phone1_3','',$row);?>"  placeholder="8888" style="width:75px"/>
                </div> 
                <div id="phone_jquery_custome_error" class="help-block"><?php echo form_error('phone1_1');?><?php echo form_error('phone1_2');?><?php echo form_error('phone1_3');?></div>
            </div>
        </div>

        <div class="form-group row ">
            <label class="<?php echo $lableColClass[0];?> control-label" for="mobile_1">Mobile-1</label>
            <div class="<?php echo $elementGroupColClass[0];?>">
                <input type="text" id="mobile_1" class="form-control" tabindex="15" name="mobile_1" maxlength="10"
                    value="<?php echo set_input('mobile_1','',$row);?>" />
                <div class="help-block"><?php echo form_error('mobile_1');?></div>
            </div>
        </div>

        <div class="form-group row ">
            <label class="<?php echo $lableColClass[0];?> control-label" for="mobile_2">Mobile-2</label>
            <div class="<?php echo $elementGroupColClass[0];?>">
                <input type="text" id="mobile_2" class="form-control" tabindex="16" name="mobile_2" maxlength="10"
                    value="<?php echo set_input('mobile_2','',$row)>0?set_input('mobile_2','',$row):'';?>"  />
                <div class="help-block"><?php echo form_error('mobile_2');?></div>
            </div>
        </div>

        <div class="form-group row ">
            <label class="<?php echo $lableColClass[0];?> control-label"  for="level_id">Level</label>
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


        <input type="hidden" name="teacher" value="0"> 
        <?php 
        if ($this->session->userdata('action_of')=='super_admin') {
        if ($add && $this->Security->doesUserHasCapability('super_admin')) {?>
        <div class="form-group row ">
            <label class="<?php echo $lableColClass[0];?> control-label" for="">&nbsp;</label>
            <div class="<?php echo $elementGroupColClass[0];?>">
                <input type="checkbox" id="teacher" name="teacher" tabindex="18" value="1" <?php echo (set_input('teacher','',$row))?"checked='checked'":'';?> checked="checked" disabled="disabled" /> 
                <input type="hidden" name="teacher" value="1"> 
                <label for="teacher"><?php echo EXAMINER;?></label>
                <div id="teacher_jquery_custome_error" class="help-block"><?php echo form_error('teacher');?></div>
            </div>
        </div>
        <?php }
        }?>


        <?php 
        if ($this->session->userdata('action_of')=='examiner') { 

        if ( $this->Security->doesUserHasCapability('examiner') && $this->Security->doesUserHasCapability('super_admin')  ) { ?>
        <div class="form-group row ">
            <label class="<?php echo $lableColClass[0];?> control-label"  for="examiner_id"><?php echo EXAMINER;?></label>
            <div class="<?php echo $elementGroupColClass[0];?>">
                <select id="examiner_id" class="form-control" name="examiner_id[]" tabindex="19" multiple="multiple" size="4" <?php //if ($edit) { echo 'disabled';} ?> >
                <?php foreach ($examiners as $key => $examiner) { ?>
                    <option value="<?php echo $examiner->user_id;?>" <?php echo (in_array($examiner->user_id,set_input('examiner_id',array(),$row)))?'selected':'';?> ><?php echo $examiner->first_name;?></option>
                <?php } ?>
                </select>
                <div class="text-info">*Note: Press <b>Ctrl</b> button to select multiple trainers</div>
                <div class="help-block"><?php echo form_error('examiner_id');?></div>
            </div>
        </div>
        <?php } else if ( $this->Security->doesUserHasCapability('examiner') ) { ?>

        <input type="hidden" id="examiner_id" name="examiner_id[]" value="<?php echo $this->session->userdata('user_id');?>" >

        <?php }

        }?>
    </div>
</div> <!-- first column end -->

