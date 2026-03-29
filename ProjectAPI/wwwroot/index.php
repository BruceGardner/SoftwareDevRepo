<?php
session_start();
require __DIR__ . '/../db.php'; // adjust path if needed

// Handle login
$loginMessage = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $password === $user['password']) { // plaintext for now
        $_SESSION['user_id'] = $user['id'];
        $loginMessage = 'Logged in successfully!';
    } else {
        $loginMessage = 'Invalid email or password.';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit;
}

// Handle product creation
$productMessage = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create_product'])) {
    if (!isset($_SESSION['user_id'])) {
        $productMessage = 'You must be logged in to create a product.';
    } else {
        $name = $_POST['product_name'] ?? '';
        $price = intval($_POST['product_price'] ?? 0);
        $inventory = intval($_POST['product_inventory'] ?? 0);

        $stmt = $conn->prepare("INSERT INTO products (Name, Price, Inventory) VALUES (?, ?, ?)");
        if ($stmt->execute([$name, $price, $inventory])) {
            $productMessage = "Product created with ID: " . $conn->lastInsertId();
        } else {
            $productMessage = "Failed to create product.";
        }
    }
}

// Load products
$products = $conn->query("SELECT * FROM products ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product Manager</title>
</head>
<body>

<?php if (!isset($_SESSION['user_id'])): ?>
    <h2>Login</h2>
    <form method="POST">
        <input type="hidden" name="login" value="1">
        <label>Email: <input type="email" name="email" required></label><br>
        <label>Password: <input type="password" name="password" required></label><br>
        <button type="submit">Login</button>
    </form>
    <?php if ($loginMessage) echo "<p>$loginMessage</p>"; ?>
<?php else: ?>
    <p>Logged in as user ID: <?php echo $_SESSION['user_id']; ?> 
    <a href="?logout=1">Logout</a></p>

    <h2>Create a Product</h2>
    <form method="POST">
        <input type="hidden" name="create_product" value="1">
        <label>Name: <input type="text" name="product_name" required></label><br>
        <label>Price: <input type="number" name="product_price" required></label><br>
        <label>Inventory: <input type="number" name="product_inventory" required></label><br>
        <button type="submit">Create Product</button>
    </form>
    <?php if ($productMessage) echo "<p>$productMessage</p>"; ?>
<?php endif; ?>

<h1>Products:</h1>
<ul>
    <?php foreach ($products as $p): ?>
        <li><?php echo htmlspecialchars($p['Name']); ?> - $<?php echo $p['Price']; ?> - Stock: <?php echo $p['Inventory']; ?></li>
    <?php endforeach; ?>
</ul>

</body>
</html>