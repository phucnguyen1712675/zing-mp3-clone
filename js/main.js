const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = 'ZING_MP3_PLAYER';

const sidebar = $('#sidebar');
const expandedSidebarButton = $('#expanded-sidebar-button');
const mainPage = $('#js-main-page');
const pageHeader = $('#js-page-header');
const randomButton = $('#random-button');
const replayButton = $('#replay-button');
const audio = $('#audio');
const progress = $('#progress-song');
const btnRandom = $('#random-button');
const btnPrev = $('#prev-button');
const btnNext = $('#next-button');
const btnReplay = $('#replay-button');
const songListContent = $('.song-list-content');
const playerControlsThumbnail = $('.player-controls-left .media-img');
const playerControlsSongTitle = $('.player-controls-left .song-title');
const playerControlsSongSubTitle = $('.player-controls-left .song-subtitle');
const playerControlsSongCurrentTime = $('.player-controls-center .time.left');
const playerControlsSongDuration = $('.player-controls-center .time.right');
const cdThumbs = $$('.media-img');
const bigPlayButtons = $$(
  '.play-button:not(.song-item-left-content__thumbnail.play-button)'
);
const likeButtons = $$('.like-button');

const arrBigPlayBtn = Array.from(bigPlayButtons);
const cdThumbArr = Array.from(cdThumbs);

expandedSidebarButton.onclick = function () {
  sidebar.classList.toggle('is-expanded');
};

function toHHMMSS(secs) {
  let sec_num = parseInt(secs, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor(sec_num / 60) % 60;
  let seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
}

const app = {
  currentIndex: 0,
  songCurrentTime: 0,
  isPlaying: false,
  isRandom: false,
  isReplay: false,
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) ?? {},
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
  setConfig(key, value) {
    this.config[key] = value;
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  renderSingers: (song) => {
    if (song.singers.length > 1) {
      return song.singers.map((singer) => `<a>${singer}</a>`).join(', ');
    } else {
      return `<a>${song.singers[0]}</a>`;
    }
  },
  render() {
    const htmls = this.songs.map(
      (song, index) => `
    <div class="select-item">
      <div class="song-item media-item ${
        this.currentIndex === index ? 'is-active' : ''
      }" data-index="${index}">
        <div class="song-item-left-content">
            <div class="song-item-left-content__prefix">
                <i class="fas fa-music"></i>
            </div>
            <div class="song-item-left-content__thumbnail play-button ${
              this.currentIndex === index && !audio.paused ? 'is-playing' : ''
            }">
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
                <div class="song-title-inner">
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
  updateSongProgressValue() {
    const songDuration = !isNaN(audio.duration)
      ? audio.duration
      : this.songs[this.currentIndex].duration;

    const progressPercent = this.songCurrentTime
      ? Math.floor((this.songCurrentTime / songDuration) * 100)
      : 0;

    progress.value = progressPercent;
    progress.style.background = `linear-gradient(
        to right,
        #fff 0%,
        #fff ${progressPercent}%,
        var(--color-progress-bar-player-bg) ${progressPercent}%,
        var(--color-progress-bar-player-bg) 100%
      )`;
  },
  handleEvents() {
    const _this = this;

    // Khi scroll xuống
    mainPage.onscroll = function () {
      if (mainPage.scrollTop > 0) {
        pageHeader.classList.add('is-sticky');
      } else {
        pageHeader.classList.remove('is-sticky');
      }
    };

    const arrThumbAnimate = cdThumbArr.map((thumb) => {
      // Xử lý thumbnail xoay
      const thumbAnimate = thumb.animate([{ transform: 'rotate(360deg)' }], {
        duration: 12000, // 12s
        iterations: Infinity,
        delay: 1000,
      });
      thumbAnimate.pause();

      return {
        thumb,
        thumbAnimate,
      };
    });

    arrBigPlayBtn.forEach((btn) => {
      // Khi click play
      btn.onclick = function () {
        if (_this.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        _this.render();
      };
    });

    // Khi song play
    audio.onplay = function () {
      _this.isPlaying = true;
      arrBigPlayBtn.forEach((btn) => {
        btn.classList.add('is-playing');

        if (btn.closest('.playlist-media-card__thumbnail')) {
          btn.classList.add('rotate');
        }
      });
      arrThumbAnimate.forEach(({ thumbAnimate }) => thumbAnimate.play());
    };

    // Khi song pause
    audio.onpause = function () {
      _this.isPlaying = false;
      arrBigPlayBtn.forEach((btn) => {
        btn.classList.remove('is-playing');

        if (btn.closest('.playlist-media-card__thumbnail')) {
          btn.classList.remove('rotate');
        }
      });
      arrThumbAnimate.forEach(({ thumb, thumbAnimate }) => {
        if (thumb.closest('.playlist-media-card__thumbnail')) {
          thumbAnimate.cancel();
        } else {
          thumbAnimate.pause();
        }
      });
    };

    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        _this.songCurrentTime = audio.currentTime;
        _this.setConfig('songCurrentTime', _this.songCurrentTime);

        playerControlsSongCurrentTime.textContent = toHHMMSS(
          _this.songCurrentTime
        );

        _this.updateSongProgressValue();
      }
    };

    // Khi tua bài hát
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi prev bài hát
    btnPrev.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi next bài hát
    btnNext.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Random bài hát
    btnRandom.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig('isRandom', _this.isRandom);
      btnRandom.classList.toggle('is-active', _this.isRandom);
    };

    // Replay bài hát
    btnReplay.onclick = function () {
      _this.isReplay = !_this.isReplay;
      _this.setConfig('isReplay', _this.isReplay);
      btnReplay.classList.toggle('is-active', _this.isReplay);
    };

    // Xử lý khi audio end
    audio.onended = function () {
      if (_this.isReplay) {
        audio.play();
      } else {
        btnNext.click();
      }
    };

    // Khi click vào song list
    songListContent.onclick = function (e) {
      const targetElement = e.target;
      const songNode = targetElement.closest('.song-item:not(.is-active)');

      // Handle when clicking on the inactive song
      if (songNode) {
        _this.currentIndex = Number(songNode.dataset.index);
        _this.setConfig('currentIndex', _this.currentIndex);
        _this.loadCurrentSong();
        audio.play();
      } else {
        // Is active song
        if (!audio.paused) {
          audio.pause();
        } else {
          audio.play();
        }
      }

      _this.render();

      // // Handle when clicking on the song option
      // if (e.target.closest('.more-button')) {
      // }
    };
  },
  scrollToActiveSong() {
    if (this.currentIndex !== 0) {
      setTimeout(() => {
        $('.song-item.is-active').scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 300);
    } else {
      mainPage.scrollTop = 0;
    }
  },
  loadConfig() {
    this.currentIndex = this.config.currentIndex;
    this.songCurrentTime = this.config.songCurrentTime;
    this.isRandom = this.config.isRandom;
    this.isReplay = this.config.isReplay;
  },
  loadCurrentSong() {
    playerControlsThumbnail.style.backgroundImage = `url('${this.currentSong.image}')`;
    playerControlsSongTitle.textContent = this.currentSong.name;
    playerControlsSongSubTitle.innerHTML = this.renderSingers(this.currentSong);
    this.songCurrentTime &&
      (playerControlsSongCurrentTime.textContent = toHHMMSS(
        this.songCurrentTime
      ));
    playerControlsSongDuration.textContent = toHHMMSS(
      this.currentSong.duration
    );
    audio.src = this.currentSong.path;
  },
  prevSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.songCurrentTime = 0;

    this.setConfig('currentIndex', this.currentIndex);
    this.setConfig('songCurrentTime', this.songCurrentTime);
    this.loadCurrentSong();
  },
  nextSong() {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.songCurrentTime = 0;

    this.setConfig('currentIndex', this.currentIndex);
    this.setConfig('songCurrentTime', this.songCurrentTime);
    this.loadCurrentSong();
  },
  playRandomSong() {
    let randomIdx;

    do {
      randomIdx = Math.floor(Math.random() * this.songs.length);
    } while (randomIdx === this.currentIndex);

    this.currentIndex = randomIdx;
    this.songCurrentTime = 0;

    this.setConfig('currentIndex', this.currentIndex);
    this.setConfig('songCurrentTime', this.songCurrentTime);
    this.loadCurrentSong();
  },
  start() {
    // Gán cấu hình config
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    this.defineProperties();

    // Tải thông tin bài hát đầu tiên khi chạy ứng dụng
    this.loadCurrentSong();

    this.updateSongProgressValue();

    // Render playlist
    this.render();

    // Scroll to active song
    this.scrollToActiveSong();

    audio.currentTime = this.songCurrentTime;

    btnRandom.classList.toggle('is-active', this.isRandom);
    btnReplay.classList.toggle('is-active', this.isReplay);

    // Lắng nghe, xử lý các sự kiện
    this.handleEvents();
  },
};

app.start();
