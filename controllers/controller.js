"use strict";
var car;
function createCar() {
    var _a, _b, _c, _d;
    var acumError = 0;
    var plate = document.getElementById('plate').value.toString().toUpperCase(), color = document.getElementById('color').value.toString(), brand = document.getElementById('brand').value.toString();
    if (plate == "" || color == "" || brand == "") {
        if (plate == "") {
            acumError++;
            alert("Plate field must be filled.");
        }
        if (color == "") {
            acumError++;
            alert("Color field must be filled.");
        }
        if (brand == "") {
            acumError++;
            alert("Brand field must be filled.");
        }
    }
    else if (!validatePlate(plate)) {
        acumError++;
        alert("The plate must have 4 numbers followed by 3 letters");
    }
    else {
        car = new Car(plate, color, brand);
        var carInfo = document.getElementById('carInfo');
        var element = document.createElement('div');
        element.innerHTML = "\n            <div class=\"card mt-4 p-3  style=\"width: 10rem;\">\n                <div class=\"card-body>\n                    <h3 class=\"card-title\">Your car created:</h3>\n                    <p class=\"card-text mt-3\"><b>Plate</b>: " + car.plate + "</p>\n                    <p class=\"card-text\"><b>Color</b>: " + car.color + "</p>\n                    <p class=\"card-text\"><b>Brand</b>: " + car.brand + "</p>\n                </div>\n        </div>";
        carInfo === null || carInfo === void 0 ? void 0 : carInfo.appendChild(element);
        //muestro step2
        (_a = document.getElementById('myCarWheel')) === null || _a === void 0 ? void 0 : _a.classList.remove('no-display');
        (_b = document.getElementById('createWheel')) === null || _b === void 0 ? void 0 : _b.classList.remove('no-display');
        //oculto step1
        (_c = document.getElementById('carForm')) === null || _c === void 0 ? void 0 : _c.classList.add('no-display');
        (_d = document.getElementById('createCar')) === null || _d === void 0 ? void 0 : _d.classList.add('no-display');
    }
    if (acumError > 0) {
        return false;
    }
    else {
        return true;
    }
}
//WHEELS:
var wheel = [];
function createWheel() {
    var acumErrorWheel = 0;
    for (var i = 1; i <= 4; i++) {
        var wheelDiameter = parseFloat(document.getElementById('wheelDiameter' + i).value);
        // let wheelDiameterValidate: string = (<HTMLInputElement>document.getElementById('wheelDiameter'+ i)).value;
        var wheelBrand = document.getElementById('wheelBrand' + i).value.toString();
        if (!validateDiameter(wheelDiameter)) {
            acumErrorWheel++;
            wheel.splice(0, wheel.length);
            return alert('The diameter of wheel' + i + ' has to measure between 0.4 and 2');
            //con return termina, no sigue leyendo el code y desaparece el error en consola de que no encuentra diameter. Los alert salen ahora uno a uno pero si voy corrigiendo los diámetros sólo pinta el 1 y 2 repetidos, con el splice se arregla
        }
        else if (wheelBrand == "") {
            wheel.splice(0, wheel.length);
            alert("Brand " + i + " field must be filled.");
            acumErrorWheel++;
        }
        else {
            wheel.push(new Wheel(wheelDiameter, wheelBrand));
        }
    }
    for (var i = 0; i <= wheel.length; i++) {
        car.addWheel(wheel[i]);
    }
    printWheel();
    if (acumErrorWheel > 0) {
        return false;
    }
    else {
        return true;
    }
    //resetForm();
    //quería probar a hacer que se limpiara el formulario al crearse una rueda y se limpia pero si escribo nuevos datos y le doy al botón "Create wheels" vuelve a pintar los datos anteriores.
}
function printWheel() {
    var carWheel = document.getElementById('carWheel');
    var element2 = document.createElement('div');
    element2.innerHTML = "\n    <div class=\"card mt-4 p-3 style=\"width: 10rem;\">\n        <div class=\"card-body>\n            <h3 class=\"card-title\">Your wheels created:</h3>\n            <p class=\"card-text mt-3\"><b>Wheel Diameter 1</b>: " + wheel[0].diameter + " --- <b>Wheel Brand 1</b>: " + wheel[0].brand + "</p>\n            <p class=\"card-text\"><b>Wheel Diameter 2</b>: " + wheel[1].diameter + " --- <b>Wheel Brand 2</b>: " + wheel[1].brand + "</p>\n            <p class=\"card-text\"><b>Wheel Diameter 3</b>: " + wheel[2].diameter + " --- <b>Wheel Brand 3</b>: " + wheel[2].brand + "</p>\n            <p class=\"card-text\"><b>Wheel Diameter 4</b>: " + wheel[3].diameter + " --- <b>Wheel Brand 4</b>: " + wheel[3].brand + "</p>\n        </div>\n    </div>";
    carWheel === null || carWheel === void 0 ? void 0 : carWheel.appendChild(element2);
}
function resetForm() {
    var resetForm = document.getElementById('myCarWheel');
    resetForm.reset();
}
//VALIDATION FUNCTIONS
function validatePlate(plate) {
    var valPlate = /^[0-9]{4}[a-z, A-Z]{3}$/;
    return valPlate.test(plate) ? true : false;
}
function validateDiameter(wheelDiameter) {
    if (wheelDiameter >= 0.4 && wheelDiameter <= 2) {
        return wheelDiameter ? true : false;
    }
}
