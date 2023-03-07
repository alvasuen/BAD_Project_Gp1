let login = false;
let resultSongs = document.querySelector(".result-songs");
let shows = false;

// let isLogin = false;
window.onload = async (e) => {
  let res = await fetch("/user/getUser");
  let res_json = await res.json();
  console.log("WINDOW:", res_json);
  login = res_json.isLogin;
  // console.log("WINDOWS_LOGIN", login);

  loadSinger();
  loadLanguage();
};

const resultS = document.querySelector(".result-songs");

//Show the play button on each song
function showPlayBtn(isLogin) {
  let shadows = document.querySelectorAll(".shadow");
  for (let shadow of shadows) {
    shadow.addEventListener("mouseover", (event) => {
      // shadow.classList.add(`id-${songId}`);
      let showBtn = event.currentTarget.querySelector(".btn-play");
      showBtn.classList.remove("hidden");

      if (isLogin) {
        let addBtn = event.currentTarget.querySelector(".add");
        addBtn.classList.remove("hidden");
      }
    });
    shadow.addEventListener("mouseout", (event) => {
      let showBtn = event.currentTarget.querySelector(".btn-play");
      showBtn.classList.add("hidden");

      let addBtn = event.currentTarget.querySelector(".add");

      addBtn.classList.add("hidden");
    });
  }
}

function playSongs() {
  let showPlayBtns = document.querySelectorAll(".btn-play");
  console.log("showPlayBtns", showPlayBtns);
  //add event listener
  for (let showPlayBtn of showPlayBtns) {
    showPlayBtn.addEventListener("click", (event) => {
      // console.log("CLICK!");
      let getId = showPlayBtn.id.slice(2);
      console.log("getId", getId);
      // e.preventDefault();
      window.location.href = `./playpage.html?id=${getId}`;
    });
  }
}

function addSongs() {
  let addPlayBtns = document.querySelectorAll(".add");
  console.log("addPlayBtns", addPlayBtns);
  //add event listener
  for (let addPlayBtn of addPlayBtns) {
    addPlayBtn.addEventListener("click", async (event) => {
      // console.log("CLICK!");
      let getId = addPlayBtn.id.slice(2);
      console.log("getId", getId);
      event.preventDefault();
      await showPlaylistContent();
      addPlaylistFunc(getId);
    });
  }
}
const generPostCon = document.querySelector(".generate-post-container");

const playlistsContainer = document.querySelector(".playlistsContainer");
async function showPlaylistContent() {
  let res = await fetch("/playlists/user");
  let playlistsContent = await res.json();
  playlistsContainer.innerHTML = " ";
  console.log("playlistsContent:::", playlistsContent);

  for (let i = 0; i < playlistsContent.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = `${playlistsContent[i].playlists_name}`;
    div.id = `l-${playlistsContent[i].playlists_id}`;
    div.className = "playlistItems";
    // div.classList.add("hidden");
    playlistsContainer.appendChild(div);
  }
  generPostCon.classList.remove("hidden");
}

function addPlaylistFunc(songId) {
  let playlistBtns = document.querySelectorAll(".playlistItems");
  for (let playlistBtn of playlistBtns) {
    playlistBtn.addEventListener("click", async function () {
      let getPlaylistId = playlistBtn.id.slice(2);
      // console.log("Inner", getId);
      let res = await fetch("/playlists/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playlists_id: getPlaylistId,
          songs_id: songId,
        }),
      });
      const json = await res.json();
      console.log("json ", json);
      // if (!json.success) {
      //   alert("Sorry~ Fail to add song.");
      // }
      generPostCon.classList.add("hidden");
    });
  }
}

//Classify Songs
function classifySongs(json) {
  //Get songs name
  let allSongsName = [];
  for (let num = 0; num < json.songsArr.length; num++) {
    let songName = json.songsArr[num].songs_name;
    let songID = json.songsArr[num].songs_id;
    let image = json.songsArr[num].image;
    allSongsName.push({ songName, songID, image });
  }
  let strArr = [
    "a",
    "A",
    "b",
    "B",
    "b",
    "c",
    "C",
    "d",
    "D",
    "e",
    "E",
    "f",
    "F",
    "g",
    "G",
    "h",
    "H",
    "i",
    "I",
    "j",
    "J",
    "k",
    "K",
    "l",
    "L",
    "n",
    "N",
    "m",
    "M",
    "o",
    "O",
    "p",
    "P",
    "q",
    "Q",
    "r",
    "R",
    "s",
    "S",
    "t",
    "T",
    "u",
    "U",
    "v",
    "V",
    "w",
    "W",
    "x",
    "X",
    "y",
    "Y",
    "z",
    "Z",
  ];
  // console.log(allSongsName[4].includes(...strArr));
  let engSongs = [];
  let zhSongs = [];
  console.log("ALLAONS::::", allSongsName);

  for (let index = 0; index < allSongsName.length; index++) {
    console.log("SONGS:", allSongsName[index]);
    if (!allSongsName[index].songName.includes(...strArr)) {
      // console.log("TIMES:", allSongsName[index].includes(...strArr));
      zhSongs.push({
        name: allSongsName[index].songName,
        image: allSongsName[index].image,
      });
    } else {
      // console.log("TIMES:", allSongsName.songName[index].includes(...strArr));
      engSongs.push({
        name: allSongsName[index].songName,
        image: allSongsName[index].image,
      });
    }
  }
  console.log("ENG", engSongs);
  console.log("CH", zhSongs);

  return { engSongs, zhSongs };
}

//Singer
function loadSinger() {
  const singers = document.querySelector(".singer");
  singers.addEventListener("click", async () => {
    if (!shows) {
      shows = true;
      // singers.style.backgroundColor = "#c26b5e";
      resultSongs.innerHTML = "";
      singers.style.backgroundColor = "#8a4c42";

      let res = await fetch("/singer");
      let json = await res.json();
      console.log("singer: ", json);

      if (!json.success) {
        alert("Can't find any song");
        return;
      }

      //Remove duplicate artists_id
      let singerIds = [];
      for (let index = 0; index < json.songsArr.length; index++) {
        singerIds.push(json.songsArr[index].artists_id);
      }

      let arrToSet = new Set(singerIds);
      let singerIdArr = [...arrToSet];

      for (let id = 1; id <= singerIdArr.length; id++) {
        let typeBox = document.createElement("div");
        typeBox.classList.add("typeBox");
        let typeContent = "";
        let songBox = document.createElement("div");
        songBox.classList.add("songBox");

        for (let num = 0; num < json.songsArr.length; num++) {
          //Each song will have these elements
          if (json.songsArr[num].artists_id === id) {
            //Type Name
            typeContent = document.createTextNode(
              json.songsArr[num].artist_name
            );

            let shadowContainer = document.createElement("div");
            shadowContainer.classList.add("shadow-container");

            let shadow = document.createElement("div");
            shadow.classList.add("shadow");

            let imgCon = document.createElement("div");
            imgCon.classList.add("IMG-container");

            let imgInnerCon = document.createElement("div");
            imgInnerCon.classList.add("img-container");

            let img = document.createElement("img");
            img.classList.add("song-cover");
            img.src = `${json.songsArr[num].image}`;

            let song_name = document.createElement("div");
            song_name.classList.add("song-name");
            let nameContent = document.createTextNode(
              json.songsArr[num].songs_name
            );
            song_name.appendChild(nameContent);

            let playBtn = document.createElement("i");
            playBtn.classList.add("fa-solid");
            playBtn.classList.add("fa-circle-play");
            playBtn.classList.add("btn-play");
            playBtn.classList.add("hidden");
            playBtn.setAttribute("id", `p-${json.songsArr[num].songs_id}`);

            let addBtn = document.createElement("i");
            addBtn.classList.add("fa-solid");
            addBtn.classList.add("fa-plus");
            addBtn.classList.add("add");
            addBtn.classList.add("hidden");
            addBtn.setAttribute("id", `a-${json.songsArr[num].songs_id}`);

            songBox.appendChild(shadowContainer);
            shadowContainer.appendChild(shadow);
            shadow.appendChild(imgCon);
            imgCon.appendChild(imgInnerCon);
            imgInnerCon.appendChild(img);

            shadow.appendChild(song_name);
            shadow.appendChild(playBtn);
            shadow.appendChild(addBtn);
          }
        }
        let typeName = document.createElement("div");
        typeName.classList.add("type-name");
        typeName.appendChild(typeContent);
        typeBox.appendChild(typeName);
        typeBox.appendChild(songBox);
        resultS.appendChild(typeBox);
      }

      console.log("LOGIN", login);
      for (let index = 0; index < json.songsArr.length; index++) {
        // showPlayBtn(json.songsArr[index].songs_id, login);
        showPlayBtn(login);
      }
      playSongs();
      addSongs();
    } else if (shows) {
      shows = false;
      resultSongs.innerHTML = "";
      singers.style.backgroundColor = "#f18676";
    }
  });
}

//Language
function loadLanguage() {
  const area = document.querySelector(".area");
  area.addEventListener("click", async () => {
    if (!shows) {
      shows = true;
      // singers.style.backgroundColor = "#c26b5e";
      resultSongs.innerHTML = "";
      area.style.backgroundColor = "#052442";

      let res = await fetch("/area");
      let json = await res.json();
      console.log("area: ", json);
      // console.log("json.songsArr.length", json.songsArr.length);

      if (!json.success) {
        alert("Can't find any song");
        return;
      }

      //Remove duplicate categories_id
      let cateIds = [];
      console.log("JSONARR:", json.songsArr);

      for (let index = 0; index < json.songsArr.length; index++) {
        cateIds.push(json.songsArr[index].categories_id);
        // console.log(",," + json.songsArr[index] + "TIMES:" + index);
      }
      let arrToSet = new Set(cateIds);
      let singerIdArr = [...arrToSet];

      for (let id = 1; id <= singerIdArr.length; id++) {
        let typeBox = document.createElement("div");
        typeBox.classList.add("typeBox");
        let typeContent = "";
        let songBox = document.createElement("div");
        songBox.classList.add("songBox");

        for (let num = 0; num < json.songsArr.length; num++) {
          //Each song will have these elements
          if (json.songsArr[num].categories_id === id) {
            //Type Name
            let areaName = json.songsArr[num].categories_id;
            if (areaName === 1) {
              let lan = "chinese";
              // typeContent = document.createTextNode(json.songsArr[num].area);
              typeContent = document.createTextNode(lan);
            } else if (areaName === 2) {
              let lan = "english";
              typeContent = document.createTextNode(lan);
            }

            let shadowContainer = document.createElement("div");
            shadowContainer.classList.add("shadow-container");

            let shadow = document.createElement("div");
            shadow.classList.add("shadow");

            let imgCon = document.createElement("div");
            imgCon.classList.add("IMG-container");

            let imgInnerCon = document.createElement("div");
            imgInnerCon.classList.add("img-container");

            let img = document.createElement("img");
            img.classList.add("song-cover");
            img.src = `${json.songsArr[num].image}`;

            let song_name = document.createElement("div");
            song_name.classList.add("song-name");
            let nameContent = document.createTextNode(
              json.songsArr[num].songs_name
            );
            song_name.appendChild(nameContent);

            let playBtn = document.createElement("i");
            playBtn.classList.add("fa-solid");
            playBtn.classList.add("fa-circle-play");
            playBtn.classList.add("btn-play");
            playBtn.classList.add("hidden");
            playBtn.setAttribute("id", `p-${json.songsArr[num].songs_id}`);

            let addBtn = document.createElement("i");
            addBtn.classList.add("fa-solid");
            addBtn.classList.add("fa-plus");
            addBtn.classList.add("add");
            addBtn.classList.add("hidden");
            addBtn.setAttribute("id", `a-${json.songsArr[num].songs_id}`);

            songBox.appendChild(shadowContainer);
            shadowContainer.appendChild(shadow);
            shadow.appendChild(imgCon);
            imgCon.appendChild(imgInnerCon);
            imgInnerCon.appendChild(img);

            shadow.appendChild(song_name);
            shadow.appendChild(playBtn);
            shadow.appendChild(addBtn);
          }
        }
        let typeName = document.createElement("div");
        typeName.classList.add("type-name");
        typeName.appendChild(typeContent);
        typeBox.appendChild(typeName);
        typeBox.appendChild(songBox);
        resultS.appendChild(typeBox);
      }
      for (let index = 0; index < json.songsArr.length; index++) {
        // showPlayBtn(json.songsArr[index].songs_id, login);
        showPlayBtn(login);
      }
      playSongs();
      addSongs();
    } else if (shows) {
      shows = false;
      let resultSongs = document.querySelector(".result-songs");
      resultSongs.innerHTML = "";
      area.style.backgroundColor = "#3e9cf5";
    }
  });
}

// //Language ENG
// function loadEngSongs() {
//   const en = document.querySelector(".en");
//   en.addEventListener("click", async () => {
//     if (!shows) {
//       shows = true;
//       // singers.style.backgroundColor = "#c26b5e";
//       en.style.backgroundColor = "#d07703";

//       let res = await fetch("/language");
//       let json = await res.json();
//       console.log("LAN: ", json);
//       console.log("json.songsArr.length", json.songsArr.length);

//       if (!json.success) {
//         alert("Can't find any song");
//         return;
//       }

//       const getSongs = classifySongs(json);

//       console.log(getSongs);
//       let eng = getSongs.engSongs;

//       //TODO Gen songs
//       let typeBox = document.createElement("div");
//       typeBox.classList.add("typeBox");
//       let typeName = document.createElement("div");
//       typeName.classList.add("type-name");

//       typeName.innerHTML = "english songs";
//       let songBox = document.createElement("div");
//       songBox.classList.add("songBox");

//       for (let index = 0; index < eng.length; index++) {
//         let shadowContainer = document.createElement("div");
//         shadowContainer.classList.add("shadow-container");

//         let shadow = document.createElement("div");
//         shadow.classList.add("shadow");

//         let imgCon = document.createElement("div");
//         imgCon.classList.add("IMG-container");

//         let imgInnerCon = document.createElement("div");
//         imgInnerCon.classList.add("img-container");

//         let img = document.createElement("img");
//         img.classList.add("song-cover");
//         img.src = `${eng[index].image}`;

//         let song_name = document.createElement("div");
//         song_name.classList.add("song-name");
//         let nameContent = document.createTextNode(eng[index].name);
//         song_name.appendChild(nameContent);

//         let playBtn = document.createElement("i");
//         playBtn.classList.add("fa-solid");
//         playBtn.classList.add("fa-circle-play");
//         playBtn.classList.add("btn-play");
//         playBtn.classList.add("hidden");

//         let addBtn = document.createElement("i");
//         addBtn.classList.add("fa-solid");
//         addBtn.classList.add("fa-plus");
//         addBtn.classList.add("add");
//         addBtn.classList.add("hidden");

//         songBox.appendChild(shadowContainer);
//         shadowContainer.appendChild(shadow);
//         shadow.appendChild(imgCon);
//         imgCon.appendChild(imgInnerCon);
//         imgInnerCon.appendChild(img);

//         shadow.appendChild(song_name);
//         shadow.appendChild(playBtn);
//         shadow.appendChild(addBtn);
//       }

//       typeBox.appendChild(typeName);
//       typeBox.appendChild(songBox);
//       resultS.appendChild(typeBox);
//       // showPlayBtn();
//       for (let index = 0; index < eng.length; index++) {
//         showPlayBtn(json.songsArr[index].songs_id, login);
//       }
//     } else if (shows) {
//       shows = false;
//       let resultSongs = document.querySelector(".result-songs");
//       resultSongs.innerHTML = "";
//       en.style.backgroundColor = "#efc354";
//     }
//   });
// }

// //Language ZH
// function loadZhSongs() {
//   const zhc = document.querySelector(".zh");
//   zhc.addEventListener("click", async () => {
//     if (!shows) {
//       shows = true;
//       // singers.style.backgroundColor = "#c26b5e";
//       zhc.style.backgroundColor = "#05270b";

//       let res = await fetch("/language");
//       let json = await res.json();
//       console.log("LAN: ", json);
//       console.log("json.songsArr.length", json.songsArr.length);

//       if (!json.success) {
//         alert("Can't find any song");
//         return;
//       }

//       const getSongs = classifySongs(json);

//       console.log(getSongs);
//       let zh = getSongs.zhSongs;

//       //Gen songs
//       let typeBox = document.createElement("div");
//       typeBox.classList.add("typeBox");
//       let typeName = document.createElement("div");
//       typeName.classList.add("type-name");

//       typeName.innerHTML = "chinese songs";
//       let songBox = document.createElement("div");
//       songBox.classList.add("songBox");

//       for (let index = 0; index < zh.length; index++) {
//         let shadowContainer = document.createElement("div");
//         shadowContainer.classList.add("shadow-container");

//         let shadow = document.createElement("div");
//         shadow.classList.add("shadow");

//         let imgCon = document.createElement("div");
//         imgCon.classList.add("IMG-container");

//         let imgInnerCon = document.createElement("div");
//         imgInnerCon.classList.add("img-container");

//         let img = document.createElement("img");
//         img.classList.add("song-cover");
//         img.src = `${zh[index].image}`;

//         let song_name = document.createElement("div");
//         song_name.classList.add("song-name");
//         let nameContent = document.createTextNode(zh[index].name);
//         song_name.appendChild(nameContent);

//         let playBtn = document.createElement("i");
//         playBtn.classList.add("fa-solid");
//         playBtn.classList.add("fa-circle-play");
//         playBtn.classList.add("btn-play");
//         playBtn.classList.add("hidden");

//         let addBtn = document.createElement("i");
//         addBtn.classList.add("fa-solid");
//         addBtn.classList.add("fa-plus");
//         addBtn.classList.add("add");
//         addBtn.classList.add("hidden");

//         songBox.appendChild(shadowContainer);
//         shadowContainer.appendChild(shadow);
//         shadow.appendChild(imgCon);
//         imgCon.appendChild(imgInnerCon);
//         imgInnerCon.appendChild(img);

//         shadow.appendChild(song_name);
//         shadow.appendChild(playBtn);
//         shadow.appendChild(addBtn);
//       }

//       typeBox.appendChild(typeName);
//       typeBox.appendChild(songBox);
//       resultS.appendChild(typeBox);
//       // showPlayBtn();
//       for (let index = 0; index < zh.length; index++) {
//         showPlayBtn(json.songsArr[index].songs_id, login);
//       }
//     } else if (shows) {
//       shows = false;
//       let resultSongs = document.querySelector(".result-songs");
//       resultSongs.innerHTML = "";
//       zhc.style.backgroundColor = "#08a024";
//     }
//   });
// }

//User Input Search
const searchContent = document.querySelector("#search");
const searchBtn = document.querySelector("#searchSubmit");
searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  resultSongs.innerHTML = "";

  const res = await fetch("/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userInput: searchContent.value }),
  });

  let json = await res.json();
  console.log("INPUT JSON", json);

  if (!json.success) {
    alert("Sorry~ can't find any song");
    return;
  }

  let singerIds = [];
  let singerIdArr;
  if (json.genAll.length > 1) {
    //Remove duplicate songs_id
    for (let index = 0; index < json.genAll.length; index++) {
      singerIds.push(json.genAll[index].songs_id);
      let arrToSet = new Set(singerIds);
      singerIdArr = [...arrToSet];
      console.log("SS", singerIdArr);
    }
  } else {
    for (let index = 0; index < json.genAll.length; index++) {
      singerIds.push(json.genAll[index].songs_id);
      let arrToSet = new Set(singerIds);
      singerIdArr = [...arrToSet];
      console.log("SS2", singerIdArr);
    }
  }

  // for (let id = 1; id <= singerIdArr.length; id++) {
  for (let id = 0; id < singerIdArr.length; id++) {
    let typeBox = document.createElement("div");
    typeBox.classList.add("typeBox");
    document.querySelector(".result-songs").innerHTML = "";
    // let typeContent = "";
    // let typeName = document.createElement("div");
    // typeName.className = "type-name";
    // typeName.innerHTML = `${json.genAll[id].artist_name}`;

    let songBox = document.createElement("div");
    songBox.classList.add("songBox");

    let shadowContainer = document.createElement("div");
    shadowContainer.className = "shadow-container";

    let shadow = document.createElement("div");
    shadow.className = "shadow";

    let IMGContainer = document.createElement("div");
    IMGContainer.className = "IMG-container";

    let imgContainer = document.createElement("div");
    imgContainer.className = "img-container";

    let songCover = document.createElement("img");
    songCover.className = "song-cover";
    // console.log(json.genAll[id].image);
    songCover.src = `${json.genAll[id].image}`;

    let title = document.createElement("div");
    title.className = "searchSongTitle";
    title.innerHTML = `${json.genAll[id].songs_name}`;

    let singerName = document.createElement("div");
    singerName.className = "singerName";
    singerName.innerHTML = `${json.genAll[id].artist_name}`;

    let playBtn = document.createElement("i");
    playBtn.classList.add("fa-solid");
    playBtn.classList.add("fa-circle-play");
    playBtn.classList.add("btn-play");
    playBtn.classList.add("hidden");
    playBtn.classList.add(`id-${json.genAll[id].songs_id}`);

    let addBtn = document.createElement("i");
    addBtn.classList.add("fa-solid");
    addBtn.classList.add("fa-plus");
    addBtn.classList.add("add");
    addBtn.classList.add("hidden");
    addBtn.classList.add(`id-${json.genAll[id].songs_id}`);

    document.querySelector(".result-songs").appendChild(typeBox);
    // typeBox.appendChild(typeName);
    typeBox.appendChild(songBox);
    songBox.appendChild(shadowContainer);
    shadowContainer.appendChild(shadow);
    shadow.appendChild(IMGContainer);
    shadow.appendChild(title);
    shadow.appendChild(singerName);
    shadow.appendChild(playBtn);
    shadow.appendChild(addBtn);
    IMGContainer.appendChild(imgContainer);
    imgContainer.appendChild(songCover);
  }
  console.log("Loop", json.genAll);
  for (let index = 0; index < json.genAll.length; index++) {
    showPlayBtn(login);
  }
  playSongs();
  addSongs();
});
