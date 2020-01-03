import { Injectable, ElementRef } from '@angular/core';

import {} from 'googlemaps';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: google.maps.Map;
  marker: google.maps.Marker;
  position: google.maps.LatLng;

  positionUpdateCallback: (lat1: number, lng1: number, lat2: number, lng2: number) => any;

  heatMapDataHigh: google.maps.MVCArray<google.maps.LatLng> = new google.maps.MVCArray();
  heatMapDataMid: google.maps.MVCArray<google.maps.LatLng> = new google.maps.MVCArray();
  heatMapDataLow: google.maps.MVCArray<google.maps.LatLng> = new google.maps.MVCArray();

  constructor(private loginService: LoginService) {}

  isGeolocationSupported(): boolean {
    if (navigator.geolocation) {
      return true;
    } else {
      return false;
    }
  }

  createMap(mapElement: ElementRef, errorCallBack: (error: string) => any ) {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        let pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.position = pos;
        const mapProperties = {
          center: pos,
          zoom: 16,
          styles: this.mapStyle,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false
        };
        this.map = new google.maps.Map(mapElement.nativeElement, mapProperties);

        var marker = this.loginService.getUser().marker;
        if(!marker || marker == ""){
          marker = "assets/image/marker/marker1.png";
        }

        var icon = {
          url: marker,
          scaledSize: new google.maps.Size(50, 50)
        };
        this.marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          icon: icon
        });

        new google.maps.visualization.HeatmapLayer({
            data: this.heatMapDataHigh,
            radius: 22,
            gradient: this.red,
            map: this.map,
            opacity: 1
        });
        new google.maps.visualization.HeatmapLayer({
            data: this.heatMapDataMid,
            radius: 22,
            gradient: this.yellow,
            map: this.map,
            opacity: 1
        });
        new google.maps.visualization.HeatmapLayer({
            data: this.heatMapDataLow,
            radius: 22,
            gradient: this.green,
            map: this.map,
            opacity: 1
        });

        this.startTracking(errorCallBack);
      },
      (error: PositionError) => {
        errorCallBack(this.getPositionErrorMessage(error.code));
      })
  }

  watchPosition( callback: (lat1: number, lng1: number, lat2: number, lng2: number) => any ){
    this.positionUpdateCallback = callback;
  }

  changeIcon(url: string){
    var icon = {
      url: url,
      scaledSize: new google.maps.Size(50, 50)
    };
    this.marker.setIcon(icon);
  }

  addHeatmapPoint(lat: number, lng: number, layer: number){
    if(layer == 0){
      this.heatMapDataLow.push(new google.maps.LatLng(lat, lng));
    }
    if(layer == 1){
      this.heatMapDataMid.push(new google.maps.LatLng(lat, lng));
    }
    if(layer == 2){
      this.heatMapDataHigh.push(new google.maps.LatLng(lat, lng));
    }
  }

  private startTracking(errorCallBack: (error: string) => any){
    navigator.geolocation.watchPosition( 
      (position: Position) => {
        let newPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.marker.setPosition(newPos);
        this.map.panTo(newPos);
        this.positionUpdateCallback(this.position.lat(), this.position.lng(), newPos.lat(), newPos.lng());
        this.position = newPos;
      }, 
      (error: PositionError) => {
        errorCallBack(this.getPositionErrorMessage(error.code));
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
  }

  getPositionErrorMessage(code: number): string {
    switch (code) {
      case 1:
        return 'Permission denied.';
      case 2:
        return 'Position unavailable.';
      case 3:
        return 'Timeout reached.';
    }
  }

  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lng2 - lng1); 
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var d = R * c;
    return d;
  }
  private toRad(num: number){
    return num * Math.PI / 180;
  }






  private yellow = [
    'rgba(240,230,140 ,0)',
    'rgba(240,230,140 ,1)'
  ];

  private red = [
    'rgba(255, 0, 0,0)',
    'rgba(255, 0, 0, 1)'
  ];

  private green = [
    'rgba(0, 255, 0, 0)',
    'rgba(0, 255, 0, 1)'
  ];

  private mapStyle: google.maps.MapTypeStyle[] = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#0066ff"
            },
            {
                "saturation": 74
            },
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "weight": 0.6
            },
            {
                "saturation": -85
            },
            {
                "lightness": 61
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#5f94ff"
            },
            {
                "lightness": 26
            },
            {
                "gamma": 5.86
            }
        ]
    }
]

}
