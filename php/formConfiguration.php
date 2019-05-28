<?php

// enter the email address of where
// you want to receive the form submissions
$email_to = "susanmbernard@gmail.com";

// enter the email subject line
$email_subject = "Message from FTS Contact Form";

// Use HTML email or Plain text
// Set value to "HTML" or "Plain"
$email_type = "HTML";

// Use SMTP or try and use your servers default emailer
// set value to "yes" or "no"
$use_smtp = "yes";

// Use your own SMTP setting 
// or a free smtp hosts (mandrill.com, sendgrid.com or gmail.com)
$smtp_host = "smtp.googlemail.com";
$smtp_username = "finetechnology@gmail.com";
$smtp_password = "eljurnrsmalmrgmj";
$smtp_port = "465";

// Use ReCAPTCHA V2
// Generate your keys at: https://www.google.com/recaptcha/intro/index.html
// set value to "yes" or "no"
$use_recaptcha = "no";
$sitekey = "";
$privatekey = "";

// If you have problems getting SMTP to work
// switch on debugging output
// set value to "yes" or "no"
$smtp_debug = "no";

// If you require "ssl" or "tls", set the value below
$smtp_secure = "ssl";

// If you want to capture the users IP address
// set this to "yes" or set it to "no"
$show_users_ip = "yes";

// Use GDPR or require consent
$use_gdpr = "no";
?>