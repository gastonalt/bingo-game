import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss'],
})
export class JuegoComponent implements OnInit {
  numbersBingo: any[5][15] = [[], [], [], [], []];
  bolasYaElegidas: any[] = [];
  letras = ['B', 'I', 'N', 'G', 'O'];
  bolaLetrero : any = this.numbersBingo[1][1];
  letreroReciente: any[] = [];
  tablero: any[5][5] = [[], [], [], [], []];
  miIntervalo: any;
  ganaste = false;
  bolasRestante = 75;

  constructor() {}

  ngOnInit(): void {
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
      let letraRandom = Math.round(Math.random() * 4);
      let numeroRandom = Math.round(Math.random() * 14);
      let bolaElegida = this.numbersBingo[letraRandom][numeroRandom];
      // console.log(bolaElegida);
      while(this.bolasYaElegidas.includes(bolaElegida)){
        letraRandom = Math.round(Math.random() * 4);
        numeroRandom = Math.round(Math.random() * 14);
        bolaElegida = this.numbersBingo[letraRandom][numeroRandom];
      }
      this.bolasYaElegidas.push(bolaElegida);
      this.bolaLetrero = bolaElegida;
      for (let i = 0; i < 5; i++) {
        this.letreroReciente[i]= this.bolasYaElegidas[this.bolasYaElegidas.length - (i + 2)];
        if(!this.bolasYaElegidas[this.bolasYaElegidas.length - (i + 2)]){
          this.letreroReciente[i] = {value: '0'}
        }
      }
    }else{
      this.bolasYaElegidas.forEach((bola)=>{
        console.log(bola.value)
      })
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
        const numeroBingo = {
          id: count - 1,
          arrayIndex: {
            i: firstIndexArray,
            j: i,
          },
          value: letra + '' + count,
          letra: letra,
          numero: count,
          estaEnTablero: false,
          fueCantado: false,
          fueMarcado: false,
        };
        this.numbersBingo[firstIndexArray][i] = numeroBingo;
      }
      firstIndexArray++;
    });
    // console.log(this.numbersBingo);
  }

  clickCasilla(bola: any) {
    if(this.bolasYaElegidas.includes(bola)){
      if(!this.ganaste){
        this.numbersBingo[bola.arrayIndex.i][bola.arrayIndex.j].fueMarcado = true;
        // console.log(bola)
        this.tablero[bola.fila][bola.columna].fueMarcado = true;
        // console.log(this.tablero);
      }
    }else{
      alert('esa bola no salio aun')
    }
    this.checkIfGano(bola)
  }

  checkIfGano(bola: any){
    let i= 0;
    let countHorizontal = 0;
    let countVertical = 0;
    let countDiagonal = 0;
    let countAntiDiagonal = 0;
    this.tablero[bola.fila].forEach(() => {
      if(this.tablero[bola.fila][i].fueMarcado === true){
        countHorizontal++;
      }
      if(this.tablero[i][bola.columna].fueMarcado === true){
        countVertical++;
      }
      if(this.tablero[i][i].fueMarcado === true){
        countDiagonal++;
      }
      if(this.tablero[i][4-i].fueMarcado === true){
        countAntiDiagonal++;
      }
      i++;
    });
    if(countHorizontal === 5 || countVertical === 5 || countDiagonal === 5 || countAntiDiagonal === 5){
      if(!this.ganaste){
        alert("ganaste");
        this.ganaste = true;
        clearInterval(this.miIntervalo);
      }
    }

  }

  generarTablero() {
    for (let fila = 0; fila < 5; fila++) {
      for (let columna = 0; columna < 5; columna++) {
        // hacemos el numero random para el indice
        let numeroRandom = Math.round(Math.random() * 14);
        // ponemos alguno de las bolitas en el tablero
        let bolaElegida = this.numbersBingo[columna][numeroRandom];
        //vemos si la bolita ya está en el tablero
        while (bolaElegida.estaEnTablero) {
          numeroRandom = Math.round(Math.random() * 14);
          bolaElegida = this.numbersBingo[columna][numeroRandom];
        }
        bolaElegida.fila= fila;
        bolaElegida.columna= columna;
        this.tablero[fila][columna] = bolaElegida;
        this.numbersBingo[columna][numeroRandom].estaEnTablero = true;
      }
    }
  }
}
