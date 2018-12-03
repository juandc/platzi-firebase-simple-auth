// Initial config
const firebaseConfig = {
  apiKey: "AIzaSyA4zatcgkphW7EE3S6K2JN8CtjM1vAwQIk",
  authDomain: "platzi-firebase-simple-auth.firebaseapp.com",
  databaseURL: "https://platzi-firebase-simple-auth.firebaseio.com",
  projectId: "platzi-firebase-simple-auth",
  storageBucket: "platzi-firebase-simple-auth.appspot.com",
  messagingSenderId: "278321703475",
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) return console.log('Habemus user 🎉');
  return console.log('No habemus user 😭');
});

const form = document.forms['loginForm'];
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = form['email'].value;
  const password = form['password'].value;
  const isLoginOrSignup = form['isLoginOrSignup'].value;

  if (isLoginOrSignup === 'isLogin') {
    loginUser({ email, password });
  } else {
    createUser({ email, password });
  }
})


// Firebase defs
function createUser({ email, password }) {
  console.log('Creating user ' + email);

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log('¡Creamos el user! Huepaje!');
      // showPrivateInfo();
    })
    .catch(function (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Ya existe el usuario');
        const soLogin = confirm(
          'Ya te habias registrado con este email, bro 😝. ¿Quieres iniciar sesión ✨?'
        );
        return !!soLogin ? loginUser({ email, password }) : alertTryAgain(error);;
      }

      return alertTryAgain(error);
    });
}

function loginUser({ email, password }) {
  console.log('Loging user ' + email);

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log('Credenciales correctas, brother');
      // showPrivateInfo();
    })
    .catch(function (error) {
      console.log(error);
    });
}


// General Utils
function alertTryAgain(error) {
  console.log(error);
  return alert('Error, intenta de nuevo ⛈');
}
