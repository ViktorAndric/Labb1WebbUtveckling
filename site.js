class Product {
    constructor({ productName, price, origin, flavour, altitude, process, imagePath }) {
        this.numberOfItem = 0;
        this.productName = productName;
        this.price = price;
        this.origin = origin;
        this.flavour = flavour;
        this.altitude = altitude;
        this.process = process;
        this.imagePath = imagePath
    }
}

let highland = new Product({
    productName : "Highland Harmony",
    price : 170,
    origin : "Guatemala Highlands",
    flavour : "Rich and full bodied with chocolate and nutty undertones",
    altitude : "High",
    process : "Handpicked, Sun-dried",
    imagePath : "/Images/2596d62d-ebe4-40b8-b074-bd8d488289b9.webp"
});

let sunrise = new Product({
    productName: "Sunrise Serenade",
    price: 120,
    origin: "Ethiopian Yirgacheffe",
    flavour: "Bright and floral with hints of citrus and the sun",
    altitude: "Medium-High",
    process: "Wet-processed",
    imagePath : "/Images/d918b5c5-162f-40a8-9560-6336a38f1b40.webp"
});

let arctic = new Product({
    productName: "Arctic Whisper",
    price: 150,
    origin: "Sumatra Mandheling",
    flavour: "Earthy and intense with a smooth, creamy finish",
    altitude: "Low",
    process: "Semi-washed",
    imagePath : "/Images/ef9571f4-a13c-470b-9258-0187d70f4558.webp"
});
let cartList = [];
let productList = [highland, sunrise, arctic];

    let savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartList = JSON.parse(savedCart);
    } else {
        
    }
    updateCart();
    
if(document.querySelector('#product-page')){ 
for(let i = 0; i < productList.length; i++){
    
    let productColumn = document.createElement("div");
    productColumn.className = "col-md-4";

    let card = document.createElement('div');
    card.className = 'card mb-5 bg-black opacity-75 text-light';
    productColumn.appendChild(card);

    let img = document.createElement('img');
    img.className = 'productImage';
    img.src = productList[i].imagePath;
    img.alt = 'product image';
    card.appendChild(img);

    let title = document.createElement('h3');
    title.className = 'card-header';
    title.textContent = productList[i].productName;
    card.appendChild(title);

    let buttonDiv = document.createElement('div');
    buttonDiv.className = 'ms-3';
    let button = document.createElement('button');
    button.className = 'btn btn-secondary btn-outline-light';
    button.textContent = 'Add to cart';
    button.addEventListener("click", function(){
    
        addToCart(productList[i]);
    }); 
        
    buttonDiv.appendChild(button);
    card.appendChild(buttonDiv);

    let body = document.createElement('div');
    body.className = 'card-body';
    body.innerHTML = `
        <h5 class="card-title"><strong>Price:</strong> ${productList[i].price} kr</h5>
        <h6 class="card-text"><strong>Origin:</strong> ${productList[i].origin}</h6>
        <p class="card-text"><strong>Flavour Profile:</strong> ${productList[i].flavour}</p>
        <p class="card-text"><strong>Altitude:</strong> ${productList[i].altitude}</p>
        <p class="card-text"><strong>Process:</strong> ${productList[i].process}</p>
    `;
    card.appendChild(body);
    document.querySelector('#showProducts').appendChild(productColumn);
}

}

function updateCart(){
    
    let cart = document.querySelector('#showCart');
    
    if(cart){  
        cart.innerHTML = ' ';
        
        for(let i = 0; i < cartList.length; i++){
            
        let product = document.createElement('div');
        product.className = 'row my-3 align-content-center justify-content-center';

        let imgCol = document.createElement('div')
        imgCol.className = 'col-md-1';
        let img = document.createElement('img');
        img.className = 'cartImage stroke-text2';
        img.src = cartList[i].imagePath;
        img.alt = 'product image';
        imgCol.appendChild(img);
        product.appendChild(imgCol);
        
        let titleCol = document.createElement('div');
        titleCol.className = 'col-md-3';
        let title = document.createElement('h3');
        title.className = 'display-6 stroked-text2';
        title.textContent = cartList[i].productName;
        titleCol.appendChild(title);
        product.appendChild(titleCol);

        let priceCol = document.createElement('div');
        priceCol.className = 'col-md-1';
        let price = document.createElement('h3');
        price.className = 'display-6 stroked-text2';
        price.textContent = cartList[i].price + 'kr';
        priceCol.appendChild(price);
        product.appendChild(priceCol);
        
        let quantityCol = document.createElement('div');
        quantityCol.className = 'col-md-1 col-sm-1 mx-3';
        let quantity = document.createElement('input');
        quantity.type = 'number';
        quantity.className = 'form-control';
        quantity.value = cartList[i].numberOfItem;
        quantity.min = 1;
        quantity.max = 100;
        quantity.addEventListener('change', function(event) {
            let newQuantity = parseInt(event.target.value);
            cartList[i].numberOfItem = newQuantity;
            updateTotalPrice();
            updateCart();
        })
        quantityCol.appendChild(quantity);
        product.appendChild(quantityCol);

        let removeButtonDiv = document.createElement('div');
        removeButtonDiv.className = 'col-md-3';
        let removeButton = document.createElement('button');
        removeButton.className = 'mx-5 btn btn-danger btn-outline-light';
        removeButton.textContent = 'Remove from Cart';
        removeButton.addEventListener("click", function(){
            removeFromCart(cartList[i]);
        });
        removeButtonDiv.appendChild(removeButton);
        product.appendChild(removeButtonDiv);

        let divide = document.createElement('br');
        divide.className = '';
        product.appendChild(divide);

        cart.appendChild(product);   
    };

    let bottomRow = document.createElement('div');
    bottomRow.className = 'row justify-content-between align-items-center my-3 mb-5';

    let payButtonCol = document.createElement('div');
    payButtonCol.className = 'col-md-4 text-center';
    let payButton = document.createElement('button');
    payButton.className = 'btn btn-lg btn-dark btn-outline-light';
    payButton.textContent = 'Checkout';
    payButton.addEventListener('click', function(){
        emptyCart()
    });
    payButtonCol.appendChild(payButton);
    bottomRow.appendChild(payButtonCol);

    let totalPriceCol = document.createElement('div');
    totalPriceCol.className = 'col-md-3 text-right';
    let totalPrice = updateTotalPrice();
    let displayTotalPrice = document.createElement('h3');
    displayTotalPrice.className='stroked-text';
    displayTotalPrice.textContent= "Total: " + totalPrice + "kr";
    totalPriceCol.appendChild(displayTotalPrice);
    bottomRow.appendChild(totalPriceCol);

    cart.appendChild(bottomRow);

    }else{
        console.log("#showcart element not found on this page");
    }
}   

function addToCart(product){

    let foundItem = cartList.find(p => p.productName === product.productName);
    if(foundItem){
        foundItem.numberOfItem++;
    } else {
        product.numberOfItem = 1;
        cartList.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cartList));
    updateCart();
}

function removeFromCart(product){
    let itemInCart = cartList.find(p => p.productName === product.productName);

    if(itemInCart){
        if(itemInCart.numberOfItem > 1){
            itemInCart.numberOfItem -= 1;
        } else {
            cartList = cartList.filter(p => p.productName !== product.productName);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartList));
    updateCart();
}

function updateTotalPrice(event) {
    let totalPrice = 0;
    cartList.forEach(item => {
        totalPrice += item.price * item.numberOfItem;
    });
    
    return totalPrice;
    }

function emptyCart(){
    
    if(cartList.length > 0){
        alert('Thanks for your order');
        cartList.length = 0;
        updateCart();
        localStorage.removeItem('cart');
    } else {
        alert('Cart is empty');
    }
}

