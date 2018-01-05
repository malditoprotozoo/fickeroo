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
  firebase.auth().onAuthStateChanged(function(user) {
    // User is signed in.
    if (user) {
      setTimeout(function() {
        $("#loader").fadeOut();
        getRealTimeUpdates();
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
        <!--FIN CARROUSEL DE IMAGENES-->
        <!-- NAVEGADOR DE PERFIL -->
                <ul id="menu" class="nav justify-content-center">
                    <li class="nav-item">
                    <img id="logo-nav" src="assets/img/logo-white.svg">
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="#">NEWS</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Friends</a>
                </li>
                <li class="nav-item">
                 <a class="nav-link" href="#">FICS!</a>
                </li>
                            <li class="nav-item">
                <a class="nav-link " href="#">Me</a>
                </li>
                </ul>
        <!--FIN NAVEGADOR DE PERFIL-->
        <!--CONTENEDOR DE CONTENIDO DINAMICO SEGÚN NAVEGADOR-->
                    <div class="container-fluid" id="three">
                      <div  id="cajadeabajo" class="row">
     <!--Este contiene los dinamicos-->        
        <div  id="cajaizquierda" class="col-sm-12 col-md-8">
         <!-- comments area --> 
          <div class="row">
            <div id="textareabox" class="col-md-10 offset-md-1">
              <textarea id="wannabecomment" class="form-control" placeholder="Do you want to say something?"></textarea>
            </div>
            <div class="col-md-2 offset-md-9">  
              <button id="comm-btn" onclick="posting()" class="button">Post it!</button>    
           </div>    
                        <hr>
  <!--Contenedor de comentarios-->                      
          <div id="comment-cont" class="col-md-10 offset-md-1">
                            
          </div>  
         </div>
        </div>
  <!-- Ese no cambia-->     
        <div id="profile-box" class="col-sm-12 col-md-4">
          <div class="row">
           <div id="profile-pic" class="col-md-4 offset-md-4">
             <img src="assets/img/path.jpg" class="image-responsive img-shape">
           </div>
           <div id="username-box" class="col-md-8 offset-md-2 text-left">
            <p> User: Tori </p>
           </div>
           <div id="location-box" class="col-md-8 offset-md-2 text-left">
            <p> Location: In the Sky</p>
           </div>
            <div id="rating-box" class="col-md-8 offset-md-2 text-left">
            <p> Rating: [ 5 ] 🟊 </p>
           </div>


          </div>  
        </div>  

      </div>  
      <!--FIN CONTAINER TWO--> `);
      },2000);
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // signOut();
      // if (user.emailVerified == false) {
      //   alert("No olvides verificar tu e-mail");
      // };
    } else {
      setTimeout(function(){
    $("#loader").fadeOut();
      $("#one").fadeIn();
    },1000);
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
      `);
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