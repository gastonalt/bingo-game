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
  counter = 0;
  miIntervalo: any;

  constructor() {}

  ngOnInit(): void {
    this.fillNumbersBingo();
    this.generarTablero();
      this.miIntervalo = setInterval(()=>{
        this.getNextBola();
      }, 5000);
  }


  getNextBola(){
    if(this.counter < 74){
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
    this.counter++;
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
      this.numbersBingo[bola.arrayIndex.i][bola.arrayIndex.j].fueMarcado = true;
      // console.log(bola)
      this.tablero[bola.fila][bola.columna].fueMarcado = true;
      // console.log(this.tablero);
    }else{
      alert('esa bola no salio aun')
    }
  }

  checkGane(){

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
