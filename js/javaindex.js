class jugador {
    constructor(id, nombre, ataque, defensa, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.ataque = ataque;
        this.defensa = defensa;
        this.precio = precio;
        this.foto = foto;
    }
}

class ElementoCarrito {
    constructor(jugador, cantidad) {
        this.jugador = jugador;
        this.cantidad = cantidad;
    }
}

/**
 * Definiciones de constantes
 */
const estandarDolaresAmericanos = Intl.NumberFormat('en-US');

//Arrays donde guardaremos catálogo de productos y elementos en carrito
const jugadores = [];
const elementosCarrito = [];

const contenedorJugadores = document.getElementById('contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");

/**
 * Ejecución de funciones
 */

cargarJugadores();
cargarCarrito();
dibujarCarrito();
dibujarCatalogoJugadores();
saludoboton();

/**
 * Definiciones de funciones
 */

function cargarJugadores() {
    jugadores.push(new jugador(1, 'Burdisso Matias', 45, 85, 150000, './img/matiasburdisso.jpeg'));
    jugadores.push(new jugador(2, 'Molina Alejandro', 48, 72, 120000, './img/alejandromolina.jpeg'));
    jugadores.push(new jugador(3, 'Peirani Lucio', 52, 78, 130000, './img/luciopeirani.jpeg'));
    jugadores.push(new jugador(4, 'Rosales Carlos', 90, 22, 120000, './img/rosalescarlos.jpeg'));
    jugadores.push(new jugador(5, 'Orazi Alejandro', 10, 92, 140000, './img/orazialejandro.jpeg'));
    jugadores.push(new jugador(6, 'Hernandez Chabi', 47, 62, 900000, './img/hernandezchabi.jpeg'));
}

function cargarCarrito() {
    
}

let mediaPromedio = 0;
function dibujarCarrito() {

    let sumaMedia = 0;
    let sumaCarrito= 0;
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.jugador.id}</td>
                <td>${elemento.jugador.nombre}</td>
                <td>${elemento.jugador.ataque}</td>
                <td>${elemento.jugador.defensa}</td>
                <td>${Math.round((elemento.jugador.defensa+elemento.jugador.ataque)/2)}</td>
                <td>$ ${elemento.jugador.precio}</td>
                <td><button id="eliminar-jugador-${elemento.jugador.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito+=elemento.jugador.precio;
            sumaMedia+=Math.round((elemento.jugador.defensa+elemento.jugador.ataque)/2)
            mediaPromedio= Math.round(sumaMedia/(elementosCarrito.length))

            //agregamos evento a carrito
           
            let borrarJugador = document.getElementById(`eliminar-jugador-${elemento.jugador.id}`);

            borrarJugador.addEventListener("click", (e) => {
                removerJugadorCarrito(elemento);
                dibujarCarrito();
                
            });

        }
    );

    //contenedorCarritoCompras.innerHTML = renglonesCarrito;
    
    if(elementosCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">No tienes ningun jugador Seleccionado</th>
        `;
    } else {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">Llevas gastando: $${estandarDolaresAmericanos.format(sumaCarrito)} y una media de ${mediaPromedio}</th>
        `;
    }
    
    

}

function removerJugadorCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter((elemento) => elementoAEliminar.jugador.id != elemento.jugador.id);
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}

function crearCard(jugador) {
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Seleccionar";

    //Card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${jugador.nombre}</h5>
        <p>$ ${jugador.precio} USD</p>
        <p>En Defensa ${jugador.defensa}</p>
        <p>En Ataque ${jugador.ataque}</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //Imagen
    let imagen = document.createElement("img");
    imagen.src = jugador.foto;
    imagen.className = "card-img-top";
    imagen.alt = jugador.nombre;

    //Card
    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);

    

    //Agregar algunos eventos
    botonAgregar.onclick = () => {
        

        let elementoExistente = elementosCarrito.find((elemento) => elemento.jugador.id == jugador.id);

        if(elementoExistente) {
            elementoExistente.cantidad+=1;
        } else {
            let elementoCarrito = new ElementoCarrito(jugador, 1);
            elementosCarrito.push(elementoCarrito);
        }

        dibujarCarrito();

        swal({
            title: "¡Jugador Seleccionado!",
            text: `${jugador.nombre} fue convocado para el partido.`,
            icon: "success",
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false
                },
                carrito: {
                    text: "Seleccion de Jugadores",
                    value: true
                }
            }
        }).then((irACarrito) => {

            if(irACarrito) {
                //swal("Vamos al carrito!");
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);

            }
        });

    } 
    
    return carta;

}

function dibujarCatalogoJugadores() {
    contenedorJugadores.innerHTML = "";

    jugadores.forEach(
        (jugador) => {
            let contenedorCarta = crearCard(jugador);
            contenedorJugadores.append(contenedorCarta);
        }
    );

}

function saludoboton(){
    var mensajepartido = function(){
        var enemigo = Math.round(Math.random()*80)
        if (mediaPromedio == enemigo){
            alert("El Partido ha terminado en Empate")
        } else if(mediaPromedio > enemigo){
            alert("El Partido ha terminado en Victoria para el Usuario")
        } else if(mediaPromedio < enemigo){
            alert("El Partido ha terminado en Derrota para el Usuario")
        }
        
    };
    
    var btnpartido = document.getElementById('btnpartido');
    btnpartido.addEventListener("click",mensajepartido);
}

let turno=localStorage.getItem("turno");
console.log(turno);

let botonTurno = document.getElementById('tiempo');
let barraCarrito = document.getElementById('barraCarrito');

if(turno!=null){
    document.body.className=turno;
    barraCarrito.className="navbar navbar-dark"+turno;
    botonNavegador="btn"+turno;
    botonTurno.innerText="Jugar de "+turno;
}


botonTurno.onclick=()=>{
    if (turno == "noche"){
        document.body.className="dia";
        barraCarrito.className="navbar navbar-dark bg-secondary";
        botonNavegador="btn btn-dark";
        botonTurno.innerText="Jugar de Dia";
        turno="dia";
    }else {
        document.body.className="noche";
        barraCarrito.className="navbar navbar-dark bg-dark"
        botonNavegador="btn btn-secondary"
        botonTurno.innerText="Jugar de Noche";
        turno="noche";

    }
    localStorage.setItem("turno",turno);
}




//Agregar una nueva libreria, sobre el boton de finalizar partido, tomo el boton con id
/*let fin=document.getElementById('btnpartido');
//agrego un evento con sweet
fin.onclick=()=>{
    //Sweet
    Swal.fire({
        title: 'Tu equipo es listo para jugar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
}*/

//aplicacion fetc

//Direccion de donde sacamos los datos y definicion variable
let usuarios = 'https://jsonplaceholder.typicode.com/users/';
//
fetch(usuarios)//solicitud de datos a la url
    .then( response => response.json() )//se resuelve promesa
    .then( data => mostrarData(data) )//se muestra el resultado
    .catch( error => console.log(error) )//no se cumple promesa

//se crean los renglones de la tabla, para mostrar los usuarios que han jugado al juego    
const mostrarData = (data) => {
    console.log(data)
    let body = ""
    for (var i = 0; i < data.length; i++) {      
       body+=`<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].username}</td></tr>`
    }
    document.getElementById('data').innerHTML = body
    
}