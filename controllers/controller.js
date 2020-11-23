"use strict";
var car;
function createCar() {
    var _a, _b, _c, _d, _e;
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
    if (acumError == 0) {
        car = new Car(plate, color, brand);
        var carInfo = document.getElementById('carInfo');
        var element = document.createElement('div');
        (_a = document.getElementById("carInfo")) === null || _a === void 0 ? void 0 : _a.classList.remove("no-display");
        element.innerHTML = "\n            <h5 class=\"card-title\">Your car created:</h5>\n            <p class=\"card-text mt-3\"><b>Plate</b>: " + car.plate + "</p>\n            <p class=\"card-text\"><b>Color</b>: " + car.color + "</p>\n            <p class=\"card-text\"><b>Brand</b>: " + car.brand + "</p>";
        carInfo === null || carInfo === void 0 ? void 0 : carInfo.appendChild(element);
        //muestro step2
        (_b = document.getElementById('myCarWheel')) === null || _b === void 0 ? void 0 : _b.classList.remove('no-display');
        (_c = document.getElementById('createWheel')) === null || _c === void 0 ? void 0 : _c.classList.remove('no-display');
        //oculto step1
        (_d = document.getElementById('carForm')) === null || _d === void 0 ? void 0 : _d.classList.add('no-display');
        (_e = document.getElementById('createCar')) === null || _e === void 0 ? void 0 : _e.classList.add('no-display');
    }
}
//WHEELS:
function createWheel() {
    var acumErrorWheel = 0;
    for (var i = 1; i <= 4; i++) {
        var wheelDiameter = parseFloat(document.getElementById('wheelDiameter' + i).value);
        var wheelBrand = document.getElementById('wheelBrand' + i).value.toString();
        if (!validateDiameter(wheelDiameter)) {
            acumErrorWheel++;
            alert('The diameter of wheel' + i + ' has to measure between 0.4 and 2');
        }
        else if (wheelBrand == "") {
            alert("Brand " + i + " field must be filled.");
            acumErrorWheel++;
        }
    }
    if (acumErrorWheel == 0) {
        for (var i = 1; i <= 4; i++) {
            var wheelDiameter = parseFloat(document.getElementById('wheelDiameter' + i).value);
            var wheelBrand = document.getElementById('wheelBrand' + i).value.toString();
            var wheel = new Wheel(wheelDiameter, wheelBrand);
            car.addWheel(wheel);
        }
        printWheel();
    }
    //resetForm();
    //quería probar a hacer que se limpiara el formulario al crearse una rueda y se limpia pero si escribo nuevos datos y le doy al botón "Create wheels" vuelve a pintar los datos anteriores.
}
function printWheel() {
    var _a;
    var carWheel = document.getElementById('carWheel');
    var element2 = document.createElement('div');
    (_a = document.getElementById("carWheel")) === null || _a === void 0 ? void 0 : _a.classList.remove("no-display");
    for (var i = 0; i <= car.wheels.length; i++) {
        element2.innerHTML += "\n            <p class=\"card-text mt-3\"><b>Wheel Diameter " + (i + 1) + "</b>: " + car.wheels[i].diameter + " --- <b>Wheel Brand " + (i + 1) + "</b>: " + car.wheels[i].brand + "</p>";
        carWheel === null || carWheel === void 0 ? void 0 : carWheel.appendChild(element2);
    }
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
