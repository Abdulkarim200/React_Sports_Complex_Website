<?php
require_once '../config/db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all bookings or bookings for a specific user
        if (isset($_GET['email'])) {
            $stmt = $pdo->prepare("SELECT b.*, f.name as facility_name 
                                 FROM bookings b
                                 JOIN facilities f ON b.facility_id = f.id
                                 WHERE b.email = ?");
            $stmt->execute([$_GET['email']]);
            $bookings = $stmt->fetchAll();
            echo json_encode($bookings);
        } else {
            // Admin view - all bookings
            $stmt = $pdo->query("SELECT b.*, f.name as facility_name 
                               FROM bookings b
                               JOIN facilities f ON b.facility_id = f.id");
            $bookings = $stmt->fetchAll();
            echo json_encode($bookings);
        }
        break;

    case 'POST':
        // Create new booking
        $data = json_decode(file_get_contents("php://input"), true);
        
        $required = ['facility_id', 'name', 'email', 'phone', 'booking_date', 'timeslot'];
        $missing = array_diff($required, array_keys($data));
        
        if (empty($missing)) {
            // Check availability first
            $stmt = $pdo->prepare("SELECT id FROM bookings 
                                  WHERE facility_id = ? 
                                  AND booking_date = ? 
                                  AND timeslot = ?");
            $stmt->execute([$data['facility_id'], $data['booking_date'], $data['timeslot']]);
            
            if ($stmt->fetch()) {
                http_response_code(409);
                echo json_encode(['error' => 'Timeslot already booked']);
            } else {
                $stmt = $pdo->prepare("INSERT INTO bookings 
                                      (facility_id, name, email, phone, booking_date, timeslot, duration, special_requests)
                                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $data['facility_id'],
                    $data['name'],
                    $data['email'],
                    $data['phone'],
                    $data['booking_date'],
                    $data['timeslot'],
                    $data['duration'] ?? 1,
                    $data['special_requests'] ?? ''
                ]);
                
                http_response_code(201);
                echo json_encode(['message' => 'Booking created', 'id' => $pdo->lastInsertId()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields', 'missing' => $missing]);
        }
        break;

    case 'DELETE':
        // Cancel booking
        parse_str(file_get_contents("php://input"), $data);
        
        if (!empty($data['id'])) {
            $stmt = $pdo->prepare("DELETE FROM bookings WHERE id = ?");
            $stmt->execute([$data['id']]);
            
            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Booking cancelled']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Booking not found']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Booking ID required']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>