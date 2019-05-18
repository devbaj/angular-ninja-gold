import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { LoginComponent } from './login/login.component';
import { GamedataService } from './gamedata.service';
import { GameLogicComponent } from './game-logic/game-logic.component';
import { LoadGamesComponent } from './load-games/load-games.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegComponent,
    LoginComponent,
    GameLogicComponent,
    LoadGamesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [HttpService, GamedataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
