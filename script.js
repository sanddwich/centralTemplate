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
const minName = 3;
  


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

mySwiper.on('slideChange', () => {
  const curSlide = +mySwiper.realIndex + 1;
  updateSlides(curSlide);
  updateLinks(curSlide);
})

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
    updateSlides(event.target.getAttribute('slide'), true);
  })
})

function updateSlides(curSlide, toSlide = false) {
  document.querySelector('.block1__transcriptopn').innerHTML = blockBorder + block1Slides.find(el => el.slideNumber === +curSlide).content;
  document.querySelector('.block1__additional').innerHTML = blockBorder + block1Slides.find(el => el.slideNumber === +curSlide).content;
  toSlide ? mySwiper.slideTo(+curSlide, 300, false) : null;
}

function updateLinks(curSlide) {
  document.querySelectorAll('#link').forEach(el => {
    el.classList.remove('active');
    +el.getAttribute('slide') === curSlide ? el.classList.add('active') : null;
  })
}

function questionsHandler(event) {
  event.preventDefault();
  let formData = null;

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  const nameRes = checkName(name, 'name');  
  const phoneRes = checkPhone(phone, 'phone');

  if (checkName(name, 'name') && checkPhone(phone, 'phone')) {
    formData = {name, phone};
  } else {
    return;
  }
  
  cleanForm();
  sendData(formData);
}

function nameHandler(event) {
  checkName(event.target.value, event.target.getAttribute('id'));
}

function elError(id) {
  document.getElementById(id).style.border = 'red solid 1px';
  document.querySelector(`[for="${id}"]`).style.color = 'red';
}

function elSuccess(id) {
  document.getElementById(id).style.border = null;
  document.querySelector(`[for="${id}"]`).style.color = null;
}

function checkName(name, id) {
  let result = null;
  name.length < minName ? result=false : result=true;
  result ? elSuccess(id) : elError(id);
  return result;
}

function checkPhone(phone, id) {
  let result = null;
  phone.length === 0 ? result=false : result=true;
  result ? elSuccess(id) : elError(id);
  return result;
}

function cleanForm() {
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
}

function sendData(formData) {
  alert(`Вами отправлены данныe: ${formData.name}, ${formData.phone}`);
}