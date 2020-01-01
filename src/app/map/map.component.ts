import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MapService } from './map.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('map', { static:false })
  mapElement: ElementRef;

  constructor(private mapService: MapService, private gameService: GameService, private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    if(this.mapService.isGeolocationSupported()) {
      this.mapService.watchPosition(this.gameService.addUserProgress.bind(this.gameService));
      this.mapService.createMap(this.mapElement, this.errorCallback.bind(this));
    } else {
      this.errorCallback("Geolocation not supported in your browser")
    }
   }

   errorCallback(message: string){
    this.snackBar.open(message, "", { duration: 2600 })
   }

}
