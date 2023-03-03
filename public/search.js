let isLogin = false;

async function searchType() {
  //Singer
  const singers = document.querySelector(".singer");
  singers.addEventListener("click", async () => {
    let res = await fetch("/singer");
    let json = await res.json();
    console.log("singer: ", json);
  });
}

window.onload = async (e) => {
  let res = await fetch("/user/getUser");
  let json = await res.json();

  isLogin = json.isLogin;
  console.log("windowOnload", json);

  //TODO search type fn
  await searchType();
  // //If no login
  // if (!isLogin) {
  //   //TODO load no add playlist fn
  // } else {
  //   //TODO load add playlist fn
  // }
};
