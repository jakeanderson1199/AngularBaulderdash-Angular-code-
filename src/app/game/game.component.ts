import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game,GameService } from '../game.service'
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  answer: string;
  owner: string;
  constructor(
    private gameService: GameService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.owner= this.route.snapshot.paramMap.get('owner_name');
    this.refresh();
  }

  saveAnswer(): void {
    
    this.gameService.postAnswer(this.owner, this.answer)
    .subscribe(r=> this.game = r)}
  refresh(): void {
    
    this.gameService.getGame(this.owner)
    .subscribe(r=> this.game = r)  
  }
}
