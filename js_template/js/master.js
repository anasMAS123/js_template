//check if there is a color in local storage
let mainColorOption = localStorage.getItem("mainColor");
if (mainColorOption !== null) {
  // console.log("there is a value");
  // console.log(localStorage.getItem("mainColor"));
  document.documentElement.style.setProperty("--main-color", mainColorOption);

  // check if there is a color in local storage we should modify the active class to be assigned to this color

  document.querySelectorAll(".colors-list li.active").forEach((element) => {
    element.classList.remove("active");
  });
  document.querySelectorAll(".colors-list li").forEach((element) => {
    if (element.dataset.color == mainColorOption)
      element.classList.add("active");
  });
}
// toggle spin icon
document.querySelector(".toggle-settings .gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};
//switch colors

//get all list item im an array
const colorLi = document.querySelectorAll(".colors-list li");
//looping on the colors array for a future action
colorLi.forEach((li) => {
  //when click targeted list item get its color and assign its value in the root
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // setting in local storage
    localStorage.setItem("mainColor", e.target.dataset.color);

    // remove the active class from all li then put this class on the chosen one only
    handleActive(e); // as you see later in code we made this function to remove all active classname and put it forthe target only
    //so these next lines we do not need anymore

    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // // put the class on chosen one
    // e.target.classList.add("active");
  });
});
//switch the option of changing the background randomly
let landingPage = document.querySelector(".landing-page");
let imagearr = ["bg6.jpg", "bg7.jpg", "bg8.jpg", "bg9.jpg", "bg10.jpg"];

let current;

//random baackground option
let backgroundOption = false;

// we should catch the interval
let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background_option"); //!! note it returns string not boolean
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    randomizeImages();
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");

    if (backgroundLocalItem === "true") {
      document.querySelector(".yes").classList.add("active");
    } else {
      document.querySelector(".no").classList.add("active");
    }
  });
  console.log(backgroundLocalItem);
  console.log(backgroundOption);
}

//get all list item im an array
const randomBackgroundElement = document.querySelectorAll(
  " .random-background span"
);
//looping on the two spans
randomBackgroundElement.forEach((span) => {
  //when click targeted the span
  span.addEventListener("click", (e) => {
    // remove the active class from all spans then put this class on the chosen one only

    handleActive(e); // as you see later in code we made this function to remove all active classname and put it forthe target only
    //so these next lines we do not need anymore

    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // // put the class on chosen one
    // e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImages();
      localStorage.setItem("background_option", true);
    } else if (e.target.dataset.background === "no") {
      clearInterval(backgroundInterval);
      backgroundOption = false;
      landingPage.style.backgroundImage = current;
      localStorage.setItem("background_option", false);
    }
  });
});

//function to randomize Imgs
function randomizeImages() {
  if (backgroundOption === true) {
    let randomnunber = Math.floor(Math.random() * imagearr.length);
    backgroundInterval = setInterval(() => {
      randomnunber = Math.floor(Math.random() * imagearr.length);
      landingPage.style.backgroundImage =
        'url("../images/' + imagearr[randomnunber] + '")';
      current = 'url("../images/' + imagearr[randomnunber] + '")';
    }, 1000);
  }
}

// select the skill
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.scrollY;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let ourSkillsProgress = document.querySelectorAll(
      ".skills .skill-box .skill-progress span"
    );
    ourSkillsProgress.forEach((i) => {
      i.style.width = i.dataset.progress;
    });
  }
};

// create popup with images
let ourGallery = document.querySelectorAll(".gallery .image-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (i) => {
    //create overlay element
    let overlay = document.createElement("div");

    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    let popupImage = document.createElement("img");
    popupImage.src = i.target.src;

    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    if (i.target.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(i.target.alt);
      imgHeading.appendChild(imgText);
      popupBox.insertBefore(imgHeading, popupBox.firstChild);
    }

    let closeButton = document.createElement("span");
    closeButton.className = "close-button";

    let closeButtonText = document.createTextNode("X");

    closeButton.appendChild(closeButtonText);
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

//nav-bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// allBullets.forEach((bullet) => {
//   bullet.addEventListener("click", (e) => {
//     document
//       .querySelector(e.target.dataset.section)
//       .scrollIntoView({ behavior: "smooth" });
//   });
// });

//website links
const allLinks = document.querySelectorAll(".links li a");

// allLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault(); // the code runs without it but its add prevents the normal behavior of the link tomove you from another url page
//     document
//       .querySelector(e.target.dataset.section)
//       .scrollIntoView({ behavior: "smooth" });
//   });
// });

// make a function moves you when click to prevent repeat myself

function moveToSomewhere(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault(); // the code runs without it but its add prevents the normal behavior of the link tomove you from another url page
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
moveToSomewhere(allBullets);
moveToSomewhere(allLinks);

// Handling Active element

function handleActive(ev) {
  // Remove active form all elements that has active
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  // Adding class active for currently targeted element
  ev.target.classList.add("active");
}

// showing/hiding the bullets
let bulletSpan = document.querySelectorAll(".bullets-options span");
let bulletContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_options");
if (bulletLocalItem !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletContainer.style.display = "block";
    document.querySelector(".bullets-options .yes").classList.add("active");
  } else if (bulletLocalItem === "none") {
    bulletContainer.style.display = "none";
    document.querySelector(".bullets-options .no").classList.add("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      bulletContainer.style.display = "block";
      localStorage.setItem("bullets_options", "block");
    } else if (e.target.dataset.display === "hide") {
      bulletContainer.style.display = "none";
      localStorage.setItem("bullets_options", "none");
    }

    handleActive(e);
  });
});

// reset options

let resetButton = (document.querySelector(".reset-options").onclick =
  function () {
    // localStorage.clear();
    localStorage.removeItem("mainColor");
    localStorage.removeItem("bullets_options");
    localStorage.removeItem("background_options");
    location.reload();
  });

// Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
//when click on toggle-menu , toggle its state (close , open)
toggleBtn.onclick = function (e) {
  //stop propagation  : stop get the items in toggleBtn when i click
  e.stopPropagation();

  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};
tLinks.onclick = function (e) {
  e.stopPropagation();
};

// when click on overlay close the menu

// let overlay = document.querySelector(".overlay");

// overlay.onclick = function () {
//   toggleBtn.classList.remove("menu-active");
//   tLinks.classList.remove("open");
// };

// another way to close the menu when click any where else

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    console.log(e.target);
    if (toggleBtn.classList.contains("menu-active")) {
      toggleBtn.classList.remove("menu-active");
    }
    if (tLinks.classList.remove("open")) {
      tLinks.classList.remove("open");
    }
  }
});
