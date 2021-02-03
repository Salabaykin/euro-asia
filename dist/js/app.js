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
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.popular-slider-next',
      prevEl: '.popular-slider-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      700: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      // when window width is >= 640px
      1220: {
        slidesPerView: 4
      }
    }
  });

  // Crop-Text
  if (document.documentElement.clientWidth > 700) {
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
  }

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

  // Catalog - header
  const catalogNav = document.querySelector('.catalog-nav'),
        overlay = document.querySelector('.overlay'),
        overlayNav = document.querySelector('.overlay-nav'),
        headerBlock = document.querySelector('.header'),
        headerTopNav = document.querySelector('.header-top-nav');

  headerBlock.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target);
    if (target.closest('.catalog-btn')) {
      catalogNav.classList.toggle('show');
      overlay.classList.toggle('show');
    } else if (target.closest('.burger-menu')) {
      headerTopNav.classList.toggle('active');
      overlayNav.classList.toggle('active');
    } else if (target.closest('.header-top-nav__close') || target.closest('.overlay-nav')) {
      headerTopNav.classList.remove('active');
      overlayNav.classList.remove('active');
    } 
  });
  overlay.addEventListener('click', () => {
    catalogNav.classList.remove('show');
    overlay.classList.remove('show');
  });

  // Modal 
  const popUp = () => {
    const modalContent = document.querySelector('.modal__content');

    const modalData = {
      popupLink: document.querySelectorAll('[data-link-id]'),
      modal: document.querySelectorAll('.modal'),
      closeBtn(elem) {
        const closeBtn = elem.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
          this.closeModal(elem);
        });
        this.modal.forEach(elem => {
          elem.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__window')) {
              this.closeModal(elem);
            }
          });
        });

      },
      closeModal(elem) {
        elem.classList.remove('modal-open');
      },
      openModal(attr) {
        this.modal.forEach((elem) => {
          const elemAttr = elem.getAttribute('data-modal-id');
          if (attr === elemAttr) {
            elem.classList.add('modal-open');
            this.closeBtn(elem);
          }
        });
      },
    };

    modalData.popupLink.forEach(elem => {
      elem.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;
        const attrLinkValue = target.getAttribute('data-link-id');
        modalData.openModal(attrLinkValue);
      });
    });

  };

  popUp();

});

