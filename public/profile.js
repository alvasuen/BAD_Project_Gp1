//Login button
let login = false;

//TODO Remove element when the page loading

//TODO Create song box function
const mainContainer = document.querySelector(".ppContainer");
function createSongBox(json) {
  // const mainContainer = document.querySelector(".mainContainer");

  //Create the playlist div
  // for (let num = 0; num < json.profilePlaylistSongs.length; num++) {
  for (let num = 0; num < json.profilePlaylist.length; num++) {
    // console.log(`第${num}次Playlist`);
    let playlistName = json.profilePlaylist[num].playlists_name;

    let profilePlaylist = document.createElement("div");
    profilePlaylist.classList.add("profilePlaylist");
    let playlistTitle = document.createElement("div");
    playlistTitle.classList.add("title");
    // let titleContent = playlistName;
    let title = document.createTextNode(playlistName);
    playlistTitle.appendChild(title);

    let sliderRes = document.createElement("div");
    sliderRes.classList.add("slider");
    sliderRes.classList.add("responsive");

    console.log(
      "profilePlaylistSongs.length",
      json.profilePlaylistSongs[num].length
    );

    if (!(json.profilePlaylistSongs[num].length > 0)) {
      let songBox = document.createElement("div");
      songBox.classList.add("song-box");
      let songCover = document.createElement("img");
      songCover.classList.add("song-cover");
      // songCover.src = `${json.profilePlaylistSongs[num][index].image}`;
      let songName = document.createElement("div");
      songName.classList.add("songname");
      // let nameContent = json.profilePlaylistSongs[num][index].songs_name;
      let nameContent = "Haven't any song yet.";
      let songNameContent = document.createTextNode(nameContent);
      songName.appendChild(songNameContent);
      songBox.appendChild(songCover);
      songBox.appendChild(songName);
      sliderRes.appendChild(songBox);
      profilePlaylist.appendChild(playlistTitle);
      profilePlaylist.appendChild(sliderRes);
      // profilePlaylist.appendChild(readMore);
      mainContainer.appendChild(profilePlaylist);
    }
    //Create the div of songs in each playlist
    for (
      let index = 0;
      index < json.profilePlaylistSongs[num].length;
      index++
    ) {
      // console.log("innerIndex", index);
      let songBox = document.createElement("div");
      songBox.classList.add("song-box");
      let songCover = document.createElement("img");
      songCover.classList.add("song-cover");
      songCover.src = `${json.profilePlaylistSongs[num][index].image}`;
      let songName = document.createElement("div");
      songName.classList.add("songname");
      let nameContent = json.profilePlaylistSongs[num][index].songs_name;
      let songNameContent = document.createTextNode(nameContent);
      songName.appendChild(songNameContent);
      songBox.appendChild(songCover);
      songBox.appendChild(songName);
      sliderRes.appendChild(songBox);
    }
    profilePlaylist.appendChild(playlistTitle);
    profilePlaylist.appendChild(sliderRes);
    // profilePlaylist.appendChild(readMore);
    mainContainer.appendChild(profilePlaylist);
  }
}

//TODO Load the profile page
async function loadProfile(id) {
  const res = await fetch("/profile?id=" + id);
  const json = await res.json();
  console.log("songID", json);
  // console.log("playlistsName", json.profilePlaylistSongs[1][0].playlists_name);
  // console.log(json.profilePlaylist.length);
  if (json.success) {
    let userName = document.querySelector(".pro-username");
    userName.textContent = json.profileUsername[0].username;
    createSongBox(json);
  }
}

window.onload = async function () {
  let res = await fetch("/user/getUser");
  let res_json = await res.json();
  console.log("WINDOW:", res_json);
  login = res_json.isLogin;
  if (login) {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    await loadProfile(id);
  }
};

if (login) {
  let createPlaylistBtn = document.querySelector("#createPlaylistBtn");
  let createPlaylistInput = document.querySelector("#createPlaylist");
  createPlaylistBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    let res = await fetch("/playlists/creation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: createPlaylistInput.value }),
    });

    res_json = await res.json();

    if (!res_json.success) {
      alert("Playlist creation failed! Please try again later!");
    } else {
      mainContainer.innerHTML = "";
      let input = document.querySelector(".createPlaylist");
      input.value = "";
      let params = new URL(document.location).searchParams;
      let id = params.get("id");

      await loadProfile(id);
    }
  });
}
