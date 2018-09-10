<div class="row">
	<div class="col-lg-12">
	    <h1 class="page-header"><?php echo $page_title;?></h1>
	</div>
	<!-- /.col-lg-12 -->
</div>
<!-- /.row -->

<div class="row ">
	<div class="col-sm-8 ">
	<div class="alert alert-success hide">Password successfully changed</div>

		<form id="form" name="form"  role="form" method="post" >

		<div class="form-group row ">
		    <label class="col-sm-4 control-label text-right" for=" current_password">Current Password</label>
		    <div class="col-sm-5">
			<input type="password" id="current_password" class=" form-control" name="current_password" maxlength="255" placeholder=""><div class="help-block"></div>
			</div>
		</div>

		<div class="form-group row ">
		    <label class="col-sm-4 control-label text-right" for="new_password">New Password</label>
		    <div class="col-sm-5">
				<input type="password" id="new_password" class="form-control" name="new_password" maxlength="255" placeholder=""><div class="help-block"></div>
			</div>
		</div>

		<div class="form-group row ">
			<label class="col-sm-4 control-label text-right" for="confirm_new_password">Confirm New Password</label>
			<div class="col-sm-5">	    
			<input type="password" id="confirm_new_password" class="form-control" name="confirm_new_password" maxlength="255" placeholder=""><div class="help-block"></div>
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
<!-- /.row -->
<script src="<?php echo $ContentUrl;?>external-js/admin_change_password.js"></script>




