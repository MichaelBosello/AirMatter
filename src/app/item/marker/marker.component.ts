import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { User } from 'src/app/user/user';
import { ItemService } from '../item.service';
import { MatRadioChange } from '@angular/material';
import { MapService } from 'src/app/map/map.service';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent implements OnInit {

  @Output() back = new EventEmitter();

  userMarker: string;
  markers: {name: string, src: string, obtained: boolean}[] =
    [{name: 'Biker', src: 'assets/image/marker/marker1.png', obtained: false},
     {name: 'Vespa rider', src: 'assets/image/marker/marker2.png', obtained: false},
     {name: 'Horse rider', src: 'assets/image/marker/marker3.png', obtained: false},
     {name: 'Fast biker', src: 'assets/image/marker/marker4.png', obtained: false}];

  user: User;

  constructor(
    private loginService: LoginService,
    private itemService: ItemService,
    private mapService: MapService) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
    this.loadUserMarkers();
    this.userMarker = this.user.marker;
    this.user.subscribeUserProgress(this.loadUserMarkers.bind(this));
  }

  private loadUserMarkers(){
    for(var i = 0; i < this.markers.length; i++){
      if(this.user.level > i){
        this.markers[i].obtained = true;
      }
    }
  }

  changeMarker(event: MatRadioChange){
    this.itemService.setMarker(event.value);
    this.mapService.changeIcon(event.value);
  }

}
