//   function to open add products menu
function openModal() {
    document.getElementById("modal").classList.toggle("modal-active");
}


//products
let products = [
    {
        imgURL: "bc0f38c32d5bb716aba0941429e8374d.jpg",
        name: "Jordan retro 1",
        description: "chicago classic red and black",
        category: "shoes",
        price: " R2500",
        productId: "1",
        editProduct: "",
        deleteProduct: ""
    },
    {
        imgURL: "1e51fa74e7ef80609a09ce1466a942ad.jpg",
        name: "Jordan retro 4",
        description: "concrete white",
        category: "shoes",
        price: " R2800",
        productId: "2",
        editProduct: "",
        deleteProduct: ""
    },
    {
        imgURL: "images.jpeg",
        name: "Dior x Pop Smoke ",
        description: "Dior Tee",
        category: "Tees",
        price: " R1500",
        productId: "3",
        editProduct: "",
        deleteProduct: ""
    },
    {
        imgURL: "s-l225.jpg",
        name: "Nike Jacket",
        description: "Full Swoosh Hoodie",
        category: "Hoodies",
        price: " R800",
        productId: "4",
        editProduct: "",
        deleteProduct: ""
    },
    {
        imgURL: "s-l2225.jpg",
        name: "Jordan Pants",
        description: "Grey Jordan Pants",
        category: "Pants",
        price: " R900",
        productId: "5",
        editProduct: "",
        deleteProduct: ""
    },
    {
        imgURL: "8020.jpg",
        name: "Nike Tee",
        description: "Red Just Do It tee",
        category: "Tees",
        price: " R400",
        productId: "6",
        editProduct: "",
        deleteProduct: ""
    },
    {
        imgURL: "Screenshot from 2021-05-13 13-45-11.png",
        name: "Jordan Grey Hoodie",
        description: "Grey Nike Jordan Hoodie",
        category: "Hoodies",
        price: " R1300",
        productId: "8",
        editProduct: "",
        deleteProduct: ""
    },
    {
        imgURL: "Screenshot from 2021-05-13 13-45-11.png",
        name: "Nike Tracksuit Pants",
        description: "Just Do It red and black",
        category: "Pants",
        price: " R1500",
        productId: "9",
        editProduct: "",
        deleteProduct: ""
    },
];

function createProduct(item) {
    let madeProduct = `<div class="product-con" category=${item.category} >
    <img src="${item.imgURL}" alt="${item.productId}">
    <div class="item-info">
    <h4>${item.name}</h4>
    <h6>${item.category}</h6>
    <p>${item.description}</p>
    <div>
    <a target='_blank' href="${item.editProduct}">Edit</a>
    <a target='_blank' href="${item.deleteProduct}">Delete</a>
    </div>
    </div>
    </div>
    `;
    return madeProduct;
}

function renderItems() {
    let productContainer = document.querySelector(".product-container");
    for (product of products) {
        let item = createProduct(product);
        productContainer.innerHTML += item;
    }
}

renderItems();

function filterProducts(categorypara) {
    let items = document.getElementsByClassName("product-con");
    if (categorypara == "All") {
        for (item of items) {
            item.style.display = "block";
        }
        return;
    }
    for (item of items) {
        console.log(item);
        item.style.display = "none";
    }

    let selectedProducts = document.querySelectorAll(`[category='${categorypara}']`);

    for (item of selectedProducts) {
        item.style.display = "block";
    }
}