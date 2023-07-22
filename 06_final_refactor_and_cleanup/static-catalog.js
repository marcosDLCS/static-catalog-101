/* Dynamic behavior with JS */
/* -------------------------------------------------------------------------------- */

/* Imports */
/* -------------------------------------------------------------------------------- */

import { products } from "./products.js";

/* State */
/* -------------------------------------------------------------------------------- */

// An array to store the available tags extracted from the products.
const availableTags = [];

// An array to store the IDs of the user's favorite houses.
let favouriteHouses = [];

/* Functions */
/* -------------------------------------------------------------------------------- */

// Function to retrieve user's favorite houses from local storage.
function getInfoFromLocalStorage() {
  // Get the favorite houses data from the local storage.
  const favouriteHousesInLocalStorage = localStorage.getItem("favouriteHouses");

  // Check if data exists in local storage, parse and update the 'favouriteHouses' array.
  if (favouriteHousesInLocalStorage !== null) {
    favouriteHouses = JSON.parse(favouriteHousesInLocalStorage);
  }
}

// Function to load content into the catalog element on the web page.
function loadContent() {

  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";

  getInfoFromLocalStorage();

  // Loop through each product in the 'products' array.
  for (const product of products) {
    createProductItem(catalog, product);
    getAvailableTags(product);
  }

  createTagSelector(availableTags);

  logInfo();
}

// Function to log information about available tags and favorite houses to the console.
function logInfo() {
  console.info("The available tags are: ", availableTags);
  console.info("The favourite houses are: ", favouriteHouses);
}

// Function to create a product item and append it to the catalog.
function createProductItem(catalog, itemInfo) {
  const productItem = document.createElement("div");
  productItem.className = "product-item";

  // Create product title, info, and actions and append them to the product item.
  const productTitle = createProductTitle(itemInfo);
  const productInfo = createProductInfo(itemInfo);
  const productActions = createProductActions(itemInfo);

  productItem.appendChild(productTitle);
  productItem.appendChild(productInfo);
  productItem.appendChild(productActions);

  // Set custom attributes for the product item (data-id, data-tags).
  setProductAttributes(itemInfo, productItem);

  // Append the product item to the catalog.
  catalog.appendChild(productItem);
}

// Function to create the product title element.
function createProductTitle(itemInfo) {
  const productTitle = document.createElement("div");
  productTitle.className = "product-title";

  const productTitleParagraph = document.createElement("p");
  productTitleParagraph.innerText = itemInfo.title;
  productTitle.appendChild(productTitleParagraph);

  return productTitle;
}

// Function to create the product info element.
function createProductInfo(itemInfo) {
  const productInfo = document.createElement("div");
  productInfo.className = "product-info";

  // Create product info media (image) and description and append them to the product info.
  const productInfoMedia = createProductInfoMedia(itemInfo);
  const productInfoDescr = createProductInfoDescr(itemInfo);

  productInfo.appendChild(productInfoMedia);
  productInfo.appendChild(productInfoDescr);

  return productInfo;
}

// Function to create the product info media (image).
function createProductInfoMedia(itemInfo) {
  const productInfoMedia = document.createElement("div");
  productInfoMedia.className = "product-media";

  const productInfoMediaImg = document.createElement("img");
  productInfoMediaImg.src = "../resources/img/" + itemInfo.picture;
  productInfoMediaImg.alt = itemInfo.title;
  productInfoMedia.appendChild(productInfoMediaImg);

  return productInfoMedia;
}

// Function to create the product info description element.
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

// Function to create the product tags element.
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

// Function to create the product price element.
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

// Function to create the product actions (like/dislike) element.
function createProductActions(itemInfo) {
  const productActions = document.createElement("div");
  productActions.className = "product-actions";

  // Add the 'like' class to the product actions if the product is in the user's favorites.
  if (favouriteHouses.includes(itemInfo.id)) {
    productActions.classList.add("like");
  }

  // Create the 'I Like It!' button and add a click event listener to it.
  const productActionsButton = document.createElement("button");
  productActionsButton.innerText = "I Like It!";
  productActionsButton.addEventListener("click", likeDislike);

  // Create the product reaction element and append it to the product actions.
  const productActionsReaction = document.createElement("div");
  productActionsReaction.className = "product-reaction";

  productActions.appendChild(productActionsReaction);
  productActions.appendChild(productActionsButton);

  return productActions;
}

// Function to set custom attributes (data-id, data-tags) for the product item.
function setProductAttributes(itemInfo, productItem) {
  productItem.setAttribute("data-id", itemInfo.id);
  productItem.setAttribute("data-tags", itemInfo.tags);
}

// Function to collect available tags from each product.
function getAvailableTags(product) {
  for (const tag of product.tags) {
    // Convert tags to lowercase and add them to 'availableTags' if they don't already exist.
    if (!availableTags.includes(tag.toLowerCase()))
      availableTags.push(tag.toLowerCase());
  }
}

// Function to create the tag selector dropdown based on available tags.
function createTagSelector(availableTags) {
  const catalogActions = document.getElementById("actions");

  const tagSelectorLabel = document.createElement("label");
  tagSelectorLabel.innerHTML =
    '<span class="highlight underline">Filter</span> products: ';

  const tagSelector = document.createElement("select");
  tagSelector.setAttribute("name", "tag-selector");
  tagSelector.setAttribute("id", "tag-selector");

  const tagSelectorOption = document.createElement("option");
  tagSelectorOption.value = "all";
  tagSelectorOption.innerText = "all";
  tagSelector.appendChild(tagSelectorOption);

  for (const tag of availableTags) {
    const tagSelectorOption = document.createElement("option");
    tagSelectorOption.value = tag;
    tagSelectorOption.innerText = tag;
    tagSelector.appendChild(tagSelectorOption);
  }

  tagSelector.addEventListener("change", filterCatalog);

  catalogActions.appendChild(tagSelectorLabel);
  catalogActions.appendChild(tagSelector);
}

// Function to filter the catalog based on the selected tag.
function filterCatalog() {
  const tagSelectorValue = document.getElementById("tag-selector").value;
  const catalogProducts = document.querySelectorAll(".product-item");

  for (const product of catalogProducts) {
    if (tagSelectorValue === "all") {
      // Show all products if the selected tag is 'all'.
      product.style.display = "block";
    } else {
      // Show or hide products based on their tags and the selected tag.
      if (product.dataset.tags.includes(tagSelectorValue)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    }
  }
}

// Function to handle the 'I Like It!' button click and update favorite houses.
function likeDislike(event) {
  const target = event.target;
  const targetParent = target.closest(".product-actions");

  // Toggle the 'like' class to change the appearance of the button.
  targetParent.classList.toggle("like");

  const targetRootItem = target.closest(".product-item");
  const targetRootItemId = parseInt(targetRootItem.dataset.id);

  if (!favouriteHouses.includes(targetRootItemId)) {
    // If the product is not in the favorite houses, add it.
    favouriteHouses.push(parseInt(targetRootItemId));
  } else {
    // If the product is already in the favorite houses, remove it.
    favouriteHouses.splice(
      favouriteHouses.indexOf(parseInt(targetRootItemId)),
      1
    );
  }

  // Update the local storage with the updated favorite houses.
  localStorage.setItem("favouriteHouses", JSON.stringify(favouriteHouses));
}

// Function to draw the footer with the current year.
function drawFooterYear() {
  document.getElementById("current-year").innerText = new Date().getFullYear();
}

/* Events */
/* -------------------------------------------------------------------------------- */

/* Run */
/* -------------------------------------------------------------------------------- */

// Load the content and draw the footer year when the page loads.
loadContent();
drawFooterYear();
