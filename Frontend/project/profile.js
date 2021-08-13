fetch('https://flask-eomp1.herokuapp.com/select-product/')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach((Products) => {

            console.log(Products);

            document.querySelector('.products-con').innerHTML += `
                <div class="products">
                    <div class='product-details'>
                        <h3 class='pro-desc'>${Products.description}</h3>
                        <h3 class='pro-nm'>${Products.name}</h3>
                        <h5 class='pro-price'>R${Products.price}</h5>
                    </div>
                </div>`
        });
    })



