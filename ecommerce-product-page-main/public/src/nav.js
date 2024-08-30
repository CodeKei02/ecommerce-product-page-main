let hamburgerIcon = document.querySelector("#hamburger-btn");
let mobileMenu = document.querySelector(".nav-menu");
let overlay = document.querySelector(".overlay");
let closeMenuBtn = document.querySelector(".close-menu");

hamburgerIcon.addEventListener("click", function () {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
});

closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

function closeMenu(){
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
}
