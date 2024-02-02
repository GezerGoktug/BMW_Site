//! DOM ACCESS
const toggleİcon = document.getElementById("toggle-bar-icon");
const toggleBar = document.getElementById("toggle-bar");
const intoToggleBar = document.getElementsByClassName("toggle-bar")[0]; 
const car = document.getElementById("car");
const colorBadge = document.getElementsByClassName("color-badge");

//! CAROUSEL DOM ACCESS
const sliderWrapper = document.querySelector(".carousel-container"); 
const prevButton = document.querySelector("#prev-button"); 
const nextButton = document.querySelector("#next-button"); 
const totalSlides = document.querySelectorAll(".carousel-item").length; 

//! Geçerli slaytın indeksi ve toggle durumunu sakla
let currentIndex = 0;
let toggleClick = false;

//! Pencere dışında bir yere tıklandığında işlem yap
function windowClick(e) {
  if (!e.target.classList.contains("toggle-bar")) {
    toggleClick = false;
    intoToggleBar.classList.add("translate-x-full");
    setTimeout(() => {
      toggleBar.classList.add("hidden");
    }, 10);
    window.removeEventListener("click", windowClick);
  }
}

//! Toggle simgesine tıklandığında işlem yap
toggleİcon.addEventListener("click", () => {
  if (!toggleClick) {
    toggleBar.classList.remove("hidden");
    setTimeout(() => {
      intoToggleBar.classList.remove("translate-x-full");
      toggleClick = true;
      window.addEventListener("click", windowClick);
    }, 10);
  }
});

//! Çerez bildirimini göster
const showCookies = () => {
  const cookies = document.getElementById("cookies");
  const footer = document.getElementById("footer");
  cookies.style.display = "none";
  footer.classList.remove("pb-80");
  footer.classList.add("pb-12");
};

//! Araba resmini göster
const showCar = (src, e) => {
  car.style.opacity = 0;
  setTimeout(() => {
    car.src = `./img/colorsOptions/${src}.png`;
    car.style.opacity = 1;
  }, 200);
  for (let i = 0; i < colorBadge.length; i++) {
    colorBadge[i].classList.remove("border-green-700");
  }
  e.target.classList.add("border-green-700");
};

//! Belirli bir slaytı göster
function showSlide(index) {
  const slideWidth = document.querySelector(".carousel-item").offsetWidth;
  sliderWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
}

//! Önceki düğmeye tıklandığında işlem yap
prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showSlide(currentIndex);
  } else if (currentIndex === 0) {
    //! Son slayttaysa ve bir önceki düğmeye basılırsa
    currentIndex = totalSlides - 1; //! Son slayta git
    showSlide(currentIndex);
  }
});

//! Sonraki düğmeye tıklandığında işlem yap
nextButton.addEventListener("click", () => {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
    showSlide(currentIndex);
  } else if (currentIndex === totalSlides - 1) {
    //! Son slayttaysa ve bir sonraki düğmeye basılırsa
    currentIndex = 0; //! İlk slayta git
    showSlide(currentIndex);
  }
});

//! Başlangıçta ilk slaytı göster
showSlide(currentIndex);

//! Pencere kaydırıldığında işlem yap
window.onscroll = function () {
  scrollFunction();
};

//! Kaydırma fonksiyonu
function scrollFunction() {
  let navbar = document.getElementById("navbar");
  let navlist = document.getElementById("nav-list");
  let tooglebar = document.getElementById("toggle-bar-icon");
  if (
    document.body.scrollTop > 771.2 ||
    document.documentElement.scrollTop > 771.2
  ) {
    //! Scroll belirli bir noktadan aşağı kaydırıldığında
    navbar.classList.add(
      "bg-slate-100",
      "shadow-md",
      "text-slate-950",
      "fixed",
      "top-0",
      "right-0",
      "left-0"
    );
    navbar.children[0].classList.add("border-none");
    navlist.classList.add("text-black");
    tooglebar.classList.add("text-black");
  } else {
    //! Scroll yukarı doğru kaydırıldığında
    navbar.classList.remove(
      "bg-slate-100",
      "shadow-md",
      "text-slate-950",
      "fixed",
      "top-0",
      "right-0",
      "left-0"
    );
    navbar.children[0].classList.remove("border-none");
    navlist.classList.remove("text-black");
    tooglebar.classList.remove("text-black");
  }
}

