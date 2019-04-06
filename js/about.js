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