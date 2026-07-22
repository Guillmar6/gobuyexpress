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

  const productName = document.querySelectorAll("#container #productName");
  productName.forEach((pName, index) => {
    pName.textContent = info.names[index];
  });

  const productType = document.querySelectorAll("#container #productType");
  productType.forEach((pType, index) => {
    pType.textContent = info.types[0];
  });

  const productDescription = document.querySelectorAll("#container #productDescription");
  productDescription.forEach((pDescription, index) => {
    pDescription.textContent = info.descriptions[index];
  });

  const productPriceTag  = document.querySelectorAll("#container #priceTag");
  productPriceTag.forEach((pTag, index) => {
    pTag.textContent = `₱${info.product_price[index]}`;
  });
}

const addToCartBtn = document.querySelector('#container');
addToCartBtn.addEventListener('click', async (event) => {
  if(event.target.tagName === 'BUTTON') {
    const loading = document.getElementById('loadingContainer');
    loading.style.display = 'block';
    const btnClicked = event.target.closest('#container > div');
    if(btnClicked) {
      const childArray = Array.from(addToCartBtn.querySelectorAll('#container > div'));
      const index = childArray.indexOf(btnClicked);
      
      const childArrayProduct = document.querySelectorAll('#container > div');
      const child = childArrayProduct[index];

      if(child) {
        const productName = child.querySelector('#productName');
        const productType = child.querySelector('#productType');
        const productDescription = child.querySelector('#productDescription');

        const data = {
          productName: productName.textContent
        };
        const result = await fetch("/api/addToCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        alert("Add to cart success!");
        loading.style.display = 'none';
      }
    }
  }
});