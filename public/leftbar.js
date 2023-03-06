let isOpen = false;
let myPlayLists = [];

<<<<<<< HEAD
async function add_bar() {
=======

async function add_bar (){
>>>>>>> refs/remotes/origin/main
  let res = await fetch("user/getUser");
  let json = await res.json();
  console.log(json);

<<<<<<< HEAD
  if (json.isLogin) {
    document.querySelector(".left_con").innerHTML = `<div class="karaoke-img">
=======
  if (json.isLogin){
    document.querySelector(
      ".left_con"
    ).innerHTML =
    `<div class="karaoke-img">
>>>>>>> refs/remotes/origin/main
    <img class="logo" src="logo3.PNG" />
    <a class="web-name" href="./index.html" style="color: white; color: inherit; cursor: pointer; text-decoration: inherit;">karaoke</a>
    <!-- <img src=""> -->
    </div>
    <div class="options">
    <div class="page search">
        <ion-icon class="sear-icon" name="search-outline"></ion-icon>
        <span>search</span>
    </div>
    
    </div>
    <div id="toggleBtn" class="page my-song">
    <ion-icon name="diamond"></ion-icon>
    <span>My Playlists</span>
    <div createPlaylistContainer>
    </div>
</div>    
<ul class="myPlayListBox hide"></ul>

<div class="page download-status">
    <ion-icon name="heart-circle"></ion-icon>
    <span>Download Status</span>
</div>

<div class="page ytdl">
    <ion-icon name="heart-circle"></ion-icon>
    <span>Youtube to Karaoke</span>
</div>
`;

<<<<<<< HEAD
    document
      .querySelector("#toggleBtn")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        isOpen = !isOpen;
        if (!isOpen) {
          document.querySelector(".myPlayListBox").classList.add("hide");
          return;
        }
        document.querySelector(".myPlayListBox").classList.remove("hide");

        if (myPlayLists.length === 0) {
          const res = await fetch("http://localhost:8000/playlists/user", {
            method: "GET",
          });
          const json = await res.json();
          // console.log(json)
          myPlayLists = json;
        }
        document.querySelector(".myPlayListBox").innerHTML = myPlayLists
          .map(
            (obj) => `
      <li class="playlist" data-id="${obj.playlists_id}">${obj.playlists_name}</li>
    `
          )
          .join("");

        let myPlayListLi = document.querySelectorAll(".playlist");
        for (let li of myPlayListLi) {
          li.addEventListener("click", async (e) => {
            let playlistId = e.target.dataset.id;
            await getPlaylist(playlistId);
            document.querySelector(".right_con.home").classList.remove("show");
            document.querySelector(".right_con.playlist").classList.add("show");
          });
        }
      });
=======
document.querySelector("#toggleBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  isOpen = !isOpen;
  if (!isOpen) {
    document.querySelector(".myPlayListBox").classList.add("hide");
    return;
  }
  document.querySelector(".myPlayListBox").classList.remove("hide");

  if (myPlayLists.length === 0) {
    const res = await fetch("http://localhost:8000/playlists/user", {
      method: "GET",
    });
    const json = await res.json();
    // console.log(json)
    myPlayLists = json;
  }
  document.querySelector(".myPlayListBox").innerHTML = myPlayLists
    .map(
      (obj) => `
      <li class="playlist" data-id="${obj.playlists_id}">${obj.playlists_name}</li>
    `
    )
    .join("");

  let myPlayListLi = document.querySelectorAll(".playlist");
  for (let li of myPlayListLi) {
    li.addEventListener("click", async (e) => {
      let playlistId = e.target.dataset.id;
      await getPlaylist(playlistId);
      document.querySelector(".right_con.home").classList.remove("show");
      document.querySelector(".right_con.playlist").classList.add("show");
    });
  }
});
>>>>>>> refs/remotes/origin/main

/* Home Page */
document.querySelector(".karaoke-img").addEventListener("click", (e) => {
  e.preventDefault();
  window.location = "/";
});

/* Search Page */
document.querySelector(".search").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/search.html";
});

<<<<<<< HEAD
    document
      .querySelector(".download-status")
      .addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/status.html";
      });

    document.querySelector(".ytdl").addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/videoLink.html";
    });
  } else {
    document.querySelector(".left_con").innerHTML = `
=======
document.querySelector(".download-status").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/status.html";
});

document.querySelector(".ytdl").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/videoLink.html";
});

  }else{
    document.querySelector(
      ".left_con"
    ).innerHTML = `
>>>>>>> refs/remotes/origin/main
    <div class="karaoke-img">
    <img class="logo" src="logo3.PNG" />
    <a class="web-name" href="./index.html" style="color: white; color: inherit; cursor: pointer; text-decoration: inherit;">karaoke</a>
    <!-- <img src=""> -->
    </div>
    <div class="options">
    <div class="page search">
    <ion-icon class="sear-icon" name="search-outline"></ion-icon>
    <span>search</span>
    </div>
    </div>
    `;

    /* Home Page */
  document.querySelector(".karaoke-img").addEventListener("click", (e) => {
  e.preventDefault();
  window.location = "/";
  });

<<<<<<< HEAD
    /* Search Page */
    document.querySelector(".search").addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/search.html";
    });
  }
}
=======
/* Search Page */
  document.querySelector(".search").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/search.html";
})
}}
>>>>>>> refs/remotes/origin/main

add_bar();

// document.querySelector(
//   ".left_con"
// ).innerHTML = /* html */
// `<div class="karaoke-img">
// <img class="logo" src="logo3.PNG" />
// <p class="web-name">karaoke</p>
// </div>
// <div class="options">
// <div class="page search">
//     <ion-icon class="sear-icon" name="search-outline"></ion-icon>
//     <span>search</span>
// </div>

// </div>`

// <!-- <div class="page my-profile hide">
//     <ion-icon name="duplicate"></ion-icon>
//     <span>profile</span>
// </div> -->

// <!-- <div class="language">中文</div> -->`;

// /* 回主頁 */
// // let right_con = document.querySelector('.right_con');
// // async function homePage(url) {
// //     console.log('function homePage is called')
// //     let res = await fetch(url)
// //     let html = await res.text()
// //     console.log(html)
// //     right_con.innerHTML = html
// // }

// document.querySelector(".my-song").addEventListener("click", async (e) => {
//     e.preventDefault();
//     console.log("hi");
//     const res = await fetch("http://localhost:8000/playlists/user", { method: "GET" })
//     const json = await res.json();
//     console.log(json);
//     // window.location = "/playlist.html?id=" + json.playlists[0]['playlists_id']
// })
