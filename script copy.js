const fruits = [
    {
        id: 1,
        name: "Alma",
        src: "./images/apple.jpg",
    },
    {
        id: 2,
        name: "Banan",
        src: "./images/banana.jpg",
    },
    {
        id: 3,
        name: "Limon",
        src: "./images/lemon.jpg",
    },
    {
        id: 4,
        name: "Albalı",
        src: "./images/cherry.jpg",
    },
    {
        id: 5,
        name: "Armud",
        src: "./images/pear.jpg",
    },
    {
        id: 6,
        name: "Üzüm",
        src: "./images/grape.jpg",
    },
];

const ui = {
    cartList: document.querySelector(".cart-list"),
    rightCount: document.querySelector("#right-count"),
    wrongCount: document.querySelector("#wrong-count"),
    randomCartName: document.querySelector("#random-cart-name"),
};

function createCart(fruit) {
    return `
        <div data-fruit-id="${fruit.id}"  class="border border-black w-full bg-white size-[200px] ">
            <img src="${fruit.src}" class="w-full  object-cover hidden" alt="${fruit.name}">
        </div>
        `;
}

ui.randomCartName.textContent =
    fruits[Math.floor(Math.random() * fruits.length)].name;

function createCartsList() {
    for (let fruit of fruits) {
        ui.cartList.innerHTML += createCart(fruit);

        ui.cartList.addEventListener("click", function (event) {
            const id = event.target.dataset.fruitId;
            if (+id === +fruit.id) {
                if (ui.randomCartName.textContent === fruit.name) {
                    ui.rightCount.textContent = +ui.rightCount.textContent + 1;
                } else {
                    ui.wrongCount.textContent = +ui.wrongCount.textContent + 1;
                }

                ui.randomCartName.textContent =
                    fruits[Math.floor(Math.random() * fruits.length)].name;

                setTimeout(() => {
                    ui.cartList.innerHTML = "";
                    createCartsList();
                }, 1000);
            }
        });
    }
}

createCartsList();
