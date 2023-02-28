//TODO Remove element when the page loading

//TODO Create song box function
function createSongBox(json) {
  const mainContainer = document.querySelector(".mainContainer");

  // let playlistNames = json.profilePlaylist;

  for (let num = 0; num < json.profilePlaylist.length; num++) {
    console.log("Index", num);
    // for (let playlistName in playlistNames) {
    let playlistSongs = json.profilePlaylistSong[num];
    // Create the playlist title div
    let profilePlaylist = document.createElement("div");
    profilePlaylist.classList.add("profilePlaylist");
    let playlistTitle = document.createElement("div");
    playlistTitle.classList.add("title");
    let titleContent = json.profilePlaylist[num].playlists_name;
    let title = document.createTextNode(titleContent);
    playlistTitle.appendChild(title);

    let sliderRes = document.createElement("div");
    sliderRes.classList.add("slider");
    sliderRes.classList.add("responsive");
    let songBox = document.createElement("div");
    songBox.classList.add("song-box");
    let songCover = document.createElement("img");
    songCover.classList.add("song-cover");
    songCover.src = `${playlistSongs.image}`;
    let songName = document.createElement("div");
    songName.classList.add("songname");
    let nameContent = playlistSongs.songs_name;
    let songNameContent = document.createTextNode(nameContent);
    songName.appendChild(songNameContent);
    songBox.appendChild(songCover);
    songBox.appendChild(songName);
    sliderRes.appendChild(songBox);
    profilePlaylist.appendChild(playlistTitle);
    profilePlaylist.appendChild(sliderRes);
    mainContainer.appendChild(profilePlaylist);
  }
}

//TODO Load the profile page
async function loadProfile(id) {
  const res = await fetch("/profile?id=" + id);
  const json = await res.json();
  console.log(json);
  console.log(json.profilePlaylist.length);
  if (json.success) {
    let userName = document.querySelector(".username");
    userName.textContent = json.profileUsername[0].username;
    createSongBox(json);
  }
}

window.onload = async function () {
  let params = new URL(document.location).searchParams;
  let id = params.get("id");

  await loadProfile(id);
};
