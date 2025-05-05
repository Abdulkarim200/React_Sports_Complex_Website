<?php
require_once '../config/db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $required = ['name', 'email', 'subject', 'message'];
    $missing = array_diff($required, array_keys($data));
    
    if (empty($missing)) {
        // Save to database
        $stmt = $pdo->prepare("INSERT INTO contact_messages 
                              (name, email, phone, subject, message)
                              VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['name'],
            $data['email'],
            $data['phone'] ?? '',
            $data['subject'],
            $data['message']
        ]);
        
        // Send email notification (optional)
        $to = "admin@sportzone.com";
        $subject = "New Contact Message: " . $data['subject'];
        $message = "Name: " . $data['name'] . "\n";
        $message .= "Email: " . $data['email'] . "\n";
        $message .= "Phone: " . ($data['phone'] ?? 'N/A') . "\n\n";
        $message .= "Message:\n" . $data['message'];
        $headers = "From: " . $data['email'];
        
        mail($to, $subject, $message, $headers);
        
        http_response_code(201);
        echo json_encode(['message' => 'Message sent successfully']);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields', 'missing' => $missing]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>