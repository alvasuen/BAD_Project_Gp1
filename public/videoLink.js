var sendBtn = document.querySelector(".sendBtn");
var URLinput = document.querySelector(".linkInput");
sendBtn.addEventListener("click", () => {
  console.log(`URL: ${URLinput.value}`);
  sendURL(URLinput.value);
});

function sendURL(URL) {
  window.location.href = `http://localhost:8000/videos/download?URL=${URL}`;
  alert("Karaoke version is under processing")
}

