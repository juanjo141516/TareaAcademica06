let inputCodigo = document.querySelector('#inputCodigo');
let inputNombre = document.querySelector('#inputNombre');
let seccionCategorias = document.querySelector('#seccionCategorias');
let inputRUC = document.querySelector('#inputRUC');
let inputProveedor = document.querySelector('#inputProveedor');
let inputPrecio = document.querySelector('#inputPrecio');
let inputFecha = document.querySelector('#inputFecha');
let inputEstadoActivo = document.querySelector('#inputEstadoActivo');
let inputEstadoSuspendido = document.querySelector('#inputEstadoSuspendido');
let inputEstadoBaja = document.querySelector('#inputEstadoBaja');
let checkboxImpuesto = document.querySelector('#checkboxImpuesto');
let botonGuardar = document.querySelector('#botonGuardar');
let  id = window.localStorage.getItem('identificador');

const urlProductosAPI = 'https://disenoydesarrolloweb.azurewebsites.net/api/Producto';

const obtenerCategoriasApi = (event) =>{

    event.preventDefault();

    fetch(`${urlProductosAPI}/Categorias`)
    .then(response => response.json())
    .then(data =>
    {
        imprimirCategoria(data.categorias);
    }) 
}
const imprimirCategoria = (opciones) =>{

    seccionCategorias.innerHTML = '';

    opciones.forEach( opcion => {
        seccionCategorias.innerHTML += `<option class="option_Categorias">${opcion}</option>`;
    });
}

const leerDatosLocalStore = (event) => {

    event.preventDefault();

    if (id != 0) {
        
        fetch(`${urlProductosAPI}/${id}`)
        .then(response => response.json())
        .then(data => asignarDatosApi(data))
    }
}

const asignarDatosApi = (dato) =>{

    inputCodigo.value = dato.codigo;
    inputNombre.value = dato.nombre;
    inputRUC.value = dato.ruc;
    seccionCategorias.value = dato.categoria;
    inputProveedor.value = dato.proveedor;
    inputPrecio.value = dato.precio;
    inputFecha.value = dato.fechaIngreso;

    if (dato.estado == 0 ) {

        inputEstadoActivo.checked= true;
    } 
    if (dato.estado == 1 ) {

        inputEstadoSuspendido.checked = true;
    }
    if (dato.estado == 2) {

        inputEstadoBaja.checked = true;
    } 
    if (dato.afectoIGV == true) {
        
        checkboxImpuesto.checked = true;
    }
} 

const agregarProductos = (event) =>{

    event.preventDefault();

    let codigo = inputCodigo.value;
    let nombre = inputNombre.value;
    let categorias = seccionCategorias.value;
    let ruc = inputRUC.value;
    let proveedor = inputProveedor.value;
    let precio = inputPrecio.value;
    let fecha = inputFecha.value;
    let estado = 0;

    if(inputEstadoActivo.checked == true){
        estado = 0;
    }
    if (inputEstadoSuspendido.checked == true) {
        estado = 1;
    }
    if (inputEstadoBaja.checked == true) {
        estado = 2;
    }
    let igv = checkboxImpuesto.checked;

    let productos = {'codigo': codigo, 'nombre': nombre, 'categoria': categorias, 'ruc': ruc, 'proveedor': proveedor,'precio': precio ,'fechaIngreso': fecha,'estado': estado,'afectoIGV': igv};

    fetch(urlProductosAPI,
        {
            method: 'POST',
            body: JSON.stringify(productos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(data =>
            alert("Producto creado correctamente ", data)
        )
}

const modificarListado = (event) =>{

    event.preventDefault();

    let codigo = inputCodigo.value;
    let nombre = inputNombre.value;
    let categorias = seccionCategorias.value;
    let ruc = inputRUC.value;
    let proveedor = inputProveedor.value;
    let precio = inputPrecio.value;
    let fecha = inputFecha.value;
    let estado = 0;
    
    if(inputEstadoActivo.checked == true){
        estado = 0;
    }
    if (inputEstadoSuspendido.checked == true) {
        estado = 1;
    }
    if (inputEstadoBaja.checked == true) {
        estado = 2;
    }
    let igv = checkboxImpuesto.checked;

    let productos = {'codigo': codigo, 'nombre': nombre, 'categoria': categorias, 'ruc': ruc, 'proveedor': proveedor,'precio': precio ,'fechaIngreso': fecha,'estado': estado,'afectoIGV': igv};

    fetch(`${urlProductosAPI}/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(productos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(data =>
            alert("Producto modificado correctamente")
        )
}

const grabarProductos =(event) =>{
    if ( id == 0) {
        agregarProductos(event);
    }
    else{
        modificarListado(event);
    }
}



window.addEventListener('load', obtenerCategoriasApi);
window.addEventListener('load', leerDatosLocalStore);
seccionCategorias.addEventListener('focus',obtenerCategoriasApi);
botonGuardar.addEventListener('click', grabarProductos);


