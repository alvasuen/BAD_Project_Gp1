document.querySelector(
  ".topBarContainer"
).innerHTML = /*html*/ `<div class="topBar">


<form class="searchForm" id="searchForm">
<div class="search">
            <input class="search-bar" name="search" id="search" type="text" placeholder="Search..."></input>
            <button class="searchSubmit" type="submit" id="searchSubmit">Submit</button>
            </div>
          </form>

<div class="user-status">
<div class="user-name"></div>
</div>
</div>`;

// document.querySelector("#userLogin").addEventListener("click", (e) => {
//     e.preventDefault();
//     window.location = "/login.html";
// })
