// Inicializa Firebase
var config = {
  apiKey: "AIzaSyCard9eQg9ssp1MiL-CLFrRC4YEy5Xd1As",
  authDomain: "fickeroo.firebaseapp.com",
  databaseURL: "https://fickeroo.firebaseio.com",
  projectId: "fickeroo",
  storageBucket: "fickeroo.appspot.com",
  messagingSenderId: "824926587604"
};

var loginName = $("#login-username");
var loginPass = $("#login-pass");
var loginBtn = $(".loginmodal-submit");


$(document).ready(function() {
  firebase.initializeApp(config);
});