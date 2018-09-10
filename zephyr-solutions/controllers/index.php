<?php

require("../config/config.php");
require("../config/email.php");

/* send the submitted data */
$mail->From = $_POST['email'];
$mail->FromName = $_POST['name'];

$mail->AddAddress($config['admin_email'], $config['admin_name']);

$mail->Subject = "Zephyr Solutions - Contacts Us";

$message   = file_get_contents("../email_template/contacts.html");
$logo_url  = $config['base_url'] . "images/logo.png";
$image_url = $config['base_url'] . "images/";

$message = str_replace("[__NAME__]", $_POST['name'], $message);
$message = str_replace("[__EMAIL__]", $_POST['email'], $message);
$message = str_replace("[__PHONE__]", $_POST['phone'], $message);
$message = str_replace("[__SUBJECT__]", $_POST['subject'], $message);
$message = str_replace("[__MESSAGE__]", $_POST['message'], $message);
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