loadNavigation();
async function loadNavigation() {
    const response = await fetch("../components/navigationBar.html");
    const html = await response.text();

    document.getElementById("navigationBar").innerHTML = html;
}

const bannerImg = document.getElementById("bannerImg");
window.addEventListener("hashchange", hashChanged);
hashChanged();
function hashChanged() {
  const hash = window.location.hash;
  switch(hash) {
    case "#appliances":
      bannerImg.src = "/api/images/product_banners/appliances.jpg";
      break;
    case "#gadgets":
      bannerImg.src = "/api/images/product_banners/gadgets.jpg";
      break;
    case "#clothing":
      bannerImg.src = "/api/images/product_banners/clothing.jpg";
      break;
    case "#furnitures":
      bannerImg.src = "/api/images/product_banners/furnitures.jpg";
      break;
    case "#school-supplies":
      bannerImg.src = "/api/images/product_banners/school-supplies.jpg";
      break;
  }
}