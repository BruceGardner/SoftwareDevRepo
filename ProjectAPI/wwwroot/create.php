<?php if (isset($_SESSION['user_id'])): ?>
<h2>Create a Product</h2>
<form id="create-product-form">
    ...
</form>
<?php else: ?>
<p>Please log in to create products.</p>
<?php endif; ?>