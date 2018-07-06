<?php if ($this->uri->segment('3')=='success') { ?>
<div class="row">
	<div class="col-lg-12">
	   <div class="alert alert-success">Successfully changed your password</div>
	</div>
	<!-- /.col-lg-12 -->
</div>
<?php } else { ?>

<div class="row">
	<div class="col-lg-12">
	    <h1 class="page-header"><?php echo $page_title;?></h1>
	</div>
	<!-- /.col-lg-12 -->
</div>
<!-- /.row -->

<div class="row ">
	<div class="col-sm-8 ">
		<form id="form" name="form"  role="form" method="post" >
			 <input class="form-control" name="token" id="token" value="<?php echo $this->uri->segment('3');?>" type="hidden" />
			 <input class="form-control" name="user_id" id="user_id"  value="<?php echo $this->uri->segment('4');?>" type="hidden" />
		<div class="form-group row ">
		    <label class="col-sm-4 control-label text-right" for="new_password">New Password</label>
		    <div class="col-sm-5">
				<input type="password" id="new_password" class="form-control" name="new_password" maxlength="255" placeholder="">
				<div class="help-block"><?php echo form_error('new_password');?></div>
			</div>
		</div>

		<div class="form-group row ">
			<label class="col-sm-4 control-label text-right" for="confirm_new_password">Confirm New Password</label>
			<div class="col-sm-5">	    
				<input type="password" id="confirm_new_password" class="form-control" name="confirm_new_password" maxlength="255" placeholder="">
				<div class="help-block"><?php echo form_error('confirm_new_password');?></div>
			</div>
		</div>

		<div class="form-group row">
			<div class="col-sm-9 text-center">	
				<button type="submit" class="btn btn-lg btn-success btn-block" name="user-button">Save</button>
			</div>
		</div>


		</form>

	</div>
</div>
<?php }  ?>	
<!-- /.row -->
<script src="<?php echo $ContentUrl;?>external-js/user_change_password_for_fogot_password.js"></script>




