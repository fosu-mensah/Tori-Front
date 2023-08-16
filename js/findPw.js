const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const phone_number = document.querySelector("#phone_number").value;
  const auth_answer = document.querySelector("#auth_answer").value;

  axios
    .post(
      "http://api.servicetori.site/api/accounts/dj-rest-auth/password/reset",
      {
        username: username,
        phone_number: phone_number,
        auth_answer: auth_answer,
      },
      {
        withCredentials: true,
      }
    )

    .then((response) => {
      // 성공
      console.log(response); // test
      alert("인증에 성공하였습니다.");
      const uid = response.data.uid;
      const token = response.data.token;
      sessionStorage.setItem("uid", uid);
      sessionStorage.setItem("token", token);
      window.location.href = "./pwReset.html";
    })
    .catch((error) => {
      // 실패
      console.error(error);
      alert("사용자 인증에 실패하였습니다.");
    });
});
