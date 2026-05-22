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
      bannerImg.hidden = false;
      break;
    case "#gadgets":
      bannerImg.src = "/api/images/product_banners/gadgets.jpg";
      bannerImg.hidden = false;
      break;
    case "#clothing":
      bannerImg.src = "/api/images/product_banners/clothing.jpg";
      bannerImg.hidden = false;
      break;
    case "#furnitures":
      bannerImg.src = "/api/images/product_banners/furnitures.jpg";
      bannerImg.hidden = false;
      break;
    case "#school-supplies":
      bannerImg.src = "/api/images/product_banners/school-supplies.jpg";
      bannerImg.hidden = false;
      break;
    default:
      bannerImg.src = "";
      bannerImg.hidden = true;
  }
}

loadHtml();
async function loadHtml() {
  const html = await fetch("compo/productContainer.html");
  document.getElementById("container").innerHTML = await html.text();
}