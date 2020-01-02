import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { UpdateuserService } from '../user/updateuser.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private loginService: LoginService, private updateUserService: UpdateuserService) { }

  setTitle(title: string){
    let user = this.loginService.getUser();
    user.title = title;
    this.updateUserService.updateUser();
  }

}
