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

  

  addPlayer (owner: string, player: string): Observable<any> {
    let url = `http://127.0.0.1:5000/games/${owner}/players/${player}`
    return this.http.post<any>(url, {}, httpOptions)
  }
  
  startGame (user: String){
    let g = new Game();
    let url = `http://127.0.0.1:5000/games/${user}`
    return this.http.post<any>(url, {}, httpOptions)
  }
  showGames (){
    let url = `http://127.0.0.1:5000/games`
    return this.http.get<any>(url,httpOptions)
  }
}

export class Game {
owner_name: string;
players: any[];
answers: any[];
votes: any[];
index: number;
}