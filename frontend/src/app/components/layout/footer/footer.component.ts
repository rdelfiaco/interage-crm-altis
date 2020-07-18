import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  versao: string = 'T.3.0.0'

  constructor() { }

  ngOnInit(): void {
  }

}
