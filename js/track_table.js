let addButton = document.getElementById("submit_btn");
let input = document.getElementById("textBox");

var userId = null;
firebase.auth().onAuthStateChanged(function(user) {
  userId = user.uid;
});

function addNClear(){
    add_item();
    input.value = "";
    location.reload();  // have to call reload, else it loads the database everytime I add new item .. can't delete rows using deleteRow()
}

addButton.addEventListener("click", function(){
    addNClear();
});

input.addEventListener("keydown", function(event){
    if (event.keyCode === 13){
        addNClear();
    }
});        

// function getItemFromStorage(){
// 	var myData = localStorage.getItem("testName");
// 	console.log(myData);
//  	document.getElementById("item1").innerHTML = myData;
// }
// getItemFromStorage();

firebase.auth().onAuthStateChanged(function(user) {

  console.log(user.uid);
  dbRefBox1 = firebase.database().ref().child(user.uid);
  dbRefBox1.on('value', function(snapshot){
      let table = document.getElementById("groceryTable");


      console.log("snapshot" + snapshot.childrenCount);
      snapshot.forEach((userSnapshot)=>{ // grabs every key under the current userID
        console.log(userSnapshot.key);
        if (userSnapshot.key != "userId"){
          let row = table.insertRow(1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          cell1.innerHTML = userSnapshot.key;
          cell2.innerHTML = '<input class="date" type="date">';
          cell3.innerHTML = '<input class="expire_date" type="date">';
          cell4.innerHTML = '<input type="button" value="Delete" onclick="deleteRow(this)">';
        }

       })
      //document.getElementById("item1").innerHTML = snapshot.val().key;

  })
});

function add_item() { // adds this to the firebase realtime database
    let item = document.getElementById("textBox").value;

     firebase.database().ref(userId).child(item).update({
      name:item + "1",
     });
}

function deleteRow(r) {
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("groceryTable").deleteRow(i);
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