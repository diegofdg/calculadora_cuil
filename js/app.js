console.log('aplicación iniciada');

const btnCalcular = document.getElementById('calcular');
const inputSexo = document.getElementById('sexo');
const inputDni = document.getElementById('dni');
const resultadoCuil = document.getElementById('resultado');

let cuilArray = [];
let sumaTotal = 0;
let digitoVerificador = 0;

btnCalcular.addEventListener('click', ()=> {
    calcularCuil();   
});

function calcularCuil() {
    if(inputSexo.value === '') {
        alert('error, no elegiste sexo');        
        return;
    } else if (inputSexo.value === 'masculino') {
        cuilArray = [2,0];
    } else if (inputSexo.value === 'femenino') {
        cuilArray = [2,7];
    }
    
    const dniString = Array.from(inputDni.value);
    
    if(dniString.length !== 8){
        alert('error, ingrese los 8 numeros');        
        return;
    }

    const dniNumber = dniString.map(Number);

    Array.prototype.push.apply(cuilArray, dniNumber);    

    const digitoVerificador = calcularDigitoVerificador();
        
    const cuil = verificarDigito(digitoVerificador);
    const miCuil = cuil.join(''); 

    imprimirResultado(miCuil);
}

function calcularDigitoVerificador(){
    sumaTotal = 0;
    const serie = [5,4,3,2,7,6,5,4,3,2];

    serie.forEach((serie, index) => {
        sumaTotal += serie * cuilArray[index];        
    });

    const resto = sumaTotal % 11;
       
    const digito = 11 - resto;
           
    return digito;        
}

function verificarDigito(digitoVerificador) {
    if(digitoVerificador === 10) {
        cuilArray[1] = 3;        
        const nuevoDigito = calcularDigitoVerificador();
        cuilArray.push(nuevoDigito);        
        return cuilArray;

    } else if (digitoVerificador === 11) {
        digitoVerificador = 0;
        cuilArray.push(digitoVerificador);
        console.log(cuilArray);
        return cuilArray;
    } else {
        cuilArray[10] = digitoVerificador;        
        return cuilArray;
    }
}

function imprimirResultado(cuil) {
    limpiarHTML();
    const resultado = document.createElement('P');      
    resultado.textContent = `Tu CUIL es: ${cuil}`;

    const section = document.createElement('DIV');        
    section.appendChild(resultado);
    
    resultadoCuil.appendChild(section);
}

function limpiarHTML() {    
    while(resultadoCuil.firstChild){
        resultadoCuil.removeChild(resultadoCuil.firstChild);
    }
}