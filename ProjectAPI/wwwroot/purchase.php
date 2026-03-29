<?php
session_start();
require __DIR__ . '/../db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'You must be logged in to purchase.']);
    exit;
}

$user_id = $_SESSION['user_id'];
$product_id = intval($_POST['product_id'] ?? 0);
$quantity = intval($_POST['quantity'] ?? 0);

if ($quantity <= 0) {
    echo json_encode(['success' => false, 'message' => 'Quantity must be positive.']);
    exit;
}

$stmt = $conn->prepare("SELECT Inventory FROM products WHERE id=?");
$stmt->execute([$product_id]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$product) {
    echo json_encode(['success' => false, 'message' => 'Product does not exist.']);
    exit;
}

if ($quantity > $product['Inventory']) {
    echo json_encode(['success' => false, 'message' => 'Not enough inventory.']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO purchases (product_id, user_id, quantity) VALUES (?, ?, ?)");
$success = $stmt->execute([$product_id, $user_id, $quantity]);

if ($success) {
    $stmt = $conn->prepare("UPDATE products SET Inventory = Inventory - ? WHERE id=?");
    $stmt->execute([$quantity, $product_id]);

    echo json_encode(['success' => true, 'message' => 'Purchase successful!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Purchase failed.']);
}