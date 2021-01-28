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

});

