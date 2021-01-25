// clases de luchadores

class Luchador {

    constructor(nombre,vida, daño) {
        this.nombre = nombre;
        this.vida = vida;
        this.daño = daño;
        
    }
    getVida() { return this.vida; };

    getDaño() { return this.daño; };

    setVida(vida) { this.vida = Math.floor(vida); };

    setDaño(daño) { this.daño = daño; };

    defender(daño) { 
       
        return this.vida > daño ? this.setVida((this.vida - daño)) : this.setVida(0);
    } 
    
}

class Guerrero extends Luchador {

    constructor( nombre, vida, daño, stamina) {
        super(nombre, vida, daño);
        this.stamina = stamina;
        this.tipo = "Guerrero";
    }

        getStamina() { return this.stamina; };

        getTipo() { return this.tipo; }; 

        setStamina(stamina) { this.stamina -= Math.floor(stamina) };
    
        atacar() { 
            this.setStamina(this.stamina * 0.9);
            if (this.stamina <= 0) { console.log("No hay mas power, banca un turno")};
            return this.stamina  > 0 ? this.daño : 0;
        }
        defender(daño){ 
            console.log("Bonificacion de defensa:");
            return this.vida > daño ? this.setVida(this.vida-(daño - bonificar( daño,7)/7)) : this.setVida(0);
        }    
}

class Mago extends Luchador {

    constructor( nombre, vida, daño, mana) {
        super(nombre, vida, daño);
        this.mana = mana;
        this.tipo = "Mago";
        
    }

    getMana() { return this.mana};

    getTipo() { return this.tipo};

    setMana(mana) {this.mana -= Math.floor(mana); };

    atacar() { 
        this.setMana(this.mana * 0.9);
        console.log("Bonificacion de ataque:");
        if (this.mana <= 0) { console.log("No hay mas power, banca un turno")};
        return this.mana > 0 ? bonificar(this.daño,2) : 0;
    }    
}

class Sabio extends Mago {

    vida = (Math.floor(Math.random()*2000))+2000;
    daño = (Math.floor(Math.random()*1000))+1000;
    mana = (Math.floor(Math.random()*200))+200;


}

class Curandero extends Mago {

    vida = (Math.floor(Math.random()*2000))+2000;
    daño = (Math.floor(Math.random()*200))+200;
    mana = (Math.floor(Math.random()*200))+200;

}

class Soldado extends Guerrero {
    vida = (Math.floor(Math.random()*10000))+10000;
    daño = (Math.floor(Math.random()*500))+500;
    stamina = (Math.floor(Math.random()*200))+200;
       
}

class Asesino extends Guerrero {

    vida = (Math.floor(Math.random()*2000))+2000;
    daño = (Math.floor(Math.random()*1000))+1000;
    stamina = (Math.floor(Math.random()*1000))+1000;
}

const arrayDeClases = [ Soldado,
                            Curandero,
                            Sabio,
                            Asesino]

const arrayLuchadores= ["Amazon",
                         "SoftBank", 
                         "MercadoLibre", 
                         "J.P.Morgan", 
                         "Microsoft", 
                         "Globant", 
                         "Heineken", 
                         "Clarin", 
                         "Promofiesta", 
                         "Tesla"];

                         

function bonificar(valor, ratio= 1) { 
    pausar(1000000);
    let bonus = Math.floor(Math.random()*10)+1;
    bonus > ratio ? console.log("Bonificado!!!"): console.log(" I'm sorry mamma!!");
    return bonus > ratio ? valor * bonus : valor;
}





function elegirDosLuchadores(luchadores) {

    
    let parDeLuchadores = [];
    
    let decimalAleatorio = Math.floor(Math.random()*arrayLuchadores.length);

    let luchadorUno = luchadores[decimalAleatorio];

    let arrayLuchadoresDos = Array.from(luchadores);

    arrayLuchadoresDos.splice(decimalAleatorio,1);

    let luchadorDos = arrayLuchadoresDos[Math.floor(Math.random()*arrayLuchadoresDos.length)];

    parDeLuchadores.push(luchadorUno);
    parDeLuchadores.push(luchadorDos);

    return parDeLuchadores;

}
 
function instanciador() {

    let clases = arrayDeClases;
    let luchadores = elegirDosLuchadores(arrayLuchadores);
    luchadorUno = new clases[Math.floor(Math.random()*clases.length)] (luchadores[0]); 
    luchadorDos = new clases[Math.floor(Math.random()*clases.length)] (luchadores[1]);
  
    return [luchadorUno,luchadorDos];
}

function pausar(milisegundos) {
    let inicio = new Date().getTime();
    for (let i = 0; i < 10000000; i++) {
        if ((new Date().getTime() - inicio) > milisegundos) {
        break;
        }
    }
}
 function batallar(luchadores){ 
    let i = 0;
    let j = 1; 
    let c= 0;
    console.log("Empieza la batalla");
    console.log(luchadores[i].nombre ,luchadores[i].getTipo(), luchadores[i].getVida());
    console.log(luchadores[j].nombre ,luchadores[j].getTipo(), luchadores[j].getVida());
    pausar(1000000);
    while (luchadores[j].getVida() >0 && luchadores[i].getVida() >0){
        console.log();
        console.log(`El luchador ${luchadores[j].nombre} es atacado por ${luchadores[i].nombre} `);
        luchadores[j].defender( luchadores[i].atacar());
        pausar(1000000);
        console.log(`El luchador ${luchadores[i].nombre} ataca con una fuerza de ${luchadores[i].getDaño()} `);  
        console.log();
        pausar(1000000);
        console.log(`${luchadores[j].nombre} sufre un duro golpe. Su vida ha caido a ${luchadores[j].getVida()}` );
        console.log();
        pausar(1000000);
        c = j;
        j = i;
        i = c; 
        pausar(1000000);
        console.log();
        luchadores[j].getTipo() == "Guerrero" ? luchadores[j].setStamina(-5) : luchadores[j].setMana(-5) ;    
        luchadores[i].getTipo() == "Mago" ? luchadores[i].setMana(-5) : luchadores[i].setStamina(-5) ;     
    }
    console.log();   
    console.log("Fin de la batalla");
    console.log();
    let ganador = luchadores[i].getVida() > luchadores[j].getVida() ? luchadores[i]:luchadores[j];
    console.log(`El luchador ${ganador.nombre} ha ganado la contienda`);
    console.log(luchadores[j]);   
    console.log(luchadores[i]);   
}
        

// main 


const a = instanciador();
batallar(a);







