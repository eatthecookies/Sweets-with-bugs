"use strict";


function toggleLike() {
    var heart = document.getElementById("btn1")
    if (heart.style.color == 'red') {
        heart.style.color = 'grey'; 
    
    } else {
        heart.style.color = 'red';  
    }
}


function truncationText(){
    var elements = document.querySelectorAll(".truncatedText");
    
    var maxlength = 20;
    for(let i = 0; i < elements.length; i++){
        var truncatedText = truncate(elements[i].textContent, maxlength);
        elements[i].textContent = truncatedText;
    }
}

function truncate(str, maxlength){
    if(str.length > maxlength){
        return str.slice(0, maxlength - 1) + '…';
    }else{
        return str
    }
}
function addToCartFromInfoDiv(button) {
    var parentElement = button.closest('.effect');
    // Получаем значения из элементов
    var h3Value = parentElement.querySelector('.info h3').textContent;
    var pValues = parentElement.querySelectorAll('.info p');
    var descriptionValue = pValues[0].textContent;
    var priceValue = pValues[1].textContent.replace('Цена: ', '');
    var imageSrcValue = parentElement.querySelector('img').getAttribute('src');
    // Вызываем функцию addToCart с полученными значениями
    addToCart(imageSrcValue, h3Value, descriptionValue, priceValue);

}

function addToCart(itemImage, itemName, itemDescription, itemPrice) {
    // Получаем информацию о товаре
    var cartItem = {
        image: itemImage,
        name: itemName,
        description: itemDescription,
        price: itemPrice,
        quantity: 2
    };
    // Получаем текущий массив корзины из localStorage
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = cartItems.find(item => item.name === cartItem.name);

    if (!existingItem) {
        cartItems.push(cartItem);
    } 
    // Сохраняем обновленную корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

