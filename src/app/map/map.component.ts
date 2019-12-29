import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from './map.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('map', { static:false })
  mapElement: ElementRef;

  constructor(private mapService: MapService, private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.mapService.createMap(this.mapElement, this.errorCallback.bind(this));
   }

   errorCallback(message: string){
    this.snackBar.open(message, "", { duration: 2600 })
   }

}
