/* Dynamic behavior with JS */
/* -------------------------------------------------------------------------------- */

/* Imports */
/* -------------------------------------------------------------------------------- */

import { products } from "./products.js";

/* State */
/* -------------------------------------------------------------------------------- */

/* Functions */
/* -------------------------------------------------------------------------------- */

function loadContent() {
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";

  for (const product of products) {
    createProductItem(catalog, product);
  }
}

function createProductItem(catalog, itemInfo) {
  const productItem = document.createElement("div");
  productItem.className = "product-item";

  const productTitle = createProductTitle(itemInfo);
  const productInfo = createProductInfo(itemInfo);
  const productActions = createProductActions();

  productItem.appendChild(productTitle);
  productItem.appendChild(productInfo);
  productItem.appendChild(productActions);

  catalog.appendChild(productItem);
}

function createProductTitle(itemInfo) {
  const productTitle = document.createElement("div");
  productTitle.className = "product-title";

  const productTitleParagraph = document.createElement("p");
  productTitleParagraph.innerText = itemInfo.title;
  productTitle.appendChild(productTitleParagraph);

  return productTitle;
}

function createProductInfo(itemInfo) {
  const productInfo = document.createElement("div");
  productInfo.className = "product-info";

  const productInfoMedia = createProductInfoMedia(itemInfo);
  const productInfoDescr = createProductInfoDescr(itemInfo);

  productInfo.appendChild(productInfoMedia);
  productInfo.appendChild(productInfoDescr);

  return productInfo;
}

function createProductInfoMedia(itemInfo) {
  const productInfoMedia = document.createElement("div");
  productInfoMedia.className = "product-media";

  const productInfoMediaImg = document.createElement("img");
  productInfoMediaImg.src = "../resources/img/" + itemInfo.picture;
  productInfoMediaImg.alt = itemInfo.title;
  productInfoMedia.appendChild(productInfoMediaImg);

  return productInfoMedia;
}

function createProductInfoDescr(itemInfo) {
  const productInfoDescription = document.createElement("div");
  productInfoDescription.className = "product-description";

  const productInfoDescriptionParagraph = document.createElement("p");
  productInfoDescriptionParagraph.innerText = itemInfo.description;

  const productInfoPrice = createProductInfoPrice(itemInfo);

  productInfoDescription.appendChild(productInfoDescriptionParagraph);
  productInfoDescription.appendChild(productInfoPrice);

  return productInfoDescription;
}

function createProductInfoPrice(itemInfo) {
  const productInfoPrice = document.createElement("div");
  productInfoPrice.className = "product-price";

  const productInfoPriceSpan = document.createElement("span");
  productInfoPriceSpan.innerText =
    itemInfo.priceInEuros.toLocaleString("en-US");
  productInfoPriceSpan.className = "highlight";
  productInfoPrice.appendChild(productInfoPriceSpan);
  productInfoPrice.append(" eur.");

  return productInfoPrice;
}

function createProductActions() {
  const productActions = document.createElement("div");
  productActions.className = "product-actions";

  const productActionsButton = document.createElement("button");
  productActionsButton.innerText = "I Like It!";
  productActions.appendChild(productActionsButton);

  return productActions;
}

function drawFooterYear() {
  document.getElementById("current-year").innerText = new Date().getFullYear();
}

/* Events */
/* -------------------------------------------------------------------------------- */

/* Run */
/* -------------------------------------------------------------------------------- */

loadContent();
drawFooterYear();
