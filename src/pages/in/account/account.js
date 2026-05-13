const infosMenu = document.getElementById("profilePageChild");
menuPages();
async function menuPages() {
    const response = await fetch("menus/profile.html");
    const html = await response.text();

    infosMenu.innerHTML = html;
}
const menuOne = document.getElementById("profilePageChild");
const menuTwo = document.getElementById("addressesPageChild");
const menuThree = document.getElementById("change_passwordPageChild");
const displayCurrentPage = document.getElementById("displayCurrentPage");
window.addEventListener("hashchange", hashCHanged);
hashCHanged();
function hashCHanged() {
    const hash = window.location.hash;
    if(hash === "#profile") {
        menuOne.style.display = "block";
        menuTwo.style.display = "none";
        menuThree.style.display = "none";
        displayCurrentPage.innerText = "Profile";
    } else if(hash === "#addresses") {
        menuOne.style.display = "none";
        menuTwo.style.display = "block";
        menuThree.style.display = "none";
        displayCurrentPage.innerText = "Addresses";
    } else if(hash === "#change_password") {
        menuOne.style.display = "none";
        menuTwo.style.display = "none";
        menuThree.style.display = "block";
        displayCurrentPage.innerText = "Change Password";
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
        if(response.ok) alert("Save successfully!");
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