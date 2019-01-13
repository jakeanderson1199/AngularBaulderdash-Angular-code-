import { Component, OnInit } from '@angular/core';
import { Game,GameService } from '../game.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
