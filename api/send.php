<?php

$token = "8248208199:AAHLyg3eCN0u9D0-ZKIAmR6T6lPLAF06wdg";
$chat_id = "7105309679";

$name = $_POST['name'] ?? '-';
$phone = $_POST['phone'] ?? '-';
$city = $_POST['city'] ?? '-';
$telegram = $_POST['telegram'] ?? '-';
$comment = $_POST['comment'] ?? '-';

$text = "📩 Новая заявка\n\n";
$text .= "👤 Имя: $name\n";
$text .= "📞 Телефон: $phone\n";
$text .= "🏙 Город: $city\n";
$text .= "💬 Telegram: $telegram\n";
$text .= "📝 Комментарий: $comment\n";

$url = "https://api.telegram.org/bot$token/sendMessage";

$data = [
    'chat_id' => $chat_id,
    'text' => $text,
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    ],
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo json_encode(['success' => true]);
