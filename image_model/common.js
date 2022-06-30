let input_image_box = document.getElementById("input_image_box")
let hidden_input_file = document.getElementById("hidden_input_file")
let img_loading_icon = document.getElementById("img_loading_icon")
hidden_input_file.style.display = "none"
function file_upload(){
    hidden_input_file.click()
}
function setThumbnail(event) {
    let img_loading_icon = document.getElementById("img_loading_icon")
    img_loading_icon.style.display = "none"


  var reader = new FileReader();

  reader.onload = function(event) {
    var img = document.createElement("img");
    img.setAttribute("src", event.target.result);
    document.querySelector("div.output_image_box").appendChild(img);
    img.style.position = "absolute"
    img.style.top = 50 +"%"
    img.style.left = 50 + "%"
    img.style.width = 65+"%"
    img.style.height = 350+"px"
    img.style.transform = "translate("+-50+"%," + -50+ "%)"
  };

  reader.readAsDataURL(event.target.files[0]);


}
//   C:\fakepath\madongseauck.jpg