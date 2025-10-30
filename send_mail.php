<?php

// 1. Odbiór danych z formularza
$name = $_POST["name"];
// Zmieniono z "email" na "from", aby było spójne z formularzem HTML
$from = $_POST["from"]; 
$phone = $_POST["phone"]; // Odbieramy numer telefonu

// 2. Dane statyczne
// ZMIEŃ TO NA WŁAŚCIWY ADRES E-MAIL MAJSTERMAGIK
$to = "majstermagik@icloud.com"; 
$subject = "Zapytanie ze strony: " . $name;
$site_name = "majstermagik.pl"; // Użyj nazwy strony w treści

// 3. Budowanie treści wiadomości
$txt = "Wiadomość ze strony " . $site_name . "\r\n";
$txt .= "---------------------------------------\r\n";
$txt .= "Imię: " . $name . "\r\n";
$txt .= "Telefon: " . $phone . "\r\n"; // DODANO NUMER TELEFONU
$txt .= "Email: " . $from . "\r\n";
$txt .= "---------------------------------------\r\n";
$txt .= "Treść wiadomości:\r\n" . $_POST["msg"];

// 4. Ustawienie nagłówków (Headers)
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";
// Zmieniono nadawcę, aby zwiększyć szanse na dostarczenie (używamy serwera)
$headers .= "From: Formularz Kontaktowy <majstermagik@icloud.com>" . "\r\n"; 
$headers .= "Reply-To: " . $from . "\r\n";

// 5. Wysłanie maila
$mail_status = mail($to, $subject, $txt, $headers);

// 6. Przekierowanie zwrotne (pamiętaj o pełnej ścieżce jeśli strona jest w subfolderze)
if ($mail_status) {
    header("Location: /index.html?mail_status=sent");
} else {
    header("Location: /index.html?mail_status=error");
}

?>