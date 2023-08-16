const warning = document.querySelector("#warning");
const contentBtn = document.querySelector("#profile-form");
contentBtn.addEventListener("submit", profileBtnHandler);

let token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMDM4MTEzLCJpYXQiOjE2OTIwMzA5MTMsImp0aSI6IjU4ZGM1MTY1OGMyODRkMGY5Y2YwYWY1YzIyY2U4ZjM4IiwidXNlcl9pZCI6MX0.WOox7-ELcbqJp1voIZz-LUzPGCSHrp_hR0CbmKUFur4";
let patchUser = "https://api.servicetori.site/api/accounts/dj-rest-auth/user";

let profile_img;

function profileBtnHandler(e){
    e.preventDefault();
    const nickname = e.target.inputName.value;
    const introduce = e.target.inputIntro.value;

    if(nickname === "" || introduce === ""){
      return;
    }

    axios
    .patch(
      patchUser,
      {
        "nickname": nickname,
        "introduce": introduce,
        "profile_img": profile_img,
      },
        {
           headers: {Authorization: token,},
        }
    )
    .then((response) => {
      // 성공
      console.log(response);
      alert("프로필이 변경되었습니다.");
      e.target.reset();
      // window.location.href = "./bulletin.html";      
     })

    .catch((error) => {
      // 실패
      console.error(error);
      alert("프로필 변경이 실패하였습니다.");
      warning.style.visibility = hidden;
    });
  }

  document.querySelector('.cameraBtn').addEventListener('click', () => {
    document.querySelector('#cameraInput').click();
});

function loadImage(event) {
  const logo = document.querySelector('#logo');
  profile_img = URL.createObjectURL(event.target.files[0]);
  logo.src = profile_img;
  logo.onload = () => {
      URL.revokeObjectURL(logo.src);
  };
  console.log(profile_img);
}