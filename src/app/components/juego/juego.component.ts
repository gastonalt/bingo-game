import { Component, OnInit } from '@angular/core';
import { Bola, Casilla } from 'src/app/models/bola';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss'],
})
export class JuegoComponent implements OnInit {
  numbersBingo: Bola[][] = [[], [], [], [], []];
  bolasYaElegidas: any[] = [];
  letras = ['B', 'I', 'N', 'G', 'O'];
  bolaLetrero : any = this.numbersBingo[1][1];
  letreroReciente: any[] = [];
  tablero: Casilla[][] = [[], [], [], [], []];
  miIntervalo: any;
  arranco = false;
  bolasRestante = 75;

  constructor() {}

  ngOnInit(): void {
  }

  arrancar(){
    this.arranco = true;
    this.fillNumbersBingo();
    this.generarTablero();
      this.miIntervalo = setInterval(()=>{
        this.getNextBola();
      }, 3000);
  }


  getNextBola(){
    let counter = 0;
    if(counter < 74){
      this.bolasRestante--;
      let letraRandom = Math.round(Math.random() * 4), numeroRandom = Math.round(Math.random() * 14), bolaElegida = this.numbersBingo[letraRandom][numeroRandom];
      while(this.bolasYaElegidas.includes(bolaElegida)){
        letraRandom = Math.round(Math.random() * 4), numeroRandom = Math.round(Math.random() * 14), bolaElegida = this.numbersBingo[letraRandom][numeroRandom];
      }
      this.bolasYaElegidas.push(bolaElegida); this.bolaLetrero = bolaElegida;
      for (let i = 0; i < 5; i++) {
        this.letreroReciente[i]= this.bolasYaElegidas[this.bolasYaElegidas.length - (i + 2)];
        if(!this.bolasYaElegidas[this.bolasYaElegidas.length - (i + 2)]) this.letreroReciente[i] = {value: ''};
      }
    }else{
      clearInterval(this.miIntervalo);
    }
    counter++;
  }

  fillNumbersBingo() {
    let count = 0;
    let firstIndexArray = 0;
    this.letras.forEach((letra) => {
      for (let i = 0; i < 15; i++) {
        count++;
        this.numbersBingo[firstIndexArray][i] = new Bola(count -1, firstIndexArray, i, letra + '' + count, letra, count, false, false, false);
      }
      firstIndexArray++;
    });
    console.log(this.numbersBingo)
  }

  clickCasilla(casilla: Casilla) {
    if(this.bolasYaElegidas.includes(casilla.bola)){
      if(!this.checkIfGano(casilla)){
        this.numbersBingo[casilla.bola.pos_i][casilla.bola.pos_j].marcado = true;
        this.tablero[casilla.fila][casilla.columna].bola.marcado = true;
      }
    }
    if(this.checkIfGano(casilla)){
      alert('Ganaste papix!')
    }
  }

  checkIfGano(casilla: Casilla){
    let i= 0, countHorizontal = 0, countVertical = 0, countDiagonal = 0, countAntiDiagonal = 0;
    this.tablero[casilla.fila].forEach(() => {
      if(this.tablero[casilla.fila][i].bola.marcado === true) countHorizontal++;
      if(this.tablero[i][casilla.columna].bola.marcado === true) countVertical++;
      if(this.tablero[i][i].bola.marcado === true) countDiagonal++;
      if(this.tablero[i][4-i].bola.marcado === true) countAntiDiagonal++;
      i++;
    });
    return (countHorizontal === 5 || countVertical === 5 || countDiagonal === 5 || countAntiDiagonal === 5) ? true : false;
  }

  generarTablero() {
    for (let fila = 0; fila < 5; fila++) {
      for (let columna = 0; columna < 5; columna++) {
        let numeroRandom = Math.round(Math.random() * 14);
        let bolaElegida = this.numbersBingo[columna][numeroRandom];
        while (bolaElegida.estaEnTablero) {
          numeroRandom = Math.round(Math.random() * 14);
          bolaElegida = this.numbersBingo[columna][numeroRandom];
        }
        this.tablero[fila][columna] = new Casilla(bolaElegida, fila, columna);
        this.numbersBingo[columna][numeroRandom].estaEnTablero = true;
      }
    }
  }
}
