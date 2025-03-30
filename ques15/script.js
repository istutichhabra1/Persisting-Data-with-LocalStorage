let currentUser = null;
// Login User and Load Cart
function loginUser() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert("Username cannot be empty!");
        return;
    }
    currentUser = username;
    document.getElementById('cartSection').classList.remove('hidden');
    document.getElementById('username').disabled = true;
    loadCart();
}
// Load Cart from localStorage
function loadCart() {
    const cartTable = document.getElementById('cartTable');
    cartTable.innerHTML = "";
    let cartData = JSON.parse(localStorage.getItem('cart')) || {};
    let userCart = cartData[currentUser] || [];
    let totalCost = 0;
    userCart.forEach((item, index) => {
        let totalItemCost = item.price * item.quantity;
        totalCost += totalItemCost;
        cartTable.innerHTML += `
            <tr>
                <td>${item.itemName}</td>
                <td>$${item.price}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>$${totalItemCost}</td>
                <td>
                    <button onclick="removeItem(${index})">Remove</button>
                </td>
            </tr>
        `;
    });
    document.getElementById('totalCost').innerText = totalCost;
}
// Add Item to Cart
function addItem() {
    const itemName = document.getElementById('itemName').value.trim();
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
    if (!itemName || isNaN(itemPrice) || itemPrice <= 0 || isNaN(itemQuantity) || itemQuantity <= 0) {
        alert("Please enter valid item details!");
        return;
    }
    let cartData = JSON.parse(localStorage.getItem('cart')) || {};
    let userCart = cartData[currentUser] || [];
    userCart.push({ itemName, price: itemPrice, quantity: itemQuantity });
    cartData[currentUser] = userCart;
    localStorage.setItem('cart', JSON.stringify(cartData));
    loadCart();
}
// Update Quantity
function updateQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        alert("Quantity must be at least 1.");
        return;
    }
    let cartData = JSON.parse(localStorage.getItem('cart')) || {};
    let userCart = cartData[currentUser] || [];
    userCart[index].quantity = parseInt(newQuantity);
    cartData[currentUser] = userCart;
    localStorage.setItem('cart', JSON.stringify(cartData));
    loadCart();
}
// Remove Item from Cart
function removeItem(index) {
    let cartData = JSON.parse(localStorage.getItem('cart')) || {};
    let userCart = cartData[currentUser] || [];

    userCart.splice(index, 1);
    cartData[currentUser] = userCart;
    localStorage.setItem('cart', JSON.stringify(cartData));

    loadCart();
}
// Logout User
function logoutUser() {
    currentUser = null;
    document.getElementById('username').disabled = false;
    document.getElementById('cartSection').classList.add('hidden');
}
