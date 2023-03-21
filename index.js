let shop = document.getElementById('Shop');

let basket = JSON.parse(localStorage.getItem('data')) || [];


let generateshop = () => {

    return (shop.innerHTML = ShopItemsData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `  <div id= product-id-${id} class="item">
            <img src=${img} alt="">
            <div class="details">
        <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
            <input onclick=decrement(${id}) type="button" value="-" >
            <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
            <input onclick=increment(${id}) type="button" value="+" >
            </div>
        </div>
        </div>
        </div>`
    }).join(''))

}


generateshop();

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
    console.log(basket)
    localStorage.setItem('data', JSON.stringify(basket));
}
let update = (id) => {
    let selecteditemId = id
    let search = basket.find((x) => x.id == selecteditemId);
    document.getElementById(id).innerHTML = search.item;
    calculation();


}
let calculation = () => {

    let CartIcon = document.getElementById('CartAmount');
    CartIcon.innerHTML = basket.map((x) => x.item).reduce((a, b) => a + b, 0)

}
calculation();
