        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="<?php echo $moduleFolder;?>/users"><?php echo $title;?></a>
            </div>
            <!-- /.navbar-header -->

            <ul class="nav navbar-top-links navbar-right">
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <?php /*
                            <li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a></li>
                            <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a></li>
                        */ ?>
                        <li><a href="<?php echo base_url($moduleFolder.'/users/changePassword'); ?>"><i class="fa fa-gear fa-fw"></i> Change Password</a></li>
                        <?php if ($this->Security->doesUserHasCapability('super_admin')) { ?>
                            <li><a href="<?php echo base_url($moduleFolder.'/users/changeUserPassword'); ?>"><i class="fa fa-gear fa-fw"></i> Change User Password</a></li>
                        <?php } ?>
                        <li class="divider"></li>
                        <li><a href="<?php echo base_url('api/userServices/logout'); ?>"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">
            <?php if ($this->Security->doesUserHasCapability('super_admin')) { ?>
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu-super_admin">
                        <!--
                        <li>
                            <a href="<?php //echo $moduleFolder;?>/users"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>
                        -->
                        
                        <li class="active" >
                        <?php /* class=" <?php echo $this->router->fetch_class()=='users'&&$this->router->fetch_method()=='index'?'active':'';?>
                                   <?php echo $this->router->fetch_class()=='users'&&$this->router->fetch_method()=='add_edit'?'active':'';?>"
                         */ ?>
                            <a href="#"><i class="fa fa-files-o fa-fw"></i> <?php echo EXAMINERS;?><span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="<?php echo base_url($moduleFolder.'/users'); ?>" class="<?php echo $this->router->fetch_class()=='users'&&$this->router->fetch_method()=='index'?'active':'';?>" >All <?php echo EXAMINER;?></a>
                                </li>
                                <li>
                                    <a href="<?php echo base_url($moduleFolder.'/'.EXAMINER.'/add_edit'); ?>" class="<?php echo $this->router->fetch_class()=='users'&&$this->router->fetch_method()=='add_edit'&&$this->session->userdata('action_of')=='super_admin'?'active':'';?>">Add <?php echo EXAMINER; ?></a>
                                </li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                    </ul>
                </div>
            <?php } ?>

            <?php
                $this->load->add_package_path(EXAMINER_PATH);
                //$examinerData = array('moduleFolder'=>$this->config->item('modules_folders')['examiner']);
                $this->load->view('includes/navigations.php');
            ?>

                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>