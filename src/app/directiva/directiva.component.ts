import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {
  listaCursos = ['Java','Matemática', 'Comunicación', 'AWS 2020'];
  habilitar: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
