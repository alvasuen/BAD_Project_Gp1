// window.onload = async function () {
//     let params = new URL(document.location).searchParams;
//     let id = params.get("id");
//     console.log(id);
//     await getPlaylist(id);
//     document.querySelector('.myPlayListBox').classList.remove('hide');
// };
async function main() {
  // console.log('test');
  // reg_logout_event();
  // getPlaylist(id);
  // showPlayButton();
  // hidePlayButton();
}
async function getPlaylist(id) {
  const res = await fetch(`http://localhost:8000/playlists/all/${id}`, {
    method: "GET",
  });
  const json = await res.json();
  // console.log("json", json);
  if (json.result) {
    // loadSongs(json.result);
    // console.log(json.result, '23');
    const playlistsContainer = document.querySelector(".playlist-body");
    playlistsContainer.innerHTML = "";
    for (let song in json.result.songs) {
      // console.log(playlist);
      playlistsContainer.innerHTML += /* html */ `
    <div class="playlist">
    <div class="playlist-id " >${json.result.songs[song].songs_id}</div>
    <div class="playlist-showPlay hidden"><i class="fa-solid fa-play"></i></div>
    <div class="playlist-img">
    <img src=${json.result.songs[song].image}>
    </div>
    <div class="playlist-title">${json.result.songs[song].songs_name}</div>
    </div>
        `;
    }
    // console.log(json.result.songs[0].image);
    const playlistContentName = document.querySelector(".playlist-content-name");
    playlistContentName.innerHTML = `${json.result.playlistName[0].playlists_name}`;

    const playlistCoverImg = document.querySelector(".playlist-cover-img");

    let playlistCover = document.querySelector(".playlist-cover")
    let test = document.createElement("img")
    test.classList.add("playlist-cover-img")
    test.src = `${json.result.songs[0].image}`
    playlistCover.appendChild(test)
  }

  let playlistPlay = document.querySelectorAll(".playlist-showPlay")

  function showPlayButton() {
    console.log("showPlayButton");
    let playButton = document.querySelectorAll('.playlist')
    console.log(playButton)
    for (let number of playButton) {
      number.addEventListener("mouseenter", e => {
        console.log('function showPlayButton is called');
        number.querySelector('.playlist-showPlay').style.display = 'unset';
        number.querySelector('.playlist-id').style.display = 'none';
        playlistPlay.classList.remove("hidden")

      })
    }
  }
  function hidePlayButton() {
    console.log("hidePlayButton");
    let playButton = document.querySelectorAll('.playlist')
    for (let number of playButton) {
      number.addEventListener("mouseleave", e => {
        console.log('function hidePlayButton is called');
        number.querySelector('.playlist-showPlay').style.display = 'none';
        number.querySelector('.playlist-id').style.display = 'unset';
        playlistPlay.classList.add("hidden")

      })
    }
  }
  showPlayButton()
  hidePlayButton()
}


/* Number change to play */
// let showPlayButton = false
// document.querySelectorAll(".playlist").addEventListener("onmouseenter", e => {
//   let showPlay = document.querySelector(".playlist-id")
//   if (showPlay) {
//     e.currentTarget.classList = <i class="fa-solid fa-play"></i>
//   }
// })

// let showPlayButton = document.querySelectorAll(".playlist");
// for (let number of showPlayButton){
//   number.addEventListener("mouseenter", e => {
//     let
//   })
// }


// function showPlayButton() {
//   let playlistElements = document.querySelectorAll('.playlist-body .playlist-item');
//   // console.log("playlistElement")
//   playlistElements.forEach(function (playlistElement) {
//     console.log('function showPlayButton is called');
//     playlistElement.addEventListener('mouseenter', function () {
//       let playlistIdElement = this.querySelector('.playlist-id');
//       playlistIdElement.style.display = 'unset';
//     });

//     playlistElement.addEventListener('mouseleave', function () {
//       let playlistIdElement = this.querySelector('.playlist-id');
//       playlistIdElement.style.display = 'none';
//     });
//   });
// }

// let hidePlayButton = document.querySelectorAll('.playlist')
// hidePlayButton.addEventListener("onmouseleave", e => {
//   console.log('function hidePlayButton is called');
//   document.querySelector('.playlist-id').style.color = "black";
// })
// }


main()
// function loadSongs(songs) {
//   // console.log(playlists);


//   const playlistsContainer = document.querySelector(".playlist-body");
//   playlistsContainer.innerHTML = "";
//   for (let song of songs) {
//     // console.log(playlist);
//     playlistsContainer.innerHTML += /* html */ `
//     <div class="playlist">
//     <div class="playlist-id">${song["songs_id"]}</div>
//     <div class="playlist-img">
//     <img src=${song["image"]}>
//     </div>
//     <div class="playlist-title">${song["songs_name"]}</div>
//     </div>
//         `;
//   }
// }
// if (myPlayLists.length === 0) {
//   const res = await fetch("http://localhost:8000/playlists/user", {
//     method: "GET",
//   });
//   const json = await res.json();
//   console.log(json)
//   myPlayLists = json;
// }

