<?php $moduleFolder = $this->config->item('modules_folders')['examiner'];?>
<?php if ($this->Security->doesUserHasCapability('examiner')) { ?>
    <div class="sidebar-nav navbar-collapse">
        <ul class="nav" id="side-menu-examiner">
            <!--
            <li>
                <a href="<?php echo $moduleFolder.'/'.STUDENT_FOLDER;?>"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
            </li>
            -->
            
            <li class="active" >
            <?php /*
                    class=" <?php echo $this->router->fetch_class()==STUDENT_FOLDER && $this->router->fetch_method()=='index'?'active':'';?>
                    <?php echo $this->router->fetch_class()=='users'&&$this->router->fetch_method()=='add_edit'?'active':'';?>"
                */ ?>
                <a href="#"><i class="fa fa-files-o fa-fw"></i> <?php echo STUDENTS;?><span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="<?php echo base_url($moduleFolder.'/'.STUDENT_FOLDER); ?>" class="<?php echo $this->router->fetch_class()==STUDENT_FOLDER && $this->router->fetch_method()=='index'?'active':'';?>" >All <?php echo STUDENT;?></a>
                    </li>
                    <li>
                        <a href="<?php echo base_url($this->config->item('modules_folders')['examiner'].'/'.$this->config->item('modules_folders')['student'].'/add_edit'); ?>" class="<?php echo $this->router->fetch_class()=='users'&&$this->router->fetch_method()=='add_edit'&&$this->session->userdata('action_of')=='examiner'?'active':'';?>">Add <?php echo STUDENT;?></a>
                    </li>
                </ul>
                <!-- /.nav-second-level -->
            </li>


        </ul>
    </div>
 <?php } ?>
