/* Dynamic behavior with JS */
/* -------------------------------------------------------------------------------- */

/* Imports */
/* -------------------------------------------------------------------------------- */

import { products } from "./products.js";

/* State */
/* -------------------------------------------------------------------------------- */

const availableTags = [];

/* Functions */
/* -------------------------------------------------------------------------------- */

// Loads the content of the catalog by creating product items and populating them with data.
function loadContent() {
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";

  // Iterate through each product and create a product item for it.
  // Also, collect available tags from all products.
  for (const product of products) {
    createProductItem(catalog, product);
    getAvailableTags(product);
  }

  console.info("The available tags are: ", availableTags);

  createTagSelector(availableTags);
}

// Creates a product item element and appends it to the catalog.
function createProductItem(catalog, itemInfo) {
  // Create a product item container.
  const productItem = document.createElement("div");
  productItem.className = "product-item";

  // Create product title, info, and actions elements, and append them to the product item.
  const productTitle = createProductTitle(itemInfo);
  const productInfo = createProductInfo(itemInfo);
  const productActions = createProductActions();

  productItem.appendChild(productTitle);
  productItem.appendChild(productInfo);
  productItem.appendChild(productActions);

  // Set custom attributes for the product item (data-id, data-tags).
  setProductAttributes(itemInfo, productItem);

  catalog.appendChild(productItem);
}

// Creates a product title element with the specified itemInfo.
function createProductTitle(itemInfo) {
  const productTitle = document.createElement("div");
  productTitle.className = "product-title";

  const productTitleParagraph = document.createElement("p");
  productTitleParagraph.innerText = itemInfo.title;
  productTitle.appendChild(productTitleParagraph);

  return productTitle;
}

// Creates a product info element with the specified itemInfo.
function createProductInfo(itemInfo) {
  const productInfo = document.createElement("div");
  productInfo.className = "product-info";

  // Create product media and description elements, and append them to the product info.
  const productInfoMedia = createProductInfoMedia(itemInfo);
  const productInfoDescr = createProductInfoDescr(itemInfo);

  productInfo.appendChild(productInfoMedia);
  productInfo.appendChild(productInfoDescr);

  return productInfo;
}

// Creates a product media element with the specified itemInfo.
function createProductInfoMedia(itemInfo) {
  const productInfoMedia = document.createElement("div");
  productInfoMedia.className = "product-media";

  // Create an image element with the product picture and append it to the product media.
  const productInfoMediaImg = document.createElement("img");
  productInfoMediaImg.src = "../resources/img/" + itemInfo.picture;
  productInfoMediaImg.alt = itemInfo.title;
  productInfoMedia.appendChild(productInfoMediaImg);

  return productInfoMedia;
}

// Creates a product description element with the specified itemInfo.
function createProductInfoDescr(itemInfo) {
  const productInfoDescription = document.createElement("div");
  productInfoDescription.className = "product-description";

  // Create a paragraph with the product description and append it to the product description.
  const productInfoDescriptionParagraph = document.createElement("p");
  productInfoDescriptionParagraph.innerText = itemInfo.description;

  // Create product tags and price elements, and append them to the product description.
  const productInfoTags = createProductInfoTags(itemInfo);
  const productInfoPrice = createProductInfoPrice(itemInfo);

  productInfoDescription.appendChild(productInfoDescriptionParagraph);
  productInfoDescription.appendChild(productInfoTags);
  productInfoDescription.appendChild(productInfoPrice);

  return productInfoDescription;
}

// Creates product tags element with the specified itemInfo.
function createProductInfoTags(itemInfo) {
  const productInfoTags = document.createElement("div");
  productInfoTags.className = "product-tags";

  // Create a span element for each tag in the product, and append them to the product tags.
  for (const tag of itemInfo.tags) {
    const productInfoSingleTag = document.createElement("span");
    productInfoSingleTag.innerText = tag;

    productInfoTags.appendChild(productInfoSingleTag);
  }

  return productInfoTags;
}

// Creates a product price element with the specified itemInfo.
function createProductInfoPrice(itemInfo) {
  const productInfoPrice = document.createElement("div");
  productInfoPrice.className = "product-price";

  // Create a span element for the product price and append it to the product price.
  const productInfoPriceSpan = document.createElement("span");
  productInfoPriceSpan.innerText =
    itemInfo.priceInEuros.toLocaleString("en-US");
  productInfoPriceSpan.className = "highlight";
  productInfoPrice.appendChild(productInfoPriceSpan);
  productInfoPrice.append(" eur.");

  return productInfoPrice;
}

// Creates a product actions element.
function createProductActions() {
  const productActions = document.createElement("div");
  productActions.className = "product-actions";

  // Create a "I Like It!" button and append it to the product actions.
  const productActionsButton = document.createElement("button");
  productActionsButton.innerText = "I Like It!";
  productActions.appendChild(productActionsButton);

  return productActions;
}

// Sets custom attributes for the product item based on the itemInfo data.
function setProductAttributes(itemInfo, productItem) {
  productItem.setAttribute("data-id", itemInfo.id);
  productItem.setAttribute("data-tags", itemInfo.tags);
}

// Collects all available tags from the products data.
function getAvailableTags(product) {
  for (const tag of product.tags) {
    if (!availableTags.includes(tag.toLowerCase()))
      availableTags.push(tag.toLowerCase());
  }
}

// Creates the tag selector dropdown and attaches an event listener to filter the catalog.
function createTagSelector(availableTags) {
  const catalogActions = document.getElementById("actions");

  const tagSelectorLabel = document.createElement("label");
  tagSelectorLabel.innerHTML =
    '<span class="highlight underline">Filter</span> products: ';

  const tagSelector = document.createElement("select");
  tagSelector.setAttribute("name", "tag-selector");
  tagSelector.setAttribute("id", "tag-selector");

  // Create an option for "all" tags and add it to the tag selector.
  const tagSelectorOption = document.createElement("option");
  tagSelectorOption.value = "all";
  tagSelectorOption.innerText = "all";
  tagSelector.appendChild(tagSelectorOption);

  // Create an option for each available tag and add them to the tag selector.
  for (const tag of availableTags) {
    const tagSelectorOption = document.createElement("option");
    tagSelectorOption.value = tag;
    tagSelectorOption.innerText = tag;
    tagSelector.appendChild(tagSelectorOption);
  }

  // Add an event listener to the tag selector to trigger catalog filtering.
  tagSelector.addEventListener("change", filterCatalog);

  catalogActions.appendChild(tagSelectorLabel);
  catalogActions.appendChild(tagSelector);
}

// Filters the catalog based on the selected tag in the tag selector.
function filterCatalog() {
  const tagSelectorValue = document.getElementById("tag-selector").value;
  const catalogProducts = document.querySelectorAll(".product-item");

  // Iterate through all products and either display or hide them based on the selected tag.
  for (const product of catalogProducts) {
    if (tagSelectorValue === "all") {
      product.style.display = "block";
    } else {
      if (product.dataset.tags.includes(tagSelectorValue)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    }
  }
}

// Draws the current year in the footer.
function drawFooterYear() {
  document.getElementById("current-year").innerText = new Date().getFullYear();
}

/* Events */
/* -------------------------------------------------------------------------------- */

// No event listeners provided in the code.

/* Run */
/* -------------------------------------------------------------------------------- */

// Load the content and draw the current year in the footer when the script is run.
loadContent();
drawFooterYear();
