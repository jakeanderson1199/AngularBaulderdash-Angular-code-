import { Component, OnInit } from '@angular/core';
import { GameService, Game }  from '../game.service';
import { addPlayer } from '@angular/core/src/render3/players';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private gameService: GameService,) { }

  ngOnInit() {
  }
games: Game[];

  get user(): string {
    return this.gameService.user
  }

  set user(user: string) {
     this.gameService.user = user;
  }

  savePlayer(game: Game, username: string): void {
    this.gameService.addPlayer(game.owner_name,username)
    .subscribe(r=> console.log(r))}
  startGame(): void {
    this.gameService.startGame(this.user)
    .subscribe(r=> console.log(r))}

  showGames(): void {
    this.gameService.showGames()
    .subscribe(
    r=> {
      console.log('games', r);
      this.games = r;
    } 
    );
  }


 }

