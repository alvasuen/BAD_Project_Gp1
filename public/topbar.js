document.querySelector(
  ".topBarContainer"
).innerHTML = /*html*/ `<div class="topBar">
<div class="turn-page-btn btn-left" onclick="history.back()">

    <ion-icon name="chevron-back-circle-outline"></ion-icon>
 
</div>
<div class="turn-page-btn" onclick="history.forward()">
    <ion-icon name="chevron-forward-circle-outline"></ion-icon>
 
</div>


<div class="user-status">
<div class="user-name"></div>
</div>
</div>`;

// document.querySelector("#userLogin").addEventListener("click", (e) => {
//     e.preventDefault();
//     window.location = "/login.html";
// })
