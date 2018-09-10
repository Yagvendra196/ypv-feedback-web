<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><?php echo $page_title;?></h1>
    </div>
</div>
<div class="row" style="margin-bottom:20px;">    
    <div class="col-lg-3 col-md-6">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa fa-users fa-4x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge"><?php echo $total_arhatic_yogi; ?></div>
                        <div>Total Arhatic Yogi</div>
                    </div>
                </div>
            </div>
            <a href="<?php echo base_url('trainer/arhaticYogi'); ?>">
                <div class="panel-footer">
                    <span class="pull-left">View Details</span>
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                    <div class="clearfix"></div>
                </div>
            </a>
        </div>
    </div>
    <div class="col-lg-3 col-md-6">
        <div class="panel panel-green">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa fa-user-md fa-4x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge"><?php echo $total_arhatic_yogi_trainer; ?></div>
                        <div>Total Arhatic Yogi Trainer</div>
                    </div>
                </div>
            </div>
            <a href="<?php echo base_url('admin/users'); ?>">
                <div class="panel-footer">
                    <span class="pull-left">View Details</span>
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                    <div class="clearfix"></div>
                </div>
            </a>
        </div>
    </div>
    <div class="col-lg-3 col-md-6">
        <div class="panel panel-yellow">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa fa-user fa-4x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge"><?php echo $total_ypv_yogi_trainer; ?></div>
                        <div>Total YPV Yogi Trainer</div>
                    </div>
                </div>
            </div>
            <a href="#">
                <div class="panel-footer">
                    <span class="pull-left">View Details</span>
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                    <div class="clearfix"></div>
                </div>
            </a>
        </div>
    </div>
    <div class="col-lg-3 col-md-6">
        <div class="panel panel-red">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-xs-3">
                        <i class="fa fa-support fa-5x"></i>
                    </div>
                    <div class="col-xs-9 text-right">
                        <div class="huge"><?php echo $total_feedback; ?></div>
                        <div>Total Feedback</div>
                    </div>
                </div>
            </div>
            <a href="#">
                <div class="panel-footer">
                    <span class="pull-left">View Details</span>
                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                    <div class="clearfix"></div>
                </div>
            </a>
        </div>
    </div>            
</div>

<div class="row">
    <div class="col-lg-8">
        <div class="panel panel-default">
            <div class="panel-heading">
                <i class="fa fa-bar-chart-o fa-fw"></i> Bar Chart
            </div>
            <!-- /.panel-heading -->
            <div class="panel-body">
                <div class="row">
                    
                    <!-- /.col-lg-4 (nested) -->
                    <div class="col-lg-8">
                        <div id="morris-bar-chart"></div>
                    </div>
                    <!-- /.col-lg-8 (nested) -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.panel-body -->
        </div>
        <!-- /.panel -->
    </div>


    <div class="col-lg-4">
        <div class="panel panel-default">
            <div class="panel-heading">
                 Dashboard Details
            </div>
            <!-- /.panel-heading -->
            <div class="panel-body">
                <div class="list-group">
                    <a href="#" class="list-group-item">
                        <li>current month weekly feedback not given
                        <span class="pull-right text-muted small"><em>4</em>
                        </span></li>
                    </a>
                    <a href="#" class="list-group-item">
                        <li> current month weekly feedback given 
                        <span class="pull-right text-muted small"><em><?php echo $current_month_weekly_feedback_given; ?></em>
                        </span></li>
                    </a>
                    <a href="#" class="list-group-item">
                        <li> current month monthly feedback given 
                        <span class="pull-right text-muted small"><em>27</em>
                        </span></li>
                    </a>
                    <a href="#" class="list-group-item">
                        <li> current month monthly feedback not given 
                        <span class="pull-right text-muted small"><em>43</em>
                        </span></li>
                    </a>
                    <a href="#" class="list-group-item">
                        <li> current month monthly YPV Yogi Trainer feedback given
                        <span class="pull-right text-muted small"><em>11</em>
                        </span></li>
                    </a>
                    <a href="#" class="list-group-item">
                        <li> current month monthly YPV Yogi Trainer feedback not given
                        <span class="pull-right text-muted small"><em>13</em>
                        </span></li>
                    </a>
                </div>
                <!-- /.list-group -->
                <a href="#" class="btn btn-default btn-block">View All Details</a>
            </div>
            <!-- /.panel-body -->
        </div>
        <!-- /.panel -->
    </div>
</div><!-- /.row -->