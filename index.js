let selectCategorias = document.querySelector('#selectCategorias');
let textoNombre = document.querySelector('#textoNombre');
let botonBuscar = document.querySelector('#botonBuscar');
let contenidoTabla = document.querySelector('#contenidoTabla');
let botonAgregar = document.querySelector('#botonAgregar');
let botonEliminar = document.querySelector("body");
let botonModificar = document.querySelector("body");


const urlProductosAPI = 'https://disenoydesarrolloweb.azurewebsites.net/api/Producto';

const obtenerCategoriasApi = () =>{
    event.preventDefault();

    fetch(`${urlProductosAPI}/Categorias`)
    .then(response => response.json())
    .then(data =>
    {
        imprimirCategoria(data.categorias);
    })
    
}
const imprimirCategoria = (opciones) =>{

    selectCategorias.innerHTML = '';

    opciones.forEach( opcion => {
        selectCategorias.innerHTML += `<option class="option_Categorias">${opcion}</option>`;
    });

}

const buscarProductos = (event) => {

    event.preventDefault();
    obtenerProductosApi(event);
}

const obtenerProductosApi = (event) => {

    event.preventDefault();

    contenidoTabla.innerHTML = '';

    fetch(`${urlProductosAPI}?categoria=${selectCategorias.value}&nombre=${textoNombre.value}`)
    .then(response => response.json())
    .then(data => renderizarTabla(data))

}

const renderizarTabla = (productos) => {

    contenidoTabla.innerHTML = '';

    productos.forEach(producto=> {
        contenidoTabla.innerHTML  += `<tr>
        <td>  ${producto.codigo} </td>
        <td>  ${producto.nombre} </td>
        <td>  ${producto.categoria} </td>
        <td>  ${producto.precio} </td>
        <td>  ${producto.proveedor}</td>
        <td>
        <button class="boton-modificar" value="${producto.id}">
        <img id="imagenEditar" src="imagenes/edit.png" alt="imagen modificar">
        </button>
        <button class="boton-eliminar" value="${producto.id}" >
        <img id="imagenEliminar" src="imagenes/delete.png" alt="imagen eliminar">
        </button></td>  
        <tr>
        `
    });
}

const agregarProductos = (event) =>{

    event.preventDefault();
    window.localStorage.setItem('identificador',0);
    window.location.href = "agregarModificarProductos/index_02.html"

}

const modificarProductos = (event) =>{

    event.preventDefault();

    if (event.target.className == 'boton-modificar'){

        window.localStorage.setItem('identificador',event.target.value);
        window.location.href = "agregarModificarProductos/index_02.html"
        
    }

}

const eliminarProductos = (event) => {

    event.preventDefault();

    if (event.target.className == 'boton-eliminar') {
        
        fetch(`${urlProductosAPI}/${event.target.value}`,
        {
            method  : 'DELETE'
        })
        .then( response => response.json())
        .then(data =>{
            buscarProductos(event);
        }) 
        
    }
}
const limpiarTextoNombre = () =>{

    textoNombre.value = ' ';
}

selectCategorias.addEventListener('focus',obtenerCategoriasApi);
botonBuscar.addEventListener('click',buscarProductos);
botonAgregar.addEventListener('click',agregarProductos);
botonModificar.addEventListener('click',modificarProductos);
botonEliminar.addEventListener('click',eliminarProductos);
window.addEventListener('load',limpiarTextoNombre);
