const productList = document.querySelector('.product-list');
const addProductForm = document.querySelector('.add-product-form');
const nameValue = document.getElementById('name');
const catValue = document.getElementById('category');
const descValue = document.getElementById('description');
const priceValue = document.getElementById('price')
const btnSubmit = document.querySelector('.add-btn')
let output = '';



const renderProduct = (item) => {
    item.forEach(item => {
        output += `
        <div class="card">
            <div class="card-body" data-id=${item.product_id}>
                <h1 class="card-title">${item.name}</h1>
                <h2 class="card-desc">${item.description}</h2>
                <h3 class="card-price">R${item.price}</h3>
                <h4 class="card-cat">${item.category}</h4>
                <a href="#" class="edit-btn id="edit-product" >Edit</a>
                <a href="#" class="delete-btn" id="delete-product">Delete</a>
            </div>
        </div>
        `;
    });
    productList.innerHTML = output;
}

// to view products 
fetch('https://flask-eomp1.herokuapp.com/select-product/')
    .then(res => res.json())
    .then(data => renderProduct(data))


function deleteProduct() {
    
}
productList.addEventListener('click', (e) => {
    e.preventDefault();
    let delbtnPressed = e.target.id == 'delete-product';
    let editbtnPressed = e.target.id == 'edit-product';
    console.log(e.target.id)

    let id = (e.target.parentElement.dataset.id);

    //removes product
    if(delbtnPressed){
        fetch(`${'https://flask-eomp1.herokuapp.com/delete-products/'}${id}/`, {
            method: 'GET',
        })
            .then(res => res.json())
            //.then(() => location.reload())
    }

    if(editbtnPressed){
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent;
        let descContent = parent.querySelector('.card-desc').textContent;
        let catContent = parent.querySelector('.card-cat').textContent;
        let priceContent = parent.querySelector('card-price').textContent;

        nameValue.value = titleContent;
        catValue.value = catContent;
        descValue.value = descContent;
        priceValue.value = priceContent;
    }

    //update products
    btnSubmit.addEventListener('click',(e) =>{
        e.preventDefault();
        fetch(`${'https://flask-eomp1.herokuapp.com/update/'}${id}/`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameValue.value,
                cat: catValue.value,
                desc: descValue.value,
                price: priceValue.value,
            })
        })
        .then(res => res.json())
        .then(() => location.reload())
        console.log('product updated');
    })
})

let addBtn = document.querySelector(".add-btn")
addBtn.addEventListener('submit', createProduct)
    
function createProduct() {
    let nameValue = document.querySelector(".name").value
    let catValue = document.querySelector(".cat").value
    let descValue = document.querySelector(".desc").value
    let priceValue = document.querySelector(".price").value
    console.log(nameValue.value)
    console.log(catValue.value)
    console.log(descValue.value)
    console.log(priceValue.value)

    fetch('https://flask-eomp1.herokuapp.com/create-product/', { 
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'authorization': 'jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjkxMTE1NTMsImlhdCI6MTYyOTEwNzU1MywibmJmIjoxNjI5MTA3NTUzLCJpZGVudGl0eSI6Mjd9.1Zo8txtP_ZpwQiEitUTXgeu60rARi2B4gRcbyTIVdtA'
        },
        body: JSON.stringify({
            name : nameValue.value,
            category : catValue.value,
            description : descValue.value,  
            price : priceValue.value
        })
    })
    .then(response => response.json())
    .then(data => {
        const dataArr = [];
        console.log(data);
        dataArr.push(data);
        renderProduct(dataArr);
    })

    //resets input fields
    nameValue.value = '';
    catValue.value = '';
    descValue.value = '';
    priceValue.value = '';
}   