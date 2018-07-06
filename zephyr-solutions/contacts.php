<?php 
    $description = "Ask us anything and we’ll respond within 24 hours. email us at info@zephyrsolutions.com.au or use our online contact form.";
    $title = "Contacts - Zephyr Solutions | Australia";
    include 'header.php'; 
?>

<div class="main-title-section-wrapper contacts">
    <div class="container">
        <div class="main-title-section">
            <h1>Contacts </h1>
            <div class="page-location"> 
                <a href="<?php echo $config['base_url']; ?>">Home</a> 
                <span class="fa fa-angle-double-right"></span> <span class="current">Contacts</span> 
            </div>
        </div>
    </div>
</div>

<!-- <div class="map-container">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d203131.14142349223!2d-121.95749508339199!3d37.296933002660595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fcae48af93ff5%3A0xb99d8c0aca9f717b!2sSan+Jose%2C+CA%2C+USA!5e0!3m2!1sen!2sin!4v1480406807464" width="100%" height="420" frameborder="0" style="border:0" allowfullscreen></iframe>
</div> -->
<div class="clearfix"></div>

<div class="container top-bottom-gap-2">
    <div class="row">
        <div class="col-sm-12">
            <div class="sound-finance">
                <div id="respond">
                    <form name="contactForm" id="contactForm" class="comment-form" action="controllers/index.php" method="POST">
                        <div class="clearfix"></div>
                        <h2 class="vc_custom_heading vcr_heading-right">What’s on your mind?</h2>
                        <p class="details-1">Drop us a note and we’ll get back to you soon.</p>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <p>
                                        <input name="name" id="name" type="text" placeholder="Name" class="form-control" />
                                    </p>
                                    <!-- <span class="error_msg">Please enter name</span> -->
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">   
                                    <p>
                                        <input name="email" id="email" type="text" placeholder="Email"  class="form-control" />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">  
                                    <p>
                                        <input name="phone" id="phone" type="text" placeholder="Phone" class="form-control" />
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">  
                                    <p>
                                        <input name="subject" id="subject" type="text" placeholder="Subject" class="form-control" />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">  
                                    <p>
                                        <textarea name="message" id="message" cols="5" rows="3" placeholder="Message" class="form-control" ></textarea>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <p class="form-submit text-center">
                                    <input type="submit" class="btn btn-default btn_1" value="Send" />
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="clearfix"></div>

<div class="row wpb_row vc_row-fluid vc_custom_1475127061591 vc_row-has-fill vc_row-o-content-middle vc_row-flex">
    <div class="contact-info-bottom wpb_column vc_column_container col-sm-12">
        <div class="vc_column-inner vc_custom_1474881177744">
            <div class="wpb_wrapper">
                <div class="row wpb_row vc_inner vc_row-fluid vc_row-o-equal-height vc_row-o-content-middle vc_row-flex">
                    <div class="wpb_column vc_column_container col-sm-12">
                        <div class="vc_column-inner vc_custom_1475835936659 text-center">
                            <div class="wpb_wrapper">
                                <span class="dt-sc-contact-info type1"><!-- <span class="icon icon-pointer"> </span>227 Marion Street Columbia, SC 29201 --> For more info please contact us</span>
                                <div class="dt-sc-contact-info type1"><span class="icon icon-mail"> </span>
                                    <a href="mailto:info@zephyrsolutions.com.au">info@zephyrsolutions.com.au</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="clearfix"></div>

<script src="js/inlines/contacts.js"></script>

<?php include 'footer.php'; ?>