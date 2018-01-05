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
    .then(function(user) {
      $("input").val("");
      function saveData() {
        console.log("I am going to save "+valRegMail+" to Firestore");
        user.updateProfile({
          displayName: valRegName
        });
        firestore.collection("users").doc(valRegName).set({
          email: valRegMail,
          name: valRegName,
          location: valRegLocation
        }).then(function(docRef) {
          console.log("Document writer with ID: " + valRegName);
        }).catch(function(error) {
          console.log("Got an error " + error);
        });
      };
      saveData();
      verify();
      $("#regismodal").modal("toggle");
      $("#loader").fadeIn();
      $("body").append(`<!--INICIO CONTAINER TWO--> 
    <div class="container-fluid" id="two">
        <!--CARROUSEL TOP DE IMAGENES-->
     
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
        
            <div class="carousel-inner">
            
                <div id="img1" class="carousel-item active carrousel-box" >
                <img  class="d-block w-100" src="assets/img/Lets-meet.jpg" alt="First slide">
                <div class="carousel-caption d-none d-md-block">
                        <h5>Lets Meet! 🟊</h5>
                        <p>Check our next meeting event. It could be a great chance to exchange with pro fickers and get their advices, learn and meet people with your same interests. <a href="#">Read more...</a></p>
                        </div>
                </div>
            
                <div id="img2" class="carousel-item  carrousel-box">
                <img  class="d-block w-100" src="assets/img/texture-1362879_1920.jpg" alt="Second slide">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Inspire</h5>
                        <p>Sharing your tips with beginners is a great way to upgrade your own writting level with your feedback, don't lose the opportunity! </p>
                    </div>
                </div>
            
                <div id="img3" class="carousel-item  carrousel-box">
                <img  class="d-block w-100" src="assets/img/japanese-garden-2898777_1920.jpg" alt="Third slide">
                <div class="carousel-caption d-none d-md-block">
                        <h5>Highlights</h5>
                        <p>"Some beautiful paths can't be discovered, without getting lost" - Erol Ozan</p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            </div>
        
<!--FIN CARROUSEL DE IMAGENES-->`)
      setTimeout(function(){
        $("#loader").fadeOut();
      },3000);
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

var getRealTimeUpdates = (function() {
  var docRef = firestore.doc("users/B9f70iGQN624sS9AwnmL");
  var postBtn = $("#comm-btn");
  docRef.onSnapshot(function(doc) {
    if (doc && doc.exists) {
      var myData = doc.data();
      $(postBtn).append(`<p>`+myData.post+`</p>`);
    }
  });
});

var posting = (function() {
  var counter = 0;
  var user = firebase.auth().currentUser.displayName;
  var textAreaPost = $("#wannabecomment");
  var postContainer = $("#comment-cont");
  var postBtn = $("#comm-btn");
  var docRef = firestore.doc("users/"+user+"/post"+counter+"/"+counter);
  var post = textAreaPost.val();
    docRef.set({
      when: new Date(), 
      what: post
    }, {merge:true}).then(function() {
      counter++;
      console.log("Saved");
    }).catch(function(error) {
      console.log(error);
    });
});