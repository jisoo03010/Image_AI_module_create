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


async function _post(path,bodyData={}){
  const data = await fetch(path,{
      method:'POST',
      body:bodyData
  }).then( res => res.json() );
  return data;
}

let $ajaxCall = document.querySelector("#ajaxCall");
$ajaxCall.addEventListener("click", async () => {
  let $form = document.frm;
  const fData = new FormData();
  fData.append("file_lo", $form[0].files[0]);
  console.log(" $form[0]==>",  $form[0].files[0])
  let ma = document.querySelector("#ma")
  let eum = document.querySelector("#eum")
  let son = document.querySelector("#son")
  let toial_max = document.querySelector("#toial_max")
  rvalue = await _post('/upload', fData)

  ma.innerHTML = "마동석 : " + rvalue['ma_data'] +"\n"
  eum.innerHTML = "음문석 : " +  rvalue['eum_data'] +"\n"
  son.innerHTML = "손석구 : " +rvalue['son_data']  +"\n"
  if(rvalue['max_data'] === "0"){
    toial_max.innerHTML = "\n이미지의 사람은 음문석 입니다.\n"
  }else if(rvalue['max_data'] === "1"){
    toial_max.innerHTML = "\n이미지의 사람은 마동석 입니다.\n"
  }else if(rvalue['max_data'] === "2"){
    toial_max.innerHTML = "\n이미지의 사람은 손석구 입니다.\n"
  }
  console.log("결과 값=====================");
  console.log(rvalue['max_data'] === "0");
  console.log(rvalue)
})
