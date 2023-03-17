let isLogin = false;
async function main() {
  let res = await fetch("/user/getUser");
  let json = await res.json();

  isLogin = json.isLogin;
  // console.log(json);

  render_topBar(json.username, json.users_id);
  // render_topBar(json.username);
  render_rightContainer();
}
function render_rightContainer() {
  document.querySelector(".right_con.home").classList.add("show");
  document.querySelector(".right_con.playlist").classList.remove("show");
}

function render_topBar(userName, userId) {
  let topBarNtn = document.querySelector(".user-name");
  if (isLogin) {
    topBarNtn.innerHTML = /* html */ `<span class="username"></span>
        <button id="logout">Logout</button>`;
    let userContent = document.createTextNode(userName);
    let user_name = document.querySelector(".username");
    user_name.appendChild(userContent);


    reg_logout_event();
    user_name.addEventListener("click", async () => {
      location.href = `./profile.html?id=${userId}`;
    });
  } else {
    topBarNtn.innerHTML = `<button id="user">Login</button>`;
    reg_user_event();
  }
}
function reg_logout_event() {
  document.querySelector("#logout").addEventListener("click", async (e) => {
    let res = await fetch("/user/logout", {
      method: "POST",
      body: "",
    });
    let json = await res.json();
    console.log(json)
    if (json.isErr) {
      // to do something

    } else {
      isLogin = json.isLogin;
      window.location.href = "/";
      // render_topBar();
    }
  });
}
function reg_user_event() {
  document.querySelector("#user").addEventListener("click", (e) => {
    window.location.href = "/login.html";
  });
}

main();
