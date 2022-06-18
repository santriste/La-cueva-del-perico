
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
    let juegos = await fetch('assets/juegos.json')
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
    const listadoJuegos = document.getElementById("listado-juegos")

    let acumulador = `<div class="row row-cols-1 row-cols-md-4 g-4">`

    listadoJuegos.innerHTML = ""

    Juegos.forEach((juego) => {
        if (juego.mostrar == true) {
            acumulador += `
            <div class="col">
                <div class="card h-100">
                    <img src="${juego.imagen}" class="card-img-top" alt="${juego.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${juego.nombre}</h5>
                        <p class="card-text">${juego.precio}</p>
                        <div style="text-align:center">
                        <a href="#" class="btn btn-primary" onclick="llamaBoton('${ btoa(juego.nombre)}','${juego.precio}')">Comprar</a>
                        </div>
                    </div>
                </div>
            </div>`
        }
    })

    acumulador += `</div>
    <div id="listado-juegos2" class="hidearray"></div>

<div id="elem"></div>`

    listadoJuegos.innerHTML = acumulador
}

 

async function mostrarJuegos(console) {
    Juegos = await getJuegos(console)
    renderJuegos()
    conttabla = conttabla + 1
}

function llamaBoton(nombreB64, precio) {
    let nombre = atob(nombreB64)
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
    updateCarrito()
}

function listGames(gameID) {
    Juegos.forEach((juego) => {
        if (gameID === "all"){
            juego.mostrar = true;
            return;
        }
        if (juego.console==gameID) {
            juego.mostrar = true;
        } else juego.mostrar = false;
    })
    renderJuegos()
}

function switchJuego() {
    Juegos.forEach((juego) => {
        juego.mostrar = true
    })
    renderJuegos()
}

function updateCarrito(){
    const listaDeJuegos = localStorage.getItem("juegos")
    if (listaDeJuegos == null || listaDeJuegos == 'undefined'){
        document.getElementById("listaCarrito").innerHTML = '<li>Tu carrito esta vacio</li>';
        return;
    } 
    
    const lista = JSON.parse(listaDeJuegos)
    let listaHTML = ``
    lista.forEach((item) => {
        listaHTML += `
        <li>
            <a id="${item.nombre.replace(" ","_").toLowerCase()}" class="dropdown-item">${item.nombre}<span class="badge bg-primary rounded-pill">${item.precio}</span></a>
        </li>
        `
    });
    listaHTML += `
        <li>
            <hr class="dropdown-divider">
        </li>
        <li>
            <div align="center">
                <button class="btn btn-outline-danger btm-sm" onclick="vaciarCarrito()">Vaciar Carrito</button>
            </div>
        </li>`
        listaHTML += `
        <li>
            <hr class="dropdown-divider">
        </li>
        <li>
            <div align="center">
                <button class="btn btn-outline-danger btm-sm" onclick="finalizarCompra()">Finalizar compra</button>
            </div>
        </li>`
    
    document.getElementById("listaCarrito").innerHTML = listaHTML;
}
function finalizarCompra(){
    Swal.fire({
        title: 'Completa con tus datos',
        html: `<input type="text" id="nombreCompleto" class="swal2-input" placeholder="Nombre completo">
        <input type="email" id="mail" class="swal2-input" placeholder="Email">
        <input type="number" id="phone" class="swal2-input" placeholder="Numero de contacto">
        <input type="number" id="creditCard" class="swal2-input" placeholder="Tarjeta de credito">

        `,
        confirmButtonText: 'Comprar!',
        focusConfirm: false,
        preConfirm: () => {
          const nombreCompleto = Swal.getPopup().querySelector('#nombreCompleto').value
          const mail = Swal.getPopup().querySelector('#mail').value
          const phone = Swal.getPopup().querySelector('#phone').value
          const creditCard = Swal.getPopup().querySelector('#creditCard').value
          if (!nombreCompleto || !mail || !phone || !creditCard) {
            Swal.showValidationMessage(`Por favor, completa los campos`)
          }
          return { nombreCompleto: nombreCompleto, mail: mail, phone: phone, creditCard: creditCard}
        }
      }).then((result) => {
        Swal.fire(`
          Listo! Finalizaste tu compra.
          Un correo será enviado a ${result.value.mail} con los datos de tu compra.
        `.trim())
      })
}


function vaciarCarrito(){
    localStorage.clear()
    updateCarrito()
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire(
        'Vaciaste el carrito',
        '',
        'error'
    )
}

updateCarrito()