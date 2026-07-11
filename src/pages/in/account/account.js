const menuOne = document.getElementById("profilePageChild");
const menuTwo = document.getElementById("addressPageChild");
const menuThree = document.getElementById("change_passwordPageChild");
const menuFour = document.getElementById("order_historyPageChild");
menuPages();
async function menuPages() {
    const profileResponse = await fetch("menus/profile.html");
    const profileHtml = await profileResponse.text();
    menuOne.innerHTML = profileHtml;

    const addressResponse = await fetch("menus/address.html");
    const addressHtml = await addressResponse.text();
    menuTwo.innerHTML = addressHtml;

    const change_passwordResponse = await fetch("menus/change_password.html");
    const change_passwordHtml = await change_passwordResponse.text();
    menuThree.innerHTML = change_passwordHtml;

    const order_historyResponse = await fetch("menus/order_history.html");
    const order_historyHtml = await order_historyResponse.text();
    menuFour.innerHTML = order_historyHtml;
}
const displayCurrentPage = document.getElementById("displayCurrentPage");
window.addEventListener("hashchange", hashCHanged);
hashCHanged();
function hashCHanged() {
    const hash = window.location.hash;
    if(hash === "#profile") {
        menuOne.style.display = "block";
        menuTwo.style.display = "none";
        menuThree.style.display = "none";
        menuFour.style.display = "none";
        displayCurrentPage.innerText = "Profile";
    } else if(hash === "#address") {
        menuOne.style.display = "none";
        menuTwo.style.display = "block";
        menuThree.style.display = "none";
        menuFour.style.display = "none";
        displayCurrentPage.innerText = "Address";
    } else if(hash === "#change_password") {
        menuOne.style.display = "none";
        menuTwo.style.display = "none";
        menuThree.style.display = "block";
        menuFour.style.display = "none";
        displayCurrentPage.innerText = "Change Password";
    } else if(hash === "#order_history") {
        menuOne.style.display = "none";
        menuTwo.style.display = "none";
        menuThree.style.display = "none";
        menuFour.style.display = "block";
        displayCurrentPage.innerText = "Order History";
    }
}

loadNavigation();
async function loadNavigation() {
    const response = await fetch("../components/navigationBar.html");
    const html = await response.text();

    document.getElementById("navigationBar").innerHTML = html;
    document.getElementById("navigationCurrent").innerText = "Account";
}

function logout() {
    window.location.href = "/api/logout";
}

currentProfile();
async function currentProfile() { // Function for profile information placeholder 
    const current = await fetch("/api/accountInformations");
    const result = await current.json();
    document.getElementById("username").value = result.data.name;
    document.getElementById("email").value = result.data.email;
    document.getElementById("phone_number").value = result.data.phone_number;
    document.getElementById("birthday").value = result.data.birthday;

    const gender = document.querySelectorAll("input[name='gender']");
    gender.forEach(radio => {
        if(radio.value === result.data.gender) {
            radio.checked = true;
        }
    });

    document.getElementById("address").value = result.data.address;
}
async function saveProfile() { // Function for save button on profile page
    const form = document.getElementById("profileInfos");
    const formData = new FormData(form);
    const data = {
        name: formData.get("username"),
        email: formData.get("email"),
        phone_number: formData.get("phone_number"),
        gender: formData.get("gender"),
        birthday: formData.get("birthday")
    };
    try {
        const response = await fetch("/api/updateProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if(response.ok) alert(`${result.message}`);
        else alert(`Error: ${result.message}`);
    } catch(err) {
        console.log(`Error: ${err}`);
    }
}
async function saveAddress() {
    const form = document.getElementById("addressDelivery");
    const formData = new FormData(form);
    const data = {
        address: formData.get("address")
    };
    try {
        const response = await fetch("/api/updateAddress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if(response.ok) alert(`${result.message}`);
        else alert(`Error: ${result.message}`);
    } catch(err) {
        console.log(`Error: ${err}`);
    }
}
const currentPasswordInput = document.getElementById("currentPassword");
const newPasswordInput = document.getElementById("newPassword");
async function savePassword() { // Function for save button on change password page
    const form = document.getElementById("profileChange_password");
    const formData = new FormData(form);
    const data = {
        old_password: formData.get("currentPassword"),
        new_password: formData.get("newPassword")
    };
    try {
        const response = await fetch("/api/change_password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if(response.ok) alert(`${result.message}`);
        else alert(`Error: ${result.message}`);
    } catch(err) {
        console.log(`Error: ${err}`);
    }
}

let isShown = false;
function menuBtnClicked() {
    const accountMenu = document.getElementById("profileBox");
    if(isShown) {
        accountMenu.style.transform = "translate(-220px)";
        isShown = !isShown;
    } else {
        accountMenu.style.transform = "translate(0px)";
        isShown = !isShown;
    }
}

async function ordersContainer() {
    const getOrderHtml = await fetch("menus/compo/order.html");
    const orderHtml = await getOrderHtml.text();
    const getOrders = await fetch('/api/getOrdersFromUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await getOrders.json();
    const orders = result.data[0].orders;
    orders.forEach(async (order, index) => {
        const newOrderContainer = document.createElement('div');
        newOrderContainer.innerHTML = await orderHtml;

        const data = {
            productName: order
        };
        const getProductInfo = await fetch('/api/getProductByName', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await getProductInfo.json();
        const productName = newOrderContainer.querySelector('#productName');
        const image = newOrderContainer.querySelector('#cartImage');
        const description = newOrderContainer.querySelector('#description');

        productName.textContent = result.data.product_name;
        image.src = `/api/images/categories/${result.data.product_type}/${order}.jpg`;
        description.textContent = result.data.product_description;


        document.getElementById("ordersContainer").appendChild(newOrderContainer);
    });
}
ordersContainer();

document.querySelector('#order_historyPageChild').addEventListener('click', async (event) => {
    if(event.target.tagName !== 'BUTTON') return;
    const currentOrder = event.target.closest('#ordersContainer > div');
    if(!currentOrder) return;
    const ordersArray = Array.from(document.querySelectorAll('#cartsMainContainer > div'));
    const orderIndex = ordersArray.indexOf(currentOrder);

    if(event.target.id === 'deleteOrderBtn') {
        const loading = document.getElementById('loadingContainer');
        loading.style.display = 'block';
        const removeOrder = await fetch('/api/removeOrderFromUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productName: currentOrder.querySelector('#productName').textContent
            })
        });
        currentOrder.style.display = "none";
        alert("Successfully remove!");
        loading.style.display = 'none';
    }
});