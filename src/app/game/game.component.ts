import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  //@Input() game: Game

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    

    

    
  }

}
