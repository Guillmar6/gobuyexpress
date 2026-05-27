let hash = window.location.hash;

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
  hash = window.location.hash;
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
  const value = hash.substring(1);
  
  const getProductHtml = await fetch("compo/productContainer.html");
  const productHtml = await getProductHtml.text();

  const getInfo = await fetch(`/api/images/categories/${value}/info.json`);
  const info = await getInfo.json();
  
  for(let i = 0; i < info.names.length; i++) {
    const newProductContainer = document.createElement('div');
    newProductContainer.innerHTML = await productHtml;
    document.getElementById("container").appendChild(newProductContainer);
  }

  const imagesContainer = document.querySelectorAll("#container img");
  imagesContainer.forEach((image, index) => {
    image.src = `/api/images/categories/${value}/${info.names[index]}.jpg`;
  });
  
  const descriptionsContainer = document.querySelectorAll("#container span");
  descriptionsContainer.forEach((desc, index) => {
    desc.textContent = info.descriptions[index];
  });
}