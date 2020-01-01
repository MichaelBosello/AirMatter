import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from '../user/user';
import { MapService } from '../map/map.service';
import { BluetoothService } from '../bluetooth/bluetooth.service';
import {Route} from '../user/route'
import { UpdateuserService } from '../user/updateuser.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private user: User;

  constructor(private mapService: MapService,
      private loginService: LoginService,
      private bluetoothService: BluetoothService,
      private updateUserService: UpdateuserService) { 
    this.user = loginService.getUser();
  }

  addUserProgress(lat1: number, lng1: number, lat2: number, lng2: number){
    let distance = this.mapService.calculateDistance(lat1, lng1, lat2, lng2);
    if(this.bluetoothService.isConnected && distance > 0 && distance < 300){
      let route: Route = new Route();
      route.pointA = {lat: lat1, lng: lng1};
      route.pointB = {lat: lat2, lng: lng2};
      Promise.all([
        this.bluetoothService.getHumidity(),
        this.bluetoothService.getTemperature(),
        this.bluetoothService.getPollution()])
      .then(values => {
        let pm25 = values[2]

        route.humidity = values[0];
        route.temperature = values[1];
        route.pm25 = pm25;
        route.datetime = new Date();
        this.user.addRoute(route, distance);


        this.visualzeProgress(route);
        this.updateUserService.updateUser();
      })
    }
  }

  loadUserProgress(){
    this.user.routes.forEach( route => {
      this.visualzeProgress(route)
    })
  }

  private visualzeProgress(route: Route){
        /* Data compared to air quality:
            3000 + = Very Bad
            1050-3000 = Bad
            300-1050 = Ordinary
            150-300 = Good
            75-150 = Very Good
            0-75 = Tiptop
        */
       let level = 2
       if(route.pm25 < 1000) {
         level = 1
       }
       if(route.pm25 < 300) {
         level = 0
       }
       this.mapService.addHeatmapPoint(route.pointA.lat, route.pointA.lng, level);
  }



}
