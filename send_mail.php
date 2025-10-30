<?php

// Ustawienia odbiorcy
$to = "majstermagik@icloud.com"; // ZMIENIONY ADRES ODBIORCY NA MAJSTERMAGIK
$subject = "NOWA WIADOMOŚĆ ZE STRONY MAJSTERMAGIK";

// Odbiór danych z formularza (zgodnie z atrybutami name w Twoim HTML)
$name = $_POST["name"];
$client_email = $_POST["from"]; // Pole E-mail
$phone = $_POST["phone"]; // Pole Telefonu
$message = $_POST["msg"]; // Pole Treść wiadomości

// 1. Walidacja RODO (minimalna, po stronie serwera)
if (!isset($_POST['rodo'])) {
    header("Location: /index.html#kontakt?mail_status=error");
    exit;
}

// 2. Budowanie treści wiadomości
$txt = "Wysłano przez: " . $name . "\r\n";
$txt .= "Telefon: " . $phone . "\r\n";
$txt .= "Email: " . $client_email . "\r\n\r\n";
$txt .= "Treść wiadomości:\r\n" . $message;

// 3. Ustawienie nagłówków (poprawione dla lepszej dostarczalności)
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";
// Używamy adresu serwera, ale ustawiamy Reply-To na email klienta
$headers .= "From: Formularz Majstermagik <kontakt@majstermagik.pl>" . "\r\n"; 
$headers .= "Reply-To: " . $client_email . "\r\n";

// 4. Wysłanie maila
$mail_status = mail($to, $subject, $txt, $headers);

// 5. Przekierowanie zwrotne (na sekcję kontakt)
if ($mail_status) {
    header("Location: /index.html#kontakt?mail_status=sent");
} else {
    header("Location: /index.html#kontakt?mail_status=error");
}

?>