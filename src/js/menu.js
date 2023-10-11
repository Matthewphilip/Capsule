const hamburgerMenu = document.getElementById("hamburger-menu");
const menuBody = document.getElementById("menu-body");

hamburgerMenu.addEventListener("click", function (event) {
  event.stopPropagation(); // stop the click from propagating to the document

  //only open if screen is =< 1050px
  if (window.innerWidth <= 1050) {
    if (menuBody.style.display === "block") {
      menuBody.style.display = "none";
    } else {
      menuBody.style.display = "block";
    }
  }
});

// close menu if user clicks elsewhere on the screen
document.addEventListener("click", function (event) {
  if (
    menuBody.style.display === "block" &&
    event.target !== hamburgerMenu &&
    !menuBody.contains(event.target)
  ) {
    menuBody.style.display = "none";
  }
});
