const fruits = [
    { id: 1, name: "Alma", src: "./images/apple.jpg" },
    { id: 2, name: "Banan", src: "./images/banana.jpg" },
    { id: 3, name: "Limon", src: "./images/lemon.jpg" },
    { id: 4, name: "Albalı", src: "./images/cherry.jpg" },
    { id: 5, name: "Armud", src: "./images/pear.jpg" },
    { id: 7, name: "Nar", src: "./images/pomegranate.jpg" },
];

let selectedCart = false;

let attempt = 0;

const ui = {
    cartList: document.querySelector(".cart-list"),
    rightCount: document.querySelector("#right-count"),
    wrongCount: document.querySelector("#wrong-count"),
    randomCartName: document.querySelector("#random-cart-name"),
};

function createCart(fruit) {
    const cart = document.createElement("div");
    cart.className =
        "border border-black w-full bg-white h-48 flex justify-center items-center rounded-lg shadow-lg";
    cart.dataset.fruitId = fruit.id;

    const img = document.createElement("img");
    img.src = fruit.src;
    img.alt = fruit.name;
    img.className = "p-4 max-h-full object-contain hidden";

    cart.appendChild(img);
    return cart;
}

function updateRandomCartName() {
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    ui.randomCartName.textContent = randomFruit.name;
}

function handleCartClick(event) {
    if (selectedCart) return;
    if (attempt === 9) {
        tryAgain();
        const tryAgainButton = document.querySelector("#try-again");
        if (tryAgainButton) {
            tryAgainButton.addEventListener("click", () => {
                window.location.reload();
            });
        }
        return;
    }

    selectedCart = true;
    attempt++;

    const clickedCart = event.target.closest("div[data-fruit-id]");
    if (!clickedCart) return;

    const fruitId = +clickedCart.dataset.fruitId;
    const clickedFruit = fruits.find((fruit) => fruit.id === fruitId);
    clickedCart.querySelector("img").classList.toggle("hidden");

    if (clickedFruit.name === ui.randomCartName.textContent) {
        ui.rightCount.textContent = +ui.rightCount.textContent + 1;
        clickedCart.classList.add("bg-green-300");
    } else {
        ui.wrongCount.textContent = +ui.wrongCount.textContent + 1;
        clickedCart.classList.add("bg-red-300");
    }

    setTimeout(resetGame, 1000);
}

function tryAgain() {
    ui.randomCartName.innerHTML = ""
    ui.cartList.innerHTML = `
    <div class='w-full flex justify-center items-center'>
    <button id='try-again' class='bg-blue-300 px-4 py-2 rounded border-blue-700'>Yenidən cəhd edin</button>
    </div>`;
}

function resetGame() {
    selectedCart = false;
    updateRandomCartName();
    ui.cartList.innerHTML = "";
    createCartsList();
}

function createCartsList() {
    const fragment = document.createDocumentFragment();
    fruits.forEach((fruit) => {
        fragment.appendChild(createCart(fruit));
    });
    ui.cartList.appendChild(fragment);
}

ui.cartList.addEventListener("click", handleCartClick);

updateRandomCartName();
createCartsList();
