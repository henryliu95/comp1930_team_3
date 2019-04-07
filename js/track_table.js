 // Table
var userId = "";
firebase.auth().onAuthStateChanged(function(user) {
  userId = user.uid;
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
  date.setDate(date.getDate() + days);  
  let new_date = new Date(date).toISOString().slice(0,10);
  document.querySelector("." + itemName + "ED").value = new_date;
  writeFBPurchaseDate(itemName);
}

function writeFBPurchaseDate(itemName){
  add_date(itemName);
  getDataFromFB();
  location.reload();
}

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
}

function add_date(itemName){ 
  let purchaseDate = new Date($("." + itemName + "PD").val()).toISOString().slice(0,10);
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
          console.log("key:" + key);
          console.log("secondKey:" + keys[key]["name"]);
          console.log("secondKey:" + keys[key]["purchaseDate"]);
          console.log("secondKey:" + keys[key]["expireDate"]);
      }
    }) 
  });
}