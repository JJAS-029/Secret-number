//decalracion de variables globales
let numeroSecreto = 0;
let intentos = 0;
let listaNumerSorteo = [];
//se asigna numero maximo de intentos
let limiteIntentos = 0;
//numero hasta el que llegará el juego
let numeroMaximo = 0;
//console.log sirve para ver los valores que arroja el programa
//en una determianda variable

//solicito el numero maximo
numeroMaximo = parseInt(prompt("hasta que numero queires adivinar?"));
//solicito el numero maximo de intentos
limiteIntentos = parseInt(prompt("Cuantos intentos quieres?"));

//funion que modifica el texto de lo elemntos del codigo html segun se declare
//en la parte baja del codigo (1)
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

//funcion donde se solicita el numero para el usuario para el elemento
//usuario el cual se llama desde el html
//el id que se vien a llamar del html es el input
//o el elemento del cuadro en la pagina
function verificarIntento() {
  //en esta linea se le asigna el valor dado por la caja de texto
  // recordar que parseInt convierte el texto que nos dan a numero
  // si no se pone esa funcion se pasa a texto lineal
  //docuement liga la funcion con el boton en html aqui fue por by id (2)
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

  console.log(intentos);
  //en esta parte se hace la comparativa del numero
  //secreto vs el que nos dio el usuario
  if (numeroDeUsuario === numeroSecreto) {
    //operador ternereo y uso de valores dinamicos (Template strings) para plural
    asignarTextoElemento(
      "p",
      `Acertaste el número en ${intentos} ${intentos == 1 ? "vez" : "veces"}`
    );
    //se habilita el boton de nuevo juego
    document.getElementById("reiniciar").removeAttribute("disabled");
    //se da la instruccion para que cuando no sea el numero se den pistas
    //estas haran validacion de mayor y menor
  } else {
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El numero secreto es menor");
    } else {
      asignarTextoElemento("p", "el numero es mayor");
    }
    //se incrementa el contador intentos
    intentos++;
    limpiarCaja();
    //contador para le numero de intentos disponibles
    //valida que el numero de intentos no sea mayor al permitido e inicia el programa nuevamente
    if (intentos > limiteIntentos) {
      alert(`llegaste al limite de intentos: ${limiteIntentos}`);
      condicionesIniciales();
    }
  }
  return;
}

//funcion para limpiar la caja del numero
function limpiarCaja() {
  //aqui fue con query selector (2)
  let valorCaja = (document.querySelector("#valorUsuario").value = "");
}
//funcion para genera un numero seudo aleatoreo
//floor retorna el numero entero del resultado
//random genera un numero aleatoreo decimal del numero que lo multiplica
// en este caso 10, se le suma 1 para que no considere el 0
function generarNumeroSecreto() {
  let numerGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  console.log(numerGenerado);
  console.log(listaNumerSorteo);
  //si  ya se sorteo todos los numeros se cierra
  if (listaNumerSorteo.length == numeroMaximo) {
    asignarTextoElemento("P", "Ya se sortearon todos los números");
  } else {
    //si el numero generado esta incluido en la lista haremos una operacion
    //sino se hara else
    //el return de volver a llamr la funcion generarnumerosecreto
    //vuelve a compilar hasta que se llene la lista de 10 numeros
    if (listaNumerSorteo.includes(numerGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerSorteo.push(numerGenerado);
      return numerGenerado;
    }
  }
}

//funciones de inicion de juego
function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del número secreto!");
  asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
  //generar numero aleatoreo
  numeroSecreto = generarNumeroSecreto();
  //inicializar intentos
  intentos = 1;
}

function reiniciarJuego() {
  //limpiar caja
  limpiarCaja();
  //indicar mensaje de inicio
  condicionesIniciales();
  // dejar el boton de juego nuevo desabilitado
  //se utiliza la funcion setatribute aqui donde se activa el disabled
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

condicionesIniciales();
//aqui se declara en forma de (elemento , texto) el contenifo que deseamos<
