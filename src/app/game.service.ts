import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor( private http: HttpClient) {}

  user: string;
  baseurl = 'http://127.0.0.1:5000';  

  addPlayer (owner: string, player: string): Observable<any> {
    let url = `${this.baseurl}/games/${owner}/players/${player}`
    return this.http.post<any>(url, {}, httpOptions)
  }
  
  postAnswer (owner: string, answer: string): Observable<any> {
    let url = `${this.baseurl}/games/${owner}/players/${this.user}/answer`
    let body = {
     "answer": answer
   }
    return this.http.post<any>(url, body, httpOptions)
  }
  
  startGame (user: String){
    let g = new Game();
    let url = `${this.baseurl}/games/${user}`
    return this.http.post<any>(url, {}, httpOptions)
  }
  showGames (){
    let url = `${this.baseurl}/games`
    return this.http.get<any>(url,httpOptions)
  }
  getGame (owner_name: string){
    let url = `${this.baseurl}/games/${owner_name}`
    return this.http.get<any>(url,httpOptions)
  }
  postVote (owner_name: string,player_name: string,vote: string){
    let url = `${this.baseurl}/games/${owner_name}/players/${this.user}/vote`
    let body = {
      "vote": vote
    }
    return this.http.post<any>(url, body, httpOptions)
  }
  newTurn (owner_name: string){
    let url = `${this.baseurl}/games/${owner_name}/turns`
    let body = {}
    return this.http.post<any>(url, body, httpOptions)
  }

}

export class Game {
owner_name: string;
players: any[];
answers: any[];
votes: any[];
index: number;
turn : any;
}