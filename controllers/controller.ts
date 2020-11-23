let car: Car;

function createCar(){
    let acumError = 0;
    
    let plate: string = (<HTMLInputElement>document.getElementById('plate')).value.toString().toUpperCase(),
    color: string = (<HTMLInputElement>document.getElementById('color')).value.toString(),
    brand: string = (<HTMLInputElement>document.getElementById('brand')).value.toString();

    if(plate == "" || color == "" || brand == "") {
        if(plate == "") {
            acumError++;
            alert("Plate field must be filled.");
        }
        if(color == "") {
            acumError++;
            alert("Color field must be filled.");
        }
        if(brand == "") {
            acumError++;
            alert("Brand field must be filled.");
        }

    }else if(!validatePlate(plate)) {
        acumError++;
        alert("The plate must have 4 numbers followed by 3 letters")
    } 
    
    if(acumError == 0){
        car = new Car(plate, color, brand);

        const carInfo = document.getElementById('carInfo');
        const element = document.createElement('div');

        document.getElementById("carInfo")?.classList.remove("no-display");
        element.innerHTML = `
            <h5 class="card-title">Your car created:</h5>
            <p class="card-text mt-3"><b>Plate</b>: ${car.plate}</p>
            <p class="card-text"><b>Color</b>: ${car.color}</p>
            <p class="card-text"><b>Brand</b>: ${car.brand}</p>`;
        carInfo?.appendChild(element);

        //muestro step2
        document.getElementById('myCarWheel')?.classList.remove('no-display');
        document.getElementById('createWheel')?.classList.remove('no-display');

        //oculto step1
        document.getElementById('carForm')?.classList.add('no-display');
        document.getElementById('createCar')?.classList.add('no-display');
    } 
}

//WHEELS:
function createWheel(){
    let acumErrorWheel = 0;
    
    for (let i = 1; i <= 4; i++) {
        let wheelDiameter: number = parseFloat((<HTMLInputElement>document.getElementById('wheelDiameter'+ i)).value);
        let wheelBrand: string = (<HTMLInputElement>document.getElementById('wheelBrand' + i)).value.toString();
        if(!validateDiameter(wheelDiameter)) {
            acumErrorWheel++;
            alert('The diameter of wheel' + i + ' has to measure between 0.4 and 2');
        } else if(wheelBrand == "") {
            alert("Brand " + i + " field must be filled.");
            acumErrorWheel++;
        } 
    }
    if(acumErrorWheel == 0) {
        for(let i=1; i<= 4; i++) {
            let wheelDiameter: number = parseFloat((<HTMLInputElement>document.getElementById('wheelDiameter'+ i)).value);  
            let wheelBrand: string = (<HTMLInputElement>document.getElementById('wheelBrand' + i)).value.toString();
            
            let wheel = new Wheel(wheelDiameter, wheelBrand);
            car.addWheel(wheel);
        }
        printWheel();
    }
    
//resetForm();
//quería probar a hacer que se limpiara el formulario al crearse una rueda y se limpia pero si escribo nuevos datos y le doy al botón "Create wheels" vuelve a pintar los datos anteriores.
}

function printWheel() {
    const carWheel = document.getElementById('carWheel');
    const element2 = document.createElement('div');
    
    document.getElementById("carWheel")?.classList.remove("no-display");

    for(let i = 0; i <= car.wheels.length; i++) {
        element2.innerHTML += `
            <p class="card-text mt-3"><b>Wheel Diameter ${i + 1}</b>: ${car.wheels[i].diameter} --- <b>Wheel Brand ${i + 1}</b>: ${car.wheels[i].brand}</p>`;
        carWheel?.appendChild(element2);
    }
}

function resetForm() {
let resetForm:HTMLFormElement = <HTMLFormElement>document.getElementById('myCarWheel');
resetForm.reset();
}

//VALIDATION FUNCTIONS
function validatePlate(plate: string) {
    let valPlate = /^[0-9]{4}[a-z, A-Z]{3}$/;
    return valPlate.test(plate) ? true : false;
}

function validateDiameter(wheelDiameter: number) {
    if(wheelDiameter >= 0.4 && wheelDiameter <= 2) {
        return wheelDiameter ? true : false;
    }
}
