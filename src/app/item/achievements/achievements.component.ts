import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/user/user';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  @Output() back = new EventEmitter();

  user: User;

  achievements: {name: string, src: string, obtained: boolean}[] =
  [{name: 'Run for 5km', src: 'assets/image/achievement/achievement1.png', obtained: false},
   {name: 'Run for 10km', src: 'assets/image/achievement/achievement2.png', obtained: false},
   {name: 'Run for 15km', src: 'assets/image/achievement/achievement3.jpg', obtained: false},
   {name: 'Visit 1 place', src: 'assets/image/achievement/achievement4.jpg', obtained: false}];

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
    this.loadUserAchievements();
    this.user.subscribeUserProgress(this.loadUserAchievements.bind(this));
  }

  private loadUserAchievements(){
    for(var i = 0; i < 3; i++){
      if(this.user.totalDistance > (i + 1) * 5){
        this.achievements[i].obtained = true;
      }
    }
    //todo: check for achievement of type 'place'
  }

}
