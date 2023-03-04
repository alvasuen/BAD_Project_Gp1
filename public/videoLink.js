const sendBtn = document.querySelector(".sendBtn");
const URLinput = document.querySelector(".linkInput");
const languageSelect = document.querySelector(".languageContainer")

sendBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  if(URLinput.value ==null||
    URLinput.value ==undefined ||
    URLinput.value == NaN|| 
    languageSelect.value ==null||
    languageSelect.value ==undefined||
    languageSelect.value ==NaN||
    languageSelect.value =="notChosen"
    ){
    alert("Please make sure you have fill in the link and select the language!")
    return;
  }else{
  try{
    let res = await fetch("/videos/download", {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            url: URLinput.value,
            language: languageSelect.value
        })
    })
    const res_json = res.json();
    console.log(res_json);
    if(!res_json.success){
      if(res_json.duplicated = true){
        location.href="./status.html"
      }else{
        location.href="./index.html"
      }
    }
    
  }catch (err){
    console.log(err)
  }
}
});


