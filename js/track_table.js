 // Table
var userId = "";
firebase.auth().onAuthStateChanged(function(user) {
  userId = user.uid;
  // console.log(userId);
});

let addButton = document.getElementById("submit_btn");
let input = document.getElementById("textBox");
let groceryTable = document.getElementById("groceryTable")
let expire_date = document.getElementById('expire_date')

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

function getIndexNum(){
  $("#groceryTable").on('change', 'tr',function(){
    indexNum = $(this).index();
    let itemName = groceryTable.rows[indexNum].cells[0].innerHTML;    
    setExpireDate(itemName);    
  });
}

function setExpireDate(itemName){
  let days = 7;  
  let date = new Date($('.' + itemName + 'PD').val());
  // console.log(date+"hello")
  date.setDate(date.getDate() + days);  
  let new_date = new Date(date).toISOString().slice(0,10);
  document.querySelector("." + itemName + "ED").value = new_date;
  writeFBPurchaseDate(itemName);
}

function writeFBPurchaseDate(itemName){
  add_date(itemName);
  getDataFromFB();
  // console.log($("#purchase_date." + key + "PD").val())
  //location.reload();
}

function add_date(itemName){ 
  let purchaseDate = new Date($("." + itemName + "PD").val()).toISOString().slice(0,10);
  // console.log("purchase date:" + purchaseDate);
  let expireDate = new Date($("." + itemName + "ED").val()).toISOString().slice(0,10);
  firebase.database().ref("/" + userId + "/" + itemName).update({
    purchaseDate: purchaseDate,
    expireDate: expireDate        
  });
}

function getDataFromFB(){
  firebase.auth().onAuthStateChanged(function(user) {
    userId = user.uid;
    let dbRef = firebase.database().ref(userId + "/"); // ref goes to the URL, so we need to go to teams first to access teams99, also need closing "/"
    dbRef.once('value', function(snapshot){
      keys = snapshot.val();
      for (key in keys){
          console.log("secondKey[name]:" + keys[key]["name"]);
          console.log("secondKey[PD]:" + keys[key]["purchaseDate"]);
          console.log("secondKey:[ED]:" + keys[key]["expireDate"]);
          
          // keys[key]["purchaseDate"];
          // keys[key]["expireDate"];
          
          // let now = new Date(keys[key]["purchaseDate"]);
          // let josh = now.toISOString().slice(0,10);
          // console.log(josh);
          // console.log($("#purchase_date." + key + "PD").val(josh));          
      }
    }) 
  });
}

// function setDate(pDate){
//   document.querySelector('.MilkPD').date = pDate;
// }


function deleteItem(thisRow) {
    let index = thisRow.parentNode.parentNode.rowIndex;
    console.log("INDEX:" + index)
    var selectedItem = groceryTable.rows[index].cells[0].innerHTML;
    groceryTable.deleteRow(index);        
    location.reload();
    deleteIngredient(selectedItem);
}

function deleteIngredient(item){
  let database = firebase.database();
  let userId = "";
  firebase.auth().onAuthStateChanged(function(user) {
    userId = user.uid;
    database.ref(userId + "/" + item + "/").set({"name": null});
  });  
}

function add_item() { // adds this to the firebase realtime database
  let itemName = document.getElementById("textBox").value;
    firebase.database().ref(userId).child(itemName).update({
    name:itemName,
    purchaseDate: "",
    expireDate: ""
    });

// dbRefBox1 = firebase.database().ref().child(userId);
// dbRefBox1.once('value', function(snapshot){
// let table = document.getElementById("groceryTable");
//   snapshot.forEach((userSnapshot)=>{ // grabs every key under the current userID
//       if (userSnapshot.key != "userId"){
//         let row = table.insertRow(1);
//         let cell1 = row.insertCell(0);
//         let cell2 = row.insertCell(1);
//         let cell3 = row.insertCell(2);
//         let cell4 = row.insertCell(3);
//         cell1.innerHTML = userSnapshot.key;
//         cell2.innerHTML = '<input id="purchase_date" type="date" onchange="getIndexNum();">';
//         document.getElementById('purchase_date').classList.add(userSnapshot.key + "PD");
//         cell3.innerHTML = '<input id="expire_date" type="date" oninput="getExpireDate(event)">';
//         document.getElementById('expire_date').classList.add(userSnapshot.key + "ED");
//         cell4.innerHTML = '<input type="button" value="Delete" onclick="deleteItem(this)">';
//       }
//     })
//   })
}

