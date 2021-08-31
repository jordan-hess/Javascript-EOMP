// Notes
// When editing click the edit button then type out your new product info on the form then click confirm to complete the edit 
// When deleting press the delete button and confirm


const productList = document.querySelector('.product-list');
const addProductForm = document.querySelector('.add-product-form');
const nameValue = document.getElementById('name');
const catValue = document.getElementById('category');
const descValue = document.getElementById('description');
const priceValue = document.getElementById('price')
const btnSubmit = document.querySelector('.add-btn')
const btnDelete = document.querySelector('.del-btn')
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
        const parent = e.target.getElementById;
        let titleContent = parent.querySelector('name').textContent;
        let descContent = parent.querySelector('description').textContent;
        let catContent = parent.querySelector('category').textContent;
        let priceContent = parent.querySelector('price').textContent;

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
                category: catValue.value,
                description: descValue.value,
                price: priceValue.value,
            })
        })
        .then(res => res.json())
        .then(() => location.reload())
    })
})


// function to add products
function addPro() {
    
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        // console.log(nameValue.value)
        // console.log(catValue.value)
        // console.log(descValue.value)
        // console.log(priceValue.value)

    fetch('https://flask-eomp1.herokuapp.com/create-product/', { 
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization' : `jwt ${mystorage.getItem('jwt-token')}`
        },
        body: JSON.stringify(
            {
            'name' : nameValue.value,
            'category' : catValue.value,
            'description' : descValue.value,
            'price' : priceValue.value
        })
    })
    .then(response => response.json)
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderProduct(dataArr);
            alert('product created successfully');

            //resets input fields
            nameValue.value = '';
            catValue.value = '';
            descValue.value = '';
            priceValue.value = '';
            
        }) 
        .then(() => location.reload())
    })
}

addPro()


//   function to open modal
function openModal() {
    document.getElementById("modal").classList.toggle("modal-active");
  }