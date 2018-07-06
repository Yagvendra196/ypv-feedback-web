    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title"><?php echo $page_title;?></h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" id="form" name="form" method="post">
                            <input class="form-control" name="role_id" id="role_id" value="3" type="hidden" />
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="E-mail" name="username" id="username" type="text" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" name="password" id="password" type="password" value="">
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <button class="btn btn-lg btn-success btn-block" type="submit">Login</button>
                                <br/>
                                <a href="<?php echo base_url();?>users/forgotPassword" class="pull-right a1">FORGOT PASSWORD?</a>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="<?php echo $ContentUrl;?>external-js/user_login.js"></script>