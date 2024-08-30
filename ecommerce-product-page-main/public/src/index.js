const imageThumbBtns = document.querySelectorAll(".imageProduct-thumb");
const mainImage = document.querySelector(".imageProduct");
const mainImagesContainer = document.querySelector(".slide");
const lightBoxOverlay = document.querySelector(".light-box-overlay");
const overlayEffect = document.querySelector(".overlay-effect");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const isDesktop = window.innerWidth >= 786;

let currentFocusedThumbnail = null;
let currentIndex = 0;
let mainImageLightBox = null;

const imagesData = [
  { product: "product1", imageFull: "../images/image-product-1.jpg" },
  { product: "product2", imageFull: "../images/image-product-2.jpg" },
  { product: "product3", imageFull: "../images/image-product-3.jpg" },
  { product: "product4", imageFull: "../images/image-product-4.jpg" },
];

function showImage(imageElement) {
  const { imageFull, product } = imagesData[currentIndex];
  imageElement.src = imageFull;
  imageElement.alt = product;
}

function changeImage(direction) {
  currentIndex =
    (currentIndex + direction + imagesData.length) % imagesData.length;
  const targetImage = isDesktop ? mainImageLightBox : mainImage;
  showImage(targetImage);
}

function addNavigationListeners() {
  prevBtn.addEventListener("click", () => changeImage(-1));
  nextBtn.addEventListener("click", () => changeImage(1));
}

addNavigationListeners();

function focusedThumbnail() {
  imageThumbBtns.forEach((imageBtn, index) => {
    imageBtn.addEventListener("click", () => {
      const { imageFull, product } = imagesData[index];
      mainImage.src = imageFull;
      mainImage.alt = product;

      if (currentFocusedThumbnail)
        currentFocusedThumbnail.classList.remove("focused");
        imageBtn.classList.add("focused");
        currentFocusedThumbnail = imageBtn;
    });
  });
}

focusedThumbnail();

function handleLightbox() {
  if (!isDesktop) return;

  mainImage.addEventListener("click", () => {
    const clonedContainer = mainImagesContainer.cloneNode(true);
    const closeButton = document.createElement("button");

    closeButton.classList.add("btn-close");
    closeButton.innerHTML = `<img src="../images/icon-close.svg" alt="close" class="image-close">`;

    lightBoxOverlay.innerHTML = "";
    lightBoxOverlay.append(closeButton, clonedContainer);
    lightBoxOverlay.classList.remove("disabled");
    overlayEffect.style.display = "block";

    mainImageLightBox = lightBoxOverlay.querySelector(".imageProduct");

    const lightBoxPrevBtn = lightBoxOverlay.querySelector(".prev");
    const lightBoxNextBtn = lightBoxOverlay.querySelector(".next");

    lightBoxPrevBtn.addEventListener("click", () => changeImage(-1));
    lightBoxNextBtn.addEventListener("click", () => changeImage(1));

    closeButton.addEventListener("click", () => {
      lightBoxOverlay.classList.add("disabled");
      overlayEffect.style.display = "none";
    });
  });
}

handleLightbox();
