fetch(
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=15p0h4jHtO4&key=AIzaSyDElnMGkXJThuDzryppYqKWTXED3Ki4Kp8"
)
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    console.log(data);
    let videos = data.items;
    let videoContainer = document.querySelector(".videos-container");
    // for (video of videos) {
    videoContainer.innerHTML += `<div>${data.items[0].snippet.title}</div>
    <img class="cover-img" src="${data.items[0].snippet.thumbnails.standard.url}">`;
    // }
  });
