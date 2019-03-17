# Autenticación con Firebase en 5 minutos
Gracias a Firebase podemos almacenar y administrar el acceso de usuarios no registrados a nuestra aplicación. Y lo mejor de todo es que Firebase no nos cobra un peso por almacenar y tratar todas estas cuentas para facilitar un montón nuestro trabajo.

A continuación, vamos a añadir métodos de registro, login y logout con email y password. No te preocupes si tu negocio o página web son un poco más complicadas que esta aplicación, los pasos que debes seguir son masomenos los mismos y si quieres profundizar muchísimo más para aprender a utilizar los TODOS los servicios de Firebase como un profesional, puedes tomar el [Curso de Firebase para Web](https://platzi.com/cursos/firebase-web/) :ok_hand::tada:.


Tutorial: [Autenticación con Firebase en 5 minutos - Platzi Blog](https://platzi.com/blog/autenticacion-con-firebase-en-5-minutos/)

Demo: [juandc.co/platzi-firebase-auth](http://juandc.co/platzi-firebase-simple-auth/).

## Creación del proyecto

Vamos a comenzar creando un proyecto en Firebase, lo primero que debes hacer es entrar a https://console.firebase.google.com y crear un nuevo proyecto:

![](https://raw.githubusercontent.com/juandc/platzi-firebase-simple-auth/master/.GITHUB/AHHHH-68ea9619-ce1f-4216-9fed-1a80a2ee2229.jpg)

Con el proyecto creado, podemos entrar a la sección de autenticación y a la configuración de inicio de sesión:

![](https://raw.githubusercontent.com/juandc/platzi-firebase-simple-auth/master/.GITHUB/AHHHH-4ef8e4e9-d6b5-4f85-9f4e-2c72f365794b.jpg)

En esta sección podemos habilitar o deshabilitar los métodos de inicio de sesión, podemos utilizar correo y contraseña, redes sociales, mensajes de texto al teléfono, link de autenticación por correo electrónico, entre otras. ¡Incluso podemos combinar varios servicios y utilizarlos en nuestras aplicaciones!.

Por ahora (y para no alargar el tutorial), solo vamos a habilitar el registro de usuarios con correo y contraseña, después de esto solo nos queda copiar la configuración web de firebase y pegarla en nuestro archivo HTML:

![](https://raw.githubusercontent.com/juandc/platzi-firebase-simple-auth/master/.GITHUB/AHHHH-a71b3fd7-715b-4ff9-8edc-30dcb36a9754.jpg)

## Setup, configuración inicial
Comenzamos nuestro proyecto en un archivo HTML con un formulario de registro, una sección para la información “privada” de nuestros usuarios (que por ahora solo dice “Cargando…”) y los scripts de firebase y la configuración que copiamos anteriormente desde la consola.

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
      <input type="email" name="email" placeholder="Correo Electronico" required />
      <input type="password" name="password" placeholder="Contraseña" required />

      <input type="radio" name="isLoginOrSignup" id="radioIsLogin" value="isLogin" checked />
      <label for="radioIsLogin">Entrar a mi cuenta</label>

      <input type="radio" name="isLoginOrSignup" id="radioIsSignup" value="isSignup" />
      <label for="radioIsSignup">Crear cuenta</label>

      <button id="btnLogin">Acceder</button>
    </form>
  </div>
  
  <div id="privateInfo">
    <p class="loading">Cargando...</p>
  </div>

  <script src="https://www.gstatic.com/firebasejs/5.6.0/firebase.js"></script>
  <script>
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
  </script>
</body>
</html>
```

El formulario solo tiene 3 campos: email, contraseña y un input de tipo radio para elegir entre “Crear cuenta” o “Entrar a mi cuenta”. Nuestra tarea es mostrar este formulario cuando los usuarios no han realizado su autenticación u ocultarlo cuando los usuarios se registraron con éxito. También debemos añadir un botón para cerrar la sesión y cambiar el texto “Cargando...” por la información real de nuestros usuarios.

## Formulario de registro
Vamos a escuchar las acciones de submit de nuestro formulario, es decir, vamos a programar la función que debe ejecutarse cuando los usuarios hacen click en el botón “Acceder”:

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

De esta forma, ya sabemos cuándo registrar o simplemente iniciar la sesión de los usuarios, ahora, vamos a programar estas funciones y guardar la información con Firebase:

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

¡Y listo! Podemos probar nuestra aplicación, cuando creamos un usuario de prueba la consola del navegador imprime la respuesta que esperamos:



![](https://raw.githubusercontent.com/juandc/platzi-firebase-simple-auth/master/.GITHUB/AHHHH-d1500475-aeac-4307-804f-406aec3f7dea.jpg)

Además, podemos visualizar la lista de usuarios creados en nuestra aplicación desde la consola de Firebase:



![](https://raw.githubusercontent.com/juandc/platzi-firebase-simple-auth/master/.GITHUB/AHHHH-f649a6fa-d3d2-4920-9f52-66b8086f2489.jpg)

Pero, a pesar de que autenticamos a los usuarios, nuestra aplicación sigue mostrando el formulario de registro. Necesitamos modificar la UI de nuestro archivo HTML cada vez que registramos a los usuarios.

## Interacción desde Javascript - JS POWER!! 
Para ocultar o mostrar el formulario de registro y la información privada de nuestros usuarios, vamos a utilizar el método `firebase.auth().onAuthStateChanged()` para ejecutar el código necesario cada vez que el usuario inicie o cierre sesión:

```js
firebase.auth().onAuthStateChanged(function handleAuthState(user) {
	if (user) {
		showPrivateInfo()
		return console.log('Habemus user 🎉');
	}

	showLoginForm()
	return console.log('No habemus user 😭');
});

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

Ahora si, nuestra aplicación muestra y oculta la información de los usuarios cuando cambia su estado de autenticación. Podemos configurar los estilos CSS y añadir todas las interacciones que necesiten nuestras aplicaciones (como autenticar usuarios con redes sociales, por ejemplo), solo hace falta tu imaginación y un poco de investigación para añadir el resto de código que nos ocurra.

En mi caso, este fue el resultado de mi aplicación (puedes ver el demo a continuación: [juandc.co/platzi-firebase-auth](http://juandc.co/platzi-firebase-simple-auth/)):

![](https://github.com/juandc/platzi-firebase-simple-auth/blob/master/.GITHUB/AHHHH-85f4c3e2-71c7-4390-805e-32338ec9786d.jpg?raw=true)

![Missing image](https://github.com/juandc/platzi-firebase-simple-auth/blob/master/.GITHUB/Screenshot_20190204_153643.jpg)

## Conclusión
Firebase tiene muchos otros servicios muy interesantes y puedes aprender un poco sobre ellos en el siguiente artículo de nuestro querido profe [@jggomez](https://github.com/jggomez): [Firebase, una plataforma usada por millones de aplicaciones](https://platzi.com/blog/firebase-una-plataforma-usada-por-millones-de-aplicaciones/). De nuevo, te invito a tomar el [Curso de Firebase para Web](https://platzi.com/cursos/firebase-web/), para crear proyectos y apicaciones increíbles a una velocidad casi inmejorable, **¡#NuncaParesDeAprender!** :nerd_face::green_heart:
