//Elementleri seçme

const githubForm= document.getElementById("github-form")
const nameİnput=document.getElementById("githubname")
const clearLastUsers=document.getElementById("clear-last-users")
const lastUsers=document.getElementById("last-users")
const github = new Github();   
const ui = new uI(); 
eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched)
}
function getData(e){
    let username = nameİnput.value.trim();
    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı girin.")
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                //Hata mesajı
                ui.showError("Kullanıcınız bulunamadı");
        }
            else{
                ui.getAllSearchedUserToUI(username)
                Storage.addSearchedUsersToStorage(username)
                ui.showUserInfo(response.user)
                ui.showRepoInfo(response.repo)
            }
        })
        .catch(err => ui.showError(err)) 
    }
    ui.clearInput();
e.preventDefault();
}

function clearAllSearched(){
    //tüm arananları temizle
    if(confirm("Emin misiniz ? ")){
        //Silme
        Storage.clearAllSearchedUsersFromStorage(); //Storagedan temizleyecek
        ui.clearAllSearchedFromUI(); 


    }




}
function getAllSearched(){
    //arananları stroage dan al ve ui ya ekle

    let users=Storage.getSearchedUsersFromStorage();
    let result="";
    users.forEach(user => {
        //<li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item">${user}</li>`

    })
    lastUsers.innerHTML = result;   
}