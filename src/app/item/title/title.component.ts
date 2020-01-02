import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { User } from 'src/app/user/user';
import { ItemService } from '../item.service';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Output() back = new EventEmitter();

  userTitle: string;
  titles: {title: string, obtained: boolean}[] =
    [{title: 'Beginner', obtained: false},
     {title: 'Rider', obtained: false},
     {title: 'Adventurer', obtained: false},
     {title: 'Explorer', obtained: false},
     {title: 'Expert', obtained: false}];

  user: User;

  constructor(private loginService: LoginService, private itemService: ItemService) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
    this.loadUserTitles();
    this.userTitle = this.user.title;
    this.user.subscribeUserProgress(this.loadUserTitles.bind(this));
  }

  private loadUserTitles(){
    for(var i = 0; i < this.titles.length; i++){
      if(this.user.level > i){
        this.titles[i].obtained = true;
      }
    }
  }

  changeTitle(event: MatRadioChange){
    this.itemService.setTitle(event.value);
  }

}
