    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div style="margin-top:50px;margin-bottom:50px;width:100%;text-align:center;"><img src="assets/common/custom/images/logo.png"></div>
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title"><?php echo $page_title;?></h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" id="form" name="form" method="post" >
                            
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="E-mail" name="email" id="email" type="text" autofocus>
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <button class="btn btn-lg btn-success btn-block" id="submit" type="submit">Submit</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="<?php echo $ContentUrl;?>external-js/user_forgot_password.js"></script>