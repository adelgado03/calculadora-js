const botonesNumeros = document.querySelectorAll(".numero");
const operador = document.querySelectorAll(".operador");
const botonClear = document.getElementsByClassName("c")[0];
const botonIgual = document.getElementsByClassName("igual")[0];

let resultado = document.getElementById("resultado")
let valorA = '';
let valorB = '';
let operacion = undefined;







botonesNumeros.forEach(function (boton) {
    boton.addEventListener('click', function () {
        agregarNumero(boton.innerText);
    })
});

operador.forEach(function (boton){
    boton.addEventListener('click', function () {
        selectOperacion(boton.innerText);
    })
});

botonIgual.addEventListener('click', function(){ 
    calcular();
    actualizar();
});

botonClear.addEventListener('click', function(){
    clear();
    actualizar();
})

function selectOperacion (op) {
    if(valorA === '') return;
    if(valorB !== ''){
        calcular();
    }
    operacion = op.toString();
    valorB = valorA;
    valorA = '';
}

function calcular() {
    let calculo;
    let anterior = parseFloat(valorB);
    let actual = parseFloat(valorA);
    let operador = "" ;
    if(isNaN(anterior) || isNaN(actual)) return;
    switch (operacion) {
        case "+":
            calculo = anterior + actual;
            operador = "+"
            break;
        case "-":
            calculo = anterior - actual;
            operador = "-"
            break;
        case "*":
            calculo = anterior * actual;
            operador = "*"
            break;
        case "%":
            calculo = anterior / actual;
            operador = "/"
            break;
    }
    valorA = calculo;
    operacion = undefined;
    valorB = '';

    if (!localStorage.historial) {
        localStorage.historial = JSON.stringify([{
            numero1: anterior,
            numero2: actual,
            op: operador,
            resultado: calculo,
        }])
    } else {
        let dataLocal = JSON.parse(localStorage.getItem("historial"))
        dataLocal.push({
            numero1: anterior,
            numero2: actual,
            op: operador,
            resultado: calculo,
        })
        localStorage.historial = JSON.stringify(dataLocal)
    }

    

    let info = JSON.parse(localStorage.getItem("historial"))

    let lista = document.getElementById("contenedor_cuentas");

    let res = document.createElement ("ul");
    // lista.innerHTML="";
    

    for (item of info) {

        res.innerHTML = `<li> ${item.numero1} ${item.op} ${item.numero2} = ${item.resultado} </li>` ;
        lista.append(res);
    
    }

    let Borrar = document.getElementById("boton");

    Borrar.addEventListener('click' , function(){
    localStorage.removeItem("historial")
    lista.innerHTML="";
    })


}








function agregarNumero(num) {
    valorA = valorA.toString() + num.toString();
    actualizar();
}

function clear() {
    valorA = '';
    valorB = '';
    operacion = undefined;
}

function actualizar() {
    resultado.value = valorA;
}

