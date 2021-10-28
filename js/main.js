const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const mainPage = $('#js-main-page');
const pageHeader = $('#js-page-header');
const randomButton = $('#random-button');
const replayButton = $('#replay-button');
const audio = $('#audio');
const progress = $('#progress-song');
const songListContent = $('.song-list-content');
const playerControlsThumbnail = $('.player-controls-left .media-img');
const playerControlsSongTitle = $('.player-controls-left .song-title');
const playerControlsSongSubTitle = $('.player-controls-left .song-subtitle');
const playerControlsSongDuration = $('.player-controls-center .time.right');
const cdThumbs = $$('.media-img');
const bigPlayButtons = $$(
  '.play-button:not(.song-item-left-content__thumbnail.play-button)'
);
const likeButtons = $$('.like-button');

const playBtnArr = Array.from(bigPlayButtons);
const cdThumbArr = Array.from(cdThumbs);

// function handleToggleState(elementClass, toggleClass) {
//   return (e) => {
//     const targetElement = e.target.closest(elementClass);
//     targetElement && targetElement.classList.toggle(toggleClass);
//   };
// }

// Array.from(bigPlayButtons).forEach((btn) => {
//   btn.addEventListener(
//     'click',
//     handleToggleState('.play-button', 'is-playing')
//   );
//   btn.addEventListener('click', handleToggleState('.song-item', 'is-active'));
// });

// Array.from(likeButtons).forEach((btn) => {
//   btn.addEventListener('click', handleToggleState('.like-button', 'is-liked'));
// });

// randomButton.addEventListener(
//   'click',
//   handleToggleState('.random-button', 'is-active')
// );

// replayButton.addEventListener(
//   'click',
//   handleToggleState('.replay-button', 'is-active')
// );

let toHHMMSS = (secs) => {
  let sec_num = parseInt(secs, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor(sec_num / 60) % 60;
  let seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};

const app = {
  currentIndex: 0,
  isPlaying: false,
  songs: [
    {
      id: 1,
      name: 'có hẹn với thanh xuân',
      singers: ['MONSTAR'],
      path: './assets/audio/co-hen-voi-thanh-xuan-MONSTAR.mp3',
      image:
        'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/2/3/f/e23ff2faaa64eebfc57e0acde247f0db.jpg',
      duration: 218,
    },
    {
      id: 2,
      name: 'Yêu Một Người Sao Buồn Đến Thế',
      singers: ['Noo Phước Thịnh'],
      path: './assets/audio/Yeu-Mot-Nguoi-Sao-Buon-Den-The-Noo-Phuoc-Thinh.mp3',
      image:
        'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/0/c/3/e0c341956a038d66b77275b20168b112.jpg',
      duration: 299,
    },
    {
      id: 3,
      name: 'Ngày Mai Em Đi (Touliver Mix)',
      singers: ['Touliver', 'Lê Hiếu', 'SOOBIN'],
      path: './assets/audio/Ngay-Mai-Em-Di-Touliver-Mix-Touliver-Le-Hieu-SOOBIN.mp3',
      image:
        'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/6/9/695bf88c1edaf82e0bd5e085716e5598_1501654149.jpg',
      duration: 218,
    },
    {
      id: 4,
      name: 'Em Không Thể',
      singers: ['Tiên Tiên', 'Touliver'],
      path: './assets/audio/Em-Khong-The-Tien-Tien-Touliver.mp3',
      image:
        'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/f/8/f/2/f8f2cd19c3e2e48603a510888807c363.jpg',
      duration: 251,
    },
    {
      id: 5,
      name: 'Yêu 5',
      singers: ['Rhymastic'],
      path: './assets/audio/Yeu-5-Rhymastic.mp3',
      image:
        'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/b/5/b5aa78aa102467e5648160a4ac93df8e_1486467660.jpg',
      duration: 240,
    },
    {
      id: 6,
      name: 'Buồn Của Anh',
      singers: ['K-ICM', 'Đạt G', 'Masew'],
      path: './assets/audio/Buon-Cua-Anh-K-ICM-Dat-G-Masew.mp3',
      image:
        'https://photo-resize-zmp3.zadn.vn/w94_r1x1_png/covers/c/0/c0827e5f2c898fc987e7883151b0476a_1513651595.png',
      duration: 288,
    },
    {
      id: 7,
      name: 'Phía Sau Em',
      singers: ['Kay Trần', 'Binz'],
      path: './assets/audio/Phia-Sau-Em-Kay-Tran-Binz.mp3',
      image:
        'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/avatars/c/3/c300ae434343b009621c000ef85bc849_1379696767.jpg',
      duration: 224,
    },
    {
      id: 8,
      name: '1 Phút',
      singers: ['Andiez'],
      path: './assets/audio/1-Phut-Andiez.mp3',
      image:
        'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/f/d/fd4276c762a53e86ec980bb373a5a805_1504774753.jpg',
      duration: 376,
    },
    {
      id: 9,
      name: 'Vô Tình',
      singers: ['Xesi', 'Hoaprox'],
      path: './assets/audio/Vo-Tinh-Xesi-Hoaprox.mp3',
      image:
        'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/9/8/5/798559c5b7d028c351d34a37c7a598cc.jpg',
      duration: 274,
    },
    {
      id: 10,
      name: 'nằm ngủ emru',
      singers: ['Bích Phương'],
      path: './assets/audio/nam-ngu-emru-Bich-Phuong.mp3',
      image:
        'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/b/e/d/9bed2137143317d0b4a791c8955ae276.jpg',
      duration: 255,
    },
  ],
  renderSingers: (song) => {
    if (song.singers.length > 1) {
      return song.singers.map((singer) => `<a>${singer}</a>`).join(', ');
    } else {
      return `<a>${song.singers[0]}</a>`;
    }
  },
  render() {
    const htmls = this.songs.map(
      (song) => `
    <div class="select-item">
      <div class="song-item media-item">
        <div class="song-item-left-content">
            <div class="song-item-left-content__prefix">
                <i class="fas fa-music"></i>
            </div>
            <div class="song-item-left-content__thumbnail play-button">
                <div class="media-img-wrapper">
                    <div class="media-img is-40x40"
                        style="background-image: url('${song.image}')">
                    </div>
                </div>
                <div class="opacity">
                </div>
                <div class="media-actions-container">
                    <div class="media-actions-inner">
                        <button class="btn">
                            <i class="fas fa-play play-icon"></i>
                            <i class="fas fa-pause pause-icon"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="song-info">
                <div class="song-title-wrapper">
                    <span class="song-title">
                        ${song.name}
                    </span>
                </div>
                <div class="song-subtitle">
                    ${this.renderSingers(song)}
                </div>
            </div>
        </div>
        <div class="song-item-center-content">
            <div class="song-item-center-content__song-duration">
                ${toHHMMSS(song.duration)}
            </div>
        </div>
        <div class="song-item-right-content">
            <div class="button-wrapper">
                <button class="btn">
                    <i class="fas fa-microphone"></i>
                </button>
            </div>
            <div class="button-wrapper">
                <button class="btn like-button">
                    <i class="far fa-heart like-button__unlike-icon"></i>
                    <i class="fas fa-heart like-button__like-icon"></i>
                </button>
            </div>
            <div class="button-wrapper">
                <button class="btn more-button">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
        </div>
      </div>
    </div>
    `
    );

    songListContent.innerHTML = htmls.join('');
  },
  defineProperties() {
    Object.defineProperty(this, 'currentSong', {
      get: () => this.songs[this.currentIndex],
    });
  },
  handleEvents() {
    const _this = this;
    let arrPlayerControlsThumbnailAnimate = [];

    // Khi scroll xuống
    mainPage.onscroll = function () {
      if (mainPage.scrollTop > 0) {
        pageHeader.classList.add('is-sticky');
      } else {
        pageHeader.classList.remove('is-sticky');
      }
    };

    // Xử lý thumbnail quay
    cdThumbArr.forEach((thumb) => {
      const playerControlsThumbnailAnimate = thumb.animate(
        [{ transform: 'rotate(360deg)' }],
        {
          duration: 12000, // 12s
          iterations: Infinity,
        }
      );
      playerControlsThumbnailAnimate.pause();
      arrPlayerControlsThumbnailAnimate.push(playerControlsThumbnailAnimate);
    });

    playBtnArr.forEach((btn) => {
      // Khi click play
      btn.onclick = function () {
        if (_this.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
      };
    });

    // Khi song play
    audio.onplay = function () {
      _this.isPlaying = true;
      playBtnArr.forEach((btn) => {
        btn.classList.add('is-playing');

        if (btn.closest('.playlist-media-card__thumbnail')) {
          btn.classList.add('rotate');
        }
      });
      arrPlayerControlsThumbnailAnimate.forEach((animate) => animate.play());
    };

    // Khi song pause
    audio.onpause = function () {
      _this.isPlaying = false;
      playBtnArr.forEach((btn) => {
        btn.classList.remove('is-playing');

        if (btn.closest('.playlist-media-card__thumbnail')) {
          btn.classList.remove('rotate');
        }
      });
      arrPlayerControlsThumbnailAnimate.forEach((animate) => animate.pause());
    };

    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Khi tua bài hát
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
  },
  loadCurrentSong() {
    playerControlsThumbnail.style.backgroundImage = `url('${this.currentSong.image}')`;
    playerControlsSongTitle.textContent = this.currentSong.name;
    playerControlsSongSubTitle.innerHTML = this.renderSingers(this.currentSong);
    playerControlsSongDuration.textContent = toHHMMSS(
      this.currentSong.duration
    );
    audio.src = this.currentSong.path;
  },
  start() {
    // Định nghĩa các thuộc tính cho object
    this.defineProperties();

    // Lắng nghe, xử lý các sự kiện
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên khi chạy ứng dụng
    this.loadCurrentSong();

    // Render playlist
    this.render();
  },
};

app.start();
