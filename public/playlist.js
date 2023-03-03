// window.onload = async function () {
//     let params = new URL(document.location).searchParams;
//     let id = params.get("id");
//     console.log(id);
//     await getPlaylist(id);
//     document.querySelector('.myPlayListBox').classList.remove('hide');
// };
async function main() {
  reg_logout_event();
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
    <div class="playlist-id">${json.result.songs[song].songs_id}</div>
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
    // playlistCoverImg.getAttributeNode("src", json.result.songs[0].image)
    // playlistCoverImg.setAttribute("src", json.result.songs[0].image)

    let playlistCover = document.querySelector(".playlist-cover")
    let test = document.createElement("img")
    test.classList.add("playlist-cover-img")
    test.src = `${json.result.songs[0].image}`
    playlistCover.appendChild(test)
    // playlistCoverImg.src = `${json.result.songs[0].image}`;

  }
}

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

