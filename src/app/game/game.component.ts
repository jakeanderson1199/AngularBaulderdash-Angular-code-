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
      .subscribe(r => this.game = r)
  }
  refresh(): void {

    this.gameService.getGame(this.owner)
      .subscribe(r => {
        this.game = r;
        let allAnswered = true
        this.game.players.forEach(p => {
          allAnswered = allAnswered && !!p.answer;
        });
        this.allAnswered = allAnswered
      });

  }
  vote(a): void {
    this.gameService.postVote(this.owner, this.user, a)
      .subscribe(r => this.game = r)
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
    let real : Answer = {answer : this.game.turn.current_question.real_answer, isUser : false, isReal :true};
    answers.push(real);
    answers = shuffle(answers);
    return answers;
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