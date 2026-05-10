const navigationBar = document.getElementById("navigationbar");
fetch("/in/components/navigationBar.html")
.then(response => response.text())
.then(data => {
    navigationBar.innerHTML = data;
});

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