<?php

require("../config/config.php");
require("../config/email.php");

/* send the submitted data */
$mail->From = 'gagankumar.pandya@galaxyweblinks.in';
$mail->FromName = 'GWL-GP';

$mail->AddAddress('gagankumar.pandya@galaxyweblinks.in', 'ADMIN-GP');

$mail->Subject = "Zephyr Solutions - Contacts Us";

$message   = file_get_contents("../email_template/contacts.html");
$logo_url  = $config['base_url'] . "images/logo.png";
$image_url = $config['base_url'] . "images/";

$message = str_replace("[__NAME__]", "Test Name", $message);
$message = str_replace("[__EMAIL__]", "Test Email", $message);
$message = str_replace("[__PHONE__]", "0123456789", $message);
$message = str_replace("[__SUBJECT__]", "Test Subject", $message);
$message = str_replace("[__MESSAGE__]", "Test Message", $message);
$message = str_replace("[__LOGO_URL__]", $logo_url, $message);
$message = str_replace("[__IMAGE_URL__]", $image_url, $message);
$message = str_replace("[__SITE_URL__]", $config['base_url'], $message);

$mail->Body = $message;

if (!$mail->Send()) {
    $flash_msg = "Error";
} else {
    $flash_msg = "Success";
}

/* Redirect browser */
header("Location: " . $config['base_url'] . "contacts-success.php?message=" . $flash_msg . "#respond");
exit();

?>