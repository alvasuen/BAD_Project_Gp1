window.onload = async () => {
  let res = await fetch("/status/download/job_status");
  let json = await res.json();
  // console.log(json.result[0].songs_id);

  let container = document.querySelector(".container");

  let playlist_res = await fetch("/playlists/user");
  let res_json = await playlist_res.json();
  console.log(res_json);

  for (j = 0; j < res_json.length; j++) {
    let playlist = document.createElement("div");
    playlist.id = `${res_json[j].playlists_id}`;
    playlist.className = "playlistBtn";
    playlist.innerHTML = `${res_json[j].playlists_name}`;
    document.querySelector(".generate-post").appendChild(playlist);
  }

  for (let i = 0; i < json.result.length; i++) {
    let progressBarContainer = document.createElement("a");
    progressBarContainer.className = "progressBarContainer";
    progressBarContainer.style.cursor = "pointer";
    progressBarContainer.style.backgroundColor = "#fbf9f932";
    progressBarContainer.style.padding = "15px";
    progressBarContainer.style.textDecoration = "none";
    progressBarContainer.style.color = "white";
    console.log("TT", json.result[i].songs_id);
    progressBarContainer.href =
      "./playpage.html?id=" + `${json.result[i].songs_id}`;

    let conatiner_two = document.createElement("div");
    conatiner_two.className = "conatiner_two";
    let song_title = document.createElement("h3");
    song_title.innerHTML = `${i + 1}. ${json.result[i].title}`;
    let videoImgContainer = document.createElement("div");
    videoImgContainer.className = "videoImgContainer";
    let img = document.createElement("img");
    img.className = "videoImg";
    img.src = `${JSON.parse(json.result[i].image).url}`;
    let progressBarWrapper = document.createElement("div");
    progressBarWrapper.className = "progressBarWrapper";
    let progressbar = document.createElement("ul");
    progressbar.className = "progressbar";
    let li_0 = document.createElement("li");
    li_0.id = "step0";
    li_0.innerHTML = "Preparation";
    let li_1 = document.createElement("li");
    li_1.id = "step1";
    li_1.innerHTML = "Step 2";
    let li_2 = document.createElement("li");
    li_2.id = "step2";
    li_2.innerHTML = "Step 3";
    let li_3 = document.createElement("li");
    li_3.id = "step3";
    li_3.innerHTML = "Step 4";
    let li_4 = document.createElement("li");
    li_4.id = "step4";
    li_4.innerHTML = "Step 5";
    let li_5 = document.createElement("li");
    li_5.id = "step5";
    li_5.innerHTML = "Step 6";
    let li_6 = document.createElement("li");
    li_6.id = "step6";
    li_6.innerHTML = "Step 7";
    let li_7 = document.createElement("li");
    li_7.id = "step7";
    li_7.innerHTML = "DONE!";
    let status_msg = document.createElement("div");
    status_msg.innerHTML = `${json.result[i].message}`;
    // let add = document.createElement("div");
    // add.classList.add("add");
    // add.id = `${json.result[i].songs_id}`;
    // add.innerHTML = `<i class="fa-solid fa-plus"></i>`;

    progressbar.appendChild(li_0);
    progressbar.appendChild(li_1);
    progressbar.appendChild(li_2);
    progressbar.appendChild(li_3);
    progressbar.appendChild(li_4);
    progressbar.appendChild(li_5);
    progressbar.appendChild(li_6);
    progressbar.appendChild(li_7);
    progressBarWrapper.appendChild(progressbar);
    progressBarWrapper.appendChild(status_msg);
    conatiner_two.appendChild(videoImgContainer);
    conatiner_two.appendChild(song_title);
    videoImgContainer.appendChild(img);
    progressBarContainer.appendChild(conatiner_two);
    progressBarContainer.appendChild(progressBarWrapper);
    // container.appendChild(add);
    container.appendChild(progressBarContainer);

    if (json.result[i].status == 0) {
      li_0.classList.add("done");
    } else if (json.result[i].status == 1) {
      li_0.classList.add("done");
      li_1.classList.add("done");
    } else if (json.result[i].status == 2) {
      li_0.classList.add("done");
      li_1.classList.add("done");
      li_2.classList.add("done");
    } else if (json.result[i].status == 3) {
      li_0.classList.add("done");
      li_1.classList.add("done");
      li_2.classList.add("done");
      li_3.classList.add("done");
    } else if (json.result[i].status == 4) {
      li_0.classList.add("done");
      li_1.classList.add("done");
      li_2.classList.add("done");
      li_3.classList.add("done");
      li_4.classList.add("done");
    } else if (json.result[i].status == 5) {
      li_0.classList.add("done");
      li_1.classList.add("done");
      li_2.classList.add("done");
      li_3.classList.add("done");
      li_4.classList.add("done");
      li_5.classList.add("done");
    } else if (json.result[i].status == 6) {
      li_0.classList.add("done");
      li_1.classList.add("done");
      li_2.classList.add("done");
      li_3.classList.add("done");
      li_4.classList.add("done");
      li_5.classList.add("done");
      li_6.classList.add("done");
    } else if (json.result[i].status == 7) {
      li_0.classList.add("done");
      li_1.classList.add("done");
      li_2.classList.add("done");
      li_3.classList.add("done");
      li_4.classList.add("done");
      li_5.classList.add("done");
      li_6.classList.add("done");
      li_7.classList.add("done");
    }

    if (
      json.result[i].status ==
      "Duplicated! Please enjoy the karaoke video by searching it in our library!"
    ) {
      status_msg.style.color = "red";
    }


    window.setTimeout( function() {
      window.location.reload();
    }, 20000);

    // let addBtns = document.querySelectorAll(".add");
    // // addBtns.forEach((addBtn) => {
    //   addBtns[i].addEventListener("click", async (event) => {
    //     event.preventDefault();
    //     let generatePostContainer = document.querySelector(".generate-post-container")
    //     console.log(2434);
    //      generatePostContainer.classList.remove("hidden");

    //       let playlistBtns = document.querySelectorAll(".playlistBtn");
    //       playlistBtns.forEach((btn) => {
    //         btn.addEventListener("click", async (event) => {
              
    //           console.log(123);
    //           document
    //           .querySelector(".generate-post-container")
    //           .classList.add("hidden");
    //           location.href ="./status.html"
    //           // console.log("playlist"+ btn.id);
    //           // console.log("addBtn" + addBtn.id);
    //           await fetch("/playlists/songs", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //               playlists_id: btn.id,
    //               songs_id:  addBtns[i].id,
    //             }),
    //           });
    //         });
    //       // });
    //   });
    // });
  }
};
