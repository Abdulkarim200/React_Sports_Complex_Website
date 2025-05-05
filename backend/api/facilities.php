<?php
require_once '../config/db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all facilities or single facility
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM facilities WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $facility = $stmt->fetch();
            
            if ($facility) {
                echo json_encode($facility);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Facility not found']);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM facilities");
            $facilities = $stmt->fetchAll();
            echo json_encode($facilities);
        }
        break;

    case 'POST':
        // Admin only - Add new facility
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (!empty($data['name']) && !empty($data['type'])) {
            $stmt = $pdo->prepare("INSERT INTO facilities (name, type, description, image_url, capacity, hourly_rate) 
                                  VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['name'],
                $data['type'],
                $data['description'] ?? '',
                $data['image_url'] ?? '',
                $data['capacity'] ?? 0,
                $data['hourly_rate'] ?? 0
            ]);
            
            http_response_code(201);
            echo json_encode(['message' => 'Facility created', 'id' => $pdo->lastInsertId()]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>