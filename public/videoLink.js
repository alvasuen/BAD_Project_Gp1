var sendBtn = document.querySelector(".sendBtn");
var URLinput = document.querySelector(".linkInput");
sendBtn.addEventListener("click", () => {
  console.log(`URL: ${URLinput.value}`);
  sendURL(URLinput.value);
});
function sendURL(URL) {
  window.location.href = `http://localhost:4000/download?URL=${URL}`;
}

