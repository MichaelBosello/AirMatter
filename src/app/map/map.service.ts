import { Injectable, ElementRef } from '@angular/core';

import {} from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: google.maps.Map;
  marker: google.maps.Marker;

  constructor() { }

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
        const mapProperties = {
          center: pos,
          zoom: 15,
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
        this.marker = new google.maps.Marker({
          position: pos,
          map: this.map,
        });
        this.startTracking(errorCallBack);
      },
      (error: PositionError) => {
        errorCallBack(this.getPositionErrorMessage(error.code));
      })
  }

  private startTracking(errorCallBack: (error: string) => any){
    navigator.geolocation.watchPosition( 
      (position: Position) => {
        let pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.marker.setPosition(pos);
        this.map.panTo(pos);
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

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1); 
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
