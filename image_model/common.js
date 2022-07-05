let input_image_box = document.getElementById("input_image_box")
let hidden_input_file = document.getElementById("hidden_input_file")
let img_loading_icon = document.getElementById("img_loading_icon")
// 이미지 클릭했을때 input type="file"을 클릭한 것 처럼 보이게 하는 함수 
hidden_input_file.style.display = "none"

function file_upload(){
    hidden_input_file.click()
}
// 클릭했을 때 
function setThumbnail(event) {
  arr = []
  //output 이미지 사라짐
  let img_loading_icon = document.getElementById("img_loading_icon")
  img_loading_icon.style.display = "none"

  //객체 생성
  let reader = new FileReader();
  
  reader.onload = function(event) {
    let img = document.createElement("img");
    arr.push(img)
    img.setAttribute("src", event.target.result);
    document.querySelector("div.output_image_box").appendChild(img);
    img.style.position = "absolute"
    img.style.top = 50 +"%"
    img.style.left = 50 + "%"
    img.style.width = 95+"%"
    img.style.height = 350+"px"
    img.style.transform = "translate("+-50+"%," + -50+ "%)"
    
   
  }

  reader.readAsDataURL(event.target.files[0]);
}
//var httpRequest;

var httpFileUpload = {

  uploadStart : function (callback){

    let file = hidden_input_file.files[0]
    console.log("file===>>" , file);
    if(!file){
        console.log("파일 안들어옴!!!!");
        alert("file not exists");
        throw new Error("file not exists");
    }
  
    let form = new FormData();
    form.append("file_lo", file);
    
    for (var key of form.keys()) {
      console.log("key=>>" , key);
    }
    
    for (var value of form.values()) {
      console.log("value=>>>" , value);
    }
    let returnObj = new Object();
    let xhr = new XMLHttpRequest();
    
    xhr.open('POST',  "/upload", true);
    xhr.onreadystatechange = function(e){
      console.log(xhr.status);
      if(xhr.status == 200){
        console.log("uploaded!");
        returnObj.result_cd = "1";
      } else if(xhr.status == 404){
        console.log("404");
        returnObj.result_cd = "404";
        callback(returnObj);
      } else {
        console.log("not 201 404");
        callback(returnObj);
        returnObj.result_cd = "0";
      }
      callback(returnObj);
    };
    xhr.send(form);
  }
}


//  httpRequest = new XMLHttpRequest(); 
//  reqJson = {}
//  reqJson.value = "abcd Test"
//  httpRequest.onreadystatechange = () => {
//    console.log(XMLHttpRequest.DONE);
//    /* readyState가 Done이고 응답 값이 200일 때, 받아온 response로 name과 age를 그려줌 */
//    if (httpRequest.readyState === XMLHttpRequest.DONE) {
//        if (httpRequest.status === 200) {
//        let result = httpRequest.response;
//          console.log(result);
//          // document.getElementById("name").innerText = result.name;
//        } else {
//          alert('Request Error!');
//        }
//    }
//  };
//  httpRequest.open('POST', '/upload', true);
//  httpRequest.responseType = "json";
//  httpRequest.setRequestHeader('Content-Type', 'application/json');
//  /* 정의된 서버에 Json 형식의 요청 Data를 포함하여 요청을 전송 */
//  httpRequest.send(JSON.stringify(reqJson));