/*RESPONSIVE MENU*/
const menuIcon = document.querySelector(".icon-menu");

menuIcon.addEventListener("click", () => {
  const navigationList = document.querySelector(".navigation-list");
  const hamburgerMenu = document.querySelector(".icon-menu .fa-solid");
  const navigation = document.querySelector("nav");

  if (hamburgerMenu.classList[2] === "fa-bars") {
    hamburgerMenu.classList.remove("fa-bars");
    hamburgerMenu.classList.add("fa-xmark");
    navigation.classList.add("responsive");
    navigationList.style.display = "block";
  } else {
    hamburgerMenu.classList.remove("fa-xmark");
    hamburgerMenu.classList.add("fa-bars");
    navigation.classList.remove("responsive");
    navigationList.style.display = "none";
  }
});

/*TRANSITION ELEMENTS*/
const slideFromTopElements = document.querySelectorAll(".slide-top-bottom");
const fusionElements = document.querySelectorAll(".fusion");
const slideFromRightElements = document.querySelectorAll(".slide-right");
const slideFromLeftElements = document.querySelectorAll(".slide-left");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

slideFromTopElements.forEach((element) => observer.observe(element));
fusionElements.forEach((element) => observer.observe(element));
slideFromRightElements.forEach((element) => observer.observe(element));
slideFromLeftElements.forEach((element) => observer.observe(element));

/*SCROLL ARROW*/
window.addEventListener("scroll", () => {
  const scrollArrowUp = document.querySelector(".arrow-up");

  if (window.scrollY <= 159) {
    scrollArrowUp.style.display = "none";
  } else if (window.scrollY >= 159) {
    scrollArrowUp.style.display = "block";

    scrollArrowUp.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
/*ABOUT-ME-GALLERY*/
document.addEventListener("DOMContentLoaded", () => {
  const aboutMeGallery = document.querySelector(".about-me-gallery");
  const galleryBackBtn = document.querySelector(".about-me-gallery-left-arrow");
  const galleryNextBtn = document.querySelector(
    ".about-me-gallery-right-arrow"
  );

  aboutMeGallery.addEventListener("wheel", (event) => {
    event.preventDefault();
    aboutMeGallery.style.scrollBehavior = "auto";
    aboutMeGallery.scrollLeft += event.deltaY;
  });

  galleryNextBtn.addEventListener("click", () => {
    scrollGallery(350);
  });

  galleryBackBtn.addEventListener("click", () => {
    scrollGallery(-350);
  });

  const scrollGallery = (amount) => {
    aboutMeGallery.style.scrollBehavior = "smooth";
    aboutMeGallery.scrollLeft = aboutMeGallery.scrollLeft + amount;
  };
});

/*MASSAGES SLIDESHOW*/
const sliders = document.querySelectorAll(".slider");

sliders.forEach((slider) => {
  const list = slider.querySelector(".list");
  const items = slider.querySelectorAll(".item");
  const dots = slider.querySelectorAll(".dots li");
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");

  let active = 0;
  const lengthItems = items.length - 1;

  const nextFunction = () => {
    active = active + 1 > lengthItems ? 0 : active + 1;
    reloadSlider();
  };

  const prevFunction = () => {
    active = active - 1 < 0 ? lengthItems : active - 1;
    reloadSlider();
  };

  next.addEventListener("click", nextFunction);
  prev.addEventListener("click", prevFunction);

  let refreshSlider = setInterval(nextFunction, 5000);

  const reloadSlider = () => {
    const checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + "px";

    const lastActiveDot = slider.querySelector(".dots li.active");
    if (lastActiveDot) {
      lastActiveDot.classList.remove("active");
    }
    dots[active].classList.add("active");

    clearInterval(refreshSlider);
    refreshSlider = setInterval(nextFunction, 5000);
  };

  dots.forEach((li, index) => {
    li.addEventListener("click", () => {
      active = index;
      reloadSlider();
    });
  });

  reloadSlider();
});

/*NEWS GALLERY*/
const newsItems = document.querySelectorAll(".news-item");
const newsDots = document.querySelectorAll(".news-dots li");

let activeItem = 0;
const totalItems = newsItems.length;
const intervalTime = 7000;

const showSlide = () => {
  newsItems.forEach((item, index) => {
    if (index === activeItem) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  newsDots.forEach((dot, index) => {
    if (index === activeItem) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
};

const nextSlide = () => {
  activeItem = (activeItem + 1) % totalItems;
  showSlide();
};

setInterval(nextSlide, intervalTime);

showSlide();

newsDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    activeItem = index;
    showSlide();
  });
});
