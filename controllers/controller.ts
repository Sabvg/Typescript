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
        
    } else {
        car = new Car(plate, color, brand);

        const carInfo = document.getElementById('carInfo');
        const element = document.createElement('div');

        element.innerHTML = `
            <div class="card mt-4 p-3  style="width: 10rem;">
                <div class="card-body>
                    <h3 class="card-title">Your car created:</h3>
                    <p class="card-text mt-3"><b>Plate</b>: ${car.plate}</p>
                    <p class="card-text"><b>Color</b>: ${car.color}</p>
                    <p class="card-text"><b>Brand</b>: ${car.brand}</p>
                </div>
        </div>`;
        carInfo?.appendChild(element);

        //muestro step2
        document.getElementById('myCarWheel')?.classList.remove('no-display');
        document.getElementById('createWheel')?.classList.remove('no-display');

        //oculto step1
        document.getElementById('carForm')?.classList.add('no-display');
        document.getElementById('createCar')?.classList.add('no-display');
    } 

    if (acumError > 0) {
        return false;
    } else {
        return true;
    }
}

//WHEELS:

let wheel: Wheel[] = [];
   
function createWheel(){
    let acumErrorWheel = 0;

    for (let i = 1; i <= 4; i++) {

        let wheelDiameter: number = parseFloat((<HTMLInputElement>document.getElementById('wheelDiameter'+ i)).value);
        
        let wheelBrand: string = (<HTMLInputElement>document.getElementById('wheelBrand' + i)).value.toString();
        
          if(!validateDiameter(wheelDiameter)) {
                acumErrorWheel++;
                wheel.splice(0, wheel.length);
                return alert('The diameter of wheel' + i + ' has to measure between 0.4 and 2');
                //con return termina, no sigue leyendo el code y desaparece el error en consola de que no encuentra diameter. Los alert salen ahora uno a uno pero si voy corrigiendo los diámetros sólo pinta el 1 y 2 repetidos, con el splice se arregla
                

            } else if(wheelBrand == "") {
                wheel.splice(0, wheel.length);
                alert("Brand " + i + " field must be filled.");
                acumErrorWheel++;
            } 
            
            if(acumErrorWheel == 0) {
                wheel.push(new Wheel(wheelDiameter, wheelBrand));
            }
    }

    for(let i=0; i<= 4; i++) {
        car.addWheel(wheel[i]);
    }
        
    printWheel();
        
    if (acumErrorWheel > 0) {
        return false;
    } else {
        return true;
    }
    
//resetForm();
//quería probar a hacer que se limpiara el formulario al crearse una rueda y se limpia pero si escribo nuevos datos y le doy al botón "Create wheels" vuelve a pintar los datos anteriores.
}

function printWheel() {
    const carWheel = document.getElementById('carWheel');
    const element2 = document.createElement('div');

    element2.innerHTML = `
    <div class="card mt-4 p-3 style="width: 10rem;">
        <div class="card-body>
            <h3 class="card-title">Your wheels created:</h3>
            <p class="card-text mt-3"><b>Wheel Diameter 1</b>: ${wheel[0].diameter} --- <b>Wheel Brand 1</b>: ${wheel[0].brand}</p>
            <p class="card-text"><b>Wheel Diameter 2</b>: ${wheel[1].diameter} --- <b>Wheel Brand 2</b>: ${wheel[1].brand}</p>
            <p class="card-text"><b>Wheel Diameter 3</b>: ${wheel[2].diameter} --- <b>Wheel Brand 3</b>: ${wheel[2].brand}</p>
            <p class="card-text"><b>Wheel Diameter 4</b>: ${wheel[3].diameter} --- <b>Wheel Brand 4</b>: ${wheel[3].brand}</p>
        </div>
    </div>`;
    carWheel?.appendChild(element2);
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
