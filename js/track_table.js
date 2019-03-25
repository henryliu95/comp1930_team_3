let addButton = document.getElementById("add_button");
let input = document.getElementById("textBox");

function addNClear(){
    add_item();
    input.value = "";
}

addButton.addEventListener("click", addNClear);
input.addEventListener("keydown", function(event){
    if (event.keyCode === 13){
        addNClear();
    }
});        

function myFunction(){
    let myData = localStorage.getItem("testName");
    document.getElementById("test").innerHTML = myData;
};
myFunction();

function add_grocery(){
    let item = document.getElementById("textBox").value
    document.getElementById("item1").innerHTML = item;
};

function add_item() {
    let table = document.getElementById("groceryTable");
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let item = document.getElementById("textBox").value;
    cell1.innerHTML = item;
    cell2.innerHTML = '<input class="date" type="date">';
    cell3.innerHTML = '<input class="expire_date" type="date">';
    cell4.innerHTML = '<input type="button" value="Delete" onclick="deleteRow(this)">';
}


function deleteRow(r) {
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("groceryTable").deleteRow(i);
}