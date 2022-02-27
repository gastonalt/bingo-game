export class Bola {
    "id": number;
    "pos_i": number;
    "pos_j": number;
    "value": string;
    "letra": string;
    "numero": number;
    "estaEnTablero": boolean;
    "cantado": boolean;
    "marcado": boolean;

    constructor(id:number, pos_i: number, pos_j: number, value: string,
                letra: string, numero: number, estaEnTablero: boolean,
                cantado: boolean, marcado: boolean){
                    this.id = id;
                    this.pos_i = pos_i;
                    this.pos_j = pos_j
                    this.value = value;
                    this.letra = letra;
                    this.numero = numero;
                    this.estaEnTablero = estaEnTablero;
                    this.cantado = cantado;
                    this.marcado = marcado;
    }
}

export class Casilla{
    "bola": Bola;
    "fila": number;
    "columna": number;

    constructor(bola: Bola, fila: number, columna: number){
        this.bola = bola;
        this.fila = fila;
        this.columna = columna;
    }
}