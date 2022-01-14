console.log('aplicación iniciada');

let sumaTotal = 0;
let alertas = '';
let cuilString = '';
let tipo = '';
let sexo = '';
let dni = '';
let resultadoCuil = '';

if(document.querySelector('.index')){
    console.log('Estoy en index');    

} else if(document.querySelector('.calcular')) {
    console.log('Estoy en calcular');    
    iniciarApp();
}

function iniciarApp() {
    const btnCalcular = document.getElementById('calcular');
    
    btnCalcular.addEventListener('click', ()=> {
        calcularCuil();
    });
}

function calcularCuil() {
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

    if(document.getElementById('sexo').value === '') {        
        alertas = 'El sexo es obligatorio';
        return false;
    }

    return true;
}

function validarDNI() {
    alertas = '';

    dni = document.getElementById('dni').value;

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
    const inputSexo = document.getElementById('sexo');

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
    resultadoCuil = document.getElementById('resultado');
    limpiarHTML();
    limpiarCampos();
    const section = document.createElement('DIV');
    
    const datosIngresados = document.createElement('P');      
    datosIngresados.textContent = `Datos ingresados:`;
    section.appendChild(datosIngresados);

    const sexoIngresado = document.createElement('LI');      
    sexoIngresado.textContent = `Sexo: ${sexo}`;
    section.appendChild(sexoIngresado);

    const dniIngresado = document.createElement('LI');      
    dniIngresado.textContent = `DNI: ${dni}`;
    section.appendChild(dniIngresado);

    const resultadoTexto = document.createElement('P');      
    resultadoTexto.textContent = `Resultado:`;
    section.appendChild(resultadoTexto);

    const resultadoCalculo = document.createElement('P');      
    resultadoCalculo.textContent = `Tu CUIL es: ${cuil}`;
    section.appendChild(resultadoCalculo);

    resultadoCuil.appendChild(section);
}

function limpiarHTML() {
    while(resultadoCuil.firstChild){
        resultadoCuil.removeChild(resultadoCuil.firstChild);
    }
}

function limpiarCampos() {
    const inputSexo = document.getElementById('sexo');
    inputSexo.selectedIndex = '';

    const inputDni = document.getElementById('dni');
    inputDni.value = '';
}