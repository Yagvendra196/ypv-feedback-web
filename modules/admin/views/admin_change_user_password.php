<div class="row">
	<div class="col-lg-12">
	    <h1 class="page-header"><?php echo $page_title;?></h1>
	</div>
	<!-- /.col-lg-12 -->
</div>
<!-- /.row -->
<style type="text/css">

</style>
<div class="row ">
	<div class="col-sm-8 ">
		<?php if(validation_errors()){ ?>
			<div class="alert alert-danger">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<?php echo validation_errors(); ?></div>
		<?php } ?>
		<?php if($this->session->flashdata('changeUserPasswordSuccess')){ ?>
			<div class="alert alert-success">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<?php echo $this->session->flashdata('changeUserPasswordSuccess'); ?>
			</div>
		<?php } ?>

		<form id="form" name="form"  role="form" method="post" >

			<div class="form-group row ">
			    <label class="col-sm-4 control-label text-right" for="email">User Email</label>
			    <div class="col-sm-5">
				<input type="email" id="email" class=" form-control" name="email" maxlength="255" placeholder="User email" value="<?php echo set_value('email'); ?>"><div class="help-block"></div>
				</div>
			</div>

			<div class="form-group row ">
			    <label class="col-sm-4 control-label text-right" for="new_password">New Password</label>
			    <div class="col-sm-5">
					<input type="password" id="new_password" class="form-control" name="new_password" maxlength="255" placeholder="******"><div class="help-block"></div>
				</div>
			</div>

			<div class="form-group row ">
				<label class="col-sm-4 control-label text-right" for="confirm_new_password">Confirm New Password</label>
				<div class="col-sm-5">	    
				<input type="password" id="confirm_new_password" class="form-control" name="confirm_new_password" maxlength="255" placeholder="******"><div class="help-block"></div>
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
<script src="<?php echo $ContentUrl;?>external-js/admin_change_user_password.js"></script>




