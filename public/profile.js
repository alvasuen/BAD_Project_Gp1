//Login button
let login = false;
let slider_arr = []
//TODO Remove element when the page loading
function playSongs() {	
  let songBoxs = document.querySelectorAll(".song-box");	
  console.log("songBoxs", songBoxs);	
  //add event listener	
  for (let songBox of songBoxs) {	
    songBox.addEventListener("click", (event) => {	
      // console.log("CLICK!");	
      let getId = songBox.id.slice(2);	
      console.log("getId", getId);	
      // e.preventDefault();	
      window.location.href = `./playpage.html?id=${getId}`;	
    });	
  }	
}

//TODO Create song box function
const mainContainer = document.querySelector(".ppContainer");
function createSongBox(json) {
  // const mainContainer = document.querySelector(".mainContainer");

  //Create the playlist div
  // for (let num = 0; num < json.profilePlaylistSongs.length; num++) {
    console.log(json.profilePlaylist);
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
    sliderRes.id = `slider-${num}`;

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
      let sliderContainer = document.createElement("section");	
    sliderContainer.classList.value = `sliderContainer ${num}`;	
    profilePlaylist.appendChild(sliderContainer)	
    sliderContainer.appendChild(sliderRes);
      // profilePlaylist.appendChild(readMore);
      mainContainer.appendChild(profilePlaylist);
      slider_arr.push({	
        sliderContainerIsClick: false,	
        starting_point: 0,	
        ending_point: 0,	
        move_pos: 0	
      })
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
      songBox.setAttribute(	
        "id",	
        `s-${json.profilePlaylistSongs[num][index].songs_id}`	
      );
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
  playSongs()
  reg_mouse_down_up_event()	
  reg_slider_container_mouse_move_event()	
}	
let idx = 0	
function reg_mouse_down_up_event() {	
  let AllContainer = document.querySelectorAll(".sliderContainer")	
  for (let eachContainer of AllContainer) {	
    eachContainer.addEventListener("mousedown", e => {	
      idx = eachContainer.classList.value.split(" ")[1]	
      slider_arr[`${idx}`].sliderContainerIsClick = true	
      slider_arr[`${idx}`].starting_point = e.clientX	
      // ending_point = localStorage.getItem("end")	
    })	
  }	
  document.querySelector(".wrapper").addEventListener("mouseup", e => {	
    slider_arr[`${idx}`].sliderContainerIsClick = false	
    slider_arr[`${idx}`].ending_point += slider_arr[`${idx}`].move_pos	
  })	
}	
function reg_slider_container_mouse_move_event() {	
  let all_slider_container = document.querySelectorAll(".sliderContainer")	
  for (let eachContainer of all_slider_container) {	
    eachContainer.addEventListener("mousemove", e => {	
      if (slider_arr[`${idx}`].sliderContainerIsClick) {	
        slider_arr[`${idx}`].move_pos = slider_arr[`${idx}`].starting_point - e.clientX	
        let slider = document.querySelector(`#slider-${idx}`)	
        slider.style.transform = `translate(-${slider_arr[`${idx}`].ending_point + slider_arr[`${idx}`].move_pos}px, 0px)`	
      }	
    })	
  }	
  // let pos = parseInt(id)	
  // document.querySelector(".slider-container").style.transition = `${width * }`
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

// if (login) {
  let createPlaylistBtn = document.querySelector("#createPlaylistBtn");
  console.log(createPlaylistBtn);
  let createPlaylistInput = document.querySelector("#createPlaylist");
  createPlaylistBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log(123);
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
// }
