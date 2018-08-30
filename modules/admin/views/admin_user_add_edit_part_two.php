<hr>
<h4><a data-toggle="collapse" data-target="#additional" href="JavaScript:void(0);"><i class="fa fa-cog" aria-hidden="true"></i> Additional Fields</a></h4>

<div id="additional" class="collapse">
<div class="row" > <!-- Second column -->
    <div class="panel-body" >
        <div class="col-lg-6">
            <div class="form-group">
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
        </div>
        <div class="col-lg-6"> 
            <div class="form-group">
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
        </div>
        <div class="col-lg-6"> 
            <div class="form-group">
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
        </div>
        <div class="col-lg-6"> 
            <div class="form-group">
                <label class="<?php echo $lableColClass[0];?> control-label" for="mobile_1">Mobile-1</label>
                <div class="<?php echo $elementGroupColClass[0];?>">
                    <input type="text" id="mobile_1" class="form-control" tabindex="15" name="mobile_1" maxlength="10"
                        value="<?php echo set_input('mobile_1','',$row);?>" placeholder="Mobile Number" />
                    <div class="help-block"><?php echo form_error('mobile_1');?></div>
                </div>
            </div>
        </div>
        <div class="col-lg-6"> 
            <div class="form-group">
                <label class="<?php echo $lableColClass[0];?> control-label" for="mobile_2">Mobile-2</label>
                <div class="<?php echo $elementGroupColClass[0];?>">
                    <input type="text" id="mobile_2" class="form-control" tabindex="16" name="mobile_2" maxlength="10"
                        value="<?php echo set_input('mobile_2','',$row)>0?set_input('mobile_2','',$row):'';?>" placeholder="Mobile Number" />
                    <div class="help-block"><?php echo form_error('mobile_2');?></div>
                </div>
            </div>
        </div>
        <div class="col-lg-6"> 
            <div class="form-group">
                <label class="<?php echo $lableColClass[1];?> control-label" for="dob">Date of birth</label>
                <div class="<?php echo $elementGroupColClass[1];?>">   
                    <input type="text" id="dob" class="form-control" name="dob" tabindex="4" readOnly="readOnly"
                        value="<?php echo (set_input('dob','',$row))?date('M d, Y h:i:s A', strtotime(set_input('dob','',$row))):"";?>" placeholder="Date of Birth" />
                    <div class="help-block"><?php echo form_error('dob');?></div>
                </div>
            </div>
        </div>
        <div class="col-lg-6"> 
            <div class="form-group">
                <label class="<?php echo $lableColClass[1];?> control-label"  for="address">Address</label>
                <div class="<?php echo $elementGroupColClass[1];?>">
                    <textarea id="address" rows="3"  class="form-control" tabindex="7" 
                        name="address"><?php echo set_input('address','',$row);?></textarea>
                    <div class="help-block"><?php echo form_error('address');?></div>
                </div>
            </div>  
        </div>
        <?php /* ?>
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
        <?php */ ?>
        <div class="col-lg-6"> 
            <div class="form-group">
                <label class="<?php echo $lableColClass[1];?> control-label"  for="state" >State</label>
                <div class="<?php echo $elementGroupColClass[1];?>">
                    <input type="text" id="state" class="form-control" tabindex="9" name="state" 
                        value="<?php echo set_input('state','M.P.',$row);?>" />
                    <div class="help-block"><?php echo form_error('state');?></div>
                </div>
            </div>
        </div>
        <div class="col-lg-6"> 
            <div class="form-group">
                <label class="<?php echo $lableColClass[1];?> control-label"  for="country_id">Country</label>
                <div class="<?php echo $elementGroupColClass[1];?>">
                    <select id="country_id" class="form-control" name="country_id" tabindex="10" onchange="getStates(this.value)"></select>
                    <div class="help-block"><?php echo form_error('country_id');?></div>
                </div>
            </div>
        </div>
        <div class="col-lg-6"> 
            <div class="form-group">
                <label class="<?php echo $lableColClass[1];?> control-label" for="pin_code">Pin Code</label>
                <div class="<?php echo $elementGroupColClass[1];?>">
                    <!-- http://formvalidation.io/validators/zipCode/ -->
                    <input type="text" id="pin_code" class="form-control" tabindex="11" name="pin_code"  maxlength="9"
                        value="<?php echo set_input('pin_code','',$row);?>" placeholder="Area Pin Code" />
                    <div class="help-block"><?php echo form_error('pin_code');?></div>
                </div>
            </div>
        </div>

   </div>
 </div>  <!-- Second column -->
</div>


