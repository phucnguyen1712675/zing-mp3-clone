const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const mainPage = $('#js-main-page');
const pageHeader = $('#js-page-header');
const randomButton = $('#random-button');
const replayButton = $('#replay-button');
const playButtons = $$('.play-button');
const likeButtons = $$('.like-button');

mainPage.onscroll = function () {
  toggleHeaderBackgroundColor();
};

function toggleHeaderBackgroundColor() {
  if (mainPage.scrollTop > 0) {
    pageHeader.classList.add('is-sticky');
  } else {
    pageHeader.classList.remove('is-sticky');
  }
}

function handleToggleState(elementClass, toggleClass) {
  return (e) => {
    const targetElement = e.target.closest(elementClass);
    if (targetElement) {
      targetElement.classList.toggle(toggleClass);
    }
  };
}

Array.from(playButtons).forEach((btn) => {
  btn.addEventListener(
    'click',
    handleToggleState('.play-button', 'is-playing')
  );
  btn.addEventListener('click', handleToggleState('.song-item', 'is-active'));
});

Array.from(likeButtons).forEach((btn) => {
  btn.addEventListener('click', handleToggleState('.like-button', 'is-liked'));
});

randomButton.addEventListener(
  'click',
  handleToggleState('.random-button', 'is-active')
);

replayButton.addEventListener(
  'click',
  handleToggleState('.replay-button', 'is-active')
);
