var mySwiper = new Swiper(".swiper-container", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  height: "450px",

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next-kis",
    prevEl: ".swiper-button-prev-kis",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const block1Slides = [
  {
    title: "Будущее уже рядом",
    content: `
    <h1>
    <span>Будущее</span><br />
      уже рядом
    </h1>
    В жилом квартале "Центральный" реализована концепция нового города
    будущего. Это следующий уровень астраханского девелопмента &mdash;
    комплекс <strong>повышенной комфортности</strong>
    `,
    slideNumber: 1,
  },
  {
    title: "Высокое качество", 
    content: `
    <h1>
    <span>Высокое</span><br />
      качество
    </h1>
    2-й слайд: В жилом квартале "Центральный" реализована концепция нового города
    будущего. Это следующий уровень астраханского девелопмента &mdash;
    комплекс <strong>повышенной комфортности</strong>
    `,
    slideNumber: 2,
  },
  {
    title: "Не просто дома",
    content: `
    <h1>
    <span>Не просто дома</span>
    </h1>
    3-й слайд: В жилом квартале "Центральный" реализована концепция нового города
    будущего. Это следующий уровень астраханского девелопмента &mdash;
    комплекс <strong>повышенной комфортности</strong>
    `,
    slideNumber: 3,
  },
];

const blockBorder = `<div class="block1__orange-border"></div>`;
const deviceWidth = document.documentElement.clientWidth;
  
if (deviceWidth < 768) {
  document.querySelectorAll('#slide-img').forEach(el => {
    el.style.height = '300px';
  })
}

document.querySelectorAll('#link').forEach(el => {
  el.addEventListener('click', event => {
    document.querySelectorAll('#link').forEach(link => {
      link.classList.remove('active');
    });
    event.target.classList.add('active');
    updateSlides(event.target.getAttribute('slide'));
  })
})

function updateSlides(curSlide) {
  document.querySelector('.block1__transcriptopn').innerHTML = blockBorder + block1Slides.find(el => el.slideNumber === +curSlide).content;
  document.querySelector('.block1__additional').innerHTML = blockBorder + block1Slides.find(el => el.slideNumber === +curSlide).content;
  mySwiper.slideTo(+curSlide, 300, false);
}

document.querySelectorAll('[role="button"]').forEach(el => { 
  el.addEventListener('click', event => {
    let curSlide = mySwiper.activeIndex;
    if (curSlide === 0) {curSlide = block1Slides.length};
    if (curSlide > block1Slides.length) {curSlide = 1};
    updateSlides(curSlide);
    document.querySelectorAll('#link').forEach(el => {
      el.classList.remove('active');
      +el.getAttribute('slide') === curSlide ? el.classList.add('active') : null;
    })
  })
})
