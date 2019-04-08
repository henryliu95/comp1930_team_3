let btn = document.getElementById('submit_btn');
function pageLoad(){
    let infoChecked = document.getElementById("info");
    let trackChecked = document.getElementById("track");

    if (infoChecked.checked){
        location.href = "./information.html"
    }else if (trackChecked.checked){
        location.href =  "./tracking.html"
    }
}
function setItemToStorage(){
    localStorage.setItem("testName", document.getElementById("textBox").value);
}

function clickButton(){
    setItemToStorage();
    pageLoad();
}

function change_login(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        // User is signed in.
        console.log("below is the UID of the logged in storage.")
        console.log(user.uid)
        document.getElementById("login").innerHTML = "SIGN OUT";
        } else {
        // No user is signed in.
        console.log("no user signed in at the moment")
        }
    });
            }
change_login();
