let sumaTotal = 0;
let alertas = '';
let cuilString = '';
let tipo = '';
let sexo = '';
let dni = '';

const divResultado = document.getElementById('resultado');
const inputSexo = document.getElementById('sexo');
const inputDni = document.getElementById('dni');
const btnCalcular = document.getElementById('calcular');
btnCalcular.addEventListener('click', calcularCuil);

function calcularCuil() {
    limpiarHTML();
    const validacionSexo = validarSexo();

    if(validacionSexo) {        
        const validacionDni = validarDNI();

        if(validacionDni) {
            obtenerTipo();

            cuilString = tipo + dni;
            
            const digito = obtenerDigitoVerificador();

            if(digito === 10) {
                tipo = '23';
                cuilString = tipo + dni;

                const nuevoDigito = obtenerDigitoVerificador();
                cuilString += nuevoDigito;

                imprimirResultado(cuilString);
                return;

            } else if (digito === 11) {
                nuevoDigito = 0;
                cuilString += nuevoDigito;

                imprimirResultado(cuilString);
                return;
                
            } else {
                cuilString += digito;

                imprimirResultado(cuilString);
                return;
            }        
        }
    }

    mostrarAlertas(alertas);    
}

function validarSexo() {
    alertas = '';

    if(inputSexo.value === '') {        
        alertas = 'El sexo es obligatorio';
        return false;
    }

    return true;
}

function validarDNI() {
    alertas = '';

    dni = inputDni.value;

    if(dni.length < 7 | dni.length > 8) {
        alertas = 'El DNI ingresado no es válido';        
        return false;       
    }

    if(dni.length === 7) {        
        dni = '0'.concat(dni);
        return true;
    }

    if (dni.length === 8) {
        return true;
    }    
}

function mostrarAlertas(mensaje) {
    const existeError = document.querySelector('.error');

    if(!existeError) {
        const formulario = document.getElementById('formulario');
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error', 'border-radius');

        divMensaje.textContent = mensaje;            
        formulario.appendChild(divMensaje);
        
        setTimeout(()=> {
            divMensaje.remove();
        }, 2500);
    }
}

function obtenerTipo() {
    if(inputSexo.value === 'masculino') {
        tipo = '20';
        sexo = "Masculino";
    } else if (inputSexo.value === 'femenino') {
        tipo = '27';
        sexo = "Femenino";
    }
}

function obtenerDigitoVerificador() {
    const cuilArray = Array.from(cuilString);

    sumaTotal = 0;

    const serie = [5,4,3,2,7,6,5,4,3,2];

    serie.forEach((serie, index) => {
        sumaTotal += serie * cuilArray[index];        
    });

    const resto = sumaTotal % 11;
    
    const digito = 11 - resto;
            
    return digito;   
}

function imprimirResultado(cuil) {    
    limpiarHTML();
    limpiarCampos();

    const nuevoDiv = document.createElement('DIV');
    nuevoDiv.classList.add('campos','resultado', 'border-radius','margin-1');
    
    const datosIngresados = document.createElement('P');      
    datosIngresados.textContent = `Datos ingresados:`;
    datosIngresados.classList.add('subtitulo');
    nuevoDiv.appendChild(datosIngresados);

    const sexoIngresado = document.createElement('P');      
    sexoIngresado.innerHTML = `Sexo: <span>${sexo}</span>`;
    sexoIngresado.classList.add('texto');
    nuevoDiv.appendChild(sexoIngresado);

    const dniIngresado = document.createElement('P');      
    dniIngresado.innerHTML = `DNI: <span>${dni}</span>`;
    dniIngresado.classList.add('texto');
    nuevoDiv.appendChild(dniIngresado);

    const resultadoTexto = document.createElement('P');      
    resultadoTexto.textContent = `Resultado:`;
    resultadoTexto.classList.add('subtitulo');
    nuevoDiv.appendChild(resultadoTexto);

    const resultadoCalculoGuiones = document.createElement('P');    
    const cuilConGuiones = agregarGuiones(cuil, "-");

    resultadoCalculoGuiones.innerHTML = `CUIL con guiones: <span>${cuilConGuiones}</span>`;
    resultadoCalculoGuiones.classList.add('texto');
    nuevoDiv.appendChild(resultadoCalculoGuiones);

    const resultadoCalculo = document.createElement('P');      
    resultadoCalculo.innerHTML = `CUIL sin guiones: <span>${cuil}</span>`;
    resultadoCalculo.classList.add('texto', 'padding-bottom-1');
    nuevoDiv.appendChild(resultadoCalculo);    

    divResultado.appendChild(nuevoDiv);
}

function limpiarHTML() {
    while(divResultado.firstChild){
        divResultado.removeChild(divResultado.firstChild);
    }
}

function limpiarCampos() {    
    inputSexo.selectedIndex = '';
    inputDni.value = '';
}

function agregarGuiones (cadena, caracter) {
    let cadenaConCaracteres = "";    
    for (let i = 0; i < 11; i++) {
        if (i === 2) {
            cadenaConCaracteres += cadena.substring(0, i) + caracter;
        } else if (i === 10){
            cadenaConCaracteres += cadena.substring(2, i) + caracter + cadena.substring(11, i);
        }          
    }
    return cadenaConCaracteres;
}