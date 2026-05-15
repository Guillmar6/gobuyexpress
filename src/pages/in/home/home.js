loadNavigation();
async function loadNavigation() {
    const response = await fetch("../components/navigationBar.html");
    const html = await response.text();

    document.getElementById("navigationBar").innerHTML = html;
}

const banners = document.getElementById("banners");
const dots = document.querySelectorAll("#banners-dots a");

let currentIndex = 0;
const totalSlides = 4;

let autoSlide;
let pauseTimeout;

function goToSlide(index) {
    const slideWidth = banners.clientWidth;

    banners.scrollTo({
        left: slideWidth * index,
        behavior: "smooth"
    });

    currentIndex = index;
}

function startAutoSlide() {
    autoSlide = setInterval(() => {
        currentIndex = currentIndex >= totalSlides ? 0 : (currentIndex + 1);
        goToSlide(currentIndex);
    }, 3000);
}

function slideTimeout() {
    clearInterval(autoSlide);
    clearTimeout(pauseTimeout);

    pauseTimeout = setTimeout(() => {
        startAutoSlide();
    }, 8000);
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", (e) => {

        goToSlide(index);
        slideTimeout();
    });
});

startAutoSlide();