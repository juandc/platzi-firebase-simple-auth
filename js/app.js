var form = document.forms['loginForm'];

var firebaseConfig = {
  apiKey: "AIzaSyA4zatcgkphW7EE3S6K2JN8CtjM1vAwQIk",
  authDomain: "platzi-firebase-simple-auth.firebaseapp.com",
  databaseURL: "https://platzi-firebase-simple-auth.firebaseio.com",
  projectId: "platzi-firebase-simple-auth",
  storageBucket: "platzi-firebase-simple-auth.appspot.com",
  messagingSenderId: "278321703475",
};

firebase.initializeApp(firebaseConfig);

form.addEventListener('submit', function (event) {
  event.preventDefault();

  var { email, password, isLoginOrSignup } = form;

  if (isLoginOrSignup.value === 'isLogin') {
    loginUser({ email: email.value, password: password.value });
  } else {
    createUser({ email: email.value, password: password.value });
  }
})

// Firebase defs
function createUser({ email, password }) {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
    alert('Se creo tu useer, bro :D')
  }).catch(function (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        var soLogin = confirm(
          'Ya te habias registrado con este email bro 😝, ¿quieres iniciar sesión ✨?'
        );
        !!soLogin ? loginUser({ email, password }) : alertTryAgain(error);
      break;
      default:
        alertTryAgain(error);
      break;
    }
  });
}

function loginUser({ email, password }) {
  console.log('Loging user ' + email)
}

// General Utils
function alertTryAgain(error) {
  console.log(error);
  return alert('Error, intenta de nuevo ⛈');
}
