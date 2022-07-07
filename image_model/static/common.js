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

//async, await => 비동기 처리
//promise 객체 => 
//collback => 값이 끝났을 때 받는 거
//음식점 에약 이랑 비슷함 => 예약 전화 


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
  let rdata = document.querySelector("#running_data")
  rvalue = await _post('/upload', fData)

  rdata.innerHTML = rvalue['eum_data']
  console.log(rvalue)
})


