const mainPage = document.getElementById('js-main-page');
const pageHeader = document.getElementById('js-page-header');
const playButtons = document.getElementsByClassName('play-button');
const likeButtons = document.getElementsByClassName('like-button');

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

Array.from(playButtons).forEach((btn) => {
  btn.addEventListener(
    'click',
    handleToggleButtonState('.play-button', 'is-playing')
  );
});

Array.from(likeButtons).forEach((btn) => {
  btn.addEventListener(
    'click',
    handleToggleButtonState('.like-button', 'is-liked')
  );
});

function handleToggleButtonState(btnClass, toggleClass) {
  return (e) => {
    const btn = e.target.closest(btnClass);
    btn.classList.toggle(toggleClass);
  };
}
