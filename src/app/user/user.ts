import { Route } from './route';

export class User {
  username: string;
  email: string;
  level: number;
  experience: number;
  totalDistance: number;
  routes: Route[];
  title: string;

  constructor(json:any) {
    this.username = json.username;
    this.email = json.email;
    this.level = json.level;
    this.experience = json.experience;
    this.totalDistance = json.totalDistance;
    this.routes = json.routes;
    this.title = json.title;
  }

  private experienceRate = 100;
  private maxExp = 600;
  private callback = () => {};

  addRoute(route: Route, distance: number){
    this.totalDistance += distance;
    this.experience += distance * this.experienceRate;
    this.routes.push(route);

    while(this.experience >= this.maxExp){
      this.experience -= this.maxExp;
      this.level += 1;
    }

    this.callback();

  }

  subscribeUserProgress( callback: () => any ){
    this.callback = callback;
  }

  getMaxExperience(){
    return this.maxExp;
  }
}