<?php

require("../library/phpmailer/class.phpmailer.php");

$mail = new PHPMailer();

// ================= DO NOT CHANGE ANYTHING IN THIS SECTION =====================

$mail->IsSMTP();

$mail->Host     = "smtp.emailsrvr.com";
$mail->Username = "info@zephyrsolutions.com.au";
$mail->SMTPAuth = true;
$mail->Password = "QWE@#!Aswe";
$mail->WordWrap = 50;

$mail->IsHTML(true);

// ================= DO NOT CHANGE ANYTHING IN THIS SECTION =====================

?>
