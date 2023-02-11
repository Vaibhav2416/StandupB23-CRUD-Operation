// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${
  import.meta.env.REACT_APP_JSON_SERVER_PORT
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const userRegisterURL = `${baseServerURL}/register`;
const userLoginURL = `${baseServerURL}/login`;

// register
let registerUserUsername = document.getElementById("register-user-username");
let registerUserFirstname = document.getElementById("register-user-firstname");
let registerUserLastname = document.getElementById("register-user-lastname");
let registerUserEmail = document.getElementById("register-user-email");
let registerUserPassword = document.getElementById("register-user-passowrd");
let registerUserAvatar = document.getElementById("register-user-avatar");
let registerUserLevel = document.getElementById("register-user-level");
let registerUserButton = document.getElementById("register-user");

// login
let loginUserUsername = document.getElementById("login-user-username");
let loginUserPassword = document.getElementById("login-user-passowrd");
let loginUserButton = document.getElementById("login-user");

// getTodo
let getTodoButton = document.getElementById("fetch-todos");

let mainSection = document.getElementById("data-list-wrapper");
let notificationWrapper = document.getElementById("notifications-wrapper");

let userAuthToken = localStorage.getItem("localAccessToken") || null;
let userId = +localStorage.getItem("userId") || null;
const urlAllTodosOfUser = `${baseServerURL}/todos?userId=${userId}`;
const urlTodosBase = `${baseServerURL}/todos/`;

// cats
let empNameInput = document.getElementById("employee-name");
let empImgInput = document.getElementById("employee-image");
let empDeptInput = document.getElementById("employee-dept");
let empSalaryInput = document.getElementById("employee-salary");
let empCreateBtn = document.getElementById("add-employee");
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let catsData = [];

// employees
let updateEmpIdInput = document.getElementById("update-employee-id");
let updateEmpNameInput = document.getElementById("update-employee-name");
let updateEmpImageInput = document.getElementById("update-employee-image");
let updateEmpDeptInput = document.getElementById("update-employee-dept");
let updateEmpSalaryInput = document.getElementById("update-employee-salary");
let updateEmpUpdateBtn = document.getElementById("update-employee");

let updateScoreEmpId = document.getElementById("update-score-employee-id");
let updateScoreEmpSalary = document.getElementById(
  "update-score-employee-salary"
);
let updateScoreEmpSalaryButton = document.getElementById(
  "update-score-employee"
);

let employeesData = [];

// ***** Event listeners ***** //
window.addEventListener("load", () => {
  fetchAndRenderEmployees();
});



async function fetchAndRenderEmployees(){
  let resp=await fetch(`${baseServerURL}/employees`)
  let data=await resp.json()
  console.log(data)
  employeesData=data
  renderCardList(employeesData)
}

sortAtoZBtn.addEventListener("click", () => {

});

sortZtoABtn.addEventListener("click", () => {

});

empCreateBtn.addEventListener("click", () => {
    addData()
});



async function addData(){
    let obj={
      name:empNameInput.value,
      salary:empSalaryInput.value,
      image:empImgInput.value,
      department:empDeptInput.value
    }

    let resp=await fetch(`${baseServerURL}/employees`,{
      method:"POST",
      body:JSON.stringify(obj),
      headers:{'Content-Type': 'application/json'}
    })

    let data=await resp.json()
    console.log(data)
    window.location.reload()
}

updateScoreEmpSalaryButton.addEventListener("click", function () {

});

updateEmpUpdateBtn.addEventListener("click", function () {
      updateData()
});

loginUserButton.addEventListener("click", async function () {
    loginfunction()
});

registerUserButton.addEventListener("click", function () {
  registerData()
});

// ***** Utilities ***** //
// array of objects
// id, title, desc, linkText, linkUrl, imageUrl
function renderCardList(cardData) {
  let cardList = `
    <div class="card-list">
      ${cardData
        .map((item) =>
          getCard(
            item.id,
            item.image,
            item.name,
            item.salary,
            item.department
          )
        )
        .join("")}
    </div>
  `;

  mainSection.innerHTML = cardList;

  // let editLinks = document.querySelectorAll(".card__link");
  // for (let editLink of editLinks) {
  //   editLink.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     let currentId = e.target.dataset.id;
  //     populateEditForms(currentId);
  //   });
  // }
  editAdd()
}

function getCard(id, image, name, salary) {
  let card = `
      <div class="card" data-id=${id} >
        <div class="card__img">
        <img src=${baseServerURL}${image} alt="food" />
        </div>
        <div class="card__body">
          <h3 class="card__item card__title">${name}</h3>
          <div class="card__item card__description">
            ${salary}
          </div>
          <a href="#" data-id=${id} class="card__item card__link">Edit</a>
        </div>
      </div>
  `;
  return card;
 
}

function editAdd(){
  let editBtns=document.querySelectorAll(".card__link")
  // console.log(editBtn)

  for(let editBtn of editBtns ){
    editBtn.addEventListener("click",editMainData)
  }
}


async function editMainData(e){
  e.preventDefault()
  console.log("trigered")
  console.log(e)
  let id=e.target.dataset.id
  console.log("id",id)

  let resp=await fetch(`${baseServerURL}/employees/${id}`)

  let data=await resp.json()

   updateEmpIdInput.value=data.id
   updateEmpNameInput.value=data.name


}


async function updateData(){
  let obj={
    id:updateEmpIdInput.value,
    name:updateEmpNameInput.value,
    department:updateEmpDeptInput.value,
    salary:updateEmpSalaryInput.value,
    image:updateEmpImageInput.value
  }

  let resp=await fetch(`${baseServerURL}/employees/${obj.id}`,{
      method:"PUT",
      body:JSON.stringify(obj),
      headers:{'Content-Type': 'application/json'}
  })

  let data=await resp.json()

  console.log(data)
  window.location.reload()
}




async function registerData(){
  let obj={
    username:registerUserUsername.value,
    firstname:registerUserFirstname.value,
    lastname:registerUserLastname.value,
    email:registerUserEmail.value,
    password:registerUserPassword.value,
    avatar:registerUserAvatar.value,
    department:registerUserLevel.value
  }

  let resp=await fetch(`${baseServerURL}/register`,{
    method:"POST",
    body:JSON.stringify(obj),
    headers:{'Content-Type': 'application/json'}
  })
  let data=await resp.json()
  console.log(data)

}

async function loginfunction(){
  let obj={
    username:loginUserUsername.value,
    password:loginUserPassword.value
  }

  let resp=await fetch(`${baseServerURL}/login`,{
    method:"POST",
    body:JSON.stringify(obj),
    headers:{'Content-Type': 'application/json'}
  })
  let data=await resp.json()

  console.log(data)
}


// registerUserUsername = document.getElementById("register-user-username");
// let registerUserFirstname = document.getElementById("register-user-firstname");
// let registerUserLastname = document.getElementById("register-user-lastname");
// let registerUserEmail = document.getElementById("register-user-email");
// let registerUserPassword = document.getElementById("register-user-passowrd");
// let registerUserAvatar = document.getElementById("register-user-avatar");
// let registerUserLevel = document.getElementById("register-user-level");
// let registerUserButton = document.getElementById("register-user");

