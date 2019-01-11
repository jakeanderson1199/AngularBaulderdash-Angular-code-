import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { GameComponent} from './game/game.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard',  component: DashboardComponent, pathMatch: 'full'},
  { path: "games/:owner_name",  component: GameComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
