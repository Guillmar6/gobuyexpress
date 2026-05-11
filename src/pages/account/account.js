const navigationBar = document.getElementById("navigationbar");
fetch("/in/components/navigationBar.html")
.then(response => response.text())
.then(data => {
    navigationBar.innerHTML = data;
});

const menuOne = document.getElementById("menuOne");
const menuTwo = document.getElementById("menuTwo");
const menuThree = document.getElementById("menuThree");
window.addEventListener("hashchange", hashCHanged);
hashCHanged();
function hashCHanged() {
    const hash = window.location.hash;
    if(hash === "#profile") {
        menuOne.style.display = "block";
        menuTwo.style.display = "none";
        menuThree.style.display = "none";
    } else if(hash === "#addresses") {
        menuOne.style.display = "none";
        menuTwo.style.display = "block";
        menuThree.style.display = "none";
    } else if(hash === "#change_password") {
        menuOne.style.display = "none";
        menuTwo.style.display = "none";
        menuThree.style.display = "block";
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