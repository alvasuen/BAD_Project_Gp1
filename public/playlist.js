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
  console.log("json", json);
  if (json.songs) {
    loadSongs(json.songs);
  }
}

function loadSongs(songs) {
  // console.log(playlists);
  const playlistsContainer = document.querySelector(".playlist-body");
  playlistsContainer.innerHTML = "";
  for (let song of songs) {
    // console.log(playlist);
    playlistsContainer.innerHTML += /* html */ `
    <div class="playlist">
    <div class="playlist-id">${song["songs_id"]}</div>
    <div class="playlist-title">${song["songs_name"]}</div>
    </div>
        `;
  }
}
