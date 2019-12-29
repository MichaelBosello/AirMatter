import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @ViewChild('stepper', {static: false}) private stepper: MatStepper;

  @HostListener('window:resize', ['$event'])
    responsive(event?) {
          if (window.innerWidth <= 600) {
            this.mobile = true;
          } else {
            this.mobile = false;
          }
    }

  mobile: boolean = false;

  constructor() { this.responsive(); }

  ngOnInit() {}

  nextStep(){
    this.stepper.next();
  }

}
