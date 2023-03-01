//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const textarea = document.querySelector('#tweet');

let tweets = [];


//Event Listeners
eventListeners();
function eventListeners() {

	formulario.addEventListener('submit', agregarTweet);
	tweet.addEventListener('keydown', e => {
		if (e.keycode === 13) {
			agregarTweet;
		}
	});

	//Cuanto el documento este listo
	document.addEventListener('DOMContentLoaded', () => {

		tweets = JSON.parse( localStorage.getItem( 'tweets' ) ) || [];

		console.log(tweets);

		crearHTML();
	});
}


///Funciones
function agregarTweet(e) {
	e.preventDefault();

	//textarea donde el usuario escribe
	const tweet = document.querySelector('#tweet').value;

	//Validando que el campo no este vacio
	if (tweet === '') {
		mostrarError('Un mensaje NO puese ir vacio', e);
		return;
	}
	resetFormulario();
	// console.log('Agregando tweet');
	agregarListaTweets(tweet);

}

//Agregar a la lista de tweets
function agregarListaTweets(tweet) {

	const tweetObj = {
		id: Date.now(),
		tweet
	}

	tweets = [...tweets, tweetObj];
	console.log(tweets);

	//insertar al HTML
	crearHTML();

	
}



//Limpia el HTML
function resetFormulario() {
	formulario.reset();
}

//Mostrar un mensaje de error
function mostrarError(error, e) {


	const mensajeError = document.createElement('P');
	mensajeError.textContent = error;
	mensajeError.classList.add('alerta', 'error');



	// insertar en el Contenido
	const contenido = document.querySelector('#contenedor-formulario');

	contenido.appendChild(mensajeError);

	setTimeout(() => {
		mensajeError.remove();
	}, 3000);
}

//muestra un listado de los tweets
function crearHTML() {
	LimpiarHTML();

	if (tweets.length > 0) {

		tweets.forEach(tweet => {
		
			//Agregar boton de elimiar
			const btnEliminar = document.createElement('A');
			btnEliminar.classList.add('borrar-tweet');
			btnEliminar.textContent = 'X';
		
			//Funcion Eliminar
			btnEliminar.onclick = () => {
				borrarTweet(tweet);
			};
		
			//crear el HTML
			const li = document.createElement('LI');
			
			//A;adir el texto
			li.innerText = tweet.tweet;
			
			//Asignar el boton
			li.appendChild(btnEliminar);

			//insetar en HTML
			listaTweets.appendChild(li);
		});
	}
	
	
	sincronizarStorage();
}

//Agrega los tweets actuales a local storage
function sincronizarStorage(){
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Borrar un tweet
function borrarTweet(tweetid){
	
	const tweetEliminar = JSON.parse(localStorage.getItem('tweets'));
	tweets = tweets.filter(tweet => tweet.id != tweetid.id);
	crearHTML();
}
//limpiar la lista
function LimpiarHTML(){

	while(listaTweets.firstChild){
		listaTweets.removeChild(listaTweets.firstChild);
	}
	
}