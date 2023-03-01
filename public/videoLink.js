const sendBtn = document.querySelector(".sendBtn");
const URLinput = document.querySelector(".linkInput");
const languageSelect = document.querySelector(".languageContainer")

sendBtn.addEventListener("click", async () => {
  console.log(URLinput.value);
  console.log(languageSelect.value);
  // sendURL(URLinput.value);

  try{
    const res = await fetch("/videos/download", {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            url: URLinput.value,
            language: languageSelect.value
        })
    })
    const res_json = res.json();
    if(res_json.success){
        alert("Video download is under processing!")
        window.location.href = '/'
    }else{
      alert("Something went wrong! Please try again or change your video source!")
    }
  }catch (err){
    console.log(err)
  }
});
