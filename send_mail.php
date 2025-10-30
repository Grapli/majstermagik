<?php

$to = "majstermagik@icloud.com"; 
$subject = "NOWA WIADOMOŚĆ ZE STRONY MAJSTERMAGIK";

$name = $_POST["name"];
$client_email = $_POST["from"];
$phone = $_POST["phone"];
$message = $_POST["msg"]; 

if (!isset($_POST['rodo'])) {
    header("Location: /index.html#kontakt?mail_status=error");
    exit;
}

$txt = "Wysłano przez: " . $name . "\r\n";
$txt .= "Telefon: " . $phone . "\r\n";
$txt .= "Email: " . $client_email . "\r\n\r\n";
$txt .= "Treść wiadomości:\r\n" . $message;

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";

$headers .= "From: Formularz Majstermagik <kontakt@majstermagik.pl>" . "\r\n"; 
$headers .= "Reply-To: " . $client_email . "\r\n";


$mail_status = mail($to, $subject, $txt, $headers);

if ($mail_status) {
    header("Location: /index.html#kontakt?mail_status=sent");
} else {
    header("Location: /index.html#kontakt?mail_status=error");
}

?>