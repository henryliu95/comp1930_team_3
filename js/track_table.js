let addButton = document.getElementById("submit_btn");
let input = document.getElementById("textBox");

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

var dateControl = document.querySelector('#expire_date');

function confirmExpireDate(){
  let date2 = new Date($('#purchase_date').val());
  let day2 = date2.getDate() + 7;
  if (date2.getMonth() < 10){
      var month2 = "0" + (date2.getMonth() + 1);
  } else {
      var month2 = date2.getMonth() +1;
  }
  let year2 = date2.getFullYear();
  dateControl.value = year2 + "-" + month2 + "-" + day2;
}

function handler(e){
  confirmExpireDate();
}

function add_item() { // adds this to the firebase realtime database
    let item = document.getElementById("textBox").value;
     firebase.database().ref(userId).child(item).update({
      name:item + "1",
      // purchaseDate: 
      // expireDate:
     });
}

function deleteRow(r) {
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("groceryTable").deleteRow(i);
}
