loadNavigation();

async function loadNavigation() {
    const response = await fetch("../components/navigationBar.html");
    const html = await response.text();

    document.getElementById("navigationBar").innerHTML = html;
    document.getElementById("navigationCurrent").innerText = "Carts";
}

async function sample() {
    const data = {
        productName: "sofa"
    };
    const getResult = await fetch("/api/getProductByName", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const result = await getResult.json();
}
sample();

async function cartsChild() {
    const getCarts = await fetch("/api/getCartsFromUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const getCartHtml = await fetch("compo/cart.html");
    const cartHtml = await getCartHtml.text();
    const result = await getCarts.json();
    const carts = await result.data[0].carts;
    carts.forEach(async (cart, index) => {
        const newCartContainer = document.createElement('div');
        newCartContainer.innerHTML = await cartHtml;


        const data = {
            productName: cart
        };
        const getProductInfo = await fetch('/api/getProductByName', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await getProductInfo.json();
        const productName = newCartContainer.querySelector('#productName');
        const image = newCartContainer.querySelector('#cartImage');
        const description = newCartContainer.querySelector('#description');

        productName.textContent = result.data.product_name;
        image.src = `/api/images/categories/${result.data.product_type}/${cart}.jpg`;
        description.textContent = result.data.product_description;


        document.getElementById("cartsMainContainer").appendChild(newCartContainer);
    });
}
cartsChild();

document.querySelector('#cartsMainContainer').addEventListener('click', async (event) => {
    if(event.target.tagName !== 'BUTTON') return;
    const currentCart = event.target.closest('#cartsMainContainer > div');
    if(!currentCart) return;
    const cartsArray = Array.from(document.querySelectorAll('#cartsMainContainer > div'));
    const cartIndex = cartsArray.indexOf(currentCart);
    
    if(event.target.id === 'orderBtn') {}
    else if(event.target.id === 'deleteCartBtn') {
        const data = {
            productName: currentCart.querySelector('#productName').textContent
        };
        const removeCart = await fetch('/api/removeCartFromUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        currentCart.style.display = "none";
        alert("Successfully remove!");
    }
});