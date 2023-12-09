
"use strict";
// Получаем текущий массив корзины из localStorage
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
// Отображаем товары из корзины на странице корзины
const cartElement = document.getElementById('cart');

cartItems.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'item';
    cartItemElement.innerHTML = `
        <div class="image">
            <img src="${item.image}">
        </div>
        <div class="details">
            <div class="description">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
            </div>
            <div class="quantity">
                <i class="fa fa-minus" onclick="changeQuantity('${item.name}', -1, this)"></i>
                <span>${item.quantity}</span>
                <i class="fa fa-plus" onclick="changeQuantity('${item.name}', 1)"></i>
            </div>
            <div class="price">
                <p>${item.price}</p>
            </div>
            <div class="corsina">
                <i class="fa fa-trash" onclick="removeItem('${item.name}')"></i>
            </div>
        </div>
    `;

    cartElement.appendChild(cartItemElement);
});

// Функция для изменения количества товара
function changeQuantity(itemName, change, clickedElement) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cartItems.find(item => item.name === itemName);
    const oldQuantity = cartItem.quantity;
    var totalPrice;
    if (cartItem) {
        // Проверяем, что количество товаров больше 1 перед уменьшением
        if (cartItem.quantity > 1 || change > 0) {
            cartItem.quantity += change;
            totalPrice =  (parseInt(cartItem.price.replace('р', '')) / oldQuantity ) * cartItem.quantity;
        }else {
        // Если количество равно 1 и кнопка "минус" неактивна, завершаем выполнение функции
        return;
        }
        cartItem.price = (`${totalPrice}р`);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        location.reload();

        // Получаем кнопку "минус" из родительского элемента
        const minusButton = clickedElement.previousElementSibling;
        toggleMinusButton(cartItem.quantity, minusButton);
    }
}
// Включаем или выключаем кнопку "минус" в зависимости от количества товаров
function toggleMinusButton(quantity, minusButton) {
    if (quantity > 1) {
        minusButton.disabled = false;
    } else {
        minusButton.disabled = true;
    }
}
// Функция для удаления товара из корзины
function removeItem(itemName) {
    const updatedCartItems = cartItems.filter(item => item.name !== itemName);

    // Обновляем localStorage с обновленным массивом корзины
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));

    // Перезагружаем страницу, чтобы обновить отображение
    location.reload();
}

// функция отчистки корзины
function clearCart() {
    localStorage.removeItem('cart');
    location.reload();
}
//функция сортировки
function sortCart(order) {
    const sortedCartItems = [...cartItems];

    sortedCartItems.sort(function (a, b) {
        const valueA = parseInt(a.price.replace('р', ''));
        const valueB = parseInt(b.price.replace('р', ''));

        if (order === 'asc') {
            return valueA - valueB;
        } else if (order === 'desc') {
            return valueB - valueA;
        }
    });

    // Обновляем localStorage с отсортированным массивом корзины
    localStorage.setItem('cart', JSON.stringify(sortedCartItems));

    // Перезагружаем страницу, чтобы обновить отображение
    location.reload();
}

