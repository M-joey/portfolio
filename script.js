const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 3000,
    disableOnInteractioin: false,
  },
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
});


// to-top
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})


toTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
})

 
// works gsap
function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if(elem.classList.contains("animation_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("animation_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 1.25, 
    x: 0,
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto"
  });
}

function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray(".animation").forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });
});

//ハンバーガーメニュー
const menu = document.getElementById("js-btn");
const openIcon = document.getElementById("icon-open");
const closeIcon = document.getElementById("icon-close");

openIcon.onclick = () => {
  menu.classList.add("open");
  openIcon.style.display = "none";
}

closeIcon.onclick = () => {
  menu.classList.remove("open");
  openIcon.style.display = "block";
}

const navList = document.getElementsByClassName('navlist');
index = 0;
while (index < navList.length){
  navList[index].addEventListener('click', () => {
    menu.classList.remove("open");
    openIcon.style.display = "block";
  })
  index++;
}

//contact form
const scriptURL = 'https://script.google.com/macros/s/AKfycbzq2v_vudlTKdE46S3EZjgUDzs-9ifPxw0SbZ5cEH985dFf3ZiyXbaY7NhxEi72tH3q/exec'
  const form = document.forms['submit-to-google-sheet']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })
