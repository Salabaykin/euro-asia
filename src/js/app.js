document.addEventListener("DOMContentLoaded", function() {

  // Tabs
  class Tabs {
    constructor(button, content) {
      this.button = button;
      this.content = content;
    }

    render() {
      const showTabs = (el) => {
        const btnTarget = el.currentTarget;
        const count = btnTarget.dataset.count;
        this.content.forEach((el) => {
          this.removeClass(el);
        });
        this.button.forEach((el) => {
          this.removeClass(el);
        });
        document.querySelector('#' + count).classList.add('active');
        btnTarget.classList.add('active');
      }

      this.button.forEach(function(el) {
        el.addEventListener("click", showTabs);
      });
    }

    removeClass(el) {
      el.classList.remove('active');
    }

  }

  // Tabs
  const tabLinks = document.querySelectorAll('.catalog-nav-tabs__link'),
        tabContent = document.querySelectorAll('.catalog-nav-tabs__content');

  const tabs = new Tabs(tabLinks, tabContent);
  tabs.render();

  // Popular slider
  const popularSwiper = new Swiper('.popular-slider.swiper-container', {
    loop: false,
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.popular-slider-next',
      prevEl: '.popular-slider-prev',
    },
  });

  // Crop-Text
  function cropText(selector, size) {
    const cropElement = document.querySelectorAll(selector), // выбор элементов 
    endCharacter = '...'; // окончание 
    cropElement.forEach(function(el) {
      let text = el.innerText;

      if (el.innerText.length > size) {
          text = text.substr(0, size);
          el.innerText = text + endCharacter;
      }
    });
  }
  cropText('.popular-item__title a', 41);
  cropText('.popular-item__category-name a', 30);

  // Amount
  const basketAmount = document.querySelectorAll('.basket-amount');
  basketAmount.forEach(item => {
    const input = item.querySelector('.basket-amount__input');
    input.value = 1;
    item.addEventListener('click', (event) => {
      const target = event.target;
      let count = input.value;
      if (target.closest('.basket-amount__btn-plus')) {
        if (count < 999) {
          count++;
        }
      } else if (target.closest('.basket-amount__btn-minus')) {
        if (count != '1') {
          count--;
        } 
      } 
      input.value = count;
    });
  });

});

