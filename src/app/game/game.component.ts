import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game, GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  answer: string;
  owner: string;
  allAnswered: boolean;
  userVoted: boolean;
  ui:any = {}

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.owner = this.route.snapshot.paramMap.get('owner_name');
    this.refresh();
   
  }
  get user(): string {
    return this.gameService.user
  }
  set user(user: string) {
    this.gameService.user = user;
  }
  saveAnswer(): void {

    this.gameService.postAnswer(this.owner, this.answer)
      .subscribe(r => {
        this.onGameUpdated(r);
      })
  }
  refresh(): void {

    this.gameService.getGame(this.owner)
      .subscribe(r => {
        this.onGameUpdated(r);
      });

  }

  private onGameUpdated(game: Game) {
    this.game = game;
    let allAnswered = true
    this.game.players.forEach(p => {
      allAnswered = allAnswered && !!p.answer;
    });
    this.allAnswered = allAnswered
  }

  vote(a): void {
    this.gameService.postVote(this.owner, this.user, a)
      .subscribe(r => {
        this.onGameUpdated(r);
        this.userVoted = true;
      }
      )
  }
  nextTurn(): void {
    this.gameService.newTurn(this.owner)
    .subscribe(r => {
      this.onGameUpdated(r)
      this.userVoted = false;
      this.allAnswered = false;
      this.answer = null;
    })
  }

  get answers(): Answer[] {
    let answers: Answer[] = [];
    this.game.players.forEach(p => {
      let a = new Answer();
      a.answer = p.answer.text;
      a.isUser = p.name === this.user;
      answers.push(a);
    });
    //todo sort randomley
    let real: Answer = { answer: this.game.turn.current_question.real_answer, isUser: false, isReal: true };
    answers.push(real);
    answers = shuffle(answers);
    return answers;
  }

  get userAnswered(): boolean {
    if (!this.game) return false;
    let userplayer = this.game.players.find(p => p.name == this.user);
    return userplayer && userplayer.answer;
  }

}

export class Answer {
  isReal: boolean;
  isUser: boolean;
  answer: string
}
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}