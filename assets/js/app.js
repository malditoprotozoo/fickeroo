// Inicializa Firebase
var config = {
  apiKey: "AIzaSyCard9eQg9ssp1MiL-CLFrRC4YEy5Xd1As",
  authDomain: "fickeroo.firebaseapp.com",
  databaseURL: "https://fickeroo.firebaseio.com",
  projectId: "fickeroo",
  storageBucket: "fickeroo.appspot.com",
  messagingSenderId: "824926587604"
};
firebase.initializeApp(config);
var firestore = firebase.firestore();
var storage = firebase.storage();

$(document).ready(function() {
  setTimeout(function(){
    $("#loader").fadeOut();
    $("#one").fadeIn();
  },1000);
  firebase.auth().onAuthStateChanged(function(user) {
    // User is signed in.
    if (user) {
      $("#one").css("display","none");
      $("body").append(`
      <a id="signout-btn" href="#" class="btn btn-info btn-lg">
        <span class="glyphicon glyphicon-log-out"></span>
        Log out
      </a>
      `);
      console.log(user.email);
      console.log(user);
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      signOut();
      if (user.emailVerified == false) {
        alert("No olvides verificar tu e-mail");
      };
      /*
      * Generar una función que muestre la siguiente pantalla en 
      * caso de que el usuario esté activo
      */
    } else {
      console.log("Not active user");
      // User is signed out.
      // ...
    }
  });
  $(loginBtn).click(function() {
    event.preventDefault();
    login();
  });
  $(regBtn).click(function() {
    if (regMail.val().length !== 0 && regPass.val().length !== 0) {
      $("#regismodal").modal("toggle");
    } else {
      $("#one").append(`
        <div class="alert alert-danger" role="alert">You must type something</div>
      `)
    }
  });
  $("#reg-save").click(function() {
    register();
  });
  deleteAlerts(regMail);
  deleteAlerts(regPass);
});


/*$("#exampleFormControlFile1").change(function(e) {
    event.preventDefault();
    storagePic(e);
  });


  Dirección foto: gs://fickeroo.appspot.com/Toriwi/IMG-20171102-WA0019.jpg*/