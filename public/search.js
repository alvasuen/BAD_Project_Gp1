// let isLogin = false;
let shows = false;
const resultS = document.querySelector(".result-songs");

//Show the play button on each song
function showPlayBtn(songId) {
  console.log("FN_ID:", songId);
  console.log("HERF", `./playpage.html?id=${songId}`);
  //TODO log 出黎啱，但去嘅網頁唔係呢個id？？
  let shadows = document.querySelectorAll(".shadow");
  for (let shadow of shadows) {
    shadow.addEventListener("mouseover", (event) => {
      let showBtn = event.currentTarget.querySelector(".btn-play");
      showBtn.classList.remove("hidden");
      //add event listener
      showBtn.addEventListener("click", (event) => {
        // e.preventDefault();
        window.location.href = `./playpage.html?id=${songId}`;
      });
    });
    shadow.addEventListener("mouseout", (event) => {
      let showBtn = event.currentTarget.querySelector(".btn-play");
      showBtn.classList.add("hidden");
    });
  }
}

//Show the add button on each song
function showPlayBtn(songId) {
  console.log("FN_ID:", songId);
  console.log("HERF", `./playpage.html?id=${songId}`);
  //TODO log 出黎啱，但去嘅網頁唔係呢個id？？
  let shadows = document.querySelectorAll(".shadow");
  for (let shadow of shadows) {
    shadow.addEventListener("mouseover", (event) => {
      let showBtn = event.currentTarget.querySelector(".btn-play");
      showBtn.classList.remove("hidden");
      //add event listener
      showBtn.addEventListener("click", (event) => {
        // e.preventDefault();
        window.location.href = `./playpage.html?id=${songId}`;
      });
    });
    shadow.addEventListener("mouseout", (event) => {
      let showBtn = event.currentTarget.querySelector(".btn-play");
      showBtn.classList.add("hidden");
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
const singers = document.querySelector(".singer");
singers.addEventListener("click", async () => {
  if (!shows) {
    shows = true;
    // singers.style.backgroundColor = "#c26b5e";
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
          typeContent = document.createTextNode(json.songsArr[num].artist_name);

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

          songBox.appendChild(shadowContainer);
          shadowContainer.appendChild(shadow);
          shadow.appendChild(imgCon);
          imgCon.appendChild(imgInnerCon);
          imgInnerCon.appendChild(img);

          shadow.appendChild(song_name);
          shadow.appendChild(playBtn);
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
      showPlayBtn(json.songsArr[index].songs_id);
    }
  } else if (shows) {
    shows = false;
    let resultSongs = document.querySelector(".result-songs");
    resultSongs.innerHTML = "";
    singers.style.backgroundColor = "#f18676";
  }
});

//Area
const area = document.querySelector(".area");
area.addEventListener("click", async () => {
  if (!shows) {
    shows = true;
    // singers.style.backgroundColor = "#c26b5e";
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
          typeContent = document.createTextNode(json.songsArr[num].area);

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

          songBox.appendChild(shadowContainer);
          shadowContainer.appendChild(shadow);
          shadow.appendChild(imgCon);
          imgCon.appendChild(imgInnerCon);
          imgInnerCon.appendChild(img);

          shadow.appendChild(song_name);
          shadow.appendChild(playBtn);
        }
      }
      let typeName = document.createElement("div");
      typeName.classList.add("type-name");
      typeName.appendChild(typeContent);
      typeBox.appendChild(typeName);
      typeBox.appendChild(songBox);
      resultS.appendChild(typeBox);
    }
    // console.log("length", json.songsArr.length);
    for (let index = 0; index < json.songsArr.length; index++) {
      showPlayBtn(json.songsArr[index].songs_id);
    }
  } else if (shows) {
    shows = false;
    let resultSongs = document.querySelector(".result-songs");
    resultSongs.innerHTML = "";
    area.style.backgroundColor = "#3e9cf5";
  }
});

//Language ENG
const en = document.querySelector(".en");
en.addEventListener("click", async () => {
  if (!shows) {
    shows = true;
    // singers.style.backgroundColor = "#c26b5e";
    en.style.backgroundColor = "#d07703";

    let res = await fetch("/language");
    let json = await res.json();
    console.log("LAN: ", json);
    console.log("json.songsArr.length", json.songsArr.length);

    if (!json.success) {
      alert("Can't find any song");
      return;
    }

    const getSongs = classifySongs(json);

    console.log(getSongs);
    let eng = getSongs.engSongs;

    //TODO Gen songs
    let typeBox = document.createElement("div");
    typeBox.classList.add("typeBox");
    let typeName = document.createElement("div");
    typeName.classList.add("type-name");

    typeName.innerHTML = "english songs";
    let songBox = document.createElement("div");
    songBox.classList.add("songBox");

    for (let index = 0; index < eng.length; index++) {
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
      img.src = `${eng[index].image}`;

      let song_name = document.createElement("div");
      song_name.classList.add("song-name");
      let nameContent = document.createTextNode(eng[index].name);
      song_name.appendChild(nameContent);

      let playBtn = document.createElement("i");
      playBtn.classList.add("fa-solid");
      playBtn.classList.add("fa-circle-play");
      playBtn.classList.add("btn-play");
      playBtn.classList.add("hidden");

      songBox.appendChild(shadowContainer);
      shadowContainer.appendChild(shadow);
      shadow.appendChild(imgCon);
      imgCon.appendChild(imgInnerCon);
      imgInnerCon.appendChild(img);

      shadow.appendChild(song_name);
      shadow.appendChild(playBtn);
    }

    typeBox.appendChild(typeName);
    typeBox.appendChild(songBox);
    resultS.appendChild(typeBox);
    // showPlayBtn();
    for (let index = 0; index < eng.length; index++) {
      showPlayBtn(json.songsArr[index].songs_id);
    }
  } else if (shows) {
    shows = false;
    let resultSongs = document.querySelector(".result-songs");
    resultSongs.innerHTML = "";
    en.style.backgroundColor = "#efc354";
  }
});

//Language ZH
const zhc = document.querySelector(".zh");
zhc.addEventListener("click", async () => {
  if (!shows) {
    shows = true;
    // singers.style.backgroundColor = "#c26b5e";
    zhc.style.backgroundColor = "#05270b";

    let res = await fetch("/language");
    let json = await res.json();
    console.log("LAN: ", json);
    console.log("json.songsArr.length", json.songsArr.length);

    if (!json.success) {
      alert("Can't find any song");
      return;
    }

    const getSongs = classifySongs(json);

    console.log(getSongs);
    let zh = getSongs.zhSongs;

    //TODO Gen songs
    let typeBox = document.createElement("div");
    typeBox.classList.add("typeBox");
    let typeName = document.createElement("div");
    typeName.classList.add("type-name");

    typeName.innerHTML = "chinese songs";
    let songBox = document.createElement("div");
    songBox.classList.add("songBox");

    for (let index = 0; index < zh.length; index++) {
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
      img.src = `${zh[index].image}`;

      let song_name = document.createElement("div");
      song_name.classList.add("song-name");
      let nameContent = document.createTextNode(zh[index].name);
      song_name.appendChild(nameContent);

      let playBtn = document.createElement("i");
      playBtn.classList.add("fa-solid");
      playBtn.classList.add("fa-circle-play");
      playBtn.classList.add("btn-play");
      playBtn.classList.add("hidden");

      songBox.appendChild(shadowContainer);
      shadowContainer.appendChild(shadow);
      shadow.appendChild(imgCon);
      imgCon.appendChild(imgInnerCon);
      imgInnerCon.appendChild(img);

      shadow.appendChild(song_name);
      shadow.appendChild(playBtn);
    }

    typeBox.appendChild(typeName);
    typeBox.appendChild(songBox);
    resultS.appendChild(typeBox);
    // showPlayBtn();
    for (let index = 0; index < eng.length; index++) {
      showPlayBtn(json.songsArr[index].songs_id);
    }
  } else if (shows) {
    shows = false;
    let resultSongs = document.querySelector(".result-songs");
    resultSongs.innerHTML = "";
    zhc.style.backgroundColor = "#08a024";
  }
});

window.onload = async (e) => {
  // let res = await fetch("/user/getUser");
  // let json = await res.json();
  // isLogin = json.isLogin;
  // console.log("windowOnload", json);
  //TODO search type fn
  // await searchType();
  // //If no login
  // if (!isLogin) {
  //   //TODO load no add playlist fn
  // } else {
  //   //TODO load add playlist fn
  // }
};
