# Autenticación con Firebase en 5 minutos

Con Firebase Authentication podemos almacenar y administrar el acceso y los permisos de nuestros usuarios sin pagar un solo centavo. En este tutorial vamos a construir una aplicación de ejemplo para implementar los métodos de registro, login y logout con email y password.

No te preocupes si tu negocio o página web son un poco más complicados que este ejemplo. Los pasos a seguir son casi los mismos. Sin embargo, si quieres profundizar muchísimo más y aprender a utilizar **todos** los servicios de Firebase, puedes tomar el [Curso de Firebase para Web](https://platzi.com/cursos/firebase-web/) :ok_hand::tada:.

- DEMO: [juandc.co/platzi-firebase-simple-auth](http://juandc.co/platzi-firebase-simple-auth/)
- REPO: [github.com/juandc/platzi-firebase-simple-auth](https://github.com/juandc/platzi-firebase-simple-auth)
- Tutorial: [Autenticación con Firebase en 5 minutos - Platzi Blog](https://platzi.com/blog/autenticacion-con-firebase-en-5-minutos/)

## Creación del proyecto

Comenzamos creando un nuevo proyecto en la [Consola de Firebase](https://console.firebase.google.com):

![](https://raw.githubusercontent.com/juandc/platzi-firebase-simple-auth/master/.GITHUB/AHHHH-68ea9619-ce1f-4216-9fed-1a80a2ee2229.jpg)

Con el proyecto creado podemos entrar a la sección de autenticación y ubicar la configuración de inicio de sesión:

![](https://raw.githubusercontent.com/juandc/platzi-firebase-simple-auth/master/.GITHUB/AHHHH-4ef8e4e9-d6b5-4f85-9f4e-2c72f365794b.jpg)

Esta sección nos permite habilitar o deshabilitar diferentes alternativas para que nuestros usuarios se registren a la aplicación. Podemos usar correo y contraseña, redes sociales como Twitter y Facebook, con mensajes de texto al teléfono, links de autenticación por correo electrónico, entre otras.

Incluso podemos configurar nuestra aplicación para soportar múltiples métodos de registro y darle más comodidades a nuestros usuarios. Por ahora (para no alargar el tutorial), solo vamos a habilitar el registro de usuarios con correo y contraseña.

Después de esto solo nos queda copiar la configuración web de firebase para pegarla más adelante en nuestro archivo HTML:

![](https://raw.githubusercontent.com/juandc/platzi-firebase-simple-auth/master/.GITHUB/AHHHH-a71b3fd7-715b-4ff9-8edc-30dcb36a9754.jpg)

## Setup: Configuración inicial

La base de nuestra aplicación es un archivo HTML con diferentes secciones: un formulario de registro, secciones para guardar la información "privada" de nuestros usuarios (por ahora solo dice "Cargando...") y algunas etiquetas de `&lt;script&gt;` para importar las herramientas de Firebase:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="charset=UTF-8" />
  <title>Autenticación con Firebase en 5 minutos</title>
</head>
<body>
  <h2>Información Privada</h2>
  
  <div id="loginFormUI">
    <p>Por favor inicia sesión para acceder a tu información</p>
  
    <form name="loginForm">
      <input
        type="email"
        name="email"
        placeholder="Correo Electronico"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        required
      />
      <input
        type="radio"
        name="isLoginOrSignup"
        id="radioIsLogin"
        value="isLogin"
        checked
      />
      <label for="radioIsLogin">Entrar a mi cuenta</label>

      <input
        type="radio"
        name="isLoginOrSignup"
        id="radioIsSignup"
        value="isSignup"
      />
      <label for="radioIsSignup">Crear cuenta</label>

      <button id="btnLogin">Acceder</button>
    </form>
  </div>
  
  <div id="privateInfo">
    <p class="loading">Cargando...</p>
  </div>

  <script src="https://www.gstatic.com/firebasejs/5.6.0/firebase.js">
  &lt;script&gt;
  <script/>
    // Initialize Firebase
    var config = {
      apiKey: "API_KEY_FROM_FIREBASE",
      authDomain: "AUTH_DOMAIN.firebaseapp.com",
      databaseURL: "https://DATABASE_URL.firebaseio.com",
      projectId: "PROJET_ID",
      storageBucket: "STORAGE_BUCKET.appspot.com",
      messagingSenderId: "MESSAGING_SENDER_ID"
    };
    firebase.initializeApp(config);
  &lt;script&gt;
</body>
</html>
```

Lo más importante por ahora es el formulario. Solo tiene 3 campos: email, contraseña y un input de tipo `radio` para elegir entre “Crear una cuenta” o “Entrar a mi cuenta”.

Nuestra tarea es mostrar este formulario cuando los usuarios no han realizado su autenticación y ocultarlo cuando han ingresado o se han registrado con éxito. También debemos añadir un botón para cerrar la sesión y cambiar el texto “Cargando...” por la información real de nuestros usuarios.

## Formulario de registro

Vamos a "escuchar" las acciones de _submit_ de nuestro formulario. Es decir, vamos a programar una función que debe ejecutarse cuando los usuarios hacen click en el botón de “_Acceder_” para saber cuándo registrar o iniciar la sesión de los usuarios.:

```js
const form = document.forms['loginForm'];
form.addEventListener('submit', function handleFormSubmit(event) {
  event.preventDefault();

  const email = form['email'].value;
  const password = form['password'].value;
  const isLoginOrSignup = form['isLoginOrSignup'].value;

  if (isLoginOrSignup === 'isLogin') {
    return loginUser(email, password);
  }

  return createUser(email, password);
});
```

Ahora, vamos a programar las funciones `createUser`, `loginUser` y `signoutUser` para guardar la información de nuestros usuarios en la base de datos de Firebase:

```js
function createUser(email, password) {
	console.log('Creando el usuario con email ' + email);

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function (user) {
		console.log('¡Creamos al usuario!');
	})
	.catch(function (error) {
		console.error(error)
	});
}

function loginUser(email, password) {
	console.log('Loging user ' + email);

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function (user) {
		console.log('Credenciales correctas, ¡bienvenido!');
	})
	.catch(function (error) {
		console.log(error);
	});
}

function signoutUser() {
	firebase.auth().signOut();
}
```

¡Listo! Ya podemos probar nuestra aplicación. Cuando creamos un usuario de prueba, la consola del navegador nos muestra la respuesta que esperamos, nos está indicando que el usuario fue creado sin problemas:

![](https://raw.githubusercontent.com/juandc/platzi-firebase-simple-auth/master/.GITHUB/AHHHH-d1500475-aeac-4307-804f-406aec3f7dea.jpg)

Además, podemos visualizar la lista de usuarios creados en nuestra aplicación desde la consola de Firebase:

![](https://raw.githubusercontent.com/juandc/platzi-firebase-simple-auth/master/.GITHUB/AHHHH-f649a6fa-d3d2-4920-9f52-66b8086f2489.jpg)

## Interacción desde Javascript - JS POWER!

Ya aprendimos a registrar usuarios en la base de datos de Firebase. Es hora de programar nuestra aplicación para responder de maneras diferentes cuando un usuario está o no autenticado.

Vamos a utilizar el método `firebase.auth().onAuthStateChanged()` para ejecutar el código necesario cada vez que el usuario inicie o cierre sesión:

```js
firebase.auth().onAuthStateChanged(function handleAuthState(user) {
	if (user) {
		showPrivateInfo()
		return console.log('Habemus user 🎉');
	}

	showLoginForm()
	return console.log('No habemus user 😭');
});
```

Cuando los usuarios estén autenticados, debemos ocultar el formulario de registro y mostrar la información personalizada para cada usuario, además de un botón para salir o hacer logout.

Para esto, vamos a crear las funciones `showPrivateInfo` y `showLoginInfo` que se van a encargar de mostrar u ocultar parte de nuestra UI dependiendo del estado de autenticación de cada usuario.

```js
function showPrivateInfo(user) {
	const loginForm = document.getElementById('loginFormUI');
	loginForm.style.display = 'none';

	const privateInfo = document.getElementById('privateInfo');
	privateInfo.style.display = 'block';
	privateInfo.innerHTML = `
		<p>Información confidencial</p>
		<button id="btnLogout" class="button">Logout</button>
	`;

	const btnLogout = document.getElementById('btnLogout');
	btnLogout.addEventListener('click', signoutUser);
}

function showLoginForm() {
	const loginForm = document.getElementById('loginFormUI');
	loginForm.style.display = 'block';

	const privateInfo = document.getElementById('privateInfo');
	privateInfo.style.display = 'none';
	privateInfo.innerHTML = `
		<p>Nada que mostrar, tienes que registrarte</p>
	`;
}
```

Ahora si, nuestra aplicación muestra y oculta la información de los usuarios cuando cambia su estado de autenticación. Podemos configurar los estilos CSS y añadir todas las interacciones que necesiten nuestras aplicaciones (autenticar usuarios con redes sociales, por ejemplo), solo hace falta tu imaginación y un poco de investigación para añadir el resto de código que nos ocurra.

En mi caso, este fue el resultado y puedes ver el demo a continuación: [juandc.co/platzi-firebase-auth](http://juandc.co/platzi-firebase-simple-auth/):

![](https://github.com/juandc/platzi-firebase-simple-auth/blob/master/.GITHUB/AHHHH-85f4c3e2-71c7-4390-805e-32338ec9786d.jpg?raw=true)

## Conclusión

Firebase tiene muchos otros servicios muy interesantes y puedes aprender un poco sobre ellos en este artículo de nuestro profe @jjgomez: [Firebase, una plataforma usada por millones de aplicaciones](https://platzi.com/blog/firebase-una-plataforma-usada-por-millones-de-aplicaciones/).

Te invito de nuevo a tomar el [Curso de Firebase para Web](https://platzi.com/cursos/firebase-web/) para construir proyectos y aplicaciones increíbles a una velocidad de desarrollo casi inmejorable. **¡#NuncaParesDeAprender!**
