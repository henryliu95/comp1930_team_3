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
  // console.log(userId);
});

firebase.auth().onAuthStateChanged(function(user) {
  dbRefBox1 = firebase.database().ref().child(user.uid);
  dbRefBox1.once('value', function(snapshot){
    let table = document.getElementById("groceryTable");
    snapshot.forEach((userSnapshot)=>{ // grabs every key under the current userID
      if (userSnapshot.key != "userId"){
        let row = table.insertRow(1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          cell1.innerHTML = userSnapshot.key;
          cell2.innerHTML = '<input type="date" id="purchase_date" onchange="getIndexNum();">';
          document.getElementById('purchase_date').classList.add(userSnapshot.key + "PD");
          cell3.innerHTML = '<input type="date" id="expire_date"  oninput="getExpireDate(event)">';
          document.getElementById('expire_date').classList.add(userSnapshot.key + "ED");
          cell4.innerHTML = '<input type="button" value="Delete" onclick="deleteItem(this)">';
        }
      })
  })
});
// firebase.auth().onAuthStateChanged(function(user) {
//   dbRefBox1 = firebase.database().ref().child(user.uid);
//   dbRefBox1.once('value', function(snapshot){
//       let table = document.getElementById("groceryTable");
//       keys = snapshot.val();
//       for (key in keys){
//           console.log("key:" + key);
//           console.log("secondKey:" + keys[key]["name"]);
//           console.log("secondKey:" + keys[key]["purchaseDate"]);
//           console.log("secondKey:" + keys[key]["expireDate"]);
//           let row = table.insertRow(1);
//           let cell1 = row.insertCell(0);
//           let cell2 = row.insertCell(1);
//           let cell3 = row.insertCell(2);
//           let cell4 = row.insertCell(3);
//           cell1.innerHTML = keys[key]["name"];
//           cell2.innerHTML = keys[key]["purchaseDate"]
//           cell3.innerHTML = keys[key]["expireDate"]
//           cell4.innerHTML = '<input type="button" value="Delete" onclick="deleteItem(this)">';
//         }
//     })
// })

function on_login(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        // console.log("below is the UID of the logged in storage.")
        // console.log(user.uid)
        //document.getElementById("login").innerHTML = "SIGN OUT";
        document.getElementById("login").style.display = "none";
      } else {
        // No user is signed in.
        console.log("no user signed in at the moment")
      }
    });
}

  // function sign_out(){
  //   firebase.auth().signout();
  //   firebase.auth().onAuthStateChanged(function(user){
  //     if (user){
  //       console.log("Should be signed out.");
  //     }
  //   })
  //   on_logout();
  // }


  // document.getElementById('logout').addEventListener('click', function(event){
  //   firebase.auth().signOut();
  //   console.log("Signing out...")
  //   signInState = false;
  //   on_logout();
  // })


  function on_logout(){
    document.getElementById('logout').style.display = 'none';
    console.log("Logged out")
  }
on_login();