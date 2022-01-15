console.log('aplicación iniciada');

let sumaTotal = 0;
let alertas = '';
let cuilString = '';
let tipo = '';
let sexo = '';
let dni = '';

const resultadoCuil = document.getElementById('resultado');
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
        divMensaje.classList.add('error');

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

    const divResultado = document.createElement('DIV');
    divResultado.classList.add('campos','resultado');
    
    const datosIngresados = document.createElement('P');      
    datosIngresados.textContent = `Datos ingresados:`;
    datosIngresados.classList.add('subtitulo');
    divResultado.appendChild(datosIngresados);

    const sexoIngresado = document.createElement('LI');      
    sexoIngresado.innerHTML = `Sexo: <span>${sexo}</span>`;
    divResultado.appendChild(sexoIngresado);

    const dniIngresado = document.createElement('LI');      
    dniIngresado.innerHTML = `DNI: <span>${dni}</span>`;
    divResultado.appendChild(dniIngresado);

    const resultadoTexto = document.createElement('P');      
    resultadoTexto.textContent = `Resultado:`;
    resultadoTexto.classList.add('subtitulo');
    divResultado.appendChild(resultadoTexto);

    const resultadoCalculoGuiones = document.createElement('P');    
    const cuilConGuiones = agregarGuiones(cuil, "-");

    resultadoCalculoGuiones.innerHTML = `CUIL con guiones: <span>${cuilConGuiones}</span>`;
    resultadoCalculoGuiones.classList.add('tu-cuil');
    divResultado.appendChild(resultadoCalculoGuiones);

    const resultadoCalculo = document.createElement('P');      
    resultadoCalculo.innerHTML = `CUIL sin guiones: <span>${cuil}</span>`;
    resultadoCalculo.classList.add('tu-cuil');
    divResultado.appendChild(resultadoCalculo);    

    resultadoCuil.appendChild(divResultado);
}

function limpiarHTML() {
    while(resultadoCuil.firstChild){
        resultadoCuil.removeChild(resultadoCuil.firstChild);
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

/* let clave = "20269777729";
console.log(agregarCaracter(clave, "-", 2)); */