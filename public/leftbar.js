document.querySelector(
    ".left_con"
).innerHTML = /* html */ ` <div class="karaoke-img">
<p>KARAOKE</p>
<!-- <img src=""> -->
</div>
<div class="options">
<div class="page">
    <ion-icon name="home"></ion-icon>
    <span>home</span>
</div>
<div class="page home">
    <ion-icon name="search-outline"></ion-icon>
    <span>search</span>
</div>
<div class="page">
    <ion-icon name="duplicate"></ion-icon>
    <span>create playlist</span>
</div>
<div class="page my-song">
    <ion-icon name="diamond"></ion-icon>
    <span>my songs</span>
</div>
<div class="page">
    <ion-icon name="heart-circle"></ion-icon>
    <span>liked songs</span>
</div>
</div>
<!-- <div class="language">中文</div> -->`;

/* 回主頁 */
// let right_con = document.querySelector('.right_con');
// async function homePage(url) {
//     console.log('function homePage is called')
//     let res = await fetch(url)
//     let html = await res.text()
//     console.log(html)
//     right_con.innerHTML = html
// }

document.querySelector(".karaoke-img").addEventListener("click", (e) => {
    e.preventDefault();
    window.location = "/index.html";
})

document.querySelector(".my-song").addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("hi");
    const res = await fetch("http://localhost:8000/playlists/user", { method: "GET" })
    const json = await res.json();
    // console.log(json);
    window.location = "/playlist.html?id=" + json.playlists[0]['playlists_id']
})

document.querySelector(".home").addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/index.html";
})