function myFunction(){
    var myData = localStorage.getItem("testName");
    //console.log(myData);
    document.getElementById("item1").innerHTML = myData;
   fire(myData);
}
myFunction();

let addButton = document.getElementById("submit_btn");
let input = document.getElementById("textBox");

function addNClear(){
   add_item();
   input.value = "";
}

addButton.addEventListener("click", addNClear);

input.addEventListener("keydown", function(event){
   if (event.keyCode === 13){
       fire(document.getElementById("textBox").value);
       document.getElementById("item1").innerHTML = document.getElementById("textBox").value;
       addNClear();
   }
});

//      function add_grocery(){
   // let item = document.getElementById("textBox").value
   // document.getElementById("item1").innerHTML = item;
//      };

function add_item() {
   let table = document.getElementById("groceryTable");
   let item = document.getElementById("textBox").value;
}
var div1 = document.getElementById('box1');
var div2 = document.getElementById('box2');
var div3 = document.getElementById('box3');
var div4 = document.getElementById('box4');
var head1 = document.getElementById('header1');
var head2 = document.getElementById('header2');
var head3 = document.getElementById('header3');
var head4 = document.getElementById('header4');

div1.onmouseover = function() {
   document.getElementById('popup1').style.display = 'block';
   document.getElementById('header1').style.display = 'block';
};
div1.onmouseout = function() {
   document.getElementById('popup1').style.display = 'none';
   document.getElementById('header1').style.display = 'none';
};

div2.onmouseover = function() {
   document.getElementById('popup2').style.display = 'block';
   document.getElementById('header2').style.display = 'block';
};
div2.onmouseout = function() {
   document.getElementById('popup2').style.display = 'none';
   document.getElementById('header2').style.display = 'none';
};

div3.onmouseover = function() {
   document.getElementById('popup3').style.display = 'block';
   document.getElementById('header3').style.display = 'block';
};
div3.onmouseout = function() {
   document.getElementById('popup3').style.display = 'none';
   document.getElementById('header3').style.display = 'none';
};

div4.onmouseover = function() {
   document.getElementById('popup4').style.display = 'block';
   document.getElementById('header4').style.display = 'block';
};
div4.onmouseout = function() {
   document.getElementById('popup4').style.display = 'none';
   document.getElementById('header4').style.display = 'none';
};

var popupBox1 = document.getElementById("popup1");
var popupBox2 = document.getElementById("popup2");
var popupBox3 = document.getElementById("popup3");
var popupBox4 = document.getElementById("popup4");

function fire(ingredient){
const dbRefObject = firebase.database().ref().child('firebaseTest');
const dbRefBox1 = firebase.database().ref().child('food');
var textBoxValue = textBox.value
console.log(textBoxValue);
dbRefBox1.on('value', function(snapshot){ //snapshot is a pointer to a JSON object, which represents a snapshot of the database at this point in time 
           popupBox1.innerText = snapshot.val()[ingredient].shelf_life;
           popupBox2.innerText = snapshot.val()[ingredient].storage;
           popupBox3.innerText = snapshot.val()[ingredient].expire_signs;
           popupBox4.innerText = snapshot.val()[ingredient].disposal
           console.log(snapshot.val());
         })
}
fire();

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
