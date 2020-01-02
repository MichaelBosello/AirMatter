import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BluetoothComponent } from './bluetooth/bluetooth.component';
import { StepperComponent } from './stepper/stepper.component'; 

import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GameComponent } from './game/game.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { SpinnerContainer } from './spinner-container/spinner-container';

import {BluetoothService} from './bluetooth/bluetooth.service';
import {LoginService} from './login/login.service';
import { MapService } from './map/map.service';
import { GameService } from './game/game.service';
import { LevelupComponent } from './levelup/levelup.component';
import { TitleComponent } from './item/title/title.component';
import { AchievementsComponent } from './item/achievements/achievements.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BluetoothComponent,
    StepperComponent,
    GameComponent,
    MapComponent,
    HomeComponent,
    SpinnerContainer,
    LevelupComponent,
    TitleComponent,
    AchievementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule
  ],
  providers: [BluetoothService, LoginService, MapService, GameService],
  entryComponents: [LevelupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
