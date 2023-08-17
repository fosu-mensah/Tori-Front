let sessionData = sessionStorage.getItem("access");

const input = document.querySelector("#content");
const warning = document.querySelector("#warning");
const bottomArea = document.getElementById('bottomArea');
const commentBtn = document.querySelector("#comment-form");
commentBtn.addEventListener("submit", commentBtnHandler);

let userWriter=0;

const searchParams = new URLSearchParams(location.search);
let id = searchParams.get('id')
let postNum = searchParams.get('postNum')

let token = "Bearer "+sessionData;
let getComment = `https://api.servicetori.site/api/posts/comments/`;
let postComment = "https://api.servicetori.site/api/posts/comments/";
let getUser = `https://api.servicetori.site/api/accounts/dj-rest-auth/user`;

axios
  .get(getComment,{
    params: {
      postId: id
    }
  })
  
  .then((response) => {
    console.log(response);
    let commentLength = response.data.length;
    createComment(commentLength, response.data);
    backBtnHandler(id);
    getUserDataHandler(response.data);
  })
  .catch(function (error){
    //에러 시
    alert("수신에 실패");
    console.log(error);
  })
  .finally(function(){
  //항상 실행되는 함수
  });

// 뒤로가기 버튼 주소값 변경
function backBtnHandler(id){
  let backBtn = document.getElementById('backBtn');
  backBtn.href = `./bulletin.html?id=${id}&postNum=${postNum}`;
}

// 댓글 생성
function createComment(length, data){
  const commentArea = document.querySelector('.commentArea');

  for(let i=0; i<length; i++){
    getUserDataHandler(data[i])

    // 작성자와 사용자의 정보가 일치할 시
    if(userWriter){
      alert('작성자와 사용자가 일치하는 댓글 알림');
      const div = document.createElement('div');
      const divTop = document.createElement('div');
      const divUser = document.createElement('div');
      const divDate = document.createElement('div');
      const divContent = document.createElement('div');
      const divBottom = document.createElement('div');
      const userImg = document.createElement('img');
      const userSpan = document.createElement('span');
      const dateSpan = document.createElement('span');
      const contentSpan = document.createElement('span');

      // 작성자와 사용자의 정보가 일치할 시 생성되는 수정 삭제 영역
      const divPaDel = document.createElement('div');
      const patchATag = document.createElement('a');
      const deleteBtn = document.createElement('button');
      const patchSpan = document.createElement('span');
      const deleteSpan = document.createElement('span');
      const sepSpan = document.createElement('span');

      let bedate = data[i].created_at.split('-');
      let time1 = bedate[0]+"."+bedate[1]+"."+bedate[2];
      let date = time1.split('T')[0];
      let time = data[i].created_at.substr(11, 5);
      let dateTime = date + "  " + time;

      div.id = 'div';
      divTop.id = 'divTop';
      divUser.id = 'divUser';
      divDate.id = 'divDate';
      divContent.id = 'divContent';
      divBottom.id = 'divBottom';

      // 작성자와 사용자의 정보가 일치할 시 생성되는 수정 삭제
      divPaDel.id = 'divPaDel';
      patchATag.id = 'patchATag';
      deleteBtn.id = 'deleteBtn';
      
      patchATag.href = `./commentPatch.html?id=${id}&postNum=${postNum}&commentId=${data[i].id}`;
      patchATag.style.textDecoratio = "none";

      userImg.src = "../img/logo30.svg";

      userSpan.innerHTML = data[i].writer;
      userSpan.style.fontSize = "16px";
      userSpan.style.fontWeight = "600";
      userSpan.style.marginLeft = "7px";
    
      dateSpan.innerHTML = dateTime;
      dateSpan.style.fontSize = "11px";
      dateSpan.style.fontWeight = "500";

      contentSpan.innerHTML = data[i].content;
      contentSpan.style.fontSize = "16px";
      contentSpan.style.fontWeight = "500";

      // 작성자와 사용자의 정보가 일치할 시 생성되는 수정 삭제
      patchSpan.innerHTML = "수정";
      patchSpan.style.fontSize = "13px";
      patchSpan.style.fontWeight = "600";
      patchSpan.style.color = "#2E3134B2";     

      sepSpan.innerHTML = "  /  ";
      sepSpan.style.fontSize = "13px";
      sepSpan.style.fontWeight = "600";
      sepSpan.style.color = "#2E3134B2";   

      deleteSpan.innerHTML = "삭제";
      deleteSpan.style.fontSize = "13px";
      deleteSpan.style.fontWeight = "600";
      deleteSpan.style.color = "#2E3134B2";

      
      // 작성자와 사용자의 정보가 일치할 시 생성되는 수정 삭제
      patchATag.appendChild(patchSpan);
      deleteBtn.appendChild(deleteSpan);

      divPaDel.appendChild(patchATag);
      divPaDel.appendChild(sepSpan);
      divPaDel.appendChild(deleteBtn);

      //
      divUser.appendChild(userImg);
      divUser.appendChild(userSpan);

      divTop.appendChild(divUser);
      divTop.appendChild(divPaDel);

      divContent.appendChild(contentSpan);

      divBottom.appendChild(dateSpan);

      div.appendChild(divTop);
      div.appendChild(divContent);
      div.appendChild(divBottom);
      
      commentArea.appendChild(div);

      // 삭제 버튼 클릭시 삭제버튼핸들러 실행
      deleteBtn.onclick = function(){
        deleteBtnHandler(data[i].id);
      }

      //삭제
      function deleteBtnHandler(commentId){
          axios
              .delete(
                `https://api.servicetori.site/api/posts/comments/${commentId}/`,
                  {
                      "id": commentId,
                  },
                  {
                      headers: {
                      "Authorization": token,
                  },
                  })
                  .then((response) => {
                      // 성공
                      console.log(response);  
                      alert("댓글이 삭제되었습니다.");  
                      window.location.reload(); 
                  })

                  .catch((error) => {
                      // 실패
                      console.error(error);
                      alert("댓글 삭제가 실패하였습니다.");
                      warning.style.visibility = hidden;
              }
          )
      };
    }
    
    // 작성자와 사용자의 정보가 불일치할 시
    else{
      const div = document.createElement('div');
      const divTop = document.createElement('div');
      const divUser = document.createElement('div');
      const divDate = document.createElement('div');
      const divContent = document.createElement('div');
      const divBottom = document.createElement('div');
      const userImg = document.createElement('img');
      const userSpan = document.createElement('span');
      const dateSpan = document.createElement('span');
      const contentSpan = document.createElement('span');

      let bedate = data[i].created_at.split('-');
      let time1 = bedate[0]+"."+bedate[1]+"."+bedate[2];
      let date = time1.split('T')[0];
      let time = data[i].created_at.substr(11, 5);
      let dateTime = date + "  " + time;

      div.id = 'div';
      divTop.id = 'divTop';
      divUser.id = 'divUser';
      divDate.id = 'divDate';
      divContent.id = 'divContent';
      divBottom.id = 'divBottom';
      
      userImg.src = "../img/logo30.svg";
    
      // 백에서 writer값 수정 되면 수정
      userSpan.innerHTML = data[i].writer;
      // userSpan.innerHTML = "농부좋아";
      userSpan.style.fontSize = "16px";
      userSpan.style.fontWeight = "600";
      userSpan.style.marginLeft = "7px";
    
      dateSpan.innerHTML = dateTime;
      dateSpan.style.fontSize = "11px";
      dateSpan.style.fontWeight = "500";

      contentSpan.innerHTML = data[i].content;
      contentSpan.style.fontSize = "16px";
      contentSpan.style.fontWeight = "500";

      divUser.appendChild(userImg);
      divUser.appendChild(userSpan);

      divTop.appendChild(divUser);
      divTop.appendChild(divDate);

      divContent.appendChild(contentSpan);

      divBottom.appendChild(dateSpan);

      div.appendChild(divTop);
      div.appendChild(divContent);
      div.appendChild(divBottom);
      
      commentArea.appendChild(div);
    }
  }
}

// 등록 버튼 핸들러
function commentBtnHandler(e){
    e.preventDefault();
    const input = e.target.content;

    if(input.value === ""){
      alert("내용을 입력하여 주세요.");
      return;
    }

    axios
    .post(postComment,
      {
        "post": id,
        "content": input.value,
      },
        {
          headers: {Authorization: token,},
        }
    )
    .then((response) => {
      e.target.reset();
      window.location.reload(); 
    })

    .catch((error) => {
      // 실패
      console.error(error);
      alert("게시 실패하였습니다.");
      // warning.style.visibility = hidden;
    });
  }


// 유저 정보 가져오는 핸들러
function getUserDataHandler(data){
  let userWriter;

      axios
        .get(getUser,
          {
              headers: {Authorization: token,},
          }
      )
      .then(function (response){
          //성공 시
          console.log('userData');
          console.log(response);

          console.log('사용자 동일 여부');
          console.log(response.data.nickname);
          console.log(data.writer);
          
          if(response.data.nickname === data.writer){
              alert('작성자와 사용자가 동일');
              userWriter = 1;
          }
          else{
            userWriter = 0;
          }
      })

      .catch(function (error){
          //에러 시
          console.log(error);
          userWriter = 0; 
      });
};