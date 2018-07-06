
<div class="col-lg-5" > <!-- Second column -->
    <div class="panel-body" >
        <div class="form-group row ">
            <label class="<?php echo $lableColClass[1];?> control-label" for="last_name">Last Name</label>
            <div class="<?php echo $elementGroupColClass[1];?>">
                <input type="text" id="last_name" class="form-control" name="last_name" tabindex="2"  placeholder="Last Name" 
                    value="<?php echo set_input('last_name','',$row);?>" />
                <div class="help-block"><?php echo form_error('last_name');?></div>
            </div>
        </div>


        <div class="form-group row ">
            <label class="<?php echo $lableColClass[1];?> control-label" for="dob">Date of birth</label>
            <div class="<?php echo $elementGroupColClass[1];?>">   
                <input type="text" id="dob" class="form-control" name="dob" tabindex="4" readOnly="readOnly"
                    value="<?php echo (set_input('dob','',$row))?date('M d, Y h:i:s A', strtotime(set_input('dob','',$row))):"";?>"  />
                <div class="help-block"><?php echo form_error('dob');?></div>
            </div>
        </div>



        <div class="form-group row ">
            <label class="<?php echo $lableColClass[1];?> control-label"  for="address">Address</label>
            <div class="<?php echo $elementGroupColClass[1];?>">
                <textarea id="address" rows="3"  class="form-control" tabindex="7" 
                    name="address"><?php echo set_input('address','',$row);?></textarea>
                <div class="help-block"><?php echo form_error('address');?></div>
            </div>
        </div>

        <div class="form-group row ">
            <label class="<?php echo $lableColClass[1];?> control-label"  for="city"  >City</label>
            <div class="<?php echo $elementGroupColClass[1];?>">
                <input type="text" id="city" class="form-control" tabindex="8" name="city" 
                    value="<?php echo set_input('city','',$row);?>" />
                <div class="help-block"><?php echo form_error('city');?></div>
            </div>
        </div>



        <div class="form-group row ">
            <label class="<?php echo $lableColClass[1];?> control-label"  for="state" >State</label>
            <div class="<?php echo $elementGroupColClass[1];?>">
                <input type="text" id="state" class="form-control" tabindex="9" name="state" 
                    value="<?php echo set_input('state','M.P.',$row);?>" />
                <div class="help-block"><?php echo form_error('state');?></div>
            </div>
        </div>

        <div class="form-group row ">
            <label class="<?php echo $lableColClass[1];?> control-label"  for="country_id">Country</label>
            <div class="<?php echo $elementGroupColClass[1];?>">
                <select id="country_id" class="form-control" name="country_id" tabindex="10" onchange="getStates(this.value)"></select>
                <div class="help-block"><?php echo form_error('country_id');?></div>
            </div>
        </div>

        <div class="form-group row ">
            <label class="<?php echo $lableColClass[1];?> control-label" for="pin_code">Pin Code</label>
            <div class="<?php echo $elementGroupColClass[1];?>">
                <!-- http://formvalidation.io/validators/zipCode/ -->
                <input type="text" id="pin_code" class="form-control" tabindex="11" name="pin_code"  maxlength="9"
                    value="<?php echo set_input('pin_code','',$row);?>" />
                <div class="help-block"><?php echo form_error('pin_code');?></div>
            </div>
        </div>
   </div>
 </div>  <!-- Second column -->
