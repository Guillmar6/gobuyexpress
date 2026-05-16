const menuOne = document.getElementById("profilePageChild");
const menuTwo = document.getElementById("addressesPageChild");
const menuThree = document.getElementById("change_passwordPageChild");
const menuFour = document.getElementById("order_statusPageChild");
menuPages();
async function menuPages() {
    const profileResponse = await fetch("menus/profile.html");
    const profileHtml = await profileResponse.text();
    menuOne.innerHTML = profileHtml;

    const addressesResponse = await fetch("menus/addresses.html");
    const addressesHtml = await addressesResponse.text();
    menuTwo.innerHTML = addressesHtml;

    const change_passwordResponse = await fetch("menus/change_password.html");
    const change_passwordHtml = await change_passwordResponse.text();
    menuThree.innerHTML = change_passwordHtml;

    const order_statusResponse = await fetch("menus/order_status.html");
    const order_statusHtml = await order_statusResponse.text();
    menuFour.innerHTML = order_statusHtml;
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
    } else if(hash === "#addresses") {
        menuOne.style.display = "none";
        menuTwo.style.display = "block";
        menuThree.style.display = "none";
        menuFour.style.display = "none";
        displayCurrentPage.innerText = "Addresses";
    } else if(hash === "#change_password") {
        menuOne.style.display = "none";
        menuTwo.style.display = "none";
        menuThree.style.display = "block";
        menuFour.style.display = "none";
        displayCurrentPage.innerText = "Change Password";
    } else if(hash === "#order_status") {
        menuOne.style.display = "none";
        menuTwo.style.display = "none";
        menuThree.style.display = "none";
        menuFour.style.display = "block";
        displayCurrentPage.innerText = "Order Status";
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
        else console.log(`Error: ${result.data}`);
    } catch(err) {
        console.log(`Error: ${err}`);
    }
}
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
        else console.log(`Error: ${result.data}`);
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