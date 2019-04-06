var config = {
  apiKey: "AIzaSyC79Hh-cfEC11x5_p5XLI2hlkXZUUQSooo",
  authDomain: "keep-it-fresh-ddf5f.firebaseapp.com",
  databaseURL: "https://keep-it-fresh-ddf5f.firebaseio.com",
  projectId: "keep-it-fresh-ddf5f",
  storageBucket: "keep-it-fresh-ddf5f.appspot.com",
  messagingSenderId: "935147192047"
};
firebase.initializeApp(config);

var userId = "";
firebase.auth().onAuthStateChanged(function(user) {
  userId = user.uid;
  console.log("userId: " + userId);
  Getname("Milk");
});

function Getname(food){
  //console.log(collection);
  var dbRef = firebase.database().ref(userId + "/" + food + "/"); // ref goes to the URL, so we need to go to teams first to access teams99, also need closing "/"
  dbRef.once('value', function(snapshot){
    //console.log(snapshot.val());
    list = snapshot.val();
    for (x in list){
      console.log(x);
      console.log(list[x]);
    }
   }) 
}

firebase.auth().onAuthStateChanged(function(user) {

  // console.log(user.uid);
  dbRefBox1 = firebase.database().ref().child(user.uid);
  dbRefBox1.on('value', function(snapshot){
      let table = document.getElementById("groceryTable");


      // console.log("snapshot" + snapshot.childrenCount);
      snapshot.forEach((userSnapshot)=>{ // grabs every key under the current userID
        console.log(userSnapshot.key);
        if (userSnapshot.key != "userId"){
          let row = table.insertRow(1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          cell1.innerHTML = userSnapshot.key;
          cell2.innerHTML = '<input id="purchase_date" type="date">';
          cell3.innerHTML = '<input id="expire_date" type="date">';
          cell4.innerHTML = '<input type="button" value="Delete" onclick="deleteRow(this)">';
        }

       })
      //document.getElementById("item1").innerHTML = snapshot.val().key;

  })
});

function change_login(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // console.log("below is the UID of the logged in storage.")
      // console.log(user.uid)
      document.getElementById("login").innerHTML = "SIGN OUT";
    } else {
      // No user is signed in.
      console.log("no user signed in at the moment")
    }
  });
          }
change_login();