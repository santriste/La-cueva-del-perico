let conttabla = 0

let Juegos = []

class Juego {
    constructor(nombre, precio, imagen, mostrar, console) {
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
        this.mostrar = mostrar
        this.console = console
    }
}

async function fetchJuegos() {
    let juegos = await fetch('juegos.json')
    juegos = await juegos.json()
    return juegos
}

async function getJuegos(console) {
    let juegos = []
    let j = await fetchJuegos()

    j.forEach((jj) => {
        if (jj.consola == console || console == null) {
            juegos.push(new Juego(jj.nombre, jj.precio, jj.imagen, jj.mostrar, jj.console))
        }
    });
    return juegos
}

function renderJuegos(){

    conttabla = -1;
    const listadoJuegos = document.getElementById("listado-juegos")

    let acumulador = "<table id='tabla'>"

    listadoJuegos.innerHTML = ""

    Juegos.forEach((juego) => {
        if (juego.mostrar == true) {
            if (conttabla >=2){
            acumulador += `
            <tr> 
        <td>
        <div class="juego">
            <img src="${juego.imagen}" alt="${juego.nombre}" class='imagentabla'>
            <h3>${juego.nombre}</h3>
            <p>${juego.precio}</p>
        </div>
        <div>
            <button type="button" class="btn btn-light" onclick="llamaBoton('${juego.nombre}','${juego.precio}')">Agregar al carrito</button>
        </div>
        </td>
        `    
        conttabla = 0; 
            }
        else {
            acumulador += `
            <td>
            <div class="juego">
                <img src="${juego.imagen}" alt="${juego.nombre}" class='imagentabla'>
                <h3>${juego.nombre}</h3>
                <p>${juego.precio}</p>
            </div>
            <div>
                <button type="button" class="btn btn-light" onclick="llamaBoton('${juego.nombre}','${juego.precio}')">Agregar al carrito</button>
            </div>
            </td>
             `  
             conttabla = conttabla + 1
        }
        }
        
    })

    acumulador += `</table>
    <div id="listado-juegos2" class="hidearray"></div>

<div id="elem"></div>`

    listadoJuegos.innerHTML = acumulador
}

async function mostrarJuegos(console) {
    Juegos = await getJuegos(console)
    renderJuegos()
    conttabla = conttabla + 1
}

function llamaBoton(nombre, precio) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Esta seguro que desea comprar el juego: ' + nombre + "?",
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SI',
        cancelButtonText: 'No',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            guardarJuegoEnCarrito(nombre, precio)
            swalWithBootstrapButtons.fire(
                'Juego guardado',
                nombre + ' fue agregado al carrito!',
                'success'
            )
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'No agregaste ' + nombre + ' al carrito',
                'error'
            )
        }
    })
}

function guardarJuegoEnCarrito(nombre, precio) {
    let item = {
        nombre: nombre,
        precio: precio
    }

    let lista = []
    let listaDeJuegos = localStorage.getItem("juegos")
    if (listaDeJuegos != null) {
        lista = JSON.parse(listaDeJuegos)
    }
    lista.push(item)
    localStorage.setItem("juegos", JSON.stringify(lista));
}

function switchJuego() {
    Juegos.forEach((juego) => {
        juego.mostrar = true
    })
    renderJuegos()
}
function allgames() {
    Juegos.forEach((juego) => {
        juego.mostrar = true
    })
    renderJuegos()
    
}
function ps2juegos() {
    Juegos.forEach((juego) => {
        console.log(juego);
        if (juego.console=="PS2") {
            juego.mostrar = true;
        }
        else{ juego.mostrar = false;
        }    
        })
    renderJuegos()
    
}
function ps4juegos() {
    Juegos.forEach((juego) => {
        console.log(juego);
        if (juego.console=="PS4") {
            juego.mostrar = true;
        }
        else{ juego.mostrar = false;
        }    
        })
    renderJuegos()
    
}
function x360juegos() {
    Juegos.forEach((juego) => {
        console.log(juego);
        if (juego.console=="X360") {
            juego.mostrar = true;
        }
        else{ juego.mostrar = false;
        }    
        })
    renderJuegos()
    
}
function xonejuegos() {
    Juegos.forEach((juego) => {
        console.log(juego);
        if (juego.console=="XONE") {
            juego.mostrar = true;
        }
        else{ juego.mostrar = false;
        }    
        })
    renderJuegos()
    
}
function wiijuegos() {
    Juegos.forEach((juego) => {
        console.log(juego);
        if (juego.console=="WII") {
            juego.mostrar = true;
        }
        else{ juego.mostrar = false;
        }    
        })
    renderJuegos()
    
}
function nswitchjuegos() {
    Juegos.forEach((juego) => {
        console.log(juego);
        if (juego.console=="SWITCH") {
            juego.mostrar = true;
        }
        else{ juego.mostrar = false;
        }    
        })
    renderJuegos()
    
}
