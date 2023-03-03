window.onload = async ()=>{
    let res= await fetch ("/videos/download/job_status")
    let json = await res.json();
    console.log(json);

    let container = document.querySelector(".container")

    console.log(json.result.length);
    console.log(JSON.parse(json.result[0].image).url);
    console.log(json.result[0].title);
    console.log(json.result.status);

    for(let i =0; i<json.result.length+1; i++){
        let progressBarContainer = document.createElement("div")
        progressBarContainer.className = "progressBarContainer"
        let conatiner_two = document.createElement("div")
        conatiner_two.className = "conatiner_two"
        let song_title = document.createElement("h3")
        song_title.innerHTML = `${i+1}. ${json.result[i].title}`;
        let videoImgContainer = document.createElement("div")
        videoImgContainer.className = "videoImgContainer"
        let img = document.createElement("img")
        img.className = "videoImg"
        img.src = `${JSON.parse(json.result[i].image).url}`
        let progressBarWrapper = document.createElement("div")
        progressBarWrapper.className = "progressBarWrapper"
        let progressbar = document.createElement("ul")
        progressbar.className = "progressbar"
        let li_0 = document.createElement("li")
        li_0.id = "step0"
        li_0.innerHTML = "Preparation"
        let li_1 = document.createElement("li")
        li_1.id = "step1"
        li_1.innerHTML = "Step 1"
        let li_2 = document.createElement("li")
        li_2.id = "step2"
        li_2.innerHTML = "Step 2"
        let li_3 = document.createElement("li")
        li_3.id = "step3"
        li_3.innerHTML = "Step 3"
        let li_4 = document.createElement("li")
        li_4.id = "step4"
        li_4.innerHTML = "Step 4"
        let li_5 = document.createElement("li")
        li_5.id = "step5"
        li_5.innerHTML = "Step 5"
        let li_6 = document.createElement("li")
        li_6.id = "step6"
        li_6.innerHTML = "Step 6"
        let li_7 = document.createElement("li")
        li_7.id = "step7"
        li_7.innerHTML = "Step 7"

        progressbar.appendChild(li_0)
        progressbar.appendChild(li_1)
        progressbar.appendChild(li_2)
        progressbar.appendChild(li_3)
        progressbar.appendChild(li_4)
        progressbar.appendChild(li_5)
        progressbar.appendChild(li_6)
        progressbar.appendChild(li_7)
        progressBarWrapper.appendChild(progressbar)
        conatiner_two.appendChild(videoImgContainer)
        conatiner_two.appendChild(song_title)
        videoImgContainer.appendChild(img)
        progressBarContainer.appendChild(conatiner_two)
        progressBarContainer.appendChild(progressBarWrapper)
        container.appendChild (progressBarContainer)

        if (json.result[i].status == 0){
            li_0.classList.add("done") 
        }
        else if (json.result[i].status == 1){
            li_0.classList.add("done") 
            li_1.classList.add("done") 
        }
        else if (json.result[i].status == 2){
            li_0.classList.add("done") 
            li_1.classList.add("done") 
            li_2.classList.add("done") 
        }
        else if (json.result[i].status == 3){
            li_0.classList.add("done") 
            li_1.classList.add("done") 
            li_2.classList.add("done") 
            li_3.classList.add("done") 
        }
        else if (json.result[i].status == 4){
            li_0.classList.add("done") 
            li_1.classList.add("done") 
            li_2.classList.add("done") 
            li_3.classList.add("done") 
            li_4.classList.add("done") 
        }
        else if (json.result[i].status == 5){
            li_0.classList.add("done") 
            li_1.classList.add("done") 
            li_2.classList.add("done") 
            li_3.classList.add("done") 
            li_4.classList.add("done") 
            li_5.classList.add("done") 
        }
        else if (json.result[i].status == 6){
            li_0.classList.add("done") 
            li_1.classList.add("done") 
            li_2.classList.add("done") 
            li_3.classList.add("done") 
            li_4.classList.add("done") 
            li_5.classList.add("done") 
            li_6.classList.add("done") 
        }
        else if (json.result[i].status == 7){
            li_0.classList.add("done") 
            li_1.classList.add("done") 
            li_2.classList.add("done") 
            li_3.classList.add("done") 
            li_4.classList.add("done") 
            li_5.classList.add("done") 
            li_6.classList.add("done") 
            li_7.classList.add("done") 
        }
    }

    }
 