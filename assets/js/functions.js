var loginMail = $("#login-mail");
var loginPass = $("#login-pass");
var loginBtn = $(".loginmodal-submit");
var loginModal = $("#login-modal");

var login = (function() {
  deleteAlerts(loginMail);
  deleteAlerts(loginPass);
  var valLoginMail = $(loginMail).val();
  var valLoginPass = $(loginPass).val();
  firebase.auth().signInWithEmailAndPassword(valLoginMail, valLoginPass)
  .then(function() {
  $(loginMail).val("");
  $(loginPass).val("");
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    $("#login-modal .modal-content").append(`
      <div class="alert alert-danger" role="alert">`
        + errorMessage +
      `</div>
    `)
    // ...
  });
});

var signOut = (function() {
  $("#signout-btn").click(function() {
    firebase.auth().signOut()
    .then(function() {
      console.log("Exiting...")
    })
    .catch(function(error) {
      console.log(error)
    })
    $("#signout-btn").remove();
    $("#one").css("display","block");
  });
});

var verify = (function() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
});

var storagePic = (function(e) {
  var valRegName = $("#input-name").val();
  var file = e.target.files[0];
  var storageRef = storage.ref(valRegName+"/"+file.name);
  storageRef.put(file);
});

var regMail = $("#register-mail");
var regPass = $("#register-pass");
var regBtn = $("#reg-btn");

var register = (function() {
  var valRegMail = regMail.val();
  var valRegPass = regPass.val();
  var valRegName = $("#input-name").val();
  var valRegLocation = $("#input-location").val();
  firebase.auth().createUserWithEmailAndPassword(valRegMail, valRegPass)
    .then(function() {
      function saveData() {
        console.log("I am going to save "+valRegMail+" to Firestore");
        firestore.collection("users").add({
          email: valRegMail,
          name: valRegName,
          location: valRegLocation,
          picture: valRegPic
        }).then(function(docRef) {
          console.log("Document writer with ID: " + docRef.id);
        }).catch(function(error) {
          console.log("Got an error " + error);
        });
      };
      saveData();
      verify();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      $("#regismodal .modal-content").append(`
        <div class="alert alert-danger" role="alert">`
          + errorMessage +
        `</div>
      `);
      // ...
  });
});

var deleteAlerts = (function(element) {
  $(element).keyup(function() {
    $(".alert").remove();
  })
});