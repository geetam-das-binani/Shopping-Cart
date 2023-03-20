let basket = JSON.parse(localStorage.getItem('data')) || [];
let label = document.getElementById('label');
let shoppingcart = document.getElementById('shopping-cart');
let generateCartItems = () => {

    if (basket.length !== 0) {
        shoppingcart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = ShopItemsData.find((y) => y.id === id) || [];
            return `<div class="cart-item">
                    <img src=${search.img} alt="">
                        <div class="details">
                <div class="title-price-x">
                <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price"> $ ${search.price}</p>
            </h4>
            <p class="cross-icon" onclick="removeitem(${id})">X</p>
                </div>
                <div class="cart-buttons">
                <input onclick=decrement(${id}) type="button" value="-" >
                <div id=${id} class="quantity">${item}</div>
                <input onclick=increment(${id}) type="button" value="+" >
                </div>
                <h3>
                $ ${item * search.price}
                </h3>
            </div>
            </div>`

        }).join('')
    }
    else {
        shoppingcart.innerHTML = ``;
        label.innerHTML = `<h2>Cart is Empty </h2>

        <a href="index.html">
        <button class="HomeBtn">Back To Home</button>
        
        </a>
   `;
    }


}
let increment = (id) => {
    let selecteditemId = id;
    let search = basket.find((x) => x.id == selecteditemId);
    if (search == undefined) {
        basket.push({
            id: selecteditemId,
            item: 1
        })

    }
    else {
        search.item += 1
    }
    update(selecteditemId);
    generateCartItems();

    localStorage.setItem('data', JSON.stringify(basket));

}

let decrement = (id) => {
    let selecteditemId = id;
    let search = basket.find((x) => x.id == selecteditemId);
    if (search === undefined) return
    else if (search.item == 0) return
    else {
        search.item -= 1
    }
    update(selecteditemId);
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems();

    localStorage.setItem('data', JSON.stringify(basket));

}
let update = (id) => {
    let selecteditemId = id
    let search = basket.find((x) => x.id === selecteditemId);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount()


}
generateCartItems();
let calculation = () => {

    let CartIcon = document.getElementById('CartAmount');
    CartIcon.innerHTML = basket.map((x) => x.item).reduce((a, b) => a + b, 0)

}
calculation();

let removeitem = (id) => {
    let selecteditemId = id
    basket = basket.filter((x) => x.id !== selecteditemId)
    localStorage.setItem('data', JSON.stringify(basket));
    generateCartItems();
    TotalAmount();
    calculation();

}
let ClearCart = () => {
    basket = [];
    localStorage.setItem('data', JSON.stringify(basket));
    generateCartItems();
    calculation();

}
let TotalAmount = () => {
    if (basket.lenght !== 0) {
        let amount = basket.map((x) => {
            let { id, item } = x;
            let search = ShopItemsData.find((y) => y.id === id)
            return (item * search.price);

        }).reduce((a, b) => a + b, 0);

        label.innerHTML = `<h2>Total Bill :$${amount}</h2>
      <button class="checkout" >Checkout</button>
      <button onclick="ClearCart()" class="removeall">Clear Cart</button>
      
        `
    }
    else return;

};



TotalAmount()