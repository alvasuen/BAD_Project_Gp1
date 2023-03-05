async function main() {
  reg_logout_event();
}

let videoPlayer = document.querySelector(".video-player");
let vocalBtn = document.querySelector(".vocalBtn");
let vocal = document.querySelector(".vocal");
vocal.volume = 0.3;
let bgm = document.querySelector(".bgm");
let controlBar = document.querySelector(".control-bar");
let mainContainer = document.querySelector(".main-container");
let slider = document.querySelector(".slider");

let playlistArr = [];
let vocalArr = [];
let bgmArr = [];
let preludeArr = [5];

// get karaoke video and audio
async function karaoke(id) {
  const res = await fetch("/karaoke?id=" + id);
  const json = await res.json();
  // console.log(json.mp4);
  console.log(json);
  console.log(json.mp4);
  console.log(json.mp4.length);

  if (Array.isArray(json.mp4)) {
    for (let i = 0; i < json.mp4.length; i++) {
      videoPlayer.src = json.mp4[0];
      vocal.src = json.vocal[0];
      bgm.src = json.accompaniment[0];

      playlistArr.push(json.mp4[i]);
      vocalArr.push(json.vocal[i]);
      bgmArr.push(json.accompaniment[i]);
      console.log(playlistArr);
    }
  } else {
    videoPlayer.src = json.mp4;
    vocal.src = json.vocal;
    bgm.src = json.accompaniment;

    console.log(123);

    playlistArr.push(json.mp4);
    vocalArr.push(json.vocal);
    bgmArr.push(json.accompaniment);
  }
}

let back = document.querySelector(".back");
back.addEventListener("click", () => {
  location.href = "./index.html";
});

videoPlayer.addEventListener("ended", () => {
  // remove current (first) video from playlist
  playlistArr.shift();
  vocalArr.shift();
  bgmArr.shift();

  console.log(playlistArr);

  videoPlayer.src = playlistArr[0];
  vocal.src = vocalArr[0];
  bgm.src = bgmArr[0];
  videoPlayer.play();

  if (playlistArr == "") {
    location.href = "./index.html";
  }
});

videoPlayer.addEventListener("error", () => {
  console.log(`Error loading ${videoPlayer.src}.`);
});

onmousemove = (event) => {
  controlBar.classList.remove("hidden");
  back.classList.remove("hidden");
};

let timeout;
document.onmousemove = function () {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    controlBar.classList.add("hidden");
    back.classList.add("hidden");
  }, 3000);
};

// encore function
let encore = document.querySelector(".encore");
encore.addEventListener("click", () => {
  videoPlayer.currentTime = 0;
  bgm.currentTime = 0;
  vocal.currentTime = 0;

  videoPlayer.play();
  bgm.play();
  vocal.play();

  console.log(videoPlayer.duration);
});

// skip function
let skip = document.querySelector(".skip");
let slider2 = document.querySelector(".slider:before");
skip.addEventListener("click", () => {
  playlistArr.shift();
  vocalArr.shift();
  bgmArr.shift();

  videoPlayer.src = playlistArr[0];
  vocal.src = vocalArr[0];
  bgm.src = bgmArr[0];

  console.log(playlistArr);
});

// switch vocal and bgm function
vocalBtn.addEventListener("click", () => {
  if (vocal.volume == 0.3) {
    vocal.volume = 1;
    console.log("vocal is muted =", vocal.muted);
  } else {
    vocal.volume = 0.3;
    console.log("vocal is muted =", vocal.muted);
  }
});

// play and pause function
let pause = document.querySelector(".pause");
let play = document.querySelector(".play");
pause.addEventListener("click", () => {
  videoPlayer.pause();
  bgm.pause();
  vocal.pause();

  play.classList.remove("hidden");
  pause.classList.add("hidden");
});

play.addEventListener("click", () => {
  videoPlayer.play();
  bgm.play();
  vocal.play();
  pause.classList.remove("hidden");
  play.classList.add("hidden");
});

let forward = document.querySelector(".forward");
forward.addEventListener("click", () => {
  if (videoPlayer.currentTime + 10 <= videoPlayer.duration) {
    videoPlayer.currentTime = videoPlayer.currentTime + 10;
    bgm.currentTime = bgm.currentTime + 10;
    vocal.currentTime = vocal.currentTime + 10;
  } else {
    return;
  }
});

let backward = document.querySelector(".backward");
backward.addEventListener("click", () => {
  if (videoPlayer.currentTime - 10 >= 0) {
    videoPlayer.currentTime = videoPlayer.currentTime - 10;
    bgm.currentTime = bgm.currentTime - 10;
    vocal.currentTime = vocal.currentTime - 10;
  } else {
    return;
  }
});

function openFullscreen() {
  if (mainContainer.requestFullscreen) {
    mainContainer.requestFullscreen();
  } else if (mainContainer.webkitRequestFullscreen) {
    /* Safari */
    mainContainer.webkitRequestFullscreen();
  } else if (mainContainer.msRequestFullscreen) {
    /* IE11 */
    mainContainer.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

let fullScreen = document.querySelector(".full-screen");
fullScreen.addEventListener("click", () => {
  if (!fullScreen.classList.contains("fulled")) {
    openFullscreen();
    fullScreen.classList.add("fulled");
  } else {
    closeFullscreen();
    fullScreen.classList.remove("fulled");
  }
});

let skipPrelude = document.querySelector(".skipPrelude");
skipPrelude.addEventListener("click", () => {
  videoPlayer.currentTime = preludeArr[0] - 5;
  bgm.currentTime = preludeArr[0] - 5;
  vocal.currentTime = preludeArr[0] - 5;

  videoPlayer.play();
  bgm.play();
  vocal.play();

  console.log(videoPlayer.currentTime);
});

function hiddenSkipPrelude() {
  if (videoPlayer.currentTime > preludeArr[0] - 5) {
    skipPrelude.classList.add("hidden");
  } else {
    skipPrelude.classList.remove("hidden");
  }
}

setInterval(hiddenSkipPrelude, 1000);

window.onload = async function () {
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  console.log(id, 283923898329);
  await karaoke(id);
};

// async function main() {
//   reg_logout_event();
// }

// let videoPlayer = document.querySelector(".video-player");
// let vocalBtn = document.querySelector(".vocalBtn");
// let vocal = document.querySelector(".vocal");
// let bgm = document.querySelector(".bgm");
// let controlBar = document.querySelector(".control-bar");
// let mainContainer = document.querySelector(".main-container");
// let back = document.querySelector(".back");
// let play = document.querySelector(".play");
// let pause = document.querySelector(".pause");

// // back function
// function back() {
//   location.href = "http://localhost:8000/index.html";
// }

// videoPlayer.addEventListener("ended", () => {
//   // remove current (first) video from playlist
//   playlistArr.shift();
//   vocalArr.shift();
//   bgmArr.shift();

//   console.log(playlistArr);

//   videoPlayer.src = playlistArr[0];
//   vocal.src = vocalArr[0];
//   bgm.src = bgmArr[0];
//   videoPlayer.play();
// });

// videoPlayer.addEventListener("error", () => {
//   console.log(`Error loading ${videoPlayer.src}.`);
// });

// onmousemove = (event) => {
//   controlBar.classList.remove("hidden");
//   back.classList.remove("hidden");
// };

// let timeout;
// document.onmousemove = function () {
//   clearTimeout(timeout);
//   timeout = setTimeout(function () {
//     controlBar.classList.add("hidden");
//     back.classList.add("hidden");
//   }, 3000);
// };

// // encore function
// function encore() {
//   videoPlayer.currentTime = 0;
//   bgm.currentTime = 0;
//   vocal.currentTime = 0;
// }

//   videoPlayer.play();
//   bgm.play();
//   vocal.play();

//   console.log(videoPlayer.duration);
// }

// // skip function
// function skip() {
//   playlistArr.shift();
//   vocalArr.shift();
//   bgmArr.shift();

//   videoPlayer.src = playlistArr[0];
//   vocal.src = vocalArr[0];
//   bgm.src = bgmArr[0];

//   console.log(playlistArr);
// }

// // switch vocal and bgm function
// function vocalSwitch() {
//   if (vocal.muted == true) {
//     vocal.muted = false;
//     console.log("vocal is muted =", vocal.muted);
//   } else {
//     vocal.muted = true;
//     console.log("vocal is muted =", vocal.muted);
//   }
// }

// //pause function
// function pause() {
//   videoPlayer.pause();
//   bgm.pause();
//   vocal.pause();

//   play.classList.remove("hidden");
//   pause.classList.add("hidden");
// }

// // play function
// function play() {
//   videoPlayer.play();
//   bgm.play();
//   vocal.play();
//   pause.classList.remove("hidden");
//   play.classList.add("hidden");
// }

// // forward function
// function forward() {
//   if (videoPlayer.currentTime + 10 <= videoPlayer.duration) {
//     videoPlayer.currentTime = videoPlayer.currentTime + 10;
//     bgm.currentTime = bgm.currentTime + 10;
//     vocal.currentTime = vocal.currentTime + 10;
//   }
// }

// // backward function
// function backward() {
//   if (videoPlayer.currentTime - 10 >= 0) {
//     videoPlayer.currentTime = videoPlayer.currentTime - 10;
//     bgm.currentTime = bgm.currentTime - 10;
//     vocal.currentTime = vocal.currentTime - 10;
//   }
// }

// // full screen whole function
// function openFullscreen() {
//   if (mainContainer.requestFullscreen) {
//     mainContainer.requestFullscreen();
//   } else if (mainContainer.webkitRequestFullscreen) {
//     /* Safari */
//     mainContainer.webkitRequestFullscreen();
//   } else if (mainContainer.msRequestFullscreen) {
//     /* IE11 */
//     mainContainer.msRequestFullscreen();
//   }
// }

// function closeFullscreen() {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.webkitExitFullscreen) {
//     /* Safari */
//     document.webkitExitFullscreen();
//   } else if (document.msExitFullscreen) {
//     /* IE11 */
//     document.msExitFullscreen();
//   }
// }

// let fullScreen = document.querySelector(".full-screen");
// function fullScreen() {
//   if (!fullScreen.classList.contains("fulled")) {
//     openFullscreen();
//     fullScreen.classList.add("fulled");
//   } else {
//     closeFullscreen();
//     fullScreen.classList.remove("fulled");
//   }
// }

// // skip prelude function
// function skipPrelude() {
//   videoPlayer.currentTime = preludeArr[0] - 5;
//   bgm.currentTime = preludeArr[0] - 5;
//   vocal.currentTime = preludeArr[0] - 5;

//   videoPlayer.play();
//   bgm.play();
//   vocal.play();

//   console.log(videoPlayer.currentTime);
// }

// function hiddenSkipPrelude() {
//   if (videoPlayer.currentTime > preludeArr[0] - 5) {
//     skipPrelude.classList.add("hidden");
//   } else {
//     skipPrelude.classList.remove("hidden");
//   }
// }

// setInterval(hiddenSkipPrelude, 1000);
