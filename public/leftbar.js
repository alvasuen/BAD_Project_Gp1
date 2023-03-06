let isOpen = false;
let myPlayLists = [];


async function add_bar() {
  let res = await fetch("user/getUser");
  let json = await res.json();
  console.log(json);

  if (json.isLogin) {
    document.querySelector(
      ".left_con"
    ).innerHTML =
      `<div class="karaoke-img">
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
          e.preventDefault();
          let playlistId = e.target.dataset.id;
          // window.location.href = `/playlist.html?playlistId=${playlistId}`;

          await getPlaylist(playlistId);
          document.querySelector(".right_con.home").classList.remove("show");
          document.querySelector(".right_con.playlist").classList.add("show");
        });
      }
    });

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

    document.querySelector(".download-status").addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/status.html";
    });

    document.querySelector(".ytdl").addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/videoLink.html";
    });

  } else {
    document.querySelector(
      ".left_con"
    ).innerHTML = `
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

    /* Search Page */
    document.querySelector(".search").addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/search.html";
    });
  }
}

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
