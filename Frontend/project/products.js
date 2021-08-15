const mystorage = window.localStorage

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
                <h4 class="card-cat">R${item.category}</h4>
                <a href="#" class="edit-btn id="edit-post" >Edit</a>
                <a href="#" class="delete-btn" id="delete-post">Delete</a>
            </div>
        </div>
        `;
    });
    productList.innerHTML = output;
}

const url = 'https://flask-eomp1.herokuapp.com/select-product/';

fetch(url)
    .then(res => res.json())
    .then(data => renderProduct(data))

productList.addEventListener('click', (e) => {
    e.preventDefault();
    let delbtnPressed = e.target.id == 'delete-post';
    let editbtnPressed = e.target.id == 'edit-post';
    console.log(e.target.id);

    let id = (e.target.parentElement.dataset.id);

    //removes product
    if(delbtnPressed){
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => location.reload())
    }

    if(editbtnPressed){
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent;
        let descContent = parent.querySelector('.card-desc').textContent;
        let catContent = parent.querySelector('.card-cat').textContent;
        let priceContent = parent.querySelector('card-price').textContent;

        nameValue.value = titleContent;
        catValue.value = descContent;
        descValue.value = catContent;
        priceValue.value = priceContent;
    }

    //update products
    btnSubmit.addEventListener('click',(e) =>{
        e.preventDefault();
        fetch(`${url}/${id}`, {
            method: 'PATCH',
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
        console.log('post updated');
    })
})


addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //console.log(nameValue.value)
    //console.log(catValue.value)
    //console.log(descValue.value)
    //console.log(priceValue.value)


    //run app in python and test again
    fetch(url, { 
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `jwt ${mystorage.getItem('jwt-token')}`
        },
        body: JSON.stringify({
            name : nameValue.value,
            category : catValue.value,
            description : descValue.value,
            price : priceValue.value
        })
    })
    .then(response => response.json)
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderProduct(dataArr);
    })

    //resets input fields
    nameValue.value = '';
    catValue.value = '';
    descValue.value = '';
    priceValue.value = '';
})