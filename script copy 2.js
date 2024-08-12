const fruits = [
    { id: 1, name: "Alma", src: "./images/apple.jpg" },
    { id: 2, name: "Banan", src: "./images/banana.jpg" },
    { id: 3, name: "Limon", src: "./images/lemon.jpg" },
    { id: 4, name: "Albalı", src: "./images/cherry.jpg" },
    { id: 5, name: "Armud", src: "./images/pear.jpg" },
    { id: 7, name: "Nar", src: "./images/pomegranate.jpg" },
];

const ui = {
    cartList: document.querySelector(".cart-list"),
    rightCount: document.querySelector("#right-count"),
    wrongCount: document.querySelector("#wrong-count"),
    randomCartName: document.querySelector("#random-cart-name"),
};

function createCart(fruit) {
    const cart = document.createElement('div');
    cart.className = 'border border-black w-full bg-white size-[200px]';
    cart.dataset.fruitId = fruit.id;

    const img = document.createElement('img');
    img.src = fruit.src;
    img.alt = fruit.name;
    img.className = 'w-full object-cover hidden';

    cart.appendChild(img);
    return cart;
}

function updateRandomCartName() {
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    ui.randomCartName.textContent = randomFruit.name;
}

function handleCartClick(event) {
    const clickedCart = event.target.closest('div[data-fruit-id]');
    if (!clickedCart) return;

    const fruitId = +clickedCart.dataset.fruitId;
    const clickedFruit = fruits.find(fruit => fruit.id === fruitId);

    if (clickedFruit.name === ui.randomCartName.textContent) {
        ui.rightCount.textContent = +ui.rightCount.textContent + 1;
        clickedCart.querySelector('img').classList.toggle('hidden');
    } else {
        ui.wrongCount.textContent = +ui.wrongCount.textContent + 1;
        clickedCart.classList.add('bg-red-300')
    }

    setTimeout(resetGame, 1000);
}

function resetGame() {
    updateRandomCartName();
    ui.cartList.innerHTML = "";
    createCartsList();
}

function createCartsList() {
    const fragment = document.createDocumentFragment();
    fruits.forEach(fruit => {
        fragment.appendChild(createCart(fruit));
    });
    ui.cartList.appendChild(fragment);
}

ui.cartList.addEventListener("click", handleCartClick);

updateRandomCartName();
createCartsList();
