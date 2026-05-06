<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "MalikNomanStore");

if ($conn->connect_error) die(json_encode(["status" => "error"]));

$data = json_decode(file_get_contents("php://input"), true);
$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$item = $conn->real_escape_string($data['item']);

$sql = "INSERT INTO orders (customer_name, customer_email, item_ordered) VALUES ('$name', '$email', '$item')";

if ($conn->query($sql)) {
    echo json_encode(["status" => "success", "order_id" => $conn->insert_id]);
} else {
    echo json_encode(["status" => "error"]);
}
$conn->close();
?>